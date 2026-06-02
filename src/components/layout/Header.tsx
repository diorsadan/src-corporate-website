"use client";

import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { useRef, useEffect } from "react";
import { Logo } from "./Logo";
import { primaryNav } from "@/data/navigation";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";

const HEADER_SURFACE_TRANSITION =
  "transition-[background-color,border-color,box-shadow] duration-700 ease-in-out";

const COLOR_TRANSITION = "transition-colors duration-700 ease-in-out";

const LOGO_SLIDE_TRANSITION = { duration: 0.7, ease: "easeInOut" as const };

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

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isScrolled } = useHeaderScroll(location.pathname);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const handleNavigation = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();

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

  const rightClusterClasses =
    "hidden md:flex items-center gap-8 lg:gap-12 transition-[flex-grow,gap] duration-700 ease-in-out";

  const logoCircleClasses = isScrolled
    ? "shadow-md ring-2 ring-white/50"
    : "shadow-sm ring-1 ring-slate-200/90";

  return (
    <header
      className={`sticky top-0 z-50 ${HEADER_SURFACE_TRANSITION} ${headerSurfaceClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 lg:h-24 items-center justify-between">
          <motion.div
            className="flex-shrink-0 cursor-pointer"
            animate={{ x: isScrolled ? -16 : 0 }}
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

          <div className={rightClusterClasses}>
            <nav
              className="flex items-center gap-8 lg:gap-12"
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
          </div>
        </div>
      </div>
    </header>
  );
}
