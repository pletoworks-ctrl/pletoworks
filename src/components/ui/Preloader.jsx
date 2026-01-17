import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const duration = 2000 // 2 seconds
        const interval = 20 // Update every 20ms
        const increment = 100 / (duration / interval)

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment + Math.random() * 2
                if (next >= 100) {
                    clearInterval(timer)
                    setTimeout(() => {
                        setIsVisible(false)
                        setTimeout(onComplete, 800)
                    }, 300)
                    return 100
                }
                return next
            })
        }, interval)

        return () => clearInterval(timer)
    }, [onComplete])

    const text = "PLETO"

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[10000] bg-dark flex flex-col items-center justify-center"
                    exit={{
                        clipPath: 'inset(0 0 100% 0)',
                    }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Logo Animation */}
                    <div className="relative mb-8">
                        <motion.div className="flex overflow-hidden">
                            {text.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    className="font-header text-6xl md:text-8xl font-bold tracking-[0.2em] text-accent"
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: i * 0.1,
                                        ease: [0.23, 1, 0.32, 1]
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Glowing underline */}
                        <motion.div
                            className="absolute -bottom-2 left-0 h-[2px] bg-accent"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            style={{ boxShadow: '0 0 20px rgba(201, 255, 0, 0.5)' }}
                        />
                    </div>

                    {/* Progress Text */}
                    <motion.div
                        className="font-body text-sm text-muted tracking-widest"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <span className="text-accent font-semibold">{Math.round(progress)}</span>
                        <span className="text-muted">%</span>
                    </motion.div>

                    {/* Bottom text */}
                    <motion.p
                        className="absolute bottom-8 font-body text-xs text-muted tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        Digital Experiences Studio
                    </motion.p>

                    {/* Corner decorations */}
                    <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-accent/30" />
                    <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-accent/30" />
                    <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-accent/30" />
                    <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-accent/30" />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
