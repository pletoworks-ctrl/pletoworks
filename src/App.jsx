import { useEffect, useState, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import Overlay from './components/ui/Overlay'
import CustomCursor from './components/ui/CustomCursor'
import Preloader from './components/ui/Preloader'
import ScrollProgress from './components/ui/ScrollProgress'

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const lenisRef = useRef(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        lenisRef.current = lenis

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    return (
        <>
            {/* Preloader */}
            {isLoading && (
                <Preloader onComplete={() => setIsLoading(false)} />
            )}

            {/* Custom Cursor */}
            <CustomCursor />

            {/* Scroll Progress */}
            <ScrollProgress />

            {/* Main Content */}
            <Overlay />
        </>
    )
}

export default App
