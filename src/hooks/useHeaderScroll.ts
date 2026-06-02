import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 50;

export function useHeaderScroll(syncKey?: string) {
  const [isScrolled, setIsScrolled] = useState(false);
  const rafRef = useRef<number | null>(null);

  const updateScrollState = useCallback(() => {
    const next = window.scrollY > SCROLL_THRESHOLD;
    setIsScrolled((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    updateScrollState();

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateScrollState();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScrollState, syncKey]);

  return { isScrolled };
}
