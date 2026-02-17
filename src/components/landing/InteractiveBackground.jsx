import { motion } from 'framer-motion';
import { Sparkles, Circle, Heart, Star, Zap, Hexagon, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export function InteractiveBackground({ children, className = '' }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [glitters, setGlitters] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitters(prev => prev.filter(g => Date.now() - g.time < 1000));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
        
        // Add glitter particles on mouse move
        if (Math.random() > 0.7) {
            setGlitters(prev => [...prev, {
                id: Date.now() + Math.random(),
                x: x + (Math.random() - 0.5) * 30,
                y: y + (Math.random() - 0.5) * 30,
                type: Math.floor(Math.random() * 3),
                time: Date.now()
            }]);
        }
    };

    return (
        <div 
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
        >
            {/* Cursor glitter particles */}
            {glitters.map((glitter) => (
                <motion.div
                    key={glitter.id}
                    className="absolute pointer-events-none"
                    style={{
                        left: glitter.x,
                        top: glitter.y
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: [0, -20]
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {glitter.type === 0 && <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />}
                    {glitter.type === 1 && <div className="w-2 h-2 rounded-full bg-green-300" />}
                    {glitter.type === 2 && <div className="w-1 h-1 rounded-full bg-teal-300" />}
                </motion.div>
            ))}

            {/* Cursor glow effect */}
            <div
                className="absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-500 ease-out"
                style={{
                    left: mousePos.x - 200,
                    top: mousePos.y - 200,
                    background: 'radial-gradient(circle, rgba(46, 125, 50, 0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)'
                }}
            />

            {/* Floating arrows - corner to corner */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`arrow-up-${i}`}
                    className="absolute pointer-events-none text-brand-green/25"
                    style={{
                        left: `${i * 10}%`,
                        top: '90%'
                    }}
                    animate={{
                        x: [0, 100 + i * 20],
                        y: [0, -600 - i * 30],
                        opacity: [0, 0.4, 0],
                        rotate: [0, 45]
                    }}
                    transition={{
                        duration: 8 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 1.2
                    }}
                >
                    <ArrowUpRight className="w-4 h-4" />
                </motion.div>
            ))}

            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`arrow-down-${i}`}
                    className="absolute pointer-events-none text-emerald-400/20"
                    style={{
                        right: `${i * 12}%`,
                        top: '5%'
                    }}
                    animate={{
                        x: [0, -80 - i * 15],
                        y: [0, 500 + i * 25],
                        opacity: [0, 0.35, 0],
                        rotate: [0, -45]
                    }}
                    transition={{
                        duration: 9 + i * 0.6,
                        repeat: Infinity,
                        delay: i * 1.5
                    }}
                >
                    <ArrowDownLeft className="w-4 h-4" />
                </motion.div>
            ))}

            {/* Large visible orbs */}
            <motion.div
                className="absolute w-96 h-96 rounded-full pointer-events-none"
                style={{ 
                    background: 'radial-gradient(circle, rgba(46, 125, 50, 0.3) 0%, rgba(241, 248, 233, 0.5) 100%)',
                    filter: 'blur(60px)',
                    top: '20%', 
                    left: '10%' 
                }}
                animate={{
                    x: [0, 50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
            />
            
            <motion.div
                className="absolute w-80 h-80 rounded-full pointer-events-none"
                style={{ 
                    background: 'radial-gradient(circle, rgba(76, 175, 80, 0.25) 0%, rgba(16, 185, 129, 0.3) 100%)',
                    filter: 'blur(60px)',
                    bottom: '20%', 
                    right: '15%' 
                }}
                animate={{
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            />

            {/* Floating sparkles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute pointer-events-none text-brand-green/60"
                    style={{
                        left: `${5 + i * 6.5}%`,
                        top: `${10 + (i % 4) * 20}%`
                    }}
                    animate={{
                        y: [0, -220],
                        opacity: [0, 0.8, 0],
                        rotate: [0, 180]
                    }}
                    transition={{
                        duration: 10 + i * 1.5,
                        repeat: Infinity,
                        delay: i * 0.8
                    }}
                >
                    <Sparkles className="w-4 h-4" />
                </motion.div>
            ))}

            {/* Floating circles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`circle-${i}`}
                    className="absolute pointer-events-none text-brand-green-light/50"
                    style={{
                        left: `${8 + i * 8}%`,
                        top: `${25 + (i % 3) * 25}%`
                    }}
                    animate={{
                        y: [0, -180],
                        x: [0, (i % 2 === 0 ? 40 : -40)],
                        opacity: [0, 0.7, 0],
                        scale: [0.5, 1.2, 0.5]
                    }}
                    transition={{
                        duration: 13 + i,
                        repeat: Infinity,
                        delay: i * 1.2
                    }}
                >
                    <Circle className="w-3 h-3 fill-current" />
                </motion.div>
            ))}

            {/* Floating hearts */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute pointer-events-none text-emerald-500/45"
                    style={{
                        left: `${12 + i * 9}%`,
                        top: `${40 + (i % 2) * 30}%`
                    }}
                    animate={{
                        y: [0, -200],
                        opacity: [0, 0.6, 0],
                        scale: [0.7, 1.3, 0.7]
                    }}
                    transition={{
                        duration: 16 + i * 1.2,
                        repeat: Infinity,
                        delay: i * 1.8
                    }}
                >
                    <Heart className="w-3 h-3 fill-current" />
                </motion.div>
            ))}

            {/* Floating stars */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    className="absolute pointer-events-none text-teal-600/55"
                    style={{
                        left: `${6 + i * 8.5}%`,
                        top: `${15 + (i % 3) * 28}%`
                    }}
                    animate={{
                        y: [0, -190],
                        opacity: [0, 0.75, 0],
                        rotate: [0, 360],
                        scale: [0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: 14 + i * 1.3,
                        repeat: Infinity,
                        delay: i * 1.5
                    }}
                >
                    <Star className="w-4 h-4 fill-current" />
                </motion.div>
            ))}

            {/* Floating zaps */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`zap-${i}`}
                    className="absolute pointer-events-none text-green-600/50"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 2) * 35}%`
                    }}
                    animate={{
                        y: [0, -170],
                        x: [0, (i % 2 === 0 ? -20 : 20)],
                        opacity: [0, 0.65, 0],
                        rotate: [0, -180]
                    }}
                    transition={{
                        duration: 12 + i * 1.8,
                        repeat: Infinity,
                        delay: i * 2
                    }}
                >
                    <Zap className="w-3 h-3 fill-current" />
                </motion.div>
            ))}

            {/* Floating hexagons */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`hex-${i}`}
                    className="absolute pointer-events-none text-emerald-600/55"
                    style={{
                        left: `${7 + i * 10}%`,
                        top: `${30 + (i % 3) * 22}%`
                    }}
                    animate={{
                        y: [0, -210],
                        opacity: [0, 0.7, 0],
                        rotate: [0, 120],
                        scale: [0.6, 1.1, 0.6]
                    }}
                    transition={{
                        duration: 15 + i * 1.4,
                        repeat: Infinity,
                        delay: i * 1.6
                    }}
                >
                    <Hexagon className="w-3 h-3" />
                </motion.div>
            ))}

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
