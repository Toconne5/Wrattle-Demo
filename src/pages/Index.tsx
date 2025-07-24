import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGetStarted = () => {
    setIsAnimating(true);
    // The Link component will handle the navigation automatically
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002E5D] via-[#003366] to-[#004080] text-white">
      {/* Header */}
      <header className="flex justify-end items-center p-6">
        <Link to="/login">
          <Button variant="ghost" className="text-white hover:text-white/80 transition-all duration-300">
            Login
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
        {/* Logo and Branding */}
        <div className={`mb-8 transition-transform duration-600 ${isAnimating ? 'scale-110 rotate-12' : ''}`}>
          <div className="relative w-40 h-48 mx-auto mb-6">
            {/* Rattle Logo - exact match to reference */}
            <div className="relative">
              {/* Main rattle head - white outline circle */}
              <div className="w-32 h-32 bg-transparent rounded-full flex items-center justify-center border-4 border-white mx-auto relative">
                <div className="w-20 h-16 flex flex-col items-center justify-center relative">
                  {/* White trending arrow line above the bars */}
                  <svg className="w-full h-8 mb-1" viewBox="0 0 80 32" fill="none">
                    <path
                      d="M10 25 L25 18 L40 22 L55 8"
                      stroke="white"
                      strokeWidth="3"
                      fill="none"
                    />
                    {/* Arrow head at the end */}
                    <path
                      d="M50 10 L55 8 L53 13"
                      stroke="white"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                  
                  {/* Blue Chart Bars below the arrow */}
                  <div className="w-full h-8 flex items-end justify-center space-x-1">
                    <div className="w-3 h-4 bg-[#4DA8DA] rounded-sm"></div>
                    <div className="w-3 h-6 bg-[#4DA8DA] rounded-sm"></div>
                    <div className="w-3 h-5 bg-[#4DA8DA] rounded-sm"></div>
                    <div className="w-3 h-8 bg-[#4DA8DA] rounded-sm"></div>
                  </div>
                </div>
              </div>
              
              {/* Rattle handle/stem - white outline rectangle */}
              <div className="w-4 h-12 bg-transparent border-4 border-white rounded-sm mx-auto"></div>
              
              {/* Handle grip/base - white outline circle */}
              <div className="w-8 h-8 bg-transparent border-4 border-white rounded-full mx-auto"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-[#A6E1FA] bg-clip-text text-transparent">
            Wrattle
          </h1>
          <p className="text-xl md:text-2xl text-[#A6E1FA] mb-2">
            The Social Investing App
          </p>
          <p className="text-lg text-[#A6E1FA]/80">
            for the Next Generation
          </p>
        </div>

        {/* Tagline */}
        <div className="mb-12 max-w-2xl">
          <p className="text-lg md:text-xl text-white/90 italic">
            "Turn every dollar into a conversation - and an investment."
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
            <div className="w-12 h-12 bg-[#4DA8DA] rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold text-xl">$</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Micro-Investing</h3>
            <p className="text-white/80 text-sm">Start with just $1 and grow your wealth alongside friends</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
            <div className="w-12 h-12 bg-[#4DA8DA] rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold text-xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Social Finance</h3>
            <p className="text-white/80 text-sm">See what friends invest in and learn together</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
            <div className="w-12 h-12 bg-[#4DA8DA] rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-white font-bold text-xl">🎓</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Learn & Earn</h3>
            <p className="text-white/80 text-sm">Bite-sized education with real investment opportunities</p>
          </div>
        </div>

        {/* CTA Button - Now uses Link component to /login */}
        <Link to="/login">
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className={`bg-white text-[#002E5D] hover:bg-[#A6E1FA] hover:text-[#002E5D] text-xl px-12 py-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl ${isAnimating ? 'animate-pulse' : ''}`}
          >
            Get Started
          </Button>
        </Link>
        
        <p className="text-sm text-white/60 mt-4">
          Join thousands growing their financial future
        </p>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#4DA8DA]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#A6E1FA]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};

export default Index;
