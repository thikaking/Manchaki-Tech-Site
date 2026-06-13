import { Phone, Mail, Globe, MapPin, Facebook, Instagram, Youtube, Shield } from "lucide-react";
import logo from "@assets/Screenshot_2026-06-11_135143_1781359008561.png";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Driving Courses", href: "#courses" },
  { label: "Fees", href: "#fees" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Register", href: "#register" },
  { label: "Contact", href: "#contact" },
];

const COURSES_LINKS = [
  "Category A1 — New Rider",
  "Category A2 — Motorcycle",
  "Category A3 — Tuk Tuk",
  "Category B1 — Light Vehicle Manual",
  "Category B2 — Light Vehicle Auto",
  "Category C1 — Light Truck",
  "Category D1 — Van",
  "Category D2/D3 — Bus & Minibus",
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-secondary text-white" data-testid="footer">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={logo}
                alt="Manchaki Technical Training Institute Logo"
                className="w-14 h-14 rounded-full object-cover shadow-lg ring-2 ring-accent/40"
              />
              <div className="leading-tight">
                <div className="font-extrabold text-white text-xl tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Manchaki
                </div>
                <div className="text-[10px] text-accent font-bold tracking-wide uppercase leading-tight">
                  Technical Training Institute
                </div>
                <div className="text-[10px] text-accent/80 font-semibold tracking-wide uppercase leading-tight">
                  &amp; Driving School
                </div>
              </div>
            </div>
            {/* Tagline */}
            <p className="text-accent font-semibold text-sm italic mb-3">
              "Awaken Your Brilliance."
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Kenya's trusted NTSA-approved driving school — empowering confident, responsible drivers from our branches in Muguga and Thika.
            </p>
            {/* NTSA badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/15">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-white/80">NTSA Approved Driving School</span>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-5">
              {[
                { Icon: Facebook, label: "Facebook", href: "#" },
                { Icon: Instagram, label: "Instagram", href: "#" },
                { Icon: Youtube, label: "YouTube", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                  data-testid={`link-social-${label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4 text-white/80" />
                </a>
              ))}
              <a
                href="https://wa.me/254729157111"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-green-500/30 hover:bg-green-500/50 transition-colors flex items-center justify-center"
                data-testid="link-social-whatsapp"
              >
                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-base font-bold text-white mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-white/60 hover:text-accent transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4
              className="text-base font-bold text-white mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Driving Categories
            </h4>
            <ul className="space-y-2">
              {COURSES_LINKS.map((course) => (
                <li key={course}>
                  <button
                    onClick={() => scrollTo("#courses")}
                    className="text-sm text-white/60 hover:text-accent transition-colors text-left"
                  >
                    {course}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-base font-bold text-white mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-white/60">
                  <div className="font-medium text-white/80 mb-0.5">Muguga Branch</div>
                  Muguga Town, Garissa Road
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-white/60">
                  <div className="font-medium text-white/80 mb-0.5">Thika Branch</div>
                  Neema Plaza, 3rd Floor, Room 41
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <div className="text-sm text-white/60">
                  <a href="tel:0729157111" className="hover:text-accent transition-colors block">0729 157 111</a>
                  <a href="tel:0729088455" className="hover:text-accent transition-colors block">0729 088 455</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="mailto:info@manchaki.ac.ke" className="text-sm text-white/60 hover:text-accent transition-colors">
                  info@manchaki.ac.ke
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="https://www.manchaki.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-accent transition-colors">
                  www.manchaki.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            &copy; 2025 Manchaki Technical Training Institute and Driving School. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <Shield className="w-3.5 h-3.5 text-accent" />
            NTSA Approved Driving School — Kenya
          </div>
        </div>
      </div>
    </footer>
  );
}
