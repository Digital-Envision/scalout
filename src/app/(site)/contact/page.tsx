import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your company and what you are looking to build. Every Scalout engagement is scoped to your specific requirements — there is no fixed pricing, only the right solution for you.",
};

const INFO_BLOCKS = [
  {
    label: "Email",
    value: "hello@scalout.com",
  },
  {
    label: "Response Time",
    value: "Mon – Fri · Timezone-aligned with your team",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      {/* PageHero — node 2:2827 */}
      <section className="border-b border-border bg-secondary/50">
        <div className="container-page py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            Contact Us
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Start the conversation.
          </h1>
          <p className="mt-5 max-w-[672px] text-lg leading-relaxed text-muted-foreground">
            Tell us about your company and what you are looking to build. Every
            Scalout engagement is scoped to your specific requirements — there is
            no fixed pricing, only the right solution for you.
          </p>
        </div>
      </section>

      {/* Contact details + form — node 2:2841 */}
      <section className="bg-background">
        <div className="container-page py-20">
          <div className="grid gap-14 lg:grid-cols-[376px_minmax(0,1fr)]">
            {/* Left: contact information */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                  Indonesia Operations
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Our primary operations are based in Indonesia. Whether you are
                  managing a regional team from Asia-Pacific, Europe, or North
                  America, we are set up to work with you.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {INFO_BLOCKS.map((block) => (
                  <div key={block.label}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      {block.label}
                    </p>
                    <p className="mt-1 text-sm text-foreground">{block.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-secondary/60 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                  Custom Pricing Only
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We do not publish fixed rates. Pricing is determined by team
                  size, role mix, and scope of services required. Talk to our team
                  to receive a tailored proposal.
                </p>
              </div>
            </div>

            {/* Right: enquiry form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
