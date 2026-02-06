import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-logo-purple to-logo-mint rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-display font-bold text-xl gradient-text">
                SkillSync
              </span>
            </Link>
            <p className="text-text-secondary text-sm mb-4 max-w-xs">
              Exchange skills, grow together. Connect with people to learn and teach 
              skills in a collaborative community.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/browse" className="text-sm text-text-secondary hover:text-brand-purple transition-colors">
                  Browse Skills
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-text-secondary hover:text-brand-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm text-text-secondary hover:text-brand-purple transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold text-text-primary mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-text-secondary hover:text-brand-purple transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-text-secondary hover:text-brand-purple transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            © {currentYear} SkillSync. All rights reserved.
          </p>
          <p className="text-sm text-text-secondary flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;