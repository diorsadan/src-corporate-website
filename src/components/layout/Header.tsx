"use client";

import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { Logo } from "./Logo";
import { primaryNav } from "@/data/navigation";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Smooth scroll to top, then navigate to new page
   * Provides elegant page transition experience
   */
  const handleNavigation = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    // If already on the target page, just scroll to top
    if (location.pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Wait for scroll to complete, then navigate
    setTimeout(() => {
      navigate(href);
    }, 350);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer"
            whileHover={{ opacity: 0.85 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <Link to="/" onClick={handleNavigation("/")}>
              <Logo />
            </Link>
          </motion.div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {primaryNav.map((link) => {
              const isActive = location.pathname === link.path;

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
                  {/* Link */}
                  <a
                    href={link.path}
                    onClick={handleNavigation(link.path)}
                    className={`relative inline-flex items-center px-1 py-2 text-sm lg:text-base font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-[#059669]"
                        : "text-gray-700 hover:text-[#059669]"
                    }`}
                  >
                    {link.label}

                    {/* Active Route Underline Indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#059669] to-[#047857] rounded-full"
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
          </nav>
        </div>
      </div>
    </header>
  );
}
