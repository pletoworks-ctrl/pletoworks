import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import HeroModel from './HeroModel'

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
            style={{ background: 'transparent' }}
        >
            <Suspense fallback={null}>
                <Environment preset="city" />
                <HeroModel />
                <ambientLight intensity={1} />
                <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-5, -5, 5]} intensity={1} color="#c9ff00" />
            </Suspense>
        </Canvas>
    )
}
