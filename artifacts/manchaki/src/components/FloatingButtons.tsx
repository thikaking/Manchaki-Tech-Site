import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollTop}
          className="w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 active:scale-95 transition-all flex items-center justify-center"
          data-testid="btn-scroll-top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* WhatsApp */}
      <a
        href="https://wa.me/254729157111"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-green-500 text-white shadow-xl hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center relative"
        data-testid="btn-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 animate-ping opacity-75" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
