import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#23263a] py-16 px-4 border-t border-lime-300/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-lime-300 mb-4">Get in Touch</h3>
            <p className="text-white mb-2">Ready to start your next project?</p>
            <a href="mailto:hello@jyoung2k.com" className="text-lime-300 hover:text-lime-200 transition-colors">
              hello@jyoung2k.com
            </a>
          </div>
          
          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-lime-300 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/case-studies" className="block text-white hover:text-lime-300 transition-colors">
                Case Studies
              </a>
              <a href="/processes" className="block text-white hover:text-lime-300 transition-colors">
                Process
              </a>
              <a href="/resume" className="block text-white hover:text-lime-300 transition-colors">
                Resume
              </a>
            </div>
          </div>
          
          {/* Social & Copyright */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-lime-300 mb-4">Connect</h3>
            <div className="space-y-2">
              <a href="https://linkedin.com/in/jamesyoung" target="_blank" rel="noopener noreferrer" className="block text-white hover:text-lime-300 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center mt-12 pt-8 border-t border-lime-300/20">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} James Young. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 