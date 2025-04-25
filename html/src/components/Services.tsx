import React from 'react';
import { Server, Globe, Cpu, Clock, Lock, Users } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Premium Services</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Discover our comprehensive range of virtual private server solutions designed to meet the diverse needs of modern businesses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Server className="h-6 w-6 text-[#6E00FF]" />}
            title="Dedicated VPS Hosting"
            description="High-performance VPS with dedicated resources ensuring optimal performance for your applications."
          />
          
          <ServiceCard 
            icon={<Globe className="h-6 w-6 text-[#6E00FF]" />}
            title="Global CDN Integration"
            description="Seamlessly integrate with our global content delivery network for faster content delivery worldwide."
          />
          
          <ServiceCard 
            icon={<Cpu className="h-6 w-6 text-[#6E00FF]" />}
            title="Advanced Computing"
            description="Access to cutting-edge computing resources for intensive processing and data analysis tasks."
          />
          
          <ServiceCard 
            icon={<Clock className="h-6 w-6 text-[#6E00FF]" />}
            title="24/7 Monitoring"
            description="Continuous monitoring of your servers with real-time alerts and detailed performance analytics."
          />
          
          <ServiceCard 
            icon={<Lock className="h-6 w-6 text-[#6E00FF]" />}
            title="Enhanced Security"
            description="Multi-layered security protocols including firewall protection, DDoS mitigation, and data encryption."
          />
          
          <ServiceCard 
            icon={<Users className="h-6 w-6 text-[#6E00FF]" />}
            title="Dedicated Support"
            description="24/7 access to our technical support team of skilled professionals ready to assist you."
          />
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-[#0D0D0D] p-6 rounded-xl border border-[#6E00FF]/10 hover:border-[#6E00FF]/30 transition-all duration-300">
      <div className="mb-4 flex items-center">
        <div className="bg-[#6E00FF]/10 p-2 rounded-lg mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Services;