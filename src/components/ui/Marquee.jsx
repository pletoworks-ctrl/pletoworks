import { motion } from 'framer-motion'

export default function Marquee({
    children,
    speed = 25,
    direction = 'left',
    className = '',
    pauseOnHover = true,
}) {
    const content = (
        <div className="flex items-center gap-8 whitespace-nowrap">
            {children}
            {children}
        </div>
    )

    return (
        <div
            className={`overflow-hidden ${className}`}
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
            <motion.div
                className={`flex ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
                animate={{
                    x: direction === 'left' ? [0, '-50%'] : ['-50%', 0]
                }}
                transition={{
                    x: {
                        duration: speed,
                        repeat: Infinity,
                        ease: 'linear'
                    }
                }}
            >
                {content}
                {content}
            </motion.div>
        </div>
    )
}
