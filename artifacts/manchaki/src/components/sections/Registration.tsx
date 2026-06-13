import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useCallback } from "react";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitRegistration } from "@/lib/services";
import { getUserFriendlyErrorMessage } from "@/lib/errors";

/** Kenyan phone number validation regex */
const KENYAN_PHONE_REGEX = /^(?:\+254|0)[17]\d{8}$/;

/** Kenya National ID validation (7-9 digits) */
const NATIONAL_ID_REGEX = /^\d{7,9}$/;

const schema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Full name can only contain letters, spaces, hyphens, and apostrophes"),
  nationalId: z
    .string()
    .regex(NATIONAL_ID_REGEX, "Please enter a valid National ID number (7-9 digits)"),
  phone: z
    .string()
    .regex(KENYAN_PHONE_REGEX, "Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678)"),
  email: z.string().email("Please enter a valid email address").or(z.literal("")),
  course: z.string().min(1, "Please select a course"),
  branch: z.string().min(1, "Please select a branch"),
  startDate: z.string().min(1, "Please select a preferred start date"),
  message: z.string().max(500, "Message must be under 500 characters").optional(),
});

type FormData = z.infer<typeof schema>;

export default function Registration() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      nationalId: "",
      phone: "",
      email: "",
      course: "",
      branch: "",
      startDate: "",
      message: "",
    },
  });

  const onSubmit = useCallback(async (data: FormData) => {
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const result = await submitRegistration({
        full_name: data.fullName.trim(),
        national_id: data.nationalId.trim(),
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        preferred_course: data.course,
        preferred_branch: data.branch,
        preferred_start_date: data.startDate,
        message: data.message?.trim() || null,
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
  }, []);

  return (
    <section
      id="register"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0B2447 0%, #005BBB 100%)" }}
      data-testid="section-register"
    >
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-4">
            Online Registration
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Start Your Driving Journey Today
          </h2>
          <p className="text-white/70 text-base">
            Fill out the form below and our team will contact you within 24 hours to confirm your enrollment.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Registration Received!
            </h3>
            <p className="text-white/70 text-base mb-6">
              Thank you! Our team will contact you within 24 hours to confirm your enrollment and answer any questions.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="tel:0729157111"
                className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all"
              >
                Call Us: 0729 157 111
              </a>
              <a
                href="https://wa.me/254729157111"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 sm:p-8">
            {/* Error banner */}
            {status === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-400/40 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-200 text-sm font-medium">Submission Failed</p>
                  <p className="text-red-300 text-sm mt-1">{errorMessage}</p>
                  <button
                    onClick={handleRetry}
                    className="mt-2 text-sm text-red-200 underline hover:text-red-100 transition-colors"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80 text-sm">Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Kamau"
                            autoComplete="name"
                            disabled={status === "submitting"}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                            data-testid="input-full-name"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nationalId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80 text-sm">National ID Number *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="12345678"
                            autoComplete="off"
                            disabled={status === "submitting"}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                            data-testid="input-national-id"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80 text-sm">Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="0712345678"
                            autoComplete="tel"
                            disabled={status === "submitting"}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80 text-sm">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="john@example.com"
                            autoComplete="email"
                            disabled={status === "submitting"}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent"
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80 text-sm">Preferred Course *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={status === "submitting"}>
                          <FormControl>
                            <SelectTrigger
                              className="bg-white/10 border-white/20 text-white"
                              data-testid="select-course"
                            >
                              <SelectValue placeholder="Select a course" className="text-white/40" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="motorcycle-theory">Motorcycle Theory (KES 3,000)</SelectItem>
                            <SelectItem value="unlicensed-theory">Unlicensed Drivers Theory (KES 7,000)</SelectItem>
                            <SelectItem value="half-course">Half Course — 20 Lessons (KES 11,000)</SelectItem>
                            <SelectItem value="full-course">Full Course — 30 Lessons (KES 15,000)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80 text-sm">Preferred Branch *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={status === "submitting"}>
                          <FormControl>
                            <SelectTrigger
                              className="bg-white/10 border-white/20 text-white"
                              data-testid="select-branch"
                            >
                              <SelectValue placeholder="Select a branch" className="text-white/40" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="muguga">Muguga Branch — Garissa Road</SelectItem>
                            <SelectItem value="thika">Thika Branch — Neema Plaza, Room 41</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-300" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80 text-sm">Preferred Start Date *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          disabled={status === "submitting"}
                          className="bg-white/10 border-white/20 text-white focus:border-accent"
                          data-testid="input-start-date"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80 text-sm">Message / Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Any questions or special requirements..."
                          rows={3}
                          disabled={status === "submitting"}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-accent resize-none"
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-accent-foreground font-bold text-base hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  data-testid="btn-submit-registration"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Enrollment"
                  )}
                </button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </section>
  );
}