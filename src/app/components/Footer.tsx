import { Link } from 'react-router';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-[#84cc16] transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-[#84cc16] transition-colors">About Us</Link></li>
              <li><Link to="/properties" className="text-gray-300 hover:text-[#84cc16] transition-colors">Our Properties</Link></li>
              <li><Link to="/leasing" className="text-gray-300 hover:text-[#84cc16] transition-colors">Commercial Leasing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-gray-300 hover:text-[#84cc16] transition-colors">Investor Resources</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-[#84cc16] transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-[#84cc16] transition-colors">Download Brochure</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Contact Information</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>+63 83 228 8766</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>info@saranganiresources.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Polomolok, South Cotabato</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>Headquarters</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              National Highway, Cannery Site<br />
              Polomolok, South Cotabato 9504<br />
              Philippines
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Sarangani Resources Corporation. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#84cc16] transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-[#84cc16] transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-[#84cc16] transition-colors">Legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
