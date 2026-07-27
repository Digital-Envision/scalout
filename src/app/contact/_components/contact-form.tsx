"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  "Australia",
  "Canada",
  "China",
  "France",
  "Germany",
  "India",
  "Indonesia",
  "Japan",
  "Netherlands",
  "Singapore",
  "United Kingdom",
  "United States",
  "Other",
] as const;

type FormValues = {
  fullName: string;
  workEmail: string;
  companyName: string;
  country: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  fullName: "",
  workEmail: "",
  companyName: "",
  country: "",
  message: "",
};

const fieldClasses =
  "w-full rounded-md border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/25 aria-[invalid=true]:border-destructive";

const labelClasses = "block text-sm font-semibold text-foreground";

function RequiredMark() {
  return <span className="text-[#c8102e]"> *</span>;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function validate(v: FormValues): FieldErrors {
    const next: FieldErrors = {};
    if (!v.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!v.workEmail.trim()) {
      next.workEmail = "Please enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.workEmail.trim())) {
      next.workEmail = "Please enter a valid email address.";
    }
    if (!v.companyName.trim())
      next.companyName = "Please enter your company name.";
    if (!v.country) next.country = "Please select a country.";
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO: wire to backend (send the enquiry to an email/CRM endpoint).
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-xl border border-border bg-secondary/50 p-8">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
          <CheckCircle2 className="size-6" />
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Thank you — your enquiry is on its way.
        </h2>
        <p className="max-w-prose text-muted-foreground">
          We have received your details and a member of the ScaleOut team will be
          in touch shortly with a tailored response. In the meantime, feel free to
          reach us directly at{" "}
          <a
            href="mailto:hello@scaleout.sg"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            hello@scaleout.sg
          </a>
          .
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-2"
          onClick={() => {
            setValues(INITIAL_VALUES);
            setErrors({});
            setSubmitted(false);
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="fullName" className={labelClasses}>
            Full Name
            <RequiredMark />
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Jane Smith"
            autoComplete="name"
            value={values.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            onChange={(e) => update("fullName", e.target.value)}
            className={fieldClasses}
          />
          {errors.fullName ? (
            <p id="fullName-error" className="text-xs text-destructive">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="workEmail" className={labelClasses}>
            Work Email
            <RequiredMark />
          </label>
          <input
            id="workEmail"
            name="workEmail"
            type="email"
            placeholder="jane@company.com"
            autoComplete="email"
            value={values.workEmail}
            aria-invalid={Boolean(errors.workEmail)}
            aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
            onChange={(e) => update("workEmail", e.target.value)}
            className={fieldClasses}
          />
          {errors.workEmail ? (
            <p id="workEmail-error" className="text-xs text-destructive">
              {errors.workEmail}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="companyName" className={labelClasses}>
          Company Name
          <RequiredMark />
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          placeholder="Acme Pte Ltd"
          autoComplete="organization"
          value={values.companyName}
          aria-invalid={Boolean(errors.companyName)}
          aria-describedby={errors.companyName ? "companyName-error" : undefined}
          onChange={(e) => update("companyName", e.target.value)}
          className={fieldClasses}
        />
        {errors.companyName ? (
          <p id="companyName-error" className="text-xs text-destructive">
            {errors.companyName}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="country" className={labelClasses}>
          Country
          <RequiredMark />
        </label>
        <select
          id="country"
          name="country"
          value={values.country}
          aria-invalid={Boolean(errors.country)}
          aria-describedby={errors.country ? "country-error" : undefined}
          onChange={(e) => update("country", e.target.value)}
          className={cn(
            fieldClasses,
            !values.country && "text-muted-foreground",
          )}
        >
          <option value="" disabled>
            Select a country
          </option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country} className="text-foreground">
              {country}
            </option>
          ))}
        </select>
        {errors.country ? (
          <p id="country-error" className="text-xs text-destructive">
            {errors.country}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={labelClasses}>
          Message
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            (optional)
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your team requirements, the roles you are looking to hire, and any considerations."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(fieldClasses, "min-h-[100px] resize-y")}
        />
      </div>

      <Button type="submit" className="mt-1 h-10 w-full rounded-md text-sm">
        Send Enquiry
        <ArrowRight className="size-4" />
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Fields marked <span className="text-[#c8102e]">*</span> are required.
        Country is required to help us understand which market you are expanding
        from.
      </p>
    </form>
  );
}
