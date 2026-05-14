import { Link, useLocation } from 'react-router';
import { Logo } from './Logo';
import { primaryNav } from '@/data/navigation';

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          <Link to="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {primaryNav.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-0.5 py-2 text-sm lg:text-base font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#059669]'
                    : 'text-gray-700 hover:text-[#059669]'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#059669] rounded-full" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
