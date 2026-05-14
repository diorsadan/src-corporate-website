import { ImageWithFallback } from "@/components/common/ImageWithFallback";

export function Logo() {
  return (
    <div className="flex items-center h-12">
      <ImageWithFallback
        src="/logos/new-src-logo.png"
        alt="Sarangani Resources Corporation"
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}
