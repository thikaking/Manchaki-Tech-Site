import { ClipboardList, BookOpen, Target, BadgeCheck } from "lucide-react";

function SteeringIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="3"/>
      <line x1="12" y1="2" x2="12" y2="9"/>
      <line x1="4.22" y1="4.22" x2="7.76" y2="7.76"/>
      <line x1="2" y1="12" x2="9" y2="12"/>
    </svg>
  );
}

const STEPS = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Registration",
    desc: "Complete your enrollment form online or visit our Muguga or Thika branch. Submit your National ID and passport photos to get started.",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Theory Lessons",
    desc: "Learn traffic rules, road signs, the Highway Code, and all NTSA requirements in engaging classroom and digital theory sessions.",
  },
  {
    icon: SteeringIcon,
    number: "03",
    title: "Practical Driving Lessons",
    desc: "Hands-on training with certified instructors on real Kenyan roads. Build confidence through progressive lessons tailored to your pace.",
  },
  {
    icon: Target,
    number: "04",
    title: "NTSA Test Preparation",
    desc: "Mock driving tests, exam rehearsals, and one-on-one coaching to ensure you walk into your NTSA test fully confident and ready.",
  },
  {
    icon: BadgeCheck,
    number: "05",
    title: "Licensing",
    desc: "Our team guides you through NTSA test booking and all paperwork. Receive your official driving licence and join our community of graduates.",
  },
];

export default function TrainingProcess() {
  return (
    <section id="process" className="py-20 bg-muted/30" data-testid="section-training-process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Your Path to Licensing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From registration to your first solo drive — our structured 5-step process takes you from beginner to licensed driver.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid lg:grid-cols-5 gap-6">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center group"
                data-testid={`step-${i + 1}`}
              >
                {/* Icon circle */}
                <div className="relative mb-5 z-10">
                  <div className="w-16 h-16 rounded-full bg-background border-2 border-border group-hover:border-primary transition-colors flex items-center justify-center shadow-md">
                    <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="bg-card border border-border rounded-2xl p-4 w-full hover:shadow-md transition-shadow">
                  <div className="text-xs font-bold text-accent mb-1">{step.number}</div>
                  <h3
                    className="text-base font-bold text-foreground mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="lg:hidden my-2 text-muted-foreground/40 text-xl">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              const el = document.querySelector("#register");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white font-bold text-base hover:bg-primary/90 active:scale-95 transition-all shadow-md"
            data-testid="btn-enroll-process"
          >
            Begin Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
