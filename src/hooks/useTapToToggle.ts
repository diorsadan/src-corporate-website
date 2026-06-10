import { useCallback, useEffect, useState } from "react";

const LG_BREAKPOINT_QUERY = "(min-width: 1024px)";

/**
 * Dual-mode card interaction: desktop `lg+` relies on CSS hover;
 * mobile tracks a single active card via tap, cleared on outside tap or re-tap.
 */
export function useTapToToggle() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(LG_BREAKPOINT_QUERY);
    const syncLargeScreen = () => setIsLargeScreen(mediaQuery.matches);
    syncLargeScreen();
    mediaQuery.addEventListener("change", syncLargeScreen);
    return () => mediaQuery.removeEventListener("change", syncLargeScreen);
  }, []);

  useEffect(() => {
    if (isLargeScreen || activeCardId === null) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const activeCard = document.querySelector(
        `[data-tap-card-id="${activeCardId}"]`,
      );

      if (activeCard && !activeCard.contains(target)) {
        setActiveCardId(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [activeCardId, isLargeScreen]);

  const handleCardTap = useCallback(
    (cardId: string) => {
      if (isLargeScreen) {
        return;
      }
      setActiveCardId((current) => (current === cardId ? null : cardId));
    },
    [isLargeScreen],
  );

  const isCardActive = useCallback(
    (cardId: string) => activeCardId === cardId,
    [activeCardId],
  );

  const clearActiveCard = useCallback(() => {
    setActiveCardId(null);
  }, []);

  return {
    activeCardId,
    isLargeScreen,
    handleCardTap,
    isCardActive,
    clearActiveCard,
    setActiveCardId,
  };
}
