import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import Marquee from './Marquee'

export default function Contact() {
    return (
        <section id="contact" className="min-h-screen bg-dark text-white relative z-10 flex flex-col">
            {/* Marquee Banner */}
            <div className="py-6 md:py-8 border-y border-white/10 bg-darker">
                <Marquee speed={30}>
                    <span className="font-header text-4xl md:text-6xl lg:text-8xl font-bold text-accent/10 mx-4 md:mx-8">
                        LET'S CREATE TOGETHER
                    </span>
                    <span className="font-header text-4xl md:text-6xl lg:text-8xl font-bold text-light/10 mx-4 md:mx-8">
                        •
                    </span>
                    <span className="font-header text-4xl md:text-6xl lg:text-8xl font-bold text-accent/10 mx-4 md:mx-8">
                        START YOUR PROJECT
                    </span>
                    <span className="font-header text-4xl md:text-6xl lg:text-8xl font-bold text-light/10 mx-4 md:mx-8">
                        •
                    </span>
                </Marquee>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center p-6 md:p-16 lg:p-24">
                <div className="max-w-7xl mx-auto w-full">
                    {/* CTA Section */}
                    <div className="grid md:grid-cols-2 gap-16 md:gap-8 items-center mb-24">
                        <div>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="font-body text-accent uppercase tracking-widest text-sm mb-6"
                            >
                                Ready to start?
                            </motion.p>

                            <motion.h2
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="font-header text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9]"
                            >
                                LET'S<br />
                                <span className="text-gradient">TALK</span>
                            </motion.h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col gap-8"
                        >
                            <p className="font-body text-muted text-base md:text-lg max-w-md">
                                Have a project in mind? We'd love to hear about it. Drop us a line and let's create something extraordinary together.
                            </p>

                            <MagneticButton strength={0.3}>
                                <a
                                    href="mailto:hello@pletoworks.com"
                                    className="inline-flex items-center gap-3 md:gap-4 px-5 md:px-8 py-4 md:py-5 bg-accent text-dark font-body font-bold text-xs md:text-sm tracking-widest rounded-full hover:bg-light transition-colors duration-300 group"
                                >
                                    <span>GET IN TOUCH</span>
                                    <span className="group-hover:rotate-45 transition-transform duration-300">↗</span>
                                </a>
                            </MagneticButton>
                        </motion.div>
                    </div>

                    {/* Info Grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 py-8 md:py-12 border-t border-white/10"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <p className="font-body text-xs text-muted uppercase tracking-widest mb-2 md:mb-3">Email</p>
                            <a href="mailto:hello@pletoworks.com" className="font-body text-sm text-light hover:text-accent transition-colors break-all">
                                hello@pletoworks.com
                            </a>
                        </div>

                        <div>
                            <p className="font-body text-xs text-muted uppercase tracking-widest mb-2 md:mb-3">Location</p>
                            <p className="font-body text-sm text-light">
                                Worldwide / Remote
                            </p>
                        </div>

                        <div>
                            <p className="font-body text-xs text-muted uppercase tracking-widest mb-2 md:mb-3">Availability</p>
                            <p className="font-body text-sm text-accent">
                                Open for projects
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <footer className="p-4 md:p-6 lg:p-8 border-t border-white/10">
                <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-4">
                    {/* Top row: Social Links and Back to Top */}
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                        {/* Social Links */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            {['IG', 'LI', 'TW', 'DR'].map((social, index) => {
                                const fullNames = ['INSTAGRAM', 'LINKEDIN', 'TWITTER', 'DRIBBBLE']
                                return (
                                    <MagneticButton key={social} strength={0.2}>
                                        <a
                                            href="#"
                                            className="font-body text-xs text-muted hover:text-accent transition-colors tracking-widest"
                                        >
                                            <span className="md:hidden">{social}</span>
                                            <span className="hidden md:inline">{fullNames[index]}</span>
                                        </a>
                                    </MagneticButton>
                                )
                            })}
                        </div>

                        {/* Back to Top */}
                        <MagneticButton strength={0.3}>
                            <a
                                href="#home"
                                className="flex items-center gap-2 font-body text-xs text-muted hover:text-accent transition-colors tracking-widest group"
                            >
                                <span>BACK TO TOP</span>
                                <span className="group-hover:-translate-y-1 transition-transform">↑</span>
                            </a>
                        </MagneticButton>
                    </div>

                    {/* Bottom row: Copyright */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs md:text-sm font-body text-muted text-center">
                        <span>© 2024 PLETO</span>
                        <span className="hidden sm:block w-1 h-1 bg-accent rounded-full" />
                        <span>ALL RIGHTS RESERVED</span>
                    </div>
                </div>
            </footer>
        </section>
    )
}
