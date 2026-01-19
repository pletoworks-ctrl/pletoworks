import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import { Environment } from '@react-three/drei'
import HeroModel from './HeroModel'

// Detect if GPU is available (same as HeroModel)
function detectGPUCapability() {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) return false

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        if (renderer.includes('SwiftShader') ||
            renderer.includes('llvmpipe') ||
            renderer.includes('Software') ||
            renderer.includes('Microsoft Basic Render Driver')) {
            return false
        }
    }

    return true
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
