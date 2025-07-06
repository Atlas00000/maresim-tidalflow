"use client"

import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Water } from "three-stdlib"
import { PlaneGeometry, RepeatWrapping, TextureLoader, Vector3 } from "three"
import { useSimulationStore } from "@/store/simulation-store"
import { MoonScene } from "@/components/moon-scene"
import { SunScene } from "@/components/sun-scene"
import { SolarLunarCalculations } from "@/utils/solar-lunar-calculations"

export function OceanScene() {
  const waterRef = useRef<Water>(null)
  const { size } = useThree()
  const { waveHeight, windSpeed, windDirection, tideLevel, time } = useSimulationStore()

  // Create water geometry and material
  const waterGeometry = useMemo(() => new PlaneGeometry(1000, 1000, 512, 512), [])

  const water = useMemo(() => {
    const textureLoader = new TextureLoader()

    // Create water normals texture
    const waterNormals = textureLoader.load("/placeholder.svg?height=512&width=512")
    waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping

    return new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
    })
  }, [waterGeometry])

  // Update water animation
  useFrame((state) => {
    if (waterRef.current) {
      const material = waterRef.current.material as any
      const uniforms = material?.uniforms ?? {}

      // Get all simulation parameters
      const { moonPhase, lunarDistance, lunarTidalAmplification, solarDay, solarDistance, solarTidalAmplification } =
        useSimulationStore.getState()

      // Calculate combined solar-lunar tidal effects
      const tidalData = SolarLunarCalculations.calculateCombinedTide(
        time,
        moonPhase,
        lunarDistance,
        solarDay,
        solarDistance,
        lunarTidalAmplification,
        solarTidalAmplification,
      )

      // Apply enhanced tidal effects with solar-lunar interactions
      const enhancedTideLevel = tideLevel + tidalData.combinedTide * 0.3
      waterRef.current.position.y = enhancedTideLevel * 2

      // Update distortionScale uniform safely
      if (uniforms.distortionScale?.value !== undefined) {
        uniforms.distortionScale.value = 3.7 + waveHeight * 2 * tidalData.tidalRange
      }

      // Update time uniform (guard for both obj and .value)
      if (uniforms.time?.value !== undefined) {
        uniforms.time.value = state.clock.elapsedTime * 0.5
      }

      // Update sun-direction uniform (guard for obj & .value)
      const sunAngle = (time / 24) * Math.PI * 2
      if (uniforms.sunDirection?.value) {
        ;(uniforms.sunDirection.value as Vector3)
          .set(Math.cos(sunAngle), Math.sin(sunAngle) * 0.5 + 0.5, Math.sin(sunAngle))
          .normalize()
      }
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[100, 100, 50]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Ocean Water */}
      <primitive ref={waterRef} object={water} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />

      {/* Seabed */}
      <mesh position={[0, -20, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshLambertMaterial color="#8B7355" />
      </mesh>

      {/* Coastal Features */}
      <CoastalFeatures />

      {/* Tide Markers */}
      <TideMarkers />

      {/* Moon and lunar effects */}
      <MoonScene />

      {/* Sun and solar effects */}
      <SunScene />
    </>
  )
}

function CoastalFeatures() {
  return (
    <group>
      {/* Simple coastline representation */}
      <mesh position={[-200, 5, 0]}>
        <boxGeometry args={[400, 20, 50]} />
        <meshLambertMaterial color="#D2B48C" />
      </mesh>

      {/* Rocks */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[-200 + Math.random() * 100, Math.random() * 5, -25 + Math.random() * 50]}>
          <sphereGeometry args={[2 + Math.random() * 3]} />
          <meshLambertMaterial color="#696969" />
        </mesh>
      ))}
    </group>
  )
}

function TideMarkers() {
  const { tideLevel } = useSimulationStore()

  return (
    <group>
      {/* Floating buoys */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-100 + i * 50, tideLevel * 2 + Math.sin(Date.now() * 0.001 + i) * 0.5, 20]}>
          <sphereGeometry args={[1.5]} />
          <meshLambertMaterial color="#FF6B35" />
        </mesh>
      ))}

      {/* Tide level indicator */}
      <mesh position={[-180, tideLevel * 2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 30]} />
        <meshLambertMaterial color="#FFD700" />
      </mesh>
    </group>
  )
}
