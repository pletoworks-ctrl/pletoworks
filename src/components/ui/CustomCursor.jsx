import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [cursorText, setCursorText] = useState('')
    const [isMobile, setIsMobile] = useState(true)

    // Inner dot position - follows cursor directly
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    // Outer ring - slight lag for trailing effect
    const ringConfig = { damping: 20, stiffness: 500 }
    const ringX = useSpring(cursorX, ringConfig)
    const ringY = useSpring(cursorY, ringConfig)

    // Check for mobile/touch devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(pointer: coarse)').matches)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (isMobile) return

        const moveCursor = (e) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        const handleMouseOver = (e) => {
            const target = e.target
            const interactive = target.closest('a, button, [data-cursor="pointer"]')
            const textElement = target.closest('[data-cursor-text]')

            if (interactive) {
                setIsHovering(true)
            }
            if (textElement) {
                setCursorText(textElement.dataset.cursorText)
            }
        }

        const handleMouseOut = (e) => {
            const target = e.target
            const relatedTarget = e.relatedTarget
            const interactive = target.closest('a, button, [data-cursor="pointer"]')
            const textElement = target.closest('[data-cursor-text]')

            // Check if we're leaving an interactive element
            if (interactive && (!relatedTarget || !interactive.contains(relatedTarget))) {
                setIsHovering(false)
            }
            if (textElement && (!relatedTarget || !textElement.contains(relatedTarget))) {
                setCursorText('')
            }
        }

        window.addEventListener('mousemove', moveCursor, { passive: true })
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mouseover', handleMouseOver, { passive: true })
        document.addEventListener('mouseout', handleMouseOut, { passive: true })

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseout', handleMouseOut)
        }
    }, [isMobile, cursorX, cursorY])

    if (isMobile) return null

    return (
        <>
            {/* Main cursor dot - follows instantly */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-9999"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <motion.div
                    className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        scale: isClicking ? 0.8 : isHovering ? 2 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                >
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{
                            backgroundColor: isHovering ? '#c9ff00' : '#f0f0f0'
                        }}
                    />
                    {cursorText && (
                        <span className="absolute whitespace-nowrap text-[10px] font-body font-bold text-dark tracking-wider">
                            {cursorText}
                        </span>
                    )}
                </motion.div>
            </motion.div>

            {/* Cursor outline/ring - trails behind */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-9998"
                style={{
                    x: ringX,
                    y: ringY,
                }}
            >
                <motion.div
                    className="w-8 h-8 border border-light/40 rounded-full -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
                        opacity: isHovering ? 0.2 : 0.4,
                        borderColor: isHovering ? '#c9ff00' : 'rgba(240, 240, 240, 0.4)',
                    }}
                    transition={{ duration: 0.15 }}
                />
            </motion.div>
        </>
    )
}
