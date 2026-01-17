import { motion } from 'framer-motion'

export default function Work() {
    return (
        <section className="min-h-screen py-16 md:py-24 px-4 md:px-8 bg-dark relative z-10">
            {/* Section Header */}
            <div className="mb-10 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="font-body text-xs md:text-sm text-accent tracking-widest uppercase block mb-3 md:mb-4">
                        Selected Work
                    </span>
                    <h2 className="font-header text-3xl md:text-5xl lg:text-7xl font-bold text-light">
                        PROJECTS
                    </h2>
                </motion.div>
            </div>

            {/* Coming Soon State */}
            <motion.div
                className="flex flex-col items-center justify-center py-20 md:py-32 border border-white/10 rounded-xl md:rounded-2xl bg-card/30"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.div
                    className="w-14 h-14 md:w-20 md:h-20 border-2 border-accent/30 rounded-full flex items-center justify-center mb-6 md:mb-8"
                    animate={{
                        scale: [1, 1.1, 1],
                        borderColor: ['rgba(201, 255, 0, 0.3)', 'rgba(201, 255, 0, 0.6)', 'rgba(201, 255, 0, 0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-accent rounded-full" />
                </motion.div>

                <h3 className="font-header text-xl md:text-3xl lg:text-4xl font-bold text-light mb-3 md:mb-4">
                    COMING SOON
                </h3>
                <p className="font-body text-muted text-center text-sm md:text-base max-w-md px-6 md:px-4">
                    We're crafting something amazing. Our portfolio will be unveiled here shortly.
                </p>
            </motion.div>
        </section>
    )
}
