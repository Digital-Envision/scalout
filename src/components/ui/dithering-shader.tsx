"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type DitheringShape = "swirl" | "ripple" | "warp";
export type DitheringMatrix = "2x2" | "4x4" | "8x8" | "random";

const SHAPES: Record<DitheringShape, number> = { swirl: 0, ripple: 1, warp: 2 };
const MATRICES: Record<DitheringMatrix, number> = {
  "2x2": 0,
  "4x4": 1,
  "8x8": 2,
  random: 3,
};

/** Frame the shader freezes on when the visitor prefers reduced motion. */
const STATIC_FRAME = 2.4;

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

/**
 * One fragment = one dither cell. The canvas backing store is sized to
 * ceil(width / pxSize), then CSS upscales it with image-rendering: pixelated,
 * so the ordered-dither grid is exact and the GPU cost stays tiny.
 */
const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform float u_scale;
uniform vec3 u_back;
uniform vec3 u_front;
uniform int u_matrix;
uniform int u_shape;

/* 2x2 Bayer evaluated arithmetically — GLSL ES 1.00 has no bitwise ops, and
   the larger matrices fall out of the recursive form below. */
float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x * 0.5 + a.y * a.y * 0.75);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.317, 289.113))) * 43758.5453);
}

float swirlField(vec2 p, float t) {
  float r = length(p);
  float a = atan(p.y, p.x);
  float arms = sin(a * 3.0 + pow(r, 0.75) * 11.0 - t * 1.5);
  float counter = sin(a * -2.0 + r * 6.5 + t * 0.9);
  float v = 0.5 + 0.5 * (arms * 0.62 + counter * 0.38);
  return v * smoothstep(1.35, 0.02, r);
}

float rippleField(vec2 p, float t) {
  float r = length(p);
  float v = 0.5 + 0.5 * sin(r * 17.0 - t * 2.0);
  return v * smoothstep(1.3, 0.0, r);
}

float warpField(vec2 p, float t) {
  vec2 q = p + 0.35 * vec2(sin(p.y * 3.1 + t), cos(p.x * 2.7 - t * 0.8));
  float v = 0.5 + 0.5 * sin(q.x * 5.0 + q.y * 4.0 + t);
  return v * smoothstep(1.4, 0.0, length(p));
}

void main() {
  vec2 cell = gl_FragCoord.xy - 0.5;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  p *= u_scale;

  float v;
  if (u_shape == 1) {
    v = rippleField(p, u_time);
  } else if (u_shape == 2) {
    v = warpField(p, u_time);
  } else {
    v = swirlField(p, u_time);
  }
  v = pow(clamp(v, 0.0, 1.0), 1.25);

  float threshold;
  if (u_matrix == 0) {
    threshold = bayer2(cell);
  } else if (u_matrix == 2) {
    threshold =
      (bayer2(cell * 0.25) * 0.25 + bayer2(cell * 0.5)) * 0.25 + bayer2(cell);
  } else if (u_matrix == 3) {
    threshold = hash(cell);
  } else {
    threshold = bayer2(cell * 0.5) * 0.25 + bayer2(cell);
  }

  gl_FragColor = vec4(mix(u_back, u_front, step(threshold, v)), 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = Number.parseInt(full, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function DitheringShader({
  shape = "swirl",
  type = "4x4",
  colorBack = "#070a10",
  colorFront = "#2f6fe4",
  pxSize = 4,
  speed = 0.9,
  scale = 1,
  className,
}: {
  shape?: DitheringShape;
  type?: DitheringMatrix;
  /** Unlit cells. Also the canvas fallback fill when WebGL is unavailable. */
  colorBack?: string;
  /** Lit cells. */
  colorFront?: string;
  /** Dither cell size in CSS pixels. */
  pxSize?: number;
  speed?: number;
  scale?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: false, alpha: false }) ??
      (canvas.getContext(
        "experimental-webgl",
      ) as WebGLRenderingContext | null);
    if (!gl) return; // CSS background-color already covers this case.

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uScale = gl.getUniformLocation(program, "u_scale");
    const uBack = gl.getUniformLocation(program, "u_back");
    const uFront = gl.getUniformLocation(program, "u_front");
    const uMatrix = gl.getUniformLocation(program, "u_matrix");
    const uShape = gl.getUniformLocation(program, "u_shape");

    gl.uniform3fv(uBack, hexToRgb(colorBack));
    gl.uniform3fv(uFront, hexToRgb(colorFront));
    gl.uniform1f(uScale, scale);
    gl.uniform1i(uMatrix, MATRICES[type] ?? 1);
    gl.uniform1i(uShape, SHAPES[shape] ?? 0);

    const cellSize = Math.max(1, pxSize);
    let width = 0;
    let height = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const w = Math.max(1, Math.ceil(rect.width / cellSize));
      const h = Math.max(1, Math.ceil(rect.height / cellSize));
      if (w === width && h === height) return;
      width = w;
      height = h;
      canvas!.width = w;
      canvas!.height = h;
      gl!.viewport(0, 0, w, h);
      gl!.uniform2f(uRes, w, h);
    }

    function draw(time: number) {
      resize();
      gl!.uniform1f(uTime, time);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      draw(STATIC_FRAME);
      const observer = new ResizeObserver(() => draw(STATIC_FRAME));
      observer.observe(canvas);
      return () => observer.disconnect();
    }

    let frame = 0;
    let start = performance.now();
    let elapsed = 0;
    let running = false;

    function loop(now: number) {
      elapsed += ((now - start) / 1000) * speed;
      start = now;
      draw(elapsed);
      frame = requestAnimationFrame(loop);
    }

    function play() {
      if (running) return;
      running = true;
      start = performance.now();
      frame = requestAnimationFrame(loop);
    }

    function pause() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    }

    // Only burn frames while the hero is actually on screen and the tab is live.
    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? play() : pause()),
      { threshold: 0 },
    );
    visibility.observe(canvas);

    function onVisibilityChange() {
      if (document.hidden) pause();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    function onContextLost(event: Event) {
      event.preventDefault();
      pause();
    }
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      pause();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [shape, type, colorBack, colorFront, pxSize, speed, scale]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("absolute inset-0 block size-full", className)}
      style={{ imageRendering: "pixelated", backgroundColor: colorBack }}
    />
  );
}
