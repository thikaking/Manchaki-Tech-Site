import { Shield, Navigation, MapPin, BookOpen, Heart, Award } from "lucide-react";

const PILLARS = [
  {
    icon: Shield,
    title: "Defensive Driving",
    desc: "We train students to anticipate hazards, maintain safe following distances, and make smart decisions before incidents occur.",
  },
  {
    icon: Navigation,
    title: "Highway Safety",
    desc: "High-speed road protocols, overtaking safely, lane discipline, and understanding motorway rules for confident long-distance driving.",
  },
  {
    icon: MapPin,
    title: "Urban Driving Skills",
    desc: "Navigating busy city traffic, roundabouts, junctions, and pedestrian zones — the real-world skills Kenyan drivers need daily.",
  },
  {
    icon: BookOpen,
    title: "Traffic Rule Compliance",
    desc: "In-depth knowledge of Kenya's Highway Code, road signs, speed limits, and NTSA regulations for legal, responsible driving.",
  },
  {
    icon: Heart,
    title: "Responsible Driving Habits",
    desc: "We instill lifelong habits: no drunk driving, no distracted driving, seatbelt compliance, and respect for all road users.",
  },
  {
    icon: Award,
    title: "NTSA Standards",
    desc: "All training strictly follows NTSA guidelines and standards, ensuring every Manchaki graduate exceeds the national competency benchmark.",
  },
];

export default function RoadSafety() {
  return (
    <section id="safety" className="py-20 relative overflow-hidden" data-testid="section-road-safety"
      style={{ background: "linear-gradient(135deg, #0B2447 0%, #005BBB 100%)" }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-semibold mb-4">
            Road Safety
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Our Road Safety Commitment
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium italic">
            "We don't just teach you to drive. We teach you to drive safely."
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {PILLARS.map((p, i) => (
            <div
              key={i}
              className="group bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 hover:bg-white/15 transition-all duration-300"
              data-testid={`card-safety-${i}`}
            >
              <div className="w-11 h-11 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <p.icon className="w-5 h-5 text-accent" />
              </div>
              <h3
                className="text-base font-bold text-white mb-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {p.title}
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3
              className="text-lg font-bold text-white mb-1"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Kenya Roads Deserve Safer Drivers
            </h3>
            <p className="text-white/70 text-sm">
              Join thousands of responsible drivers trained by Manchaki.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.querySelector("#register");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-shrink-0 px-7 py-3 rounded-xl bg-accent text-accent-foreground font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
            data-testid="btn-enroll-safety"
          >
            Start Training Today
          </button>
        </div>
      </div>
    </section>
  );
}
