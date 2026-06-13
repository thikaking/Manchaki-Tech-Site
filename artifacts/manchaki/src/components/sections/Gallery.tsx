import { useState, useEffect, useCallback } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

import gallery1 from "@assets/gallery_images/image1.png";
import gallery2 from "@assets/gallery_images/image2.png";
import gallery3 from "@assets/gallery_images/image3.png";
import gallery4 from "@assets/gallery_images/image4.png";
import gallery5 from "@assets/gallery_images/image5.png";

const GALLERY_ITEMS = [
  { src: gallery1, alt: "Driving lesson — instructor guiding learner inside vehicle", category: "Driving Lessons" },
  { src: gallery2, alt: "Theory training classroom session at Manchaki", category: "Theory Training" },
  { src: gallery3, alt: "Road signs learning materials and Highway Code", category: "Road Signs" },
  { src: gallery4, alt: "Practical simulation and road layout training", category: "Practical" },
  { src: gallery5, alt: "Students at Manchaki driving school training facility", category: "Driving Lessons" },
];

const CATEGORIES = ["All", "Driving Lessons", "Theory Training", "Road Signs", "Practical"];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.category === activeFilter);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const next = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next]);

  const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20 bg-background" data-testid="section-gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Gallery
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Life at Manchaki
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Authentic moments from our training sessions, classrooms, and road lessons across both branches.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); setLightboxIndex(null); }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`gallery-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="group break-inside-avoid rounded-2xl overflow-hidden border border-border bg-muted/20 relative cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => openLightbox(i)}
              data-testid={`gallery-item-${i}`}
              role="button"
              aria-label={`View image: ${item.alt}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                  <ZoomIn className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-2.5 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No images in this category yet.
          </div>
        )}
      </div>

      {/* Lightbox with navigation */}
      {currentItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          data-testid="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white z-10"
            onClick={closeLightbox}
            data-testid="btn-close-lightbox"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center text-white z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              data-testid="btn-lightbox-prev"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {filtered.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center text-white z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
              data-testid="btn-lightbox-next"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Caption + counter */}
          <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1 pointer-events-none">
            <p className="text-white/70 text-sm text-center px-4">{currentItem.alt}</p>
            <p className="text-white/40 text-xs">{lightboxIndex + 1} / {filtered.length}</p>
          </div>
        </div>
      )}
    </section>
  );
}
