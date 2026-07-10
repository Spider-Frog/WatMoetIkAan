const THUNDER_WEATHER_CODES = new Set([95, 96, 99])
const FORECAST_HOURS = 12

export function summarizeRainThunder(
  precipitationProbability: number[],
  weatherCodes: number[],
): { rainChance: number; thunderChance: number } {
  const hours = Math.min(FORECAST_HOURS, precipitationProbability.length, weatherCodes.length)

  let rainChance = 0
  let thunderChance = 0

  for (let i = 0; i < hours; i++) {
    const probability = precipitationProbability[i] ?? 0
    const weatherCode = weatherCodes[i] ?? 0

    if (probability > rainChance) {
      rainChance = probability
    }

    if (THUNDER_WEATHER_CODES.has(weatherCode) && probability > thunderChance) {
      thunderChance = probability
    }
  }

  return { rainChance, thunderChance }
}

export function formatRainThunderText(rainChance: number, thunderChance: number): string {
  const parts: string[] = []

  if (thunderChance > 0) {
    parts.push(`${thunderChance}% kans op onweer`)
  }

  if (rainChance > 0) {
    parts.push(`${rainChance}% kans op regen`)
  }

  if (parts.length === 0) {
    return 'Geen regen of onweer verwacht'
  }

  return parts.join(' · ')
}
