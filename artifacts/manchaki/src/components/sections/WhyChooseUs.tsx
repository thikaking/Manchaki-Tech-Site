import { ShieldCheck, Users, Car, Route, Clock, DollarSign, AlertTriangle, UserCheck, HeartHandshake } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "NTSA Approved",
    desc: "Fully licensed and certified by Kenya's National Transport and Safety Authority. Every certificate we issue is government recognized.",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Experienced Instructors",
    desc: "Our instructors average 10+ years of professional teaching experience, with patience and expertise to guide all learner levels.",
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    icon: Car,
    title: "Modern Training Vehicles",
    desc: "Train in late-model, well-maintained vehicles including both manual and automatic transmission cars, motorcycles, and commercial vehicles.",
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-500/10",
  },
  {
    icon: Route,
    title: "Practical Training",
    desc: "Real road experience from day one. We train on actual Kenyan roads so you're fully prepared for every driving situation you'll encounter.",
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-500/10",
  },
  {
    icon: Clock,
    title: "Flexible Schedules",
    desc: "We offer morning, afternoon, and weekend sessions. Our flexible timetable makes it easy to fit lessons around your work or school schedule.",
    color: "text-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
  },
  {
    icon: DollarSign,
    title: "Affordable Fees",
    desc: "Transparent, competitive pricing with absolutely no hidden costs. We believe quality driver education should be accessible to every Kenyan.",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    icon: AlertTriangle,
    title: "Road Safety Focus",
    desc: "Defensive driving and NTSA road safety standards are at the core of everything we teach. We produce drivers who protect lives.",
    color: "text-red-600",
    bg: "bg-red-50 dark:bg-red-500/10",
  },
  {
    icon: UserCheck,
    title: "Personalized Instruction",
    desc: "Small class sizes and one-on-one practical sessions ensure every student receives the attention and guidance they need to succeed.",
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
  },
  {
    icon: HeartHandshake,
    title: "Student Support",
    desc: "We guide you from registration through licensing — including NTSA test booking, documentation support, and career guidance for professional drivers.",
    color: "text-pink-600",
    bg: "bg-pink-50 dark:bg-pink-500/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-20 bg-background" data-testid="section-why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-foreground dark:text-accent text-sm font-semibold mb-4">
            Why Manchaki
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Why Choose Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From NTSA certification to modern vehicles and flexible scheduling — here is why hundreds of Kenyan drivers chose Manchaki.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              data-testid={`card-feature-${i}`}
            >
              <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>
              <h3
                className="text-base font-bold text-foreground mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
