"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useSimulationStore } from "@/store/simulation-store"
import { Moon } from "lucide-react"

export function LunarPanel() {
  const {
    moonPhase,
    setMoonPhase,
    lunarDistance,
    setLunarDistance,
    showMoonPhase,
    setShowMoonPhase,
    lunarTidalAmplification,
    setLunarTidalAmplification,
    time,
  } = useSimulationStore()

  const getMoonPhaseName = (phase: number) => {
    if (phase < 0.125) return "New Moon"
    if (phase < 0.375) return "Waxing Crescent"
    if (phase < 0.625) return "Full Moon"
    if (phase < 0.875) return "Waning Crescent"
    return "New Moon"
  }

  const getTidalStrength = () => {
    // Calculate tidal strength based on moon phase and distance
    const phaseEffect = Math.abs(Math.cos(moonPhase * Math.PI * 2)) // Stronger at new/full moon
    const distanceEffect = 1 / Math.pow(lunarDistance / 384400, 3) // Inverse cube law
    return phaseEffect * distanceEffect * lunarTidalAmplification
  }

  const moonPhaseName = getMoonPhaseName(moonPhase)
  const tidalStrength = getTidalStrength()

  return (
    <Card className="absolute bottom-4 left-4 w-80 bg-black/20 backdrop-blur-sm border-white/10 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Moon className="w-5 h-5" />
          Lunar Tidal Effects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Moon Phase Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MoonPhaseIcon phase={moonPhase} />
            <div>
              <div className="text-sm font-medium">{moonPhaseName}</div>
              <div className="text-xs text-white/70">Phase: {(moonPhase * 100).toFixed(1)}%</div>
            </div>
          </div>
          <Badge
            className={`${tidalStrength > 1.2 ? "bg-red-500" : tidalStrength > 0.8 ? "bg-yellow-500" : "bg-green-500"} text-white`}
          >
            {tidalStrength > 1.2 ? "Spring Tide" : tidalStrength < 0.6 ? "Neap Tide" : "Normal Tide"}
          </Badge>
        </div>

        {/* Moon Phase Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Moon Phase</label>
          <Slider
            value={[moonPhase]}
            onValueChange={([value]) => setMoonPhase(value)}
            max={1}
            min={0}
            step={0.01}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-white/70">
            <span>New</span>
            <span>First Quarter</span>
            <span>Full</span>
            <span>Last Quarter</span>
          </div>
        </div>

        {/* Lunar Distance */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Lunar Distance: {(lunarDistance / 1000).toFixed(0)}k km</label>
          <Slider
            value={[lunarDistance]}
            onValueChange={([value]) => setLunarDistance(value)}
            max={405000} // Apogee
            min={356000} // Perigee
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-white/70">
            <span>Perigee (356k)</span>
            <span>Average (384k)</span>
            <span>Apogee (405k)</span>
          </div>
        </div>

        {/* Tidal Amplification */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Tidal Amplification: {lunarTidalAmplification.toFixed(1)}x</label>
          <Slider
            value={[lunarTidalAmplification]}
            onValueChange={([value]) => setLunarTidalAmplification(value)}
            max={2}
            min={0}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Tidal Strength Indicator */}
        <div className="bg-white/10 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Current Tidal Strength:</span>
            <span className="text-sm font-mono">{tidalStrength.toFixed(2)}x</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(tidalStrength * 50, 100)}%` }}
            />
          </div>
        </div>

        {/* Show Moon Phase Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-sm">Show Moon in Scene</span>
          <Switch checked={showMoonPhase} onCheckedChange={setShowMoonPhase} />
        </div>

        {/* Lunar Position Info */}
        <div className="text-xs text-white/70 space-y-1">
          <div>Moon Age: {(moonPhase * 29.5).toFixed(1)} days</div>
          <div>Next Full Moon: {((1 - moonPhase) * 29.5).toFixed(1)} days</div>
          <div>Tidal Range: {(tidalStrength * 100).toFixed(0)}% of normal</div>
        </div>
      </CardContent>
    </Card>
  )
}

function MoonPhaseIcon({ phase }: { phase: number }) {
  const rotation = phase * 360

  return (
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 rounded-full bg-white/20" />
      <div
        className="absolute inset-0 rounded-full bg-white transition-all duration-300"
        style={{
          clipPath:
            phase < 0.5
              ? `polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 50%, ${50 + phase * 100}% 50%)`
              : `polygon(0% 0%, 50% 0%, 50% 50%, ${(phase - 0.5) * 100}% 50%, 0% 100%)`,
        }}
      />
    </div>
  )
}
