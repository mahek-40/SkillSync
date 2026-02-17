import { motion } from 'framer-motion';
import { Code, Palette, Brain, Music, TrendingUp } from 'lucide-react';

export function HeroAnimation() {
    const skillIcons = [
        { Icon: Code, delay: 0, color: 'text-emerald-400' },
        { Icon: Palette, delay: 0.2, color: 'text-teal-400' },
        { Icon: Brain, delay: 0.4, color: 'text-green-400' },
        { Icon: Music, delay: 0.6, color: 'text-lime-400' },
        { Icon: TrendingUp, delay: 0.8, color: 'text-cyan-400' }
    ];

    return (
        <div className="w-full h-96 bg-gradient-to-br from-brand-green to-brand-green-light rounded-card-lg relative overflow-hidden" style={{ perspective: '1000px' }}>
            {/* Ambient glow effects */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-300 rounded-full blur-3xl" />
            </div>

            {/* 3D Scene Container */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {/* Left Avatar */}
                <motion.div
                    className="absolute left-[15%] w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl flex items-center justify-center"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{
                        rotateY: [0, 5, 0, -5, 0],
                        y: [0, -10, 0, -10, 0],
                        z: [0, 20, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-white to-emerald-100 rounded-xl flex items-center justify-center text-2xl font-bold text-brand-green shadow-lg">
                        T
                    </div>
                </motion.div>

                {/* Right Avatar */}
                <motion.div
                    className="absolute right-[15%] w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl flex items-center justify-center"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{
                        rotateY: [0, -5, 0, 5, 0],
                        y: [0, -10, 0, -10, 0],
                        z: [0, 20, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-white to-teal-100 rounded-xl flex items-center justify-center text-2xl font-bold text-brand-green shadow-lg">
                        L
                    </div>
                </motion.div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    <motion.line
                        x1="25%"
                        y1="50%"
                        x2="75%"
                        y2="50%"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
                            className={`absolute w-14 h-14 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl flex items-center justify-center ${color}`}
                            style={{
                                left: '50%',
                                top: '50%',
                                transformStyle: 'preserve-3d'
                            }}
                            animate={{
                                x: [x * 0.8, x * 1.2, x * 0.8],
                                y: [y * 0.8, y * 1.2, y * 0.8],
                                rotateZ: [0, 360],
                                rotateY: [0, 180, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: delay
                            }}
                        >
                            <Icon className="w-7 h-7" strokeWidth={2.5} />
                        </motion.div>
                    );
                })}

                {/* Center Glow */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 rounded-full blur-2xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </div>
    );
}
