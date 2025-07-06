"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useSimulationStore } from "@/store/simulation-store"
import { SolarLunarCalculations } from "@/utils/solar-lunar-calculations"
import { Sun, Zap } from "lucide-react"

export function SolarPanel() {
  const {
    solarDay,
    setSolarDay,
    solarDistance,
    setSolarDistance,
    showSun,
    setShowSun,
    solarTidalAmplification,
    setSolarTidalAmplification,
    moonPhase,
    lunarDistance,
    lunarTidalAmplification,
    time,
    syzygyStrength,
    tidalRange,
    showSyzygyEvents,
    setShowSyzygyEvents,
  } = useSimulationStore()

  // Calculate real-time solar-lunar interactions
  const tidalData = SolarLunarCalculations.calculateCombinedTide(
    time,
    moonPhase,
    lunarDistance,
    solarDay,
    solarDistance,
    lunarTidalAmplification,
    solarTidalAmplification,
  )

  const seasonName = SolarLunarCalculations.getSeasonName(solarDay)
  const tidalEvent = SolarLunarCalculations.getTidalEventType(tidalData.syzygyStrength, tidalData.tidalRange)
  const solarAmplitude = SolarLunarCalculations.calculateSolarTidalAmplitude(
    solarDistance,
    0.46,
    solarTidalAmplification,
  )

  // Update store with calculated values
  React.useEffect(() => {
    useSimulationStore.getState().setSyzygyStrength(tidalData.syzygyStrength)
    useSimulationStore.getState().setTidalRange(tidalData.tidalRange)
  }, [tidalData.syzygyStrength, tidalData.tidalRange])

  return (
    <Card className="absolute bottom-4 right-4 w-80 bg-black/20 backdrop-blur-sm border-white/10 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="w-5 h-5" />
          Solar-Lunar Interactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Tidal Event */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Current Event</div>
            <div className="text-xs text-white/70">{tidalEvent.description}</div>
          </div>
          <Badge className={`${tidalEvent.color} text-white`}>{tidalEvent.type}</Badge>
        </div>

        {/* Solar Controls */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <h4 className="text-sm font-medium">Solar Parameters</h4>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Day of Year: {solarDay} ({seasonName})
            </label>
            <Slider
              value={[solarDay]}
              onValueChange={([value]) => setSolarDay(value)}
              max={365}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/70">
              <span>Jan 1</span>
              <span>Jul 1</span>
              <span>Dec 31</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Solar Distance: {(solarDistance / 1000000).toFixed(2)}M km</label>
            <Slider
              value={[solarDistance]}
              onValueChange={([value]) => setSolarDistance(value)}
              max={152100000} // Aphelion
              min={147100000} // Perihelion
              step={100000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/70">
              <span>Perihelion</span>
              <span>1 AU</span>
              <span>Aphelion</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Solar Tidal Strength: {solarTidalAmplification.toFixed(1)}x</label>
            <Slider
              value={[solarTidalAmplification]}
              onValueChange={([value]) => setSolarTidalAmplification(value)}
              max={2}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* Syzygy Analysis */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Alignment Analysis
          </h4>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/10 rounded p-2">
              <div className="text-white/70">Syzygy Strength</div>
              <div className="font-mono text-lg">{(tidalData.syzygyStrength * 100).toFixed(0)}%</div>
            </div>
            <div className="bg-white/10 rounded p-2">
              <div className="text-white/70">Tidal Range</div>
              <div className="font-mono text-lg">{tidalData.tidalRange.toFixed(2)}x</div>
            </div>
            <div className="bg-white/10 rounded p-2">
              <div className="text-white/70">Lunar Component</div>
              <div className="font-mono">{tidalData.lunarTide.toFixed(2)}m</div>
            </div>
            <div className="bg-white/10 rounded p-2">
              <div className="text-white/70">Solar Component</div>
              <div className="font-mono">{tidalData.solarTide.toFixed(2)}m</div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Combined Tidal Force:</span>
              <span className="text-sm font-mono">{tidalData.combinedTide.toFixed(2)}m</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(Math.abs(tidalData.combinedTide) * 30, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Visual Controls */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-sm">Show Sun in Scene</span>
            <Switch checked={showSun} onCheckedChange={setShowSun} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Highlight Syzygy Events</span>
            <Switch checked={showSyzygyEvents} onCheckedChange={setShowSyzygyEvents} />
          </div>
        </div>

        {/* Astronomical Info */}
        <div className="text-xs text-white/70 space-y-1 pt-2 border-t border-white/10">
          <div>Solar Amplitude: {(solarAmplitude * 100).toFixed(1)}% of lunar</div>
          <div>
            Next Syzygy:{" "}
            {moonPhase < 0.5 ? ((0.5 - moonPhase) * 29.5).toFixed(1) : ((1.5 - moonPhase) * 29.5).toFixed(1)} days
          </div>
          <div>
            Season: {seasonName} (Day {solarDay})
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
