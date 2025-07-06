export class LunarCalculations {
  /**
   * Calculate tidal amplitude based on lunar phase and distance
   */
  static calculateTidalAmplitude(
    moonPhase: number,
    lunarDistance: number,
    baseAmplitude = 1.0,
    amplification = 1.0,
  ): number {
    // Spring tides occur at new moon (0) and full moon (0.5)
    // Neap tides occur at quarter moons (0.25, 0.75)
    const phaseEffect = Math.abs(Math.cos(moonPhase * Math.PI * 2))

    // Lunar distance effect (inverse cube law for tidal forces)
    const avgDistance = 384400 // km
    const distanceEffect = Math.pow(avgDistance / lunarDistance, 3)

    // Combined effect
    const tidalStrength = baseAmplitude * (0.5 + 0.5 * phaseEffect) * distanceEffect * amplification

    return tidalStrength
  }

  /**
   * Calculate lunar tidal component for a given time
   */
  static calculateLunarTide(
    time: number, // hours (0-24)
    moonPhase: number,
    lunarDistance: number,
    amplification = 1.0,
  ): number {
    // Lunar day is ~24.84 hours
    const lunarDay = 24.84
    const lunarHour = (time * 24) / lunarDay

    // Primary lunar tide (M2 component - 12.42 hour period)
    const m2Period = 12.42
    const m2Component = Math.sin((lunarHour / m2Period) * 2 * Math.PI)

    // Secondary lunar tide (M4 component - 6.21 hour period)
    const m4Period = 6.21
    const m4Component = Math.sin((lunarHour / m4Period) * 2 * Math.PI) * 0.3

    // Apply lunar phase and distance effects
    const amplitude = this.calculateTidalAmplitude(moonPhase, lunarDistance, 1.0, amplification)

    return (m2Component + m4Component) * amplitude
  }

  /**
   * Get moon phase name from phase value
   */
  static getMoonPhaseName(phase: number): string {
    const phases = [
      "New Moon",
      "Waxing Crescent",
      "First Quarter",
      "Waxing Gibbous",
      "Full Moon",
      "Waning Gibbous",
      "Last Quarter",
      "Waning Crescent",
    ]

    const index = Math.floor((phase * 8) % 8)
    return phases[index]
  }

  /**
   * Calculate moon age in days
   */
  static getMoonAge(phase: number): number {
    return phase * 29.53 // Average lunar month
  }

  /**
   * Calculate days until next full moon
   */
  static getDaysToFullMoon(phase: number): number {
    if (phase <= 0.5) {
      return (0.5 - phase) * 29.53
    } else {
      return (1.5 - phase) * 29.53
    }
  }

  /**
   * Calculate realistic moon position in sky
   */
  static getMoonPosition(time: number, moonPhase: number): { x: number; y: number; z: number } {
    // Moon rises ~50 minutes later each day
    const moonRiseDelay = moonPhase * 24 // hours
    const adjustedTime = (time + moonRiseDelay) % 24

    // Calculate position in sky
    const angle = (adjustedTime / 24) * Math.PI * 2 - Math.PI / 2 // Start at horizon
    const elevation = (Math.max(0, Math.sin(angle)) * Math.PI) / 2
    const azimuth = angle

    // Convert to 3D coordinates
    const distance = 200
    const x = Math.cos(azimuth) * Math.cos(elevation) * distance
    const y = Math.sin(elevation) * distance
    const z = Math.sin(azimuth) * Math.cos(elevation) * distance

    return { x, y, z }
  }
}
