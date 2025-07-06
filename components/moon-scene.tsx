"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useSimulationStore } from "@/store/simulation-store"
import type * as THREE from "three"

export function MoonScene() {
  const moonRef = useRef<THREE.Mesh>(null)
  const { moonPhase, showMoonPhase, time, lunarDistance } = useSimulationStore()

  useFrame((state) => {
    if (moonRef.current && showMoonPhase) {
      // Calculate moon position based on time and phase
      const moonAngle = (time / 24) * Math.PI * 2 + moonPhase * Math.PI * 2
      const moonHeight = Math.sin(moonAngle) * 30 + 50
      const moonX = Math.cos(moonAngle) * 200
      const moonZ = Math.sin(moonAngle) * 100

      moonRef.current.position.set(moonX, moonHeight, moonZ)

      // Scale moon based on distance (closer = larger apparent size)
      const scale = 384400 / lunarDistance
      moonRef.current.scale.setScalar(scale * 8)

      // Rotate moon to show phase
      moonRef.current.rotation.y = moonPhase * Math.PI * 2
    }
  })

  if (!showMoonPhase) return null

  return (
    <group>
      {/* Moon */}
      <mesh ref={moonRef} position={[200, 50, 0]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshLambertMaterial color="#E6E6FA" emissive="#404040" emissiveIntensity={0.2} />
      </mesh>

      {/* Moon glow effect */}
      <mesh ref={moonRef} position={[200, 50, 0]}>
        <sphereGeometry args={[12, 16, 16]} />
        <meshBasicMaterial color="#E6E6FA" transparent opacity={0.1} />
      </mesh>

      {/* Moonlight */}
      <directionalLight position={[200, 50, 0]} intensity={0.3} color="#E6E6FA" castShadow={false} />
    </group>
  )
}
