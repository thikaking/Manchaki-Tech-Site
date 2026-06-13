import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle, Star, Users, Award, MapPin } from "lucide-react";
import heroBg from "@assets/Background_1781359326202.jpeg";

const STATS = [
  { label: "Students Trained", value: 500, suffix: "+" },
  { label: "Months Experience", value: 12, suffix: "+" },
  { label: "Branches", value: 2, suffix: "" },
  { label: "Pass Rate", value: 98, suffix: "%" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      data-testid="section-hero"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-primary/80 to-primary/70" />
      {/* Subtle dot pattern on top */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* NTSA Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span className="text-white/90 text-sm font-medium">NTSA Approved Driving School</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              data-testid="text-hero-headline"
            >
              Kenya&apos;s Trusted{" "}
              <span className="text-accent">NTSA Approved</span>{" "}
              Driving School
            </h1>

            {/* Tagline */}
            <p
              className="text-xl sm:text-2xl text-accent font-bold italic mb-6 tracking-wide"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Awaken Your Brilliance.
            </p>

            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
              Gain practical driving skills and professional driver training from experienced instructors committed to your success and road safety.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-3 mb-8">
              {["NTSA Certified", "Experienced Instructors", "Modern Vehicles", "Flexible Schedule"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-white/80">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                  {item}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#register")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-accent text-accent-foreground font-bold text-base hover:brightness-110 active:scale-95 transition-all shadow-lg"
                data-testid="btn-enroll-hero"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-base hover:bg-white/20 active:scale-95 transition-all"
                data-testid="btn-contact-hero"
              >
                Contact Us
              </button>
            </div>

            {/* Branch locations */}
            <div className="mt-8 flex flex-wrap gap-4">
              {["Muguga, Garissa Road", "Thika, Neema Plaza"].map((loc) => (
                <div key={loc} className="flex items-center gap-1.5 text-sm text-white/70">
                  <MapPin className="w-4 h-4 text-accent" />
                  {loc}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats card */}
          <div className="flex flex-col gap-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-colors"
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div
                    className="text-3xl sm:text-4xl font-extrabold text-white mb-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Featured badge card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-1">Government Approved</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Fully licensed and certified by the National Transport and Safety Authority (NTSA). Your training meets all Kenyan road standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-white/30 flex items-center justify-center"
                  >
                    <Users className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">500+ Happy Graduates</div>
                <div className="text-white/60 text-xs">From Muguga & Thika branches</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}
