import { motion } from 'framer-motion';
import { Code, Palette, Brain, Music, TrendingUp } from 'lucide-react';

export function HeroAnimation() {
    const skillIcons = [
        { Icon: Code, delay: 0, color: 'text-brand-purple' },
        { Icon: Palette, delay: 0.2, color: 'text-brand-orange' },
        { Icon: Brain, delay: 0.4, color: 'text-brand-cyan' },
        { Icon: Music, delay: 0.6, color: 'text-brand-orange' },
        { Icon: TrendingUp, delay: 0.8, color: 'text-brand-purple' }
    ];

    return (
        <div className="w-full h-96 bg-primary-gradient rounded-card-lg relative overflow-hidden shadow-premium" style={{ perspective: '1000px' }}>
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple via-brand-cyan to-brand-purple bg-[length:200%_200%] animate-gradient" />
            
            {/* Glowing blobs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-orange/30 rounded-full blur-[80px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-cream/30 rounded-full blur-[80px]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />

            {/* 3D Scene Container */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {/* Left Avatar */}
                <motion.div
                    className="absolute left-[15%] w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-glow-purple"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: [0, 5, 0, -5, 0], y: [0, -10, 0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-white to-brand-cyan/30 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg m-4">
                        T
                    </div>
                </motion.div>

                {/* Right Avatar */}
                <motion.div
                    className="absolute right-[15%] w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-glow-orange"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: [0, -5, 0, 5, 0], y: [0, -10, 0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-white to-brand-orange/30 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg m-4">
                        L
                    </div>
                </motion.div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    <motion.line
                        x1="25%" y1="50%" x2="75%" y2="50%"
                        stroke="rgba(241, 230, 201, 0.5)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </svg>

                {/* Floating Skill Icons */}
                {skillIcons.map(({ Icon, delay, color }, index) => {
                    const angle = (index / skillIcons.length) * Math.PI * 2;
                    const radius = 120;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <motion.div
                            key={index}
                            className={`absolute w-14 h-14 bg-white/95 backdrop-blur-sm rounded-xl shadow-premium flex items-center justify-center ${color}`}
                            style={{ left: '50%', top: '50%', transformStyle: 'preserve-3d' }}
                            animate={{
                                x: [x * 0.8, x * 1.2, x * 0.8],
                                y: [y * 0.8, y * 1.2, y * 0.8],
                                rotateZ: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay }}
                        >
                            <Icon className="w-7 h-7" strokeWidth={2.5} />
                        </motion.div>
                    );
                })}

                {/* Center Glow */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
            </div>
        </div>
    );
}
