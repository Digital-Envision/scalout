import type { Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/site-kit";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your company and what you are looking to build. Every Scalout engagement is scoped to your requirements, so there is no fixed pricing.",
};

const INFO_BLOCKS = [
  { label: "Email", value: "hello@scalout.com", href: "mailto:hello@scalout.com" },
  { label: "Hours", value: "Mon to Fri, timezone-aligned with your team" },
  { label: "Operations", value: "Indonesia" },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Start the conversation."
        lede="Tell us about your company and what you want to build. Every engagement is scoped to your requirements."
      />

      <section className="bg-background">
        <div className="container-page grid gap-14 py-20 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
          <div className="flex flex-col gap-8">
            <figure className="relative h-[180px] overflow-hidden rounded-[4px] border border-rule">
              <Image
                src="/assets/landing/contact-team.jpg"
                alt="A Scalout team member on a client call"
                fill
                sizes="(min-width: 1024px) 352px, 100vw"
                className="object-cover"
                style={{ objectPosition: "center 71%" }}
              />
            </figure>

            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Our primary operations are based in Indonesia. Whether you manage a
              regional team from Asia-Pacific, Europe, or North America, we are
              set up to work with you.
            </p>

            <dl className="border-t border-rule">
              {INFO_BLOCKS.map((block) => (
                <div
                  key={block.label}
                  className="flex items-baseline justify-between gap-6 border-b border-rule py-3.5"
                >
                  <dt className="data-label text-muted-foreground">
                    {block.label}
                  </dt>
                  <dd className="text-right text-sm text-foreground">
                    {"href" in block && block.href ? (
                      <a
                        href={block.href}
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {block.value}
                      </a>
                    ) : (
                      block.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="texture-dither rounded-[4px] border border-primary/20 bg-accent p-6">
              <p className="text-[13px] font-bold text-foreground">
                Custom pricing only
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We do not publish fixed rates. Pricing depends on team size, role
                mix, and the scope of services required. Talk to us for a
                tailored proposal.
              </p>
            </div>
          </div>

          <div className="rounded-[4px] border border-rule bg-card p-8 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
