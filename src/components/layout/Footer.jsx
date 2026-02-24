import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-neutral-900 text-white mt-auto">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/logo.png" alt="SkillSync" className="h-20" />
                        </div>
                        <p className="text-neutral-400 max-w-md mb-6">
                            Exchange skills, build community. Learn what you want, teach what you know — no money required.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-brand-purple transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-brand-purple transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-brand-purple transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="mailto:hello@skillsync.com"
                                className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-brand-purple transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-neutral-400">
                            <li><Link to="/browse" className="hover:text-white transition-colors">Browse Skills</Link></li>
                            <li><Link to="/exchange" className="hover:text-white transition-colors">Find a Match</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">How It Works</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-neutral-400">
                            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/guidelines" className="hover:text-white transition-colors">Community Guidelines</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-500 text-sm">
                    <p>© {new Date().getFullYear()} SkillSync. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
