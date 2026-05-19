import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  footerContactLines,
  footerCopyright,
  footerHeadquarters,
  footerLegalLinks,
  footerSections,
} from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4 lg:space-y-5">
              <h3
                className="text-base lg:text-lg font-semibold tracking-tight"
                style={{ fontWeight: 600 }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-sm lg:text-base text-gray-400 hover:text-[#84cc16] transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm lg:text-base text-gray-400 hover:text-[#84cc16] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4 lg:space-y-5">
            <h3
              className="text-base lg:text-lg font-semibold tracking-tight"
              style={{ fontWeight: 600 }}
            >
              Contact Information
            </h3>
            <ul className="space-y-3 lg:space-y-4 text-gray-400">
              {footerContactLines.map((line) => (
                <li
                  key={line.text}
                  className="flex items-start gap-3 text-sm lg:text-base"
                >
                  {line.icon === "phone" && (
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#84cc16]" />
                  )}
                  {line.icon === "mail" && (
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#84cc16]" />
                  )}
                  {line.icon === "map" && (
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#84cc16]" />
                  )}
                  <span className="leading-relaxed">{line.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 lg:space-y-5">
            <h3
              className="text-base lg:text-lg font-semibold tracking-tight"
              style={{ fontWeight: 600 }}
            >
              Headquarters
            </h3>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
              {footerHeadquarters.lines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-12 lg:pt-14 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} {footerCopyright.organization}.{" "}
              {footerCopyright.suffix}
            </p>
            <div className="flex gap-6 text-xs sm:text-sm flex-wrap justify-center sm:justify-end">
              {footerLegalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-[#84cc16] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
