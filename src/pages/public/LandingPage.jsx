import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Search, MessageCircle, Star, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const LandingPage = () => {
  const features = [
    {
      icon: Search,
      title: 'Discover Skills',
      description: 'Browse through diverse skills offered by talented people in your community.',
    },
    {
      icon: Users,
      title: 'Connect & Match',
      description: 'Find the perfect skill swap partner and connect with like-minded learners.',
    },
    {
      icon: MessageCircle,
      title: 'Exchange Safely',
      description: 'Communicate directly and exchange skills in a trusted environment.',
    },
    {
      icon: Star,
      title: 'Build Reputation',
      description: 'Rate and review your experiences to build a trusted profile.',
    },
  ];
  
  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up and list the skills you can teach and want to learn.',
    },
    {
      number: '02',
      title: 'Find Your Match',
      description: 'Search for people who offer skills you want and need what you offer.',
    },
    {
      number: '03',
      title: 'Start Learning',
      description: 'Connect, schedule sessions, and grow together through skill exchange.',
    },
  ];
  
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Graphic Designer',
      content: 'I learned web development by teaching design. Best decision ever!',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Developer',
      content: 'Finally learned guitar without spending money. The community is amazing.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Language Teacher',
      content: 'Teaching Spanish while learning photography. Win-win!',
      rating: 5,
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-logo-lavender to-bg-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-brand-purple" />
                <span className="text-sm font-medium text-brand-purple">
                  Join 10,000+ skill exchangers
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Exchange Skills,
                <span className="gradient-text block">Grow Together</span>
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                Learn new skills without spending money. Teach what you know, 
                learn what you need, and build meaningful connections.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="group">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/browse">
                  <Button size="lg" variant="outline">
                    Browse Skills
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-bold text-brand-purple">10K+</p>
                  <p className="text-sm text-text-secondary">Active Users</p>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-brand-purple">50K+</p>
                  <p className="text-sm text-text-secondary">Skills Exchanged</p>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-brand-purple">4.9/5</p>
                  <p className="text-sm text-text-secondary">User Rating</p>
                </div>
              </div>
            </motion.div>
            
            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-soft-xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {['Photoshop', 'Guitar', 'Spanish', 'Coding'].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="bg-gradient-to-br from-purple-50 to-mint-50 rounded-xl p-6 text-center"
                    >
                      <p className="font-semibold text-brand-purple">{skill}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-logo-peach rounded-full p-4 shadow-glow"
              >
                <Star className="w-6 h-6 text-white fill-white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-logo-mint rounded-full p-4 shadow-glow"
              >
                <Users className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Why Choose <span className="gradient-text">SkillSync</span>?
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              A trusted platform for skill exchange that puts community first
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <div className="mb-4 inline-flex p-4 bg-purple-50 rounded-2xl">
                    <feature.icon className="w-8 h-8 text-brand-purple" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-mint-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-text-secondary">
              Start exchanging skills in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="text-center">
                  <div className="text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-logo-purple to-logo-mint mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-text-secondary">{step.description}</p>
                </Card>
                
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 text-brand-purple" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Loved by Our Community
            </h2>
            <p className="text-xl text-text-secondary">
              See what others are saying about SkillSync
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-text-secondary mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-text-secondary">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-purple to-logo-purple text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of people exchanging skills and growing together.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
                Join SkillSync Today
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;