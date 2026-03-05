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
            <InteractiveBackground className="relative bg-white py-20 overflow-hidden">
                {/* Subtle decorative elements */}
                <div className="absolute top-20 right-10 w-64 h-64 bg-brand/3 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
                
                <div className="container-custom relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
                                Exchange Skills,
                                <br />
                                <span className="text-brand">Build Community</span>
                            </h1>
                            <p className="text-xl text-primary/70 mb-8 leading-relaxed">
                                Learn what you want. Teach what you know. No money required — just skills, passion, and mutual growth.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/signup">
                                    <Button variant="primary" className="text-lg px-8 py-4 hover:scale-105 hover:shadow-lg transition-all duration-300">
                                        Join SkillSync
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link to="/browse">
                                    <Button variant="secondary" className="text-lg px-8 py-4 hover:scale-105 hover:shadow-md transition-all duration-300">
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
                    <h2 className="text-4xl font-bold text-center text-primary mb-4">
                        How It Works
                    </h2>
                    <p className="text-center text-primary/60 mb-16 max-w-2xl mx-auto">
                        Getting started is simple. Join our community and start swapping skills today.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center p-8 rounded-card bg-base hover:shadow-soft-lg transition-shadow">
                            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-primary">1. Create Your Profile</h3>
                            <p className="text-primary/60">
                                Sign up and list the skills you can teach and the ones you want to learn.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center p-8 rounded-card bg-base hover:shadow-soft-lg transition-shadow">
                            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-primary">2. Find a Match</h3>
                            <p className="text-primary/60">
                                Browse users, filter by skills, and send swap requests to potential matches.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center p-8 rounded-card bg-base hover:shadow-soft-lg transition-shadow">
                            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-primary">3. Start Learning</h3>
                            <p className="text-primary/60">
                                Once accepted, coordinate with your match and start your skill exchange journey!
                            </p>
                        </div>
                    </div>
                </div>
            </InteractiveBackground>

            {/* Features */}
            <section className="py-20 bg-base">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-center text-primary mb-16">
                        Why SkillSync?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-brand/20 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-brand" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-primary">100% Free</h3>
                                <p className="text-primary/60">No payments, no subscriptions. Just pure knowledge exchange.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-brand/20 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-brand" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-primary">Community Driven</h3>
                                <p className="text-primary/60">Built on trust, transparency, and mutual respect.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-brand/20 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-brand" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-primary">Flexible Learning</h3>
                                <p className="text-primary/60">Learn at your own pace, on your own schedule.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-lg bg-brand/20 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-brand" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-primary">Verified Users</h3>
                                <p className="text-primary/60">Reviews and ratings ensure quality exchanges.</p>
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
                        <Button variant="secondary" className="text-lg px-8 py-4 bg-white text-brand hover:bg-base">
                            Get Started Free
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
