import { useState } from "react";
import { ChevronRight, Search, X } from "lucide-react";

import motoImg from "@assets/Motorbike_1781357586076.png";
import tukTukImg from "@assets/Tuk_Tuk_1781357586077.png";
import swiftImg from "@assets/Light_Vehicle_Manual_1781357586072.png";
import axioImg from "@assets/Light_Weight_Automatic_1781357586073.png";
import lightTruckImg from "@assets/Light_Truck_1781357586070.png";
import medTruckImg from "@assets/Medium_Track_1781357586074.png";
import vanImg from "@assets/Category_D_1781357586069.png";
import minibusImg from "@assets/Minibus_1781357586075.png";
import busImg from "@assets/Bus_1781357586067.png";

const CATEGORIES = [
  {
    code: "A1",
    name: "New Rider",
    type: "Motorcycles",
    image: motoImg,
    keywords: "motorcycle motorbike rider beginner a1 ntsa",
    desc: "Perfect for complete beginners. Learn basic motorcycle operation, balance, safety gear, and fundamental road rules from the ground up.",
    outcomes: ["Basic motorcycle controls", "Balance and coordination", "Road safety fundamentals", "NTSA requirements"],
  },
  {
    code: "A2",
    name: "Motorcycle Rider",
    type: "Motorcycles",
    image: motoImg,
    keywords: "motorcycle motorbike advanced rider a2 highway",
    desc: "Advanced motorcycle handling for riders looking to upgrade their skills. Covers highway riding, defensive techniques, and emergency maneuvers.",
    outcomes: ["Advanced riding techniques", "Highway riding safety", "Defensive riding", "Emergency maneuvers"],
  },
  {
    code: "A3",
    name: "Tuk Tuk",
    type: "Motorcycles",
    image: tukTukImg,
    keywords: "tuk tuk three wheeler a3 psv cargo urban",
    desc: "Specialized three-wheeler training for Tuk Tuk operators. Learn safe cargo transport, urban navigation, and PSV regulations.",
    outcomes: ["Three-wheeler mechanics", "Cargo transport safety", "Urban navigation", "PSV compliance"],
  },
  {
    code: "B1",
    name: "Light Vehicle Manual",
    type: "Light Vehicles",
    image: swiftImg,
    keywords: "car manual gear light vehicle b1 ntsa test popular",
    desc: "Our most popular course. Master manual transmission driving with hands-on lessons on Kenyan roads, covering all NTSA test requirements.",
    outcomes: ["Manual gear changing", "Highway & urban driving", "Parking techniques", "NTSA test preparation"],
    popular: true,
  },
  {
    code: "B2",
    name: "Light Vehicle Automatic",
    type: "Light Vehicles",
    image: axioImg,
    keywords: "automatic car vehicle b2 beginner ease",
    desc: "Automatic transmission training — ideal for beginners and those who prefer the ease of modern automatic vehicles.",
    outcomes: ["Automatic vehicle operation", "Smooth braking & acceleration", "Parking & reversing", "Road confidence"],
  },
  {
    code: "C1",
    name: "Light Truck",
    type: "Commercial Vehicles",
    image: lightTruckImg,
    keywords: "light truck pickup c1 commercial cargo delivery",
    desc: "Light commercial vehicle training for business transport and delivery drivers. Build the skills for safe, professional cargo handling.",
    outcomes: ["Light truck operation", "Loading & weight limits", "Urban delivery routes", "Commercial driver rules"],
  },
  {
    code: "C",
    name: "Medium Truck",
    type: "Commercial Vehicles",
    image: medTruckImg,
    keywords: "medium truck lorry c commercial long distance",
    desc: "Medium truck training for drivers handling larger cargo vehicles. Covers long-distance driving, load management, and highway safety.",
    outcomes: ["Medium truck handling", "Long-distance driving", "Load securing", "Highway safety regulations"],
  },
  {
    code: "D1",
    name: "Van",
    type: "Commercial Vehicles",
    image: vanImg,
    keywords: "van d1 passenger cargo matatu transport",
    desc: "Passenger and cargo van operation for professional drivers. Ideal for tour operators, matatu assistants, and corporate transport.",
    outcomes: ["Van driving techniques", "Passenger safety", "Cargo van operation", "Professional standards"],
  },
  {
    code: "D2",
    name: "Minibus",
    type: "Commercial Vehicles",
    image: minibusImg,
    keywords: "minibus d2 psv school staff urban route",
    desc: "Minibus PSV training for professional drivers handling school runs, staff transport, and urban routes. NTSA PSV licensing preparation included.",
    outcomes: ["Minibus operation", "PSV passenger safety", "Urban & school routes", "NTSA PSV licensing"],
  },
  {
    code: "D3",
    name: "Bus",
    type: "Commercial Vehicles",
    image: busImg,
    keywords: "bus d3 psv long distance intercity full size",
    desc: "Full-size bus training for long-distance and intercity professional drivers. Comprehensive preparation for NTSA PSV Class D3 licensing.",
    outcomes: ["Full-size bus handling", "Long-distance driving", "Passenger management", "D3 PSV licensing"],
  },
];

const FILTERS = ["All", "Motorcycles", "Light Vehicles", "Commercial Vehicles"];

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const q = search.trim().toLowerCase();

  const filtered = CATEGORIES.filter((c) => {
    const matchesFilter = activeFilter === "All" || c.type === activeFilter;
    const matchesSearch = !q ||
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q) ||
      c.keywords.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="courses" className="py-20 bg-muted/30" data-testid="section-courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Driving Courses
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Our Driving Categories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From motorcycle basics to full PSV bus licensing — we offer NTSA-approved training for every vehicle category.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-6 relative" data-testid="course-search-wrapper">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses — e.g. A1, Motorcycle, Automatic, Bus…"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            aria-label="Search driving courses"
            data-testid="input-course-search"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
              data-testid="btn-clear-search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === f
                  ? "bg-primary text-white shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
              data-testid={`filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Empty search state */}
        {filtered.length === 0 && (
          <div className="text-center py-16" data-testid="courses-empty-state">
            <p className="text-muted-foreground text-lg mb-2">No courses found for "<span className="font-semibold text-foreground">{search}</span>"</p>
            <p className="text-sm text-muted-foreground mb-4">Try searching for a category code (A1, B1), vehicle type, or keyword.</p>
            <button
              onClick={() => { setSearch(""); setActiveFilter("All"); }}
              className="px-4 py-2 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cat) => (
            <div
              key={cat.code}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              data-testid={`card-course-${cat.code.toLowerCase()}`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted/50">
                {cat.popular && (
                  <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold shadow">
                    Most Popular
                  </div>
                )}
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-secondary text-white text-xs font-bold">
                  Category {cat.code}
                </div>
                <img
                  src={cat.image}
                  alt={`Category ${cat.code} - ${cat.name}`}
                  className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={() => setLightbox(cat.image)}
                  data-testid={`img-course-${cat.code.toLowerCase()}`}
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3
                  className="text-lg font-bold text-foreground mb-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {cat.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cat.desc}</p>

                <ul className="space-y-1 mb-5 flex-1">
                  {cat.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-sm text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollTo("#register")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all group/btn"
                  data-testid={`btn-learn-more-${cat.code.toLowerCase()}`}
                >
                  Enroll in This Course
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          data-testid="lightbox-overlay"
        >
          <img
            src={lightbox}
            alt="Vehicle preview"
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
          />
        </div>
      )}
    </section>
  );
}
