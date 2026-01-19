import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, useMatcapTexture } from '@react-three/drei'

// Detect if GPU is available and performant
function detectGPUCapability() {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) return false

    // Check if using software renderer (CPU fallback)
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        // Common software renderers that indicate no GPU
        if (renderer.includes('SwiftShader') ||
            renderer.includes('llvmpipe') ||
            renderer.includes('Software') ||
            renderer.includes('Microsoft Basic Render Driver')) {
            return false
        }
    }

    return true
}

// Simple cube for mobile - no expensive glass material
function SimpleCube({ position, index, size = 0.4 }) {
    const meshRef = useRef()

    const randomOffset = useMemo(() => ({
        rotSpeed: 0.2 + Math.random() * 0.3,
        floatSpeed: 0.3 + Math.random() * 0.4,
        floatAmp: 0.05 + Math.random() * 0.1,
        delay: index * 0.5,
    }), [index])

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.elapsedTime

        // Simpler floating motion
        meshRef.current.position.y = position[1] + Math.sin(time * randomOffset.floatSpeed + randomOffset.delay) * randomOffset.floatAmp

        // Slower rotation
        meshRef.current.rotation.x += 0.002 * randomOffset.rotSpeed
        meshRef.current.rotation.y += 0.003 * randomOffset.rotSpeed
    })

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial
                color="#c9ff00"
                metalness={0.5}
                roughness={0.3}
                emissive="#c9ff00"
                emissiveIntensity={0.3}
            />
        </mesh>
    )
}

// MatCap cube for non-GPU desktop - prebaked glass look
function MatCapCube({ position, index, size = 0.4 }) {
    const meshRef = useRef()
    const { pointer } = useThree()

    // Use a glassy/reflective matcap texture
    const [matcapTexture] = useMatcapTexture('3B3C3F_DAD9D5_929290_ABACA8', 256)

    const randomOffset = useMemo(() => ({
        rotSpeed: 0.3 + Math.random() * 0.4,
        floatSpeed: 0.4 + Math.random() * 0.6,
        floatAmp: 0.08 + Math.random() * 0.12,
        delay: index * 0.3,
    }), [index])

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.elapsedTime

        meshRef.current.position.y = position[1] + Math.sin(time * randomOffset.floatSpeed + randomOffset.delay) * randomOffset.floatAmp

        meshRef.current.rotation.x += 0.004 * randomOffset.rotSpeed
        meshRef.current.rotation.y += 0.006 * randomOffset.rotSpeed

        const targetX = position[0] + pointer.x * 0.4
        const targetZ = position[2] + pointer.y * 0.25

        meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.04
        meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.04
    })

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[size, size, size]} />
            <meshMatcapMaterial
                matcap={matcapTexture}
                color="#c9ff00"
                transparent
                opacity={0.9}
            />
        </mesh>
    )
}

// Glass cube for desktop - full effect
function GlassCube({ position, index, size = 0.4 }) {
    const meshRef = useRef()
    const { pointer } = useThree()

    const randomOffset = useMemo(() => ({
        rotSpeed: 0.3 + Math.random() * 0.4,
        floatSpeed: 0.4 + Math.random() * 0.6,
        floatAmp: 0.08 + Math.random() * 0.12,
        delay: index * 0.3,
    }), [index])

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.elapsedTime

        meshRef.current.position.y = position[1] + Math.sin(time * randomOffset.floatSpeed + randomOffset.delay) * randomOffset.floatAmp

        meshRef.current.rotation.x += 0.004 * randomOffset.rotSpeed
        meshRef.current.rotation.y += 0.006 * randomOffset.rotSpeed

        const targetX = position[0] + pointer.x * 0.4
        const targetZ = position[2] + pointer.y * 0.25

        meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.04
        meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.04
    })

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[size, size, size]} />
            <MeshTransmissionMaterial
                backside
                backsideThickness={0.3}
                thickness={0.2}
                chromaticAberration={0.05}
                anisotropy={0.1}
                distortion={0.1}
                distortionScale={0.2}
                temporalDistortion={0.1}
                color="#c9ff00"
                roughness={0.05}
                transmission={0.95}
                ior={1.5}
                resolution={256}
                samples={4}
            />
        </mesh>
    )
}

export default function HeroModel() {
    const groupRef = useRef()
    const { viewport } = useThree()

    const isMobile = viewport.width < 5
    const cubeCount = isMobile ? 8 : 25

    // Detect GPU capability once on mount
    const [hasGPU, setHasGPU] = useState(true) // Default to true, detect on mount
    useEffect(() => {
        setHasGPU(detectGPUCapability())
    }, [])

    const cubeData = useMemo(() => {
        const data = []

        const zones = [
            { x: [-4, -2], y: [1, 2.5], z: [-3, 1] },
            { x: [2, 4], y: [1, 2.5], z: [-3, 1] },
            { x: [-4, -2], y: [-2.5, -1], z: [-3, 1] },
            { x: [2, 4], y: [-2.5, -1], z: [-3, 1] },
            { x: [-5, -3], y: [-1, 1], z: [-4, 0] },
            { x: [3, 5], y: [-1, 1], z: [-4, 0] },
            { x: [-3, 3], y: [-2, 2], z: [-5, -2] },
            { x: [-2, 2], y: [2, 3], z: [-3, 0] },
            { x: [-2, 2], y: [-3, -2], z: [-3, 0] },
        ]

        for (let i = 0; i < cubeCount; i++) {
            const zone = zones[i % zones.length]
            const size = isMobile ? 0.25 + Math.random() * 0.3 : 0.15 + Math.random() * 0.4

            const x = zone.x[0] + Math.random() * (zone.x[1] - zone.x[0])
            const y = zone.y[0] + Math.random() * (zone.y[1] - zone.y[0])
            const z = zone.z[0] + Math.random() * (zone.z[1] - zone.z[0])

            data.push({ position: [x, y, z], size })
        }
        return data
    }, [cubeCount, isMobile])

    useFrame((state) => {
        if (groupRef.current && !isMobile) {
            groupRef.current.rotation.y += (state.pointer.x * 0.1 - groupRef.current.rotation.y) * 0.02
            groupRef.current.rotation.x += (state.pointer.y * 0.05 - groupRef.current.rotation.x) * 0.02
        }
    })

    // Choose component based on device type and GPU capability
    const CubeComponent = isMobile ? SimpleCube : (hasGPU ? GlassCube : MatCapCube)

    return (
        <group ref={groupRef}>
            {cubeData.map((cube, i) => (
                <CubeComponent key={i} position={cube.position} index={i} size={cube.size} />
            ))}
        </group>
    )
}
