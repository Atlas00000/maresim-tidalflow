import { create } from "zustand"

interface SimulationState {
  // Tide data
  selectedStation: string
  tideLevel: number
  tideData: any[]
  isLoading: boolean

  // Wave parameters
  waveHeight: number
  windSpeed: number
  windDirection: number

  // Time simulation
  time: number
  isPlaying: boolean

  // Simulation modes
  stormMode: boolean
  showCaustics: boolean
  showSediment: boolean

  // Lunar parameters
  moonPhase: number // 0-1 (0 = new moon, 0.5 = full moon)
  lunarDistance: number // Moon's distance from Earth (affects tidal strength)
  showMoonPhase: boolean
  lunarTidalAmplification: number // How much moon affects tides (1.0 = normal)

  // Solar parameters
  solarDay: number // Day of year (1-365) for solar position
  solarDistance: number // Earth-Sun distance (affects solar tides)
  showSun: boolean
  solarTidalAmplification: number // Solar tidal strength multiplier

  // Solar-Lunar interactions
  syzygyStrength: number // Alignment strength (0-1)
  showSyzygyEvents: boolean
  tidalRange: number // Current tidal range multiplier

  // Actions
  setSelectedStation: (station: string) => void
  setTideLevel: (level: number) => void
  setTideData: (data: any[]) => void
  setIsLoading: (loading: boolean) => void
  setWaveHeight: (height: number) => void
  setWindSpeed: (speed: number) => void
  setWindDirection: (direction: number) => void
  setTime: (time: number) => void
  setIsPlaying: (playing: boolean) => void
  setStormMode: (storm: boolean) => void
  setShowCaustics: (show: boolean) => void
  setShowSediment: (show: boolean) => void
  setMoonPhase: (phase: number) => void
  setLunarDistance: (distance: number) => void
  setShowMoonPhase: (show: boolean) => void
  setLunarTidalAmplification: (amp: number) => void
  setSolarDay: (day: number) => void
  setSolarDistance: (distance: number) => void
  setShowSun: (show: boolean) => void
  setSolarTidalAmplification: (amp: number) => void
  setSyzygyStrength: (strength: number) => void
  setShowSyzygyEvents: (show: boolean) => void
  setTidalRange: (range: number) => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  // Initial state
  selectedStation: "8518750", // The Battery, NY
  tideLevel: 0,
  tideData: [],
  isLoading: false,
  waveHeight: 1.0,
  windSpeed: 5.0,
  windDirection: 180,
  time: 12.0,
  isPlaying: false,
  stormMode: false,
  showCaustics: true,
  showSediment: false,
  moonPhase: 0.5, // Start with full moon
  lunarDistance: 384400, // Average Earth-Moon distance in km
  showMoonPhase: true,
  lunarTidalAmplification: 1.0,
  solarDay: 80, // Spring equinox (day 80)
  solarDistance: 149597870, // Average Earth-Sun distance in km (1 AU)
  showSun: true,
  solarTidalAmplification: 1.0,
  syzygyStrength: 0.0,
  showSyzygyEvents: true,
  tidalRange: 1.0,

  // Actions
  setSelectedStation: (station) => set({ selectedStation: station }),
  setTideLevel: (level) => set({ tideLevel: level }),
  setTideData: (data) => set({ tideData: data }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setWaveHeight: (height) => set({ waveHeight: height }),
  setWindSpeed: (speed) => set({ windSpeed: speed }),
  setWindDirection: (direction) => set({ windDirection: direction }),
  setTime: (time) => set({ time }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setStormMode: (storm) => set({ stormMode: storm }),
  setShowCaustics: (show) => set({ showCaustics: show }),
  setShowSediment: (show) => set({ showSediment: show }),
  setMoonPhase: (phase) => set({ moonPhase: phase }),
  setLunarDistance: (distance) => set({ lunarDistance: distance }),
  setShowMoonPhase: (show) => set({ showMoonPhase: show }),
  setLunarTidalAmplification: (amp) => set({ lunarTidalAmplification: amp }),
  setSolarDay: (day) => set({ solarDay: day }),
  setSolarDistance: (distance) => set({ solarDistance: distance }),
  setShowSun: (show) => set({ showSun: show }),
  setSolarTidalAmplification: (amp) => set({ solarTidalAmplification: amp }),
  setSyzygyStrength: (strength) => set({ syzygyStrength: strength }),
  setShowSyzygyEvents: (show) => set({ showSyzygyEvents: show }),
  setTidalRange: (range) => set({ tidalRange: range }),
}))
