"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CarouselProps = {
  children: React.ReactNode[];
  className?: string;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  fullWidth?: boolean;
};

export function Carousel({
  children,
  className,
  autoSlide = false,
  autoSlideInterval = 3000,
  showControls = true,
  showIndicators = true,
  fullWidth = false,
}: CarouselProps) {
  const [curr, setCurr] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const slides = React.Children.toArray(children);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  React.useEffect(() => {
    if (!autoSlide || isHovering) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, isHovering]);

  return (
    <div 
      className={cn("relative overflow-hidden", fullWidth ? "w-full" : "", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
      {showControls && (
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prev}
            className="rounded-full p-2 bg-black/50 text-white hover:bg-black/80 transition transform hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={next}
            className="rounded-full p-2 bg-black/50 text-white hover:bg-black/80 transition transform hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
      {showIndicators && (
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                className={cn(
                  "h-3 w-3 rounded-full transition-all cursor-pointer",
                  curr === i ? "bg-black w-6" : "bg-black/40 hover:bg-black/60"
                )}
                onClick={() => setCurr(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function CarouselItem({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("min-w-full flex items-center justify-center", className)}>
      {children}
    </div>
  );
}