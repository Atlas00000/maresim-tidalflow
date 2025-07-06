"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stats } from "@react-three/drei"
import { OceanScene } from "@/components/ocean-scene"
import { TideControls } from "@/components/tide-controls"
import { SimulationPanel } from "@/components/simulation-panel"
import { useSimulationStore } from "@/store/simulation-store"
import { LunarPanel } from "@/components/lunar-panel"
import { SolarPanel } from "@/components/solar-panel"
import { SyzygyIndicator } from "@/components/syzygy-indicator"

export default function MareSim() {
  const { isLoading } = useSimulationStore()

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-200 to-blue-400 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-2xl font-bold text-white">MareSim: TidalFlow Simulator</h1>
            <p className="text-sm text-white/80">Real-time Oceanographic Visualization</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLoading ? "bg-yellow-400 animate-pulse" : "bg-green-400"}`} />
            <span className="text-white text-sm">{isLoading ? "Loading NOAA Data..." : "Live Data Active"}</span>
          </div>
        </div>
      </div>

      {/* Main 3D Scene */}
      <Canvas
        camera={{ position: [0, 50, 100], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <OceanScene />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={20}
            maxDistance={500}
            maxPolarAngle={Math.PI / 2.2}
          />
          <Stats />
        </Suspense>
      </Canvas>

      <SyzygyIndicator />

      {/* Control Panels */}
      <TideControls />
      <SimulationPanel />
      <LunarPanel />
      <SolarPanel />
    </div>
  )
}
