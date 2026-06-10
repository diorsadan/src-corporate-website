import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Maximize2,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAccessibleAnimation } from "@/hooks/useAccessibleAnimation";
import {
  cardCarouselEngagedClasses,
  cardCarouselOverlayClasses,
} from "@/utils/interactiveCardClasses";

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
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * Resilient slide image: .jpg → .JPG → remote placeholder → branded gradient.
 */
function CarouselSlideImage({
  src,
  alt,
  parentGroupName,
  isActive,
  className = "absolute inset-0 w-full h-full object-cover",
  onClick,
}: CarouselSlideImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [useBrandPlaceholder, setUseBrandPlaceholder] = useState(false);

  const zoomClass =
    parentGroupName === "card" && isActive
      ? "transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover/card:scale-110"
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
        onClick={onClick}
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
      className={`${className} ${zoomClass}`}
      style={isActive ? GPU_LAYER_STYLE : undefined}
      onError={handleImageError}
      onClick={onClick}
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
  /** Allow opening a fullscreen lightbox (default true) */
  enableLightbox?: boolean;
  /** Show pause / play control when auto-advance is enabled (default true) */
  enablePauseControl?: boolean;
}

/**
 * Property slideshow with layered crossfade, hover-triggered auto-advance, manual controls,
 * pause/resume, and optional fullscreen lightbox.
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
  enableLightbox = true,
  enablePauseControl = true,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerOver, setPointerOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const firstTickRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expandTriggerRef = useRef<HTMLButtonElement>(null);
  const imagesRef = useRef(images);
  imagesRef.current = images;

  const { resolveTransition } = useAccessibleAnimation();
  const slideTransition = resolveTransition(SLIDE_TRANSITION);

  const isCardContext = parentGroupName === "card";
  const groupHover = isCardContext ? "group-hover/card" : "group-hover";
  const controlRevealClass = isCardContext
    ? `transition-all duration-300 ease-in-out ${cardCarouselEngagedClasses(isHovered, groupHover)}`
    : "opacity-70 group-hover:opacity-100 transition-all duration-300 ease-in-out";
  const overlayOpacityClass = isCardContext
    ? `transition-opacity duration-300 ease-in-out ${cardCarouselOverlayClasses(isHovered, groupHover)}`
    : `opacity-60 ${groupHover}:opacity-90 transition-opacity duration-300 ease-in-out`;
  const dotOpacityClass = isCardContext
    ? `transition-opacity duration-300 ease-in-out ${cardCarouselEngagedClasses(isHovered, groupHover)}`
    : `opacity-70 ${groupHover}:opacity-100 transition-opacity duration-300 ease-in-out`;

  const isEngaged = isHovered || pointerOver;
  const canAutoAdvance = autoPlay || advanceOnHover || resetToFirstWhenIdle;

  const shouldAutoPlay =
    images.length > 1 &&
    canAutoAdvance &&
    !isPaused &&
    !isLightboxOpen &&
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

  const goToPrevious = useCallback(() => {
    const len = imagesRef.current.length;
    if (len <= 1) return;
    setActiveIndex((current) => (current - 1 + len) % len);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    setIsPaused(false);
    setIsLightboxOpen(false);
  }, [images]);

  useEffect(() => {
    if (resetToFirstWhenIdle && !isEngaged && !isLightboxOpen) {
      setActiveIndex(0);
    }
  }, [resetToFirstWhenIdle, isEngaged, isLightboxOpen]);

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

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      }
      if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, goToNext, goToPrevious]);

  const handleLightboxOpenChange = (open: boolean) => {
    setIsLightboxOpen(open);
    if (!open) {
      setIsPaused(false);
      expandTriggerRef.current?.focus();
    }
  };

  const stopBubble = (e: React.MouseEvent) => {
    if (isolateControls) e.stopPropagation();
  };

  const pauseForManualView = () => {
    if (canAutoAdvance) {
      setIsPaused(true);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    stopBubble(e);
    pauseForManualView();
    goToNext();
  };

  const handlePrevious = (e: React.MouseEvent) => {
    stopBubble(e);
    pauseForManualView();
    goToPrevious();
  };

  const goToSlide = (e: React.MouseEvent, index: number) => {
    stopBubble(e);
    pauseForManualView();
    setActiveIndex(index);
  };

  const togglePause = (e: React.MouseEvent) => {
    stopBubble(e);
    setIsPaused((paused) => !paused);
  };

  const openLightbox = (e: React.MouseEvent) => {
    stopBubble(e);
    setIsPaused(true);
    setIsLightboxOpen(true);
  };

  const handleSlideClick = (e: React.MouseEvent) => {
    if (!enableLightbox || isCardContext) return;
    openLightbox(e);
  };

  const showPauseControl =
    enablePauseControl && images.length > 1 && canAutoAdvance;
  const showExpandControl = enableLightbox && images.length > 0;

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
    <>
      <div
        className={`w-full ${heightClass} overflow-hidden bg-slate-900 relative ${
          isCardContext ? "" : "group"
        }`}
        onPointerEnter={() =>
          (advanceOnHover || resetToFirstWhenIdle) && setPointerOver(true)
        }
        onPointerLeave={() =>
          (advanceOnHover || resetToFirstWhenIdle) && setPointerOver(false)
        }
      >
        {/* Layered crossfade */}
        <div className="absolute inset-0 overflow-hidden">
          {images.map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: activeIndex === index ? 1 : 0 }}
              transition={slideTransition}
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
                onClick={
                  enableLightbox && activeIndex === index
                    ? handleSlideClick
                    : undefined
                }
                className={`absolute inset-0 w-full h-full object-cover ${
                  enableLightbox && !isCardContext && activeIndex === index
                    ? "cursor-zoom-in"
                    : ""
                }`}
              />
            </motion.div>
          ))}
        </div>

        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-500 ${overlayOpacityClass}`}
          aria-hidden
        />

        {(showPauseControl || showExpandControl) && (
          <div
            className={`absolute top-3 right-3 z-20 flex items-center gap-2 ${controlRevealClass} transition-all duration-300`}
          >
            {showPauseControl && (
              <motion.button
                type="button"
                onClick={togglePause}
                aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
                title={isPaused ? "Resume slideshow" : "Pause slideshow"}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
              >
                {isPaused ? (
                  <Play className="h-4 w-4 fill-current" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
              </motion.button>
            )}
            {showExpandControl && (
              <motion.button
                ref={expandTriggerRef}
                type="button"
                onClick={openLightbox}
                aria-label="Enlarge image"
                title="Enlarge image"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
              >
                <Maximize2 className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        )}

        {images.length > 1 && (
          <>
            <motion.button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous image"
              initial={false}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-3 rounded-full ${controlRevealClass} transition-all duration-300 z-10 shadow-lg`}
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
              className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-3 rounded-full ${controlRevealClass} transition-all duration-300 z-10 shadow-lg`}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            <div
              className={`absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10 transition-opacity duration-300 ${dotOpacityClass}`}
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

      <Dialog open={isLightboxOpen} onOpenChange={handleLightboxOpenChange}>
        <DialogContent
          className="fixed inset-0 z-[100] flex max-w-none translate-x-0 translate-y-0 items-center justify-center border-0 bg-black/95 p-4 sm:p-8 shadow-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 [&>button:last-child]:hidden"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            const target = e.currentTarget;
            if (!(target instanceof HTMLElement)) return;
            const closeBtn = target.querySelector<HTMLButtonElement>(
              "[data-lightbox-close]",
            );
            closeBtn?.focus();
          }}
          onInteractOutside={(e) => e.preventDefault()}
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">
            {alt} — enlarged view, image {activeIndex + 1} of {images.length}
          </DialogTitle>

          <button
            type="button"
            data-lightbox-close
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Close enlarged image"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <div className="relative flex max-h-[90vh] max-w-6xl items-center justify-center">
            <CarouselSlideImage
              src={images[activeIndex]}
              alt={`${alt} — photo ${activeIndex + 1}`}
              isActive
              className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>

          {images.length > 1 && (
            <p
              aria-live="polite"
              aria-atomic="true"
              className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-sm font-medium text-white/80"
            >
              {activeIndex + 1} / {images.length}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyImageCarousel;
