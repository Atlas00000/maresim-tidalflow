"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useSimulationStore } from "@/store/simulation-store"
import { Activity, Zap, Settings } from "lucide-react"
import { LunarCalculations } from "@/utils/lunar-calculations"

export function SimulationPanel() {
  const {
    tideLevel,
    waveHeight,
    windSpeed,
    stormMode,
    setStormMode,
    showCaustics,
    setShowCaustics,
    showSediment,
    setShowSediment,
  } = useSimulationStore()

  const getTideStatus = () => {
    if (tideLevel > 1) return { status: "High Tide", color: "bg-blue-500" }
    if (tideLevel < -1) return { status: "Low Tide", color: "bg-orange-500" }
    return { status: "Mid Tide", color: "bg-green-500" }
  }

  const getWaveConditions = () => {
    if (waveHeight > 3) return { condition: "Rough", color: "bg-red-500" }
    if (waveHeight > 1.5) return { condition: "Moderate", color: "bg-yellow-500" }
    return { condition: "Calm", color: "bg-green-500" }
  }

  const tideStatus = getTideStatus()
  const waveConditions = getWaveConditions()

  return (
    <Card className="absolute top-20 right-4 w-80 bg-black/20 backdrop-blur-sm border-white/10 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Simulation Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Conditions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Tide Level:</span>
            <Badge className={`${tideStatus.color} text-white`}>{tideStatus.status}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Wave Conditions:</span>
            <Badge className={`${waveConditions.color} text-white`}>{waveConditions.condition}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Wind Speed:</span>
            <span className="text-sm font-mono">{windSpeed.toFixed(1)} m/s</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Moon Phase:</span>
            <span className="text-sm font-mono">
              {LunarCalculations.getMoonPhaseName(useSimulationStore.getState().moonPhase)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Tidal Strength:</span>
            <span className="text-sm font-mono">
              {LunarCalculations.calculateTidalAmplitude(
                useSimulationStore.getState().moonPhase,
                useSimulationStore.getState().lunarDistance,
                1.0,
                useSimulationStore.getState().lunarTidalAmplification,
              ).toFixed(1)}
              x
            </span>
          </div>
        </div>

        {/* Simulation Modes */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Simulation Modes
          </h4>

          <div className="flex items-center justify-between">
            <span className="text-sm">Storm Surge Mode</span>
            <Switch checked={stormMode} onCheckedChange={setStormMode} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Show Caustics</span>
            <Switch checked={showCaustics} onCheckedChange={setShowCaustics} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Sediment Transport</span>
            <Switch checked={showSediment} onCheckedChange={setShowSediment} />
          </div>
        </div>

        {/* Performance Stats */}
        <div className="space-y-2 pt-3 border-t border-white/10">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Performance
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/10 rounded p-2">
              <div>FPS</div>
              <div className="font-mono">60</div>
            </div>
            <div className="bg-white/10 rounded p-2">
              <div>GPU Usage</div>
              <div className="font-mono">45%</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2 pt-3 border-t border-white/10">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-white/10 border-white/20 hover:bg-white/20"
            onClick={() => {
              // Reset to default values
              useSimulationStore.getState().setWaveHeight(1)
              useSimulationStore.getState().setWindSpeed(5)
              useSimulationStore.getState().setTime(12)
            }}
          >
            Reset Simulation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
