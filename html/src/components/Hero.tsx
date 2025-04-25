import React from 'react';
import { ArrowDownCircle, SlidersHorizontal, Zap, Eye } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-b from-black to-[#1a0044]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Next Generation <span className="text-[#6E00FF]">Virtual Private Server</span> Solutions
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Powerful, secure, and scalable virtual private servers designed for modern businesses. 
          Join our waitlist to be the first to experience the future of cloud computing.
        </p>
        <a 
          href="#waitlist" 
          className="inline-flex items-center px-6 py-3 rounded-full bg-[#6E00FF] text-white transition-all"
        >
          Join Waitlist
          <ArrowDownCircle className="ml-2 h-5 w-5" />
        </a>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-[#6E00FF]/20 transform transition-all hover:translate-y-[-4px]">
            <div className="bg-[#6E00FF]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal className="h-7 w-7 text-[#6E00FF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Simplicity</h3>
            <p className="text-gray-400">Streamlined infrastructure designed for ease of use, making everything simple and hassle-free.</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-[#6E00FF]/20 transform transition-all hover:translate-y-[-4px]">
            <div className="bg-[#6E00FF]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-7 w-7 text-[#6E00FF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Speed</h3>
            <p className="text-gray-400">Optimized systems that ensure fast performance and smooth experiences every time.</p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-[#6E00FF]/20 transform transition-all hover:translate-y-[-4px]">
            <div className="bg-[#6E00FF]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <Eye className="h-7 w-7 text-[#6E00FF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Accessibility</h3>
            <p className="text-gray-400">User-friendly and always available, making service management simple for everyone.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;