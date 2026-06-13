import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How do I register?",
    a: "You can register online by filling out our enrollment form on this website — just click 'Enroll Now'. Alternatively, visit any of our two branches in Muguga (along Garissa Road) or Thika (Neema Plaza, 3rd Floor, Room 41) with your National ID and passport photos.",
  },
  {
    q: "What documents are required?",
    a: "You will need your original National ID (plus a photocopy), 2 recent passport-size photos, and payment for your selected course. For PDL (Provisional Driving Licence) application, NTSA may also require a police clearance — our team will guide you through this.",
  },
  {
    q: "How long does training take?",
    a: "A standard Full Course (30 lessons) typically takes 4 to 8 weeks depending on your schedule and lesson frequency. Our flexible morning, afternoon, and weekend sessions let you learn at a pace that suits you.",
  },
  {
    q: "What are the fees?",
    a: "Theory for motorcycles costs KES 3,000. Unlicensed Drivers Theory is KES 7,000. Half Course (20 lessons) is KES 11,000, and our recommended Full Course (30 lessons) is KES 15,000. NTSA government charges are additional: PDL KES 650, Test Booking KES 1,050, Interim Licence KES 750.",
  },
  {
    q: "How do I book my NTSA driving test?",
    a: "After completing your practical lessons, our team will guide you through the NTSA online test booking process via the NTSA portal. We also prepare you with mock tests so you walk in confident. We handle all guidance — you just need to pass!",
  },
  {
    q: "Do you offer motorcycle training?",
    a: "Yes! We offer three motorcycle categories: Category A1 for new riders (theory from KES 3,000), Category A2 for advanced motorcycle riders, and Category A3 for Tuk-Tuk operators. All motorcycle training is fully NTSA-approved.",
  },
  {
    q: "Do you offer automatic vehicle training?",
    a: "Absolutely. Category B2 covers automatic transmission light vehicles. This is an excellent choice for beginners or anyone who prefers the comfort and ease of automatic cars. We train on modern, well-maintained automatic vehicles.",
  },
  {
    q: "Which branch should I choose?",
    a: "Choose our Muguga Branch if you are in the greater Nairobi or Kiambu area — we are located along Garissa Road, Muguga Town. Choose our Thika Branch if you are in Thika or surrounding areas — we are at Neema Plaza, 3rd Floor, Room 41, Thika Town. Both branches offer the same quality of training.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="faq" className="py-20 bg-muted/30" data-testid="section-faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            FAQs
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about training at Manchaki.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`bg-card border rounded-2xl overflow-hidden transition-all ${
                open === i ? "border-primary/40 shadow-md" : "border-border"
              }`}
              data-testid={`faq-item-${i}`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                onClick={() => toggle(i)}
                data-testid={`faq-toggle-${i}`}
              >
                <span
                  className="font-semibold text-foreground text-sm leading-snug"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <div className="h-px bg-border mb-4" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm mb-3">Still have questions?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="tel:0729157111"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all"
              data-testid="link-call-faq"
            >
              Call 0729 157 111
            </a>
            <a
              href="https://wa.me/254729157111"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-all"
              data-testid="link-whatsapp-faq"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
