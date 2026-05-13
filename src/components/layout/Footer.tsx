import { Link } from 'react-router';
import { Mail, Phone, MapPin } from 'lucide-react';
import { footerContactLines, footerCopyright, footerHeadquarters, footerLegalLinks, footerSections } from '@/data/navigation';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} className="text-gray-300 hover:text-[#84cc16] transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-gray-300 hover:text-[#84cc16] transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Contact Information</h3>
            <ul className="space-y-3 text-gray-300">
              {footerContactLines.map((line) => (
                <li key={line.text} className="flex items-start gap-2">
                  {line.icon === 'phone' && <Phone className="w-4 h-4 mt-1 flex-shrink-0" />}
                  {line.icon === 'mail' && <Mail className="w-4 h-4 mt-1 flex-shrink-0" />}
                  {line.icon === 'map' && <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />}
                  <span>{line.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Headquarters</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {footerHeadquarters.lines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {footerCopyright.organization}. {footerCopyright.suffix}
            </p>
            <div className="flex gap-6 text-sm">
              {footerLegalLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-400 hover:text-[#84cc16] transition-colors">
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
