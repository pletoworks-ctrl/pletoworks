import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import { Environment } from '@react-three/drei'
import HeroModel from './HeroModel'

// Detect if GPU is available (same as HeroModel)
function detectGPUCapability() {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) {
        console.log('[GPU Detection - Scene] No WebGL support - using low-performance mode')
        return false
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)

        console.log('[GPU Detection - Scene] Renderer:', renderer)
        console.log('[GPU Detection - Scene] Vendor:', vendor)

        // Software renderers (no GPU)
        if (renderer.includes('SwiftShader') ||
            renderer.includes('llvmpipe') ||
            renderer.includes('Software') ||
            renderer.includes('Microsoft Basic Render Driver')) {
            console.log('[GPU Detection - Scene] Software renderer detected - using low-performance mode')
            return false
        }

        // Integrated/low-end GPUs (treat as no GPU for heavy effects)
        const lowEndPatterns = [
            'Intel HD Graphics',
            'Intel(R) HD Graphics',
            'Intel UHD Graphics',
            'Intel(R) UHD Graphics',
            'Intel Iris',
            'Mesa DRI Intel',
            'AMD Radeon(TM) Graphics', // APU integrated graphics
        ]

        for (const pattern of lowEndPatterns) {
            if (renderer.includes(pattern)) {
                console.log('[GPU Detection - Scene] Integrated/low-end GPU detected - using low-performance mode')
                return false
            }
        }

        console.log('[GPU Detection - Scene] Dedicated GPU detected - using high-performance mode')
        return true
    }

    console.log('[GPU Detection - Scene] Could not detect GPU info - defaulting to low-performance mode')
    return false
}

export default function Scene() {
    const [hasGPU, setHasGPU] = useState(true)

    useEffect(() => {
        setHasGPU(detectGPUCapability())
    }, [])

    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{
                antialias: hasGPU, // Disable antialiasing for non-GPU
                alpha: true,
                powerPreference: hasGPU ? 'high-performance' : 'low-power'
            }}
            dpr={hasGPU ? [1, 1.5] : [1, 1]} // Lock to 1x pixel ratio for non-GPU
            style={{ background: 'transparent' }}
        >
            <Suspense fallback={null}>
                {/* Only load expensive environment for GPU machines */}
                {hasGPU && <Environment preset="city" />}
                <HeroModel />
                <ambientLight intensity={hasGPU ? 1 : 1.5} />
                <pointLight position={[5, 5, 5]} intensity={hasGPU ? 1.5 : 1} color="#ffffff" />
                <pointLight position={[-5, -5, 5]} intensity={1} color="#c9ff00" />
            </Suspense>
        </Canvas>
    )
}
