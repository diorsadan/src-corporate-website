import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Remote fallback when local assets are missing (industrial zones not yet uploaded) */
export const PROPERTY_CAROUSEL_REMOTE_PLACEHOLDER =
  "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80";

const SLIDE_TRANSITION = { duration: 0.55, ease: "easeInOut" } as const;

const GPU_LAYER_STYLE: React.CSSProperties = {
  willChange: "opacity, transform",
};

interface CarouselSlideImageProps {
  src: string;
  alt: string;
  parentGroupName?: string;
  isActive: boolean;
}

/**
 * Resilient slide image: .jpg → .JPG → remote placeholder → branded gradient.
 */
function CarouselSlideImage({
  src,
  alt,
  parentGroupName,
  isActive,
}: CarouselSlideImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [useBrandPlaceholder, setUseBrandPlaceholder] = useState(false);

  const zoomClass =
    parentGroupName === "card" && isActive
      ? "transition-transform duration-700 ease-out group-hover/card:scale-110"
      : "";

  useEffect(() => {
    setImageSrc(src);
    setUseBrandPlaceholder(false);
  }, [src]);

  const handleImageError = () => {
    if (imageSrc.endsWith(".jpg")) {
      setImageSrc(imageSrc.replace(/\.jpg$/, ".JPG"));
      return;
    }
    if (imageSrc !== PROPERTY_CAROUSEL_REMOTE_PLACEHOLDER) {
      setImageSrc(PROPERTY_CAROUSEL_REMOTE_PLACEHOLDER);
      return;
    }
    setUseBrandPlaceholder(true);
  };

  if (useBrandPlaceholder) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#059669] via-[#047857] to-[#065f46]"
        role="img"
        aria-label={alt}
      >
        <span className="sr-only">{alt}</span>
        <span className="text-white/90 text-sm font-semibold tracking-wide px-6 text-center">
          SRC Property Portfolio
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`absolute inset-0 w-full h-full object-cover ${zoomClass}`}
      style={isActive ? GPU_LAYER_STYLE : undefined}
      onError={handleImageError}
    />
  );
}

export interface PropertyImageCarouselProps {
  images: string[];
  alt: string;
  /** Tailwind height utility, e.g. `h-64` or `h-[500px]` */
  heightClass?: string;
  /** When true, nav clicks do not bubble (for clickable parent cards) */
  isolateControls?: boolean;
  /** Named Tailwind group on parent card for hover-synced controls, e.g. "card" */
  parentGroupName?: string;
  /** Auto-advance while parent reports hover (grid cards) */
  advanceOnHover?: boolean;
  isHovered?: boolean;
  /** Always auto-advance (modal showcase) */
  autoPlay?: boolean;
  /** Auto-advance only while hovered; snap back to first image when idle (grid cards) */
  resetToFirstWhenIdle?: boolean;
  autoPlayIntervalMs?: number;
}

/**
 * Property slideshow with layered crossfade, hover-triggered auto-advance, and manual controls.
 */
export const PropertyImageCarousel: React.FC<PropertyImageCarouselProps> = ({
  images,
  alt,
  heightClass = "h-64",
  isolateControls = false,
  parentGroupName,
  advanceOnHover = false,
  isHovered = false,
  autoPlay = false,
  resetToFirstWhenIdle = false,
  autoPlayIntervalMs = 2800,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerOver, setPointerOver] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const firstTickRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imagesRef = useRef(images);
  imagesRef.current = images;

  const groupHover =
    parentGroupName === "card" ? "group-hover/card" : "group-hover";

  const isEngaged = isHovered || pointerOver;

  const shouldAutoPlay =
    images.length > 1 &&
    ((autoPlay && (!resetToFirstWhenIdle || isEngaged)) ||
      (advanceOnHover && isEngaged));

  const clearAutoPlay = useCallback(() => {
    if (firstTickRef.current) {
      clearTimeout(firstTickRef.current);
      firstTickRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const goToNext = useCallback(() => {
    const len = imagesRef.current.length;
    if (len <= 1) return;
    setActiveIndex((current) => (current + 1) % len);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    if (resetToFirstWhenIdle && !isEngaged) {
      setActiveIndex(0);
    }
  }, [resetToFirstWhenIdle, isEngaged]);

  useEffect(() => {
    clearAutoPlay();

    if (!shouldAutoPlay) {
      return;
    }

    const tick = () => goToNext();

    firstTickRef.current = window.setTimeout(() => {
      tick();
      intervalRef.current = window.setInterval(tick, autoPlayIntervalMs);
    }, 600);

    return clearAutoPlay;
  }, [shouldAutoPlay, autoPlayIntervalMs, goToNext, clearAutoPlay]);

  const stopBubble = (e: React.MouseEvent) => {
    if (isolateControls) e.stopPropagation();
  };

  const handleNext = (e: React.MouseEvent) => {
    stopBubble(e);
    goToNext();
  };

  const handlePrevious = (e: React.MouseEvent) => {
    stopBubble(e);
    setActiveIndex(
      (currentIndex) =>
        (currentIndex - 1 + images.length) % images.length,
    );
  };

  const goToSlide = (e: React.MouseEvent, index: number) => {
    stopBubble(e);
    setActiveIndex(index);
  };

  if (images.length === 0) {
    return (
      <div
        className={`w-full ${heightClass} relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#059669] via-[#047857] to-[#065f46]`}
        role="img"
        aria-label={alt}
      >
        <span className="text-white/90 text-sm font-semibold tracking-wide">
          SRC Property Portfolio
        </span>
      </div>
    );
  }

  return (
    <div
      className={`w-full ${heightClass} overflow-hidden bg-slate-900 relative`}
      onPointerEnter={() =>
        (advanceOnHover || resetToFirstWhenIdle) && setPointerOver(true)
      }
      onPointerLeave={() =>
        (advanceOnHover || resetToFirstWhenIdle) && setPointerOver(false)
      }
    >
      {/* Layered crossfade — reliable visible transitions for auto-advance */}
      <div className="absolute inset-0 overflow-hidden">
        {images.map((src, index) => (
          <motion.div
            key={`${src}-${index}`}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: activeIndex === index ? 1 : 0 }}
            transition={SLIDE_TRANSITION}
            style={{
              zIndex: activeIndex === index ? 1 : 0,
              pointerEvents: activeIndex === index ? "auto" : "none",
            }}
            aria-hidden={activeIndex !== index}
          >
            <CarouselSlideImage
              src={src}
              alt={`${alt} — photo ${index + 1}`}
              parentGroupName={parentGroupName}
              isActive={activeIndex === index}
            />
          </motion.div>
        ))}
      </div>

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 ${groupHover}:opacity-90`}
        aria-hidden
      />

      {images.length > 1 && (
        <>
          <motion.button
            type="button"
            onClick={handlePrevious}
            aria-label="Previous image"
            initial={false}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-3 rounded-full opacity-0 ${groupHover}:opacity-100 transition-all duration-300 z-10 shadow-lg`}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            initial={false}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-3 rounded-full opacity-0 ${groupHover}:opacity-100 transition-all duration-300 z-10 shadow-lg`}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <div
            className={`absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10 opacity-70 ${groupHover}:opacity-100 transition-opacity duration-300`}
          >
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => goToSlide(e, index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-7 bg-white shadow-sm"
                    : "w-2 bg-white/40 hover:bg-white/80 hover:w-3"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyImageCarousel;
