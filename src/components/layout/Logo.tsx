import { ImageWithFallback } from "@/components/common/ImageWithFallback";

export function Logo() {
  return (
    <ImageWithFallback
      src="/assets/logos/new-src-logo.png"
      alt="Sarangani Resources Corporation logo"
      className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
      loading="eager"
      decoding="async"
    />
  );
}
