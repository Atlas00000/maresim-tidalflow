"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useSimulationStore } from "@/store/simulation-store"
import { useTideData } from "@/hooks/use-tide-data"
import { Waves, Wind, Clock, MapPin } from "lucide-react"

export function TideControls() {
  const {
    selectedStation,
    setSelectedStation,
    waveHeight,
    setWaveHeight,
    windSpeed,
    setWindSpeed,
    windDirection,
    setWindDirection,
    time,
    setTime,
    isPlaying,
    setIsPlaying,
  } = useSimulationStore()

  const { tideData, isLoading, error } = useTideData(selectedStation)

  useEffect(() => {
    if (tideData && tideData.length > 0) {
      // Update tide level based on current time
      const currentTide = tideData.find((tide) => {
        const tideTime = new Date(tide.t).getHours()
        return Math.abs(tideTime - time) < 1
      })

      if (currentTide) {
        useSimulationStore.getState().setTideLevel(Number.parseFloat(currentTide.v))
      }
    }
  }, [tideData, time])

  const stations = [
    { id: "8518750", name: "The Battery, NY" },
    { id: "8443970", name: "Boston, MA" },
    { id: "8571421", name: "Lamberts Point, VA" },
    { id: "8665530", name: "Charleston, SC" },
    { id: "8720218", name: "Mayport, FL" },
  ]

  return (
    <Card className="absolute top-20 left-4 w-80 bg-black/20 backdrop-blur-sm border-white/10 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Waves className="w-5 h-5" />
          Tide Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Station Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            NOAA Station
          </label>
          <Select value={selectedStation} onValueChange={setSelectedStation}>
            <SelectTrigger className="bg-white/10 border-white/20">
              <SelectValue placeholder="Select station" />
            </SelectTrigger>
            <SelectContent>
              {stations.map((station) => (
                <SelectItem key={station.id} value={station.id}>
                  {station.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isLoading && <Badge variant="secondary">Loading tide data...</Badge>}
          {error && <Badge variant="destructive">Error loading data</Badge>}
        </div>

        {/* Time Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time of Day: {time.toFixed(1)}h
          </label>
          <Slider
            value={[time]}
            onValueChange={([value]) => setTime(value)}
            max={24}
            min={0}
            step={0.1}
            className="w-full"
          />
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            variant="outline"
            size="sm"
            className="w-full bg-white/10 border-white/20 hover:bg-white/20"
          >
            {isPlaying ? "Pause" : "Play"} Time
          </Button>
        </div>

        {/* Wave Controls */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Wave Height: {waveHeight.toFixed(1)}m</label>
          <Slider
            value={[waveHeight]}
            onValueChange={([value]) => setWaveHeight(value)}
            max={5}
            min={0}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Wind Controls */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Wind className="w-4 h-4" />
            Wind Speed: {windSpeed.toFixed(1)} m/s
          </label>
          <Slider
            value={[windSpeed]}
            onValueChange={([value]) => setWindSpeed(value)}
            max={30}
            min={0}
            step={0.5}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Wind Direction: {windDirection}°</label>
          <Slider
            value={[windDirection]}
            onValueChange={([value]) => setWindDirection(value)}
            max={360}
            min={0}
            step={5}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}
