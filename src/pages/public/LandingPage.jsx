import { Link } from 'react-router-dom';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Users, Search, CheckCircle } from 'lucide-react';
import { HeroAnimation } from '../../components/landing/HeroAnimation';
import { InteractiveBackground } from '../../components/landing/InteractiveBackground';

export function LandingPage() {
    return (
        <PublicLayout>
            {/* Hero Section */}
            <InteractiveBackground className="bg-gradient-to-b from-brand-cream to-white py-20">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
                                Exchange Skills,
                                <br />
                                <span className="text-brand-purple">Build Community</span>
                            </h1>
                            <p className="text-xl text-neutral-700 mb-8 leading-relaxed">
                                Learn what you want. Teach what you know. No money required — just skills, passion, and mutual growth.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/signup">
                                    <Button variant="primary" className="text-lg px-8 py-4">
                                        Join SkillSync
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link to="/browse">
                                    <Button variant="secondary" className="text-lg px-8 py-4">
                                        Browse Skills
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Hero Illustration */}
                        <div className="hidden md:flex items-center justify-center">
                            <HeroAnimation />
                        </div>
                    </div>
                </div>
            </InteractiveBackground>

            {/* How It Works */}
            <InteractiveBackground className="py-20 bg-white">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-center text-neutral-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-center text-neutral-600 mb-16 max-w-2xl mx-auto">
                        Getting started is simple. Join our community and start swapping skills today.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center p-8 rounded-card bg-neutral-50 hover:shadow-soft-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">1. Create Your Profile</h3>
                            <p className="text-neutral-600">
                                Sign up and list the skills you can teach and the ones you want to learn.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center p-8 rounded-card bg-neutral-50 hover:shadow-soft-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">2. Find a Match</h3>
                            <p className="text-neutral-600">
                                Browse users, filter by skills, and send swap requests to potential matches.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center p-8 rounded-card bg-neutral-50 hover:shadow-soft-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">3. Start Learning</h3>
                            <p className="text-neutral-600">
                                Once accepted, coordinate with your match and start your skill exchange journey!
                            </p>
                        </div>
                    </div>
                </div>
            </InteractiveBackground>

            {/* Features */}
            <section className="py-20 bg-neutral-50">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-center text-neutral-900 mb-16">
                        Why SkillSync?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-brand-cyan/20 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-brand-purple" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">100% Free</h3>
                                <p className="text-neutral-600">No payments, no subscriptions. Just pure knowledge exchange.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-brand-cyan/20 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-brand-purple" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
                                <p className="text-neutral-600">Built on trust, transparency, and mutual respect.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-brand-cyan/20 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-brand-purple" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Flexible Learning</h3>
                                <p className="text-neutral-600">Learn at your own pace, on your own schedule.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-brand-cyan/20 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-brand-purple" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Verified Users</h3>
                                <p className="text-neutral-600">Reviews and ratings ensure quality exchanges.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary-gradient text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Start Swapping?</h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Join thousands of learners and teachers exchanging skills every day.
                    </p>
                    <Link to="/signup">
                        <Button variant="secondary" className="text-lg px-8 py-4 bg-white text-brand-purple hover:bg-neutral-100">
                            Get Started Free
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
