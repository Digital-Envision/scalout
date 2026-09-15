import Script from "next/script";

/**
 * Microsoft Clarity — session recordings and heatmaps.
 *
 * The vendor snippet verbatim, minus the hardcoded ID: it defines the
 * `window.clarity` queue shim and then appends the real tag, so calls made
 * before the tag loads are replayed rather than lost.
 *
 * `afterInteractive` rather than `beforeInteractive`: Clarity observes the
 * page, nothing on the page depends on it, so there is no reason to fetch it
 * ahead of our own code. An `id` is required for an inline `<Script>`.
 *
 * Whether to render this at all is decided by `CLARITY_PROJECT_ID` in
 * `src/lib/analytics.ts` — the component takes the ID it is given.
 */
export function MicrosoftClarity({ projectId }: { projectId: string }) {
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script",${JSON.stringify(projectId)});`}
    </Script>
  );
}
