"use client";

import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { useRef, useEffect, useState } from "react";
import { Logo } from "./Logo";
import { primaryNav } from "@/data/navigation";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";

const HEADER_SURFACE_TRANSITION =
  "transition-[background-color,border-color,box-shadow] duration-700 ease-in-out";

const COLOR_TRANSITION = "transition-colors duration-700 ease-in-out";

const LOGO_SLIDE_TRANSITION = { duration: 0.7, ease: "easeInOut" as const };

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 12H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 17H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeaderNavLinks({
  pathname,
  onNavigate,
  navLinkBase,
  navLinkActive,
  activeIndicatorClass,
}: {
  pathname: string;
  onNavigate: (href: string) => (e: React.MouseEvent) => void;
  navLinkBase: string;
  navLinkActive: string;
  activeIndicatorClass: string;
}) {
  return (
    <>
      {primaryNav.map((link) => {
        const isActive = pathname === link.path;

        return (
          <motion.div
            key={link.path}
            className="relative"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 350,
              damping: 35,
            }}
          >
            <a
              href={link.path}
              onClick={onNavigate(link.path)}
              className={`relative inline-flex items-center px-1 py-2 text-sm lg:text-base font-medium ${COLOR_TRANSITION} ${
                isActive ? navLinkActive : navLinkBase
              }`}
            >
              {link.label}

              {isActive && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${activeIndicatorClass} ${COLOR_TRANSITION}`}
                  initial={{ opacity: 0, scaleX: 0.8 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0.8 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </a>
          </motion.div>
        );
      })}
    </>
  );
}

function MobileHeaderNavLinks({
  pathname,
  onNavigate,
  navLinkBase,
  navLinkActive,
  isScrolled,
}: {
  pathname: string;
  onNavigate: (href: string) => (e: React.MouseEvent) => void;
  navLinkBase: string;
  navLinkActive: string;
  isScrolled: boolean;
}) {
  return (
    <>
      {primaryNav.map((link) => {
        const isActive = pathname === link.path;

        return (
          <a
            key={link.path}
            href={link.path}
            onClick={onNavigate(link.path)}
            className={`block w-full rounded-lg px-3 py-3 text-base font-medium ${COLOR_TRANSITION} ${
              isActive ? navLinkActive : navLinkBase
            } ${
              isActive
                ? isScrolled
                  ? "bg-white/10"
                  : "bg-emerald-50"
                : isScrolled
                  ? "hover:bg-white/10"
                  : "hover:bg-slate-50"
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </>
  );
}

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isScrolled } = useHeaderScroll(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncLargeScreen = () => {
      const matches = mediaQuery.matches;
      setIsLargeScreen(matches);
      if (matches) {
        setIsMenuOpen(false);
      }
    };
    syncLargeScreen();
    mediaQuery.addEventListener("change", syncLargeScreen);
    return () => mediaQuery.removeEventListener("change", syncLargeScreen);
  }, []);

  const handleNavigation = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    timeoutRef.current = setTimeout(() => {
      navigate(href);
      timeoutRef.current = null;
    }, 350);
  };

  const headerSurfaceClasses = isScrolled
    ? "bg-[#2e7d5c] border-b border-emerald-700 shadow-md"
    : "bg-white border-b border-gray-200 shadow-sm";

  const navLinkBase = isScrolled
    ? "text-emerald-50 hover:text-white font-medium"
    : "text-gray-700 hover:text-[#059669]";

  const navLinkActive = isScrolled ? "text-white font-semibold" : "text-[#059669]";

  const activeIndicatorClass = isScrolled
    ? "bg-white"
    : "bg-gradient-to-r from-[#059669] to-[#047857]";

  const logoCircleClasses = isScrolled
    ? "shadow-md ring-2 ring-white/50"
    : "shadow-sm ring-1 ring-slate-200/90";

  const mobileMenuButtonClasses = isScrolled
    ? "text-white hover:bg-white/10"
    : "text-gray-700 hover:bg-slate-100";

  const mobileMenuPanelClasses = isScrolled
    ? "bg-[#2e7d5c] border-emerald-700 text-white"
    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white";

  return (
    <header
      className={`sticky top-0 z-50 relative ${HEADER_SURFACE_TRANSITION} ${headerSurfaceClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 lg:h-24 items-center justify-between">
          <motion.div
            className="flex-shrink-0 cursor-pointer z-10"
            animate={{ x: isScrolled && isLargeScreen ? -16 : 0 }}
            transition={LOGO_SLIDE_TRANSITION}
            whileHover={{ opacity: 0.85 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/" onClick={handleNavigation("/")} aria-label="SRC Home">
              <span
                className={`flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-full bg-white transition-[box-shadow,ring-color] duration-700 ease-in-out ${logoCircleClasses}`}
              >
                <Logo className="max-h-8 max-w-[4.5rem] sm:max-h-9 sm:max-w-[5rem] lg:max-h-10 lg:max-w-[5.5rem] h-auto w-auto object-contain" />
              </span>
            </Link>
          </motion.div>

          <nav
            className="hidden lg:flex lg:items-center lg:gap-8"
            aria-label="Primary navigation"
          >
            <HeaderNavLinks
              pathname={location.pathname}
              onNavigate={handleNavigation}
              navLinkBase={navLinkBase}
              navLinkActive={navLinkActive}
              activeIndicatorClass={activeIndicatorClass}
            />
          </nav>

          <button
            type="button"
            className={`flex lg:hidden items-center justify-center p-2 rounded-md focus:outline-none transition-colors z-50 ${mobileMenuButtonClasses}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-primary-navigation"
          >
            {isMenuOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <HamburgerIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-primary-navigation"
          aria-label="Primary navigation"
          className={`absolute top-full left-0 w-full border-b shadow-2xl lg:hidden flex flex-col p-5 space-y-4 z-[9999] ${HEADER_SURFACE_TRANSITION} ${mobileMenuPanelClasses}`}
        >
          <MobileHeaderNavLinks
            pathname={location.pathname}
            onNavigate={handleNavigation}
            navLinkBase={navLinkBase}
            navLinkActive={navLinkActive}
            isScrolled={isScrolled}
          />
        </nav>
      )}
    </header>
  );
}
