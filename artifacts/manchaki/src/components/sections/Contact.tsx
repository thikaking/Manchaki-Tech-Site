import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useCallback } from "react";
import { Phone, Mail, Globe, MapPin, ExternalLink, CheckCircle, Loader2, AlertCircle, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage } from "@/lib/services";
import { getUserFriendlyErrorMessage } from "@/lib/errors";

/** Kenyan phone number validation regex (optional) */
const KENYAN_PHONE_REGEX = /^(?:\+254|0)[17]\d{8}$/;

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(KENYAN_PHONE_REGEX, "Please enter a valid Kenyan phone number (e.g., 0712345678)")
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = useCallback(async (data: ContactFormData) => {
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const result = await submitContactMessage({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || null,
        message: data.message.trim(),
      });

      if (result) {
        setStatus("success");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(getUserFriendlyErrorMessage(error));
    }
  }, [status]);

  const handleRetry = useCallback(() => {
    setStatus("idle");
    setErrorMessage("");
    form.reset();
  }, [form]);

  if (status === "success") {
    return (
      <div className="bg-green-500/10 border border-green-400/30 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Message Sent Successfully!</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Thank you for reaching out! We will get back to you within 24 hours.
        </p>
        <button
          onClick={handleRetry}
          className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      {/* Error banner */}
      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-400/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-600 text-sm font-medium">Failed to Send Message</p>
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            <button
              onClick={handleRetry}
              className="mt-2 text-sm text-red-600 underline hover:text-red-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 text-sm">Your Name *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Kamau"
                    autoComplete="name"
                    disabled={status === "submitting"}
                    className="bg-background"
                    data-testid="contact-input-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john@example.com"
                      autoComplete="email"
                      disabled={status === "submitting"}
                      className="bg-background"
                      data-testid="contact-input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 text-sm">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="0712345678"
                      autoComplete="tel"
                      disabled={status === "submitting"}
                      className="bg-background"
                      data-testid="contact-input-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 text-sm">Your Message *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tell us how we can help you..."
                    rows={4}
                    disabled={status === "submitting"}
                    className="bg-background resize-none"
                    data-testid="contact-textarea-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-bold text-base hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            data-testid="contact-btn-submit"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </form>
      </Form>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-background" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Find Us
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Our Branches
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Visit us at either of our two branches — both fully equipped with modern training facilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Muguga Branch */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow" data-testid="card-muguga-branch">
            <div className="h-56 w-full overflow-hidden bg-muted/30">
              <iframe
                title="Muguga Branch Location"
                src="https://maps.google.com/maps?q=Muguga+Along+Thika+Garissa+Road+Kenya&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Branch 1</span>
              </div>
              <h3
                className="text-xl font-bold text-foreground mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Muguga Branch
              </h3>
              <div className="space-y-2 mb-5">
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Muguga Town, Along Thika–Garissa Road, Kiambu County</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="tel:0729157111" className="hover:text-primary transition-colors font-medium" data-testid="link-muguga-phone">
                    0729 157 111
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="mailto:info@manchaki.ac.ke" className="hover:text-primary transition-colors" data-testid="link-email">
                    info@manchaki.ac.ke
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://maps.google.com/maps?q=Muguga+Along+Thika+Garissa+Road+Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all"
                  data-testid="btn-directions-muguga"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
                <a
                  href="https://maps.google.com/maps?q=Muguga+Along+Thika+Garissa+Road+Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary hover:text-primary transition-all"
                  data-testid="btn-open-maps-muguga"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Maps
                </a>
              </div>
            </div>
          </div>

          {/* Thika Branch */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow" data-testid="card-thika-branch">
            <div className="h-56 w-full overflow-hidden bg-muted/30">
              <iframe
                title="Thika Branch Location"
                src="https://maps.google.com/maps?q=-1.039972,37.072111&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Branch 2</span>
              </div>
              <h3
                className="text-xl font-bold text-foreground mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Thika Branch
              </h3>
              <div className="space-y-2 mb-5">
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Neema Plaza, 3rd Floor, Room 41, Thika Town</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="tel:0729088455" className="hover:text-primary transition-colors font-medium" data-testid="link-thika-phone">
                    0729 088 455
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="mailto:info@manchaki.ac.ke" className="hover:text-primary transition-colors">
                    info@manchaki.ac.ke
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://maps.google.com/maps?q=-1.039972,37.072111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all"
                  data-testid="btn-directions-thika"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
                <a
                  href="https://maps.google.com/maps?q=-1.039972,37.072111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-primary hover:text-primary transition-all"
                  data-testid="btn-open-maps-thika"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              Get In Touch
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Send Us a Message
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Have a question about our courses, fees, or enrollment process? We are here to help!
            </p>
          </div>
          <ContactForm />
        </div>

        {/* General contact strip */}
        <div
          className="rounded-2xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, #0B2447 0%, #005BBB 100%)" }}
        >
          <div>
            <h3
              className="text-xl font-bold text-white mb-1"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Get In Touch
            </h3>
            <p className="text-white/70 text-sm">We are available Monday – Saturday, 7:00 AM – 6:00 PM</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:0729157111"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all"
              data-testid="link-phone-contact"
            >
              <Phone className="w-4 h-4" />
              0729 157 111
            </a>
            <a
              href="mailto:info@manchaki.ac.ke"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all"
              data-testid="link-email-contact"
            >
              <Mail className="w-4 h-4" />
              info@manchaki.ac.ke
            </a>
            <a
              href="https://www.manchaki.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all"
              data-testid="link-website-contact"
            >
              <Globe className="w-4 h-4" />
              www.manchaki.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}