import { motion } from 'framer-motion'

export default function SplitText({
    children,
    className = '',
    charClassName = '',
    delay = 0,
    duration = 0.05,
    type = 'chars', // 'chars' | 'words'
    animation = 'fadeUp', // 'fadeUp' | 'fadeIn' | 'slideUp'
}) {
    const text = typeof children === 'string' ? children : ''

    const items = type === 'words'
        ? text.split(' ').map((word, i, arr) => i < arr.length - 1 ? word + ' ' : word)
        : text.split('')

    const animations = {
        fadeUp: {
            initial: { y: 50, opacity: 0 },
            animate: { y: 0, opacity: 1 }
        },
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 }
        },
        slideUp: {
            initial: { y: '100%' },
            animate: { y: 0 }
        }
    }

    const selectedAnimation = animations[animation] || animations.fadeUp

    return (
        <span className={className}>
            {items.map((item, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden"
                >
                    <motion.span
                        className={`inline-block ${charClassName}`}
                        initial={selectedAnimation.initial}
                        whileInView={selectedAnimation.animate}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.6,
                            delay: delay + (i * duration),
                            ease: [0.23, 1, 0.32, 1]
                        }}
                    >
                        {item === ' ' ? '\u00A0' : item}
                    </motion.span>
                </span>
            ))}
        </span>
    )
}
