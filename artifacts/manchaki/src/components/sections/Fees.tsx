import { CheckCircle, ArrowRight } from "lucide-react";

const TRAINING_FEES = [
  { name: "Motorcycle Theory", price: "KES 3,000", popular: false, desc: "Theory for Category A1/A2/A3" },
  { name: "Unlicensed Drivers Theory", price: "KES 7,000", popular: false, desc: "Required theory for new car drivers" },
  { name: "Half Course (20 Lessons)", price: "KES 11,000", popular: false, desc: "20 practical driving sessions" },
  { name: "Full Course (30 Lessons)", price: "KES 15,000", popular: true, desc: "30 lessons — best value, recommended" },
];

const NTSA_FEES = [
  { name: "PDL (Provisional Driving Licence)", price: "KES 650" },
  { name: "NTSA Test Booking", price: "KES 1,050" },
  { name: "Interim Driving Licence", price: "KES 750" },
];

const INCLUDES = [
  "Certified NTSA-approved instruction",
  "Modern training vehicles",
  "Theory learning materials",
  "Mock test preparation",
  "NTSA test booking guidance",
  "Certificate of completion",
];

export default function Fees() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="fees" className="py-20 bg-background" data-testid="section-fees">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-foreground dark:text-accent text-sm font-semibold mb-4">
            Transparent Pricing
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Our Fees
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Affordable, transparent pricing with no hidden charges. Invest in your future today.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Training fees */}
          <div className="lg:col-span-2">
            <h3
              className="text-xl font-bold text-foreground mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Training Fees
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {TRAINING_FEES.map((fee) => (
                <div
                  key={fee.name}
                  className={`relative rounded-2xl border p-5 flex flex-col hover:shadow-md transition-all ${
                    fee.popular
                      ? "border-accent bg-gradient-to-br from-accent/5 to-primary/5 shadow-sm"
                      : "border-border bg-card"
                  }`}
                  data-testid={`card-fee-${fee.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {fee.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold shadow">
                      Best Value
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mb-1">{fee.desc}</p>
                  <h4
                    className="font-bold text-foreground text-base mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {fee.name}
                  </h4>
                  <div
                    className="text-3xl font-extrabold text-primary mt-auto"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {fee.price}
                  </div>
                </div>
              ))}
            </div>

            {/* NTSA charges */}
            <div className="mt-8">
              <h3
                className="text-xl font-bold text-foreground mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                NTSA Government Charges
                <span className="ml-2 text-sm font-normal text-muted-foreground">(Paid separately to NTSA)</span>
              </h3>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                {NTSA_FEES.map((fee, i) => (
                  <div
                    key={fee.name}
                    className={`flex items-center justify-between px-5 py-4 ${
                      i < NTSA_FEES.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="text-foreground/80 text-sm">{fee.name}</span>
                    <span className="font-bold text-foreground">{fee.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What's included */}
          <div>
            <h3
              className="text-xl font-bold text-foreground mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              What&apos;s Included
            </h3>
            <div className="bg-card border border-border rounded-2xl p-6 mb-6">
              <ul className="space-y-3">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: "linear-gradient(135deg, #0B2447 0%, #005BBB 100%)" }}
            >
              <h4
                className="text-lg font-bold mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Ready to Start?
              </h4>
              <p className="text-white/80 text-sm mb-4">
                Enroll today and take the first step toward your driving licence.
              </p>
              <button
                onClick={() => scrollTo("#register")}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:brightness-110 transition-all"
                data-testid="btn-enroll-fees"
              >
                Enroll Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
