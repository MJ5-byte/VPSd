import React from 'react';
import { ServerIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <ServerIcon className="h-8 w-8 text-[#6E00FF]" />
            <span className="ml-2 text-xl font-bold text-white">VPSD</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a href="#home" className="text-white hover:text-[#6E00FF] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-white hover:text-[#6E00FF] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#waitlist" className="px-4 py-2 rounded-md bg-[#6E00FF] text-white hover:bg-[#5900d1] transition-colors">
                  Join Waitlist
                </a>
              </li>
            </ul>
          </nav>
          <div className="md:hidden">
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;