import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Services from './Services'
import Contact from './Contact'
import Work from './Work'
import MagneticButton from './MagneticButton'
import SplitText from './SplitText'
import Logo from '../../assets/logo.svg'

// Lazy load 3D scene for better initial page load
const Scene = lazy(() => import('../canvas/Scene'))

export default function Overlay() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const menuVariants = {
        closed: { opacity: 0, x: "100%" },
        open: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
    }

    const linkVariants = {
        closed: { opacity: 0, y: 50 },
        open: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }
        })
    }

    const navItems = ['WORK', 'SERVICES', 'ABOUT', 'CONTACT']

    return (
        <main className="w-full text-light">
            {/* Noise Overlay */}
            <div className="noise-overlay" />

            {/* --- FIXED NAVIGATION --- */}
            <nav className="fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-50">
                {/* Logo Area */}
                <MagneticButton strength={0.2}>
                    <motion.a
                        href="#"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <img src={Logo} alt="PLETO" className="h-10 md:h-12 w-auto rounded-md" />
                    </motion.a>
                </MagneticButton>

                {/* Desktop Menu */}
                <motion.div
                    className="hidden md:flex items-center gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                    {navItems.map((item) => (
                        <MagneticButton key={item} strength={0.15}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                className="relative px-5 py-2 font-body text-xs font-semibold tracking-widest text-muted hover:text-light transition-colors duration-300 group"
                            >
                                {item}
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                            </a>
                        </MagneticButton>
                    ))}

                    {/* CTA Button */}
                    <MagneticButton strength={0.2}>
                        <a
                            href="#contact"
                            className="ml-4 px-6 py-3 font-body text-xs font-bold tracking-widest bg-accent text-dark rounded-full hover:bg-light transition-colors duration-300"
                        >
                            LET'S TALK
                        </a>
                    </MagneticButton>
                </motion.div>

                {/* Mobile Menu Toggle */}
                <motion.button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden relative w-12 h-12 flex flex-col items-center justify-center gap-1.5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.span
                        className="w-6 h-0.5 bg-light block"
                        animate={{
                            rotate: isMenuOpen ? 45 : 0,
                            y: isMenuOpen ? 4 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="w-6 h-0.5 bg-light block"
                        animate={{
                            rotate: isMenuOpen ? -45 : 0,
                            y: isMenuOpen ? -4 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
            </nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-dark flex flex-col justify-center items-center"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="flex flex-col gap-6 text-center">
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-header text-4xl md:text-6xl font-bold tracking-widest text-light hover:text-accent transition-colors overflow-hidden"
                                    custom={i}
                                    variants={linkVariants}
                                    initial="closed"
                                    animate="open"
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Menu Footer */}
                        <motion.div
                            className="absolute bottom-8 flex gap-6 text-sm text-muted"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <a href="#" className="hover:text-accent transition-colors">IG</a>
                            <a href="#" className="hover:text-accent transition-colors">LI</a>
                            <a href="#" className="hover:text-accent transition-colors">TW</a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- HERO SECTION --- */}
            <section id="home" className="h-screen flex flex-col justify-center items-center relative px-4 md:px-8">
                {/* 3D Scene Box */}
                <motion.div
                    className="absolute top-20 bottom-20 left-4 right-4 md:top-24 md:bottom-16 md:left-16 md:right-16 lg:top-28 lg:bottom-24 lg:left-24 lg:right-24 border border-white/10 rounded-2xl overflow-hidden bg-darker/50"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/50 rounded-tl-2xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/50 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent/50 rounded-bl-2xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/50 rounded-br-2xl" />

                    {/* 3D Canvas - Lazy loaded */}
                    <div className="w-full h-full">
                        <Suspense fallback={
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                            </div>
                        }>
                            <Scene />
                        </Suspense>
                    </div>
                </motion.div>

                {/* Main Title - overlaid on the box */}
                <div className="text-center z-10 pointer-events-none">
                    <motion.div
                        className="overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="font-header text-[15vw] md:text-[12vw] leading-[0.9] font-bold tracking-tight text-light">
                            <SplitText delay={0.3} duration={0.08}>
                                PLETO
                            </SplitText>
                        </h1>
                    </motion.div>

                    <motion.div
                        className="overflow-hidden mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <h2 className="font-header text-[8vw] md:text-[5vw] leading-none font-bold tracking-[0.2em] text-accent">
                            <SplitText delay={0.8} duration={0.06}>
                                WORKS
                            </SplitText>
                        </h2>
                    </motion.div>
                </div>

                {/* Subtitle */}
                <motion.p
                    className="mt-8 text-muted font-body text-sm md:text-base max-w-lg text-center tracking-wide z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    DIGITAL EXPERIENCES <span className="text-accent">•</span> CREATIVE DIRECTION <span className="text-accent">•</span> 3D MOTION
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <span className="font-body text-xs text-muted tracking-widest">SCROLL</span>
                    <motion.div
                        className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent"
                        animate={{ scaleY: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>

                {/* Corner Text */}
                <motion.div
                    className="absolute bottom-8 left-8 hidden md:block z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <p className="font-body text-xs text-muted tracking-widest">
                        BASED IN<br />
                        <span className="text-light">WORLDWIDE</span>
                    </p>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 right-8 hidden md:block text-right z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <p className="font-body text-xs text-muted tracking-widest">
                        AVAILABLE FOR<br />
                        <span className="text-accent">NEW PROJECTS</span>
                    </p>
                </motion.div>
            </section>

            {/* --- CONTENT SECTIONS --- */}
            <Work />
            <Services />
            <Contact />
        </main>
    )
}
