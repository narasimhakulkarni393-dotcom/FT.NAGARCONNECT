import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-bold mb-4">NagaraConnect</h3>
          <p className="text-gray-400">
            Empowering citizens to report and track civic issues in real-time.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Report Issue</a></li>
            <li><a href="#" className="hover:text-white transition">My Complaints</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              support@nagaraconnect.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              1-800-NAGAR-CONNECT
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
        <p>&copy; 2026 NagaraConnect. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
