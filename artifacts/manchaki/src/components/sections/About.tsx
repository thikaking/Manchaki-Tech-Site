import { Target, Eye, Heart } from "lucide-react";

const VALUES = [
  { icon: "🛡", label: "Safety First" },
  { icon: "⭐", label: "Excellence" },
  { icon: "✊", label: "Integrity" },
  { icon: "🤝", label: "Accessibility" },
  { icon: "💡", label: "Innovation" },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            About Us
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Who We Are
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Manchaki Technical Training Institute has been shaping Kenya's responsible drivers since 2025, delivering world-class driver training from two strategic locations.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          {/* Mission / Vision / Values */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Our Mission
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To provide safe, professional, and affordable driver training that empowers Kenyans to drive responsibly and contributes to a safer road environment for everyone.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Our Vision
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be Kenya's most trusted driving school recognized nationally for excellence, road safety, and student success — where every graduate becomes a confident, responsible driver.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Our Core Values
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {VALUES.map((v) => (
                  <span
                    key={v.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {v.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
