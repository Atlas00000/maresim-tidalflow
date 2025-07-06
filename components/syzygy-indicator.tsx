"use client"

import { useSimulationStore } from "@/store/simulation-store"
import { SolarLunarCalculations } from "@/utils/solar-lunar-calculations"

export function SyzygyIndicator() {
  const { moonPhase, syzygyStrength, showSyzygyEvents, tidalRange } = useSimulationStore()

  if (!showSyzygyEvents || syzygyStrength < 0.5) return null

  const tidalEvent = SolarLunarCalculations.getTidalEventType(syzygyStrength, tidalRange)
  const isKingTide = tidalEvent.type === "King Tide"

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div
        className={`
        relative flex items-center justify-center w-32 h-32 rounded-full
        ${isKingTide ? "animate-pulse" : ""}
        ${syzygyStrength > 0.9 ? "bg-red-500/20" : "bg-orange-500/20"}
        border-2 ${syzygyStrength > 0.9 ? "border-red-400" : "border-orange-400"}
        backdrop-blur-sm
      `}
      >
        {/* Alignment indicator */}
        <div className="flex items-center justify-center space-x-2">
          {/* Sun */}
          <div className="w-6 h-6 rounded-full bg-yellow-400 shadow-lg" />

          {/* Earth */}
          <div className="w-4 h-4 rounded-full bg-blue-500" />

          {/* Moon */}
          <div
            className={`w-3 h-3 rounded-full ${moonPhase < 0.25 || moonPhase > 0.75 ? "bg-gray-800" : "bg-gray-200"}`}
          />
        </div>

        {/* Event label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${tidalEvent.color}`}>
            {tidalEvent.type}
          </div>
        </div>

        {/* Syzygy strength indicator */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="text-xs text-white font-mono bg-black/50 px-2 py-1 rounded">
            {(syzygyStrength * 100).toFixed(0)}% Aligned
          </div>
        </div>
      </div>
    </div>
  )
}
