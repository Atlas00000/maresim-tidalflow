"use client"

import { useEffect, useState } from "react"
import { useSimulationStore } from "@/store/simulation-store"
import { SolarLunarCalculations } from "@/utils/solar-lunar-calculations"

interface TideDataPoint {
  t: string // time
  v: string // value (water level)
  s: string // sigma (standard deviation)
  f: string // flags
  q: string // quality
}

export function useTideData(stationId: string) {
  const [tideData, setTideData] = useState<TideDataPoint[]>([])
  const [error, setError] = useState<string | null>(null)
  const { setIsLoading, setTideData: setStoreTideData } = useSimulationStore()

  useEffect(() => {
    if (!stationId) return

    const fetchTideData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Get current date and tomorrow for 24-hour prediction
        const now = new Date()
        const tomorrow = new Date(now)
        tomorrow.setDate(tomorrow.getDate() + 1)

        const beginDate = now.toISOString().split("T")[0].replace(/-/g, "")
        const endDate = tomorrow.toISOString().split("T")[0].replace(/-/g, "")

        // NOAA Tides and Currents API
        const url =
          `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?` +
          `product=predictions&application=NOS.COOPS.TAC.WL&` +
          `begin_date=${beginDate}&end_date=${endDate}&` +
          `datum=MLLW&station=${stationId}&time_zone=lst_ldt&units=metric&interval=h&format=json`

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error.message)
        }

        const predictions = data.predictions || []
        setTideData(predictions)
        setStoreTideData(predictions)

        // Simulate real-time data updates
        if (predictions.length > 0) {
          const currentHour = now.getHours()
          const currentTide = predictions.find((tide: TideDataPoint) => {
            const tideHour = new Date(tide.t).getHours()
            return tideHour === currentHour
          })

          if (currentTide) {
            const baseTideLevel = Number.parseFloat(currentTide.v)

            // Get all parameters from store
            const {
              moonPhase,
              lunarDistance,
              lunarTidalAmplification,
              solarDay,
              solarDistance,
              solarTidalAmplification,
              time,
            } = useSimulationStore.getState()

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

            // Combine base tide with solar-lunar effects
            const enhancedTideLevel = baseTideLevel + tidalData.combinedTide * 0.5

            useSimulationStore.getState().setTideLevel(enhancedTideLevel)
          }
        }
      } catch (err) {
        console.error("Error fetching tide data:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch tide data")

        // Fallback to simulated data
        const simulatedData = generateSimulatedTideData()
        setTideData(simulatedData)
        setStoreTideData(simulatedData)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTideData()

    // Refresh data every 30 minutes
    const interval = setInterval(fetchTideData, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [stationId, setIsLoading, setStoreTideData])

  return { tideData, isLoading: useSimulationStore((state) => state.isLoading), error }
}

// Generate simulated tide data as fallback
function generateSimulatedTideData(): TideDataPoint[] {
  const data: TideDataPoint[] = []
  const now = new Date()
  const { moonPhase, lunarDistance, lunarTidalAmplification, solarDay, solarDistance, solarTidalAmplification } =
    useSimulationStore.getState()

  for (let i = 0; i < 24; i++) {
    const time = new Date(now)
    time.setHours(i, 0, 0, 0)

    // Base tidal pattern
    const baseTide = Math.sin((i / 24) * 4 * Math.PI) * 1.5

    // Add combined solar-lunar effects
    const tidalData = SolarLunarCalculations.calculateCombinedTide(
      i,
      moonPhase,
      lunarDistance,
      solarDay,
      solarDistance,
      lunarTidalAmplification,
      solarTidalAmplification,
    )

    const tideValue = baseTide + tidalData.combinedTide * 0.5 + Math.random() * 0.3

    data.push({
      t: time.toISOString(),
      v: tideValue.toFixed(3),
      s: "0.000",
      f: "0,0,0,0",
      q: "p",
    })
  }

  return data
}
