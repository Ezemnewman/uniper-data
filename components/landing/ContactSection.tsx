"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";
import { contactSchema, type ContactSchema } from "@/lib/validations/contact";

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactSchema) {
    // Simulate a network call to the enquiries endpoint.
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log("Contact form submission:", values);
    setIsSubmitted(true);
    reset();
  }

  return (
    <section id="contact" className="container-page py-xl">
      <div className="text-center mb-lg">
        <h2 className="text-headline-lg-mobile md:text-headline-lg text-on-surface mb-sm">
          Talk to Our Team
        </h2>
        <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
          Tell us about your data infrastructure needs and we&apos;ll follow up within one business
          day.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm">
        {isSubmitted ? (
          <div className="flex flex-col items-center text-center gap-sm py-lg">
            <CheckCircle2 className="text-success" size={40} aria-hidden="true" />
            <h3 className="text-title-md text-on-surface">Message sent</h3>
            <p className="text-body-sm text-on-surface-variant">
              Thanks for reaching out. A member of our enterprise team will be in touch shortly.
            </p>
            <Button variant="secondary" size="sm" onClick={() => setIsSubmitted(false)}>
              Send another message
            </Button>
          </div>
        ) : (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-md" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Jane Doe" hasError={!!errors.name} {...register("name")} />
              <FormError message={errors.name?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-email">Email address</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="jane@company.com"
                hasError={!!errors.email}
                {...register("email")}
              />
              <FormError message={errors.email?.message} />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Acme Corporation" hasError={!!errors.company} {...register("company")} />
              <FormError message={errors.company?.message} />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us about your data needs..."
                className="flex w-full rounded-lg border border-outline-variant bg-surface-bright px-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                {...register("message")}
              />
              <FormError message={errors.message?.message} />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                {!isSubmitting && <Send size={18} />}
                Send message
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
