import { ImageWithFallback } from "@/components/common/ImageWithFallback";

interface LogoProps {
  className?: string;
}

export function Logo({
  className = "h-10 sm:h-12 lg:h-14 w-auto object-contain",
}: LogoProps) {
  return (
    <ImageWithFallback
      src="/assets/logos/new-src-logo.png"
      alt="Sarangani Resources Corporation logo"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
