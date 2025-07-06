export class SolarLunarCalculations {
  /**
   * Calculate solar tidal amplitude based on Earth-Sun distance
   */
  static calculateSolarTidalAmplitude(
    solarDistance: number,
    baseAmplitude = 0.46, // Solar tides are ~46% of lunar tides
    amplification = 1.0,
  ): number {
    const avgDistance = 149597870 // 1 AU in km
    const distanceEffect = Math.pow(avgDistance / solarDistance, 3)
    return baseAmplitude * distanceEffect * amplification
  }

  /**
   * Calculate solar tidal component for a given time
   */
  static calculateSolarTide(
    time: number, // hours (0-24)
    solarDay: number, // day of year (1-365)
    solarDistance: number,
    amplification = 1.0,
  ): number {
    // Solar day is exactly 24 hours
    const solarHour = time

    // Primary solar tide (S2 component - 12 hour period)
    const s2Period = 12
    const s2Component = Math.sin((solarHour / s2Period) * 2 * Math.PI)

    // Secondary solar tide (S4 component - 6 hour period)
    const s4Period = 6
    const s4Component = Math.sin((solarHour / s4Period) * 2 * Math.PI) * 0.2

    // Apply solar distance effects
    const amplitude = this.calculateSolarTidalAmplitude(solarDistance, 0.46, amplification)

    // Seasonal variation (stronger in winter when Earth is closer to Sun)
    const seasonalEffect = 1 + 0.1 * Math.cos(((solarDay - 3) / 365) * 2 * Math.PI) // Perihelion ~Jan 3

    return (s2Component + s4Component) * amplitude * seasonalEffect
  }

  /**
   * Calculate syzygy strength (solar-lunar alignment)
   */
  static calculateSyzygyStrength(moonPhase: number): number {
    // Syzygy occurs at new moon (0) and full moon (0.5)
    // Maximum alignment at 0 and 0.5, minimum at 0.25 and 0.75
    const alignmentPhase = (moonPhase * 2) % 1 // Convert to 0-1 range for alignment
    return Math.abs(Math.cos(alignmentPhase * Math.PI * 2))
  }

  /**
   * Calculate combined solar-lunar tidal effects
   */
  static calculateCombinedTide(
    time: number,
    moonPhase: number,
    lunarDistance: number,
    solarDay: number,
    solarDistance: number,
    lunarAmplification = 1.0,
    solarAmplification = 1.0,
  ): {
    lunarTide: number
    solarTide: number
    combinedTide: number
    syzygyStrength: number
    tidalRange: number
  } {
    // Calculate individual components
    const lunarTide = this.calculateLunarTide(time, moonPhase, lunarDistance, lunarAmplification)
    const solarTide = this.calculateSolarTide(time, solarDay, solarDistance, solarAmplification)

    // Calculate syzygy strength
    const syzygyStrength = this.calculateSyzygyStrength(moonPhase)

    // During syzygy (alignment), tides add constructively
    // During quadrature (90° apart), they interfere destructively
    const phaseInterference = Math.cos(moonPhase * Math.PI * 2)

    // Combined tide with interference effects
    const combinedTide = lunarTide + solarTide * (0.5 + 0.5 * phaseInterference)

    // Calculate overall tidal range multiplier
    const tidalRange = 1 + syzygyStrength * 0.4 // Up to 40% increase during syzygy

    return {
      lunarTide,
      solarTide,
      combinedTide,
      syzygyStrength,
      tidalRange,
    }
  }

  /**
   * Calculate lunar tidal component (from previous implementation)
   */
  static calculateLunarTide(time: number, moonPhase: number, lunarDistance: number, amplification = 1.0): number {
    const lunarDay = 24.84
    const lunarHour = (time * 24) / lunarDay

    const m2Period = 12.42
    const m2Component = Math.sin((lunarHour / m2Period) * 2 * Math.PI)

    const m4Period = 6.21
    const m4Component = Math.sin((lunarHour / m4Period) * 2 * Math.PI) * 0.3

    const phaseEffect = Math.abs(Math.cos(moonPhase * Math.PI * 2))
    const avgDistance = 384400
    const distanceEffect = Math.pow(avgDistance / lunarDistance, 3)

    const amplitude = (0.5 + 0.5 * phaseEffect) * distanceEffect * amplification

    return (m2Component + m4Component) * amplitude
  }

  /**
   * Get sun position in sky
   */
  static getSunPosition(time: number, solarDay: number): { x: number; y: number; z: number } {
    // Solar declination angle (varies throughout the year)
    const declination = 23.45 * Math.sin(((solarDay - 81) / 365) * 2 * Math.PI) * (Math.PI / 180)

    // Hour angle (sun's position throughout the day)
    const hourAngle = ((time - 12) / 24) * 2 * Math.PI

    // Calculate sun position
    const elevation = Math.asin(
      Math.sin(declination) * Math.sin(0) + Math.cos(declination) * Math.cos(0) * Math.cos(hourAngle),
    )
    const azimuth = Math.atan2(
      Math.sin(hourAngle),
      Math.cos(hourAngle) * Math.sin(0) - Math.tan(declination) * Math.cos(0),
    )

    // Convert to 3D coordinates
    const distance = 300
    const x = Math.cos(azimuth) * Math.cos(elevation) * distance
    const y = Math.sin(elevation) * distance
    const z = Math.sin(azimuth) * Math.cos(elevation) * distance

    return { x, y: Math.max(y, -50), z } // Prevent sun from going too far below horizon
  }

  /**
   * Determine tidal event type
   */
  static getTidalEventType(
    syzygyStrength: number,
    tidalRange: number,
  ): {
    type: string
    description: string
    color: string
  } {
    if (syzygyStrength > 0.9 && tidalRange > 1.3) {
      return {
        type: "King Tide",
        description: "Extreme high tide during syzygy",
        color: "bg-red-600",
      }
    } else if (syzygyStrength > 0.7) {
      return {
        type: "Spring Tide",
        description: "Enhanced tides during solar-lunar alignment",
        color: "bg-orange-500",
      }
    } else if (syzygyStrength < 0.3) {
      return {
        type: "Neap Tide",
        description: "Reduced tides during quadrature",
        color: "bg-blue-500",
      }
    } else {
      return {
        type: "Normal Tide",
        description: "Standard tidal conditions",
        color: "bg-green-500",
      }
    }
  }

  /**
   * Get season name from solar day
   */
  static getSeasonName(solarDay: number): string {
    if (solarDay < 80 || solarDay >= 355) return "Winter"
    if (solarDay < 172) return "Spring"
    if (solarDay < 266) return "Summer"
    return "Autumn"
  }

  /**
   * Calculate Earth's distance from Sun throughout the year
   */
  static calculateSolarDistance(solarDay: number): number {
    const avgDistance = 149597870 // 1 AU in km
    const eccentricity = 0.0167 // Earth's orbital eccentricity

    // Perihelion occurs around January 3 (day 3)
    const perihelionDay = 3
    const daysSincePerihelion = (solarDay - perihelionDay + 365) % 365
    const meanAnomaly = (daysSincePerihelion / 365) * 2 * Math.PI

    // Simplified calculation of distance variation
    const distance = avgDistance * (1 - eccentricity * Math.cos(meanAnomaly))

    return distance
  }
}
