import { useEffect, useState, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import Overlay from './components/ui/Overlay'
import CustomCursor from './components/ui/CustomCursor'
import Preloader from './components/ui/Preloader'
import ScrollProgress from './components/ui/ScrollProgress'

// Expose GPU detection utility globally for debugging
window.checkGPU = function() {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) {
        // console.log('❌ No WebGL support')
        return { hasGPU: false, reason: 'No WebGL support' }
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)

        // console.log('🎮 GPU Info:')
        // console.log('  Renderer:', renderer)
        // console.log('  Vendor:', vendor)

        // Check for software renderers
        const softwareRenderers = ['SwiftShader', 'llvmpipe', 'Software', 'Microsoft Basic Render Driver']
        for (const sw of softwareRenderers) {
            if (renderer.includes(sw)) {
                // console.log('  ⚠️  Software renderer detected (no hardware GPU)')
                return { hasGPU: false, renderer, vendor, reason: 'Software renderer' }
            }
        }

        // Check for integrated graphics
        const integratedPatterns = ['Intel HD Graphics', 'Intel(R) HD Graphics', 'Intel UHD Graphics', 'Intel(R) UHD Graphics', 'Intel Iris', 'Mesa DRI Intel', 'AMD Radeon(TM) Graphics']
        for (const pattern of integratedPatterns) {
            if (renderer.includes(pattern)) {
                // console.log('  ⚠️  Integrated/low-end GPU detected')
                return { hasGPU: false, renderer, vendor, reason: 'Integrated graphics' }
            }
        }

        // console.log('  ✅ Dedicated GPU detected')
        return { hasGPU: true, renderer, vendor, reason: 'Dedicated GPU' }
    }

    // console.log('  ❓ Could not detect GPU info')
    return { hasGPU: false, reason: 'Detection failed' }
}

// console.log('💡 Run window.checkGPU() in console to check your GPU')

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const lenisRef = useRef(null)

    useEffect(() => {
        // Disable Lenis on mobile - use native scroll for better performance
        const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768

        if (isMobile) {
            lenisRef.current = null
            return
        }

        const lenis = new Lenis({
            duration: 1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
        })

        lenisRef.current = lenis

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            if (lenis) {
                lenis.destroy()
            }
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
