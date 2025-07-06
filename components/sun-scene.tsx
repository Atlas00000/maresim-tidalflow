"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useSimulationStore } from "@/store/simulation-store"
import { SolarLunarCalculations } from "@/utils/solar-lunar-calculations"
import type * as THREE from "three"

export function SunScene() {
  const sunRef = useRef<THREE.Mesh>(null)
  const sunGlowRef = useRef<THREE.Mesh>(null)
  const { showSun, time, solarDay, solarDistance, syzygyStrength, showSyzygyEvents } = useSimulationStore()

  useFrame((state) => {
    if (sunRef.current && sunGlowRef.current && showSun) {
      // Calculate sun position
      const sunPosition = SolarLunarCalculations.getSunPosition(time, solarDay)

      sunRef.current.position.set(sunPosition.x, sunPosition.y, sunPosition.z)
      sunGlowRef.current.position.set(sunPosition.x, sunPosition.y, sunPosition.z)

      // Scale sun based on distance (closer = larger apparent size)
      const avgDistance = 149597870
      const scale = avgDistance / solarDistance
      sunRef.current.scale.setScalar(scale * 15)
      sunGlowRef.current.scale.setScalar(scale * 25)

      // Enhanced glow during syzygy events
      if (showSyzygyEvents && syzygyStrength > 0.7) {
        const glowIntensity = 0.3 + syzygyStrength * 0.4
        const sunMaterial = sunRef.current.material as THREE.MeshBasicMaterial
        sunMaterial.emissiveIntensity = glowIntensity

        const glowMaterial = sunGlowRef.current.material as THREE.MeshBasicMaterial
        glowMaterial.opacity = 0.1 + syzygyStrength * 0.2
      }

      // Seasonal color variation
      const seasonalHue = 0.1 + Math.sin(((solarDay - 80) / 365) * 2 * Math.PI) * 0.05
      const sunMaterial = sunRef.current.material as THREE.MeshBasicMaterial
      sunMaterial.color.setHSL(seasonalHue, 0.8, 0.9)
    }
  })

  if (!showSun) return null

  return (
    <group>
      {/* Sun */}
      <mesh ref={sunRef} position={[300, 80, 0]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={0.3} />
      </mesh>

      {/* Sun glow effect */}
      <mesh ref={sunGlowRef} position={[300, 80, 0]}>
        <sphereGeometry args={[25, 16, 16]} />
        <meshBasicMaterial color="#FDB813" transparent opacity={0.15} />
      </mesh>

      {/* Enhanced sunlight */}
      <directionalLight position={[300, 80, 0]} intensity={0.8} color="#FDB813" castShadow={false} />
    </group>
  )
}
