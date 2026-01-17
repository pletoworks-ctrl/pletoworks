import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'

function GlassCube({ position, index, size = 0.4 }) {
    const meshRef = useRef()
    const { pointer } = useThree()

    // Random initial rotation and speed
    const randomOffset = useMemo(() => ({
        rotSpeed: 0.3 + Math.random() * 0.4,
        floatSpeed: 0.4 + Math.random() * 0.6,
        floatAmp: 0.08 + Math.random() * 0.12,
        delay: index * 0.3,
    }), [index])

    useFrame((state) => {
        if (!meshRef.current) return

        const time = state.clock.elapsedTime

        // Gentle floating motion
        meshRef.current.position.y = position[1] + Math.sin(time * randomOffset.floatSpeed + randomOffset.delay) * randomOffset.floatAmp

        // Continuous rotation
        meshRef.current.rotation.x += 0.004 * randomOffset.rotSpeed
        meshRef.current.rotation.y += 0.006 * randomOffset.rotSpeed

        // Follow cursor with easing
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
    const cubeCount = isMobile ? 15 : 25

    // Generate cube positions distributed around the edges, avoiding center
    const cubeData = useMemo(() => {
        const data = []

        // Define zones: corners, edges, and some depth variation
        const zones = [
            // Top left area
            { x: [-4, -2], y: [1, 2.5], z: [-3, 1] },
            // Top right area
            { x: [2, 4], y: [1, 2.5], z: [-3, 1] },
            // Bottom left area
            { x: [-4, -2], y: [-2.5, -1], z: [-3, 1] },
            // Bottom right area
            { x: [2, 4], y: [-2.5, -1], z: [-3, 1] },
            // Far left edge
            { x: [-5, -3], y: [-1, 1], z: [-4, 0] },
            // Far right edge
            { x: [3, 5], y: [-1, 1], z: [-4, 0] },
            // Behind (deeper z)
            { x: [-3, 3], y: [-2, 2], z: [-5, -2] },
            // Top edge
            { x: [-2, 2], y: [2, 3], z: [-3, 0] },
            // Bottom edge
            { x: [-2, 2], y: [-3, -2], z: [-3, 0] },
        ]

        for (let i = 0; i < cubeCount; i++) {
            const zone = zones[i % zones.length]
            const size = 0.15 + Math.random() * 0.4

            // Random position within zone
            const x = zone.x[0] + Math.random() * (zone.x[1] - zone.x[0])
            const y = zone.y[0] + Math.random() * (zone.y[1] - zone.y[0])
            const z = zone.z[0] + Math.random() * (zone.z[1] - zone.z[0])

            data.push({
                position: [x, y, z],
                size
            })
        }
        return data
    }, [cubeCount, isMobile])

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle group rotation based on mouse
            groupRef.current.rotation.y += (state.pointer.x * 0.1 - groupRef.current.rotation.y) * 0.02
            groupRef.current.rotation.x += (state.pointer.y * 0.05 - groupRef.current.rotation.x) * 0.02
        }
    })

    return (
        <group ref={groupRef}>
            {cubeData.map((cube, i) => (
                <GlassCube key={i} position={cube.position} index={i} size={cube.size} />
            ))}
        </group>
    )
}
