import { motion } from 'framer-motion'
import { useState } from 'react'

const services = [
    {
        id: '01',
        title: 'DIGITAL MARKETING',
        description: 'Strategic campaigns that drive growth and engagement across all digital channels.',
        tags: ['SEO', 'PPC', 'Analytics']
    },
    {
        id: '02',
        title: 'WEBSITE CREATION',
        description: 'Custom-built websites with cutting-edge technology and stunning visuals.',
        tags: ['React', 'Next.js', 'Three.js']
    },
    {
        id: '03',
        title: 'BRAND IDENTITY',
        description: 'Comprehensive branding that tells your story and connects with your audience.',
        tags: ['Logo', 'Guidelines', 'Strategy']
    },
    {
        id: '04',
        title: 'CREATIVE DIRECTION',
        description: 'Visionary leadership that transforms ideas into impactful visual experiences.',
        tags: ['Art Direction', 'Concept', 'Vision']
    },
    {
        id: '05',
        title: '3D & MOTION',
        description: 'Immersive 3D experiences and motion graphics that captivate and inspire.',
        tags: ['WebGL', 'Animation', 'VFX']
    },
    {
        id: '06',
        title: 'WEB APPLICATIONS',
        description: 'Powerful, scalable applications built with modern frameworks and best practices.',
        tags: ['SaaS', 'Dashboard', 'API']
    }
]

export default function Services() {
    const [hoveredIndex, setHoveredIndex] = useState(null)

    return (
        <section id="services" className="min-h-screen py-16 md:py-24 px-4 md:px-8 bg-dark relative z-10">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto mb-10 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6"
                >
                    <div>
                        <span className="font-body text-xs md:text-sm text-accent tracking-widest uppercase block mb-3 md:mb-4">
                            What We Do
                        </span>
                        <h2 className="font-header text-3xl md:text-5xl lg:text-6xl font-bold text-light">
                            OUR SERVICES
                        </h2>
                    </div>
                    <p className="font-body text-muted max-w-md text-sm">
                        We blend creativity with technology to deliver exceptional digital experiences.
                    </p>
                </motion.div>
            </div>

            {/* Services List */}
            <div className="max-w-7xl mx-auto">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        className="group relative border-t border-white/10 cursor-pointer"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Background Highlight */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            style={{ transformOrigin: 'left' }}
                        />

                        <div className="relative py-6 md:py-10 flex flex-col md:flex-row md:items-center gap-3 md:gap-8 transition-all duration-500 group-hover:px-4">
                            {/* Number & Title Row on Mobile */}
                            <div className="flex items-center gap-4 md:contents">
                                {/* Number */}
                                <span className="font-body text-xs md:text-sm text-accent tracking-widest shrink-0">
                                    {service.id}
                                </span>

                                {/* Title */}
                                <h3 className="font-header text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-light group-hover:text-accent transition-colors duration-500 md:flex-1">
                                    {service.title}
                                </h3>
                            </div>

                            {/* Description - Hidden on mobile, shown on hover for desktop */}
                            <motion.p
                                className="hidden lg:block font-body text-sm text-muted max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            >
                                {service.description}
                            </motion.p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                                {service.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="font-body text-[10px] md:text-xs text-muted border border-white/10 px-2 md:px-3 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Arrow */}
                            <motion.span
                                className="hidden md:block text-2xl text-accent"
                                initial={{ x: -10, opacity: 0 }}
                                animate={{
                                    x: hoveredIndex === index ? 0 : -10,
                                    opacity: hoveredIndex === index ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                →
                            </motion.span>
                        </div>
                    </motion.div>
                ))}
                <div className="border-t border-white/10" />
            </div>

            {/* Bottom CTA */}
            <motion.div
                className="max-w-7xl mx-auto mt-10 md:mt-16 text-center md:text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                <p className="font-body text-muted text-xs md:text-sm mb-4 md:mb-6">
                    Have a project in mind?
                </p>
                <a
                    href="#contact"
                    className="inline-flex items-center gap-2 md:gap-3 font-body text-xs md:text-sm font-semibold text-light hover:text-accent transition-colors group"
                >
                    <span>START A PROJECT</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                </a>
            </motion.div>
        </section>
    )
}
