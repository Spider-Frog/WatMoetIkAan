import type { OutfitDecision, ReasonTag, TopVariant, WeatherConditions } from '../types/weather'

const PANTS_THRESHOLD = 21
const SHIRT_THRESHOLD = 23
const SWEATER_THRESHOLD = 15

function collectReasons(weather: WeatherConditions): ReasonTag[] {
  const { feelsLike, humidity, windSpeed, uvIndex, isDay, cloudCover } = weather
  const reasons: ReasonTag[] = []

  if (feelsLike >= 24) reasons.push('warm')
  else if (feelsLike <= 16) reasons.push('fris')

  if (humidity >= 70 && feelsLike > 18) reasons.push('vochtig')

  if (windSpeed >= 15 && feelsLike < 28) reasons.push('winderig')

  if (isDay && uvIndex >= 3 && cloudCover < 60) reasons.push('zonnig')
  else if (cloudCover >= 70) reasons.push('bewolkt')

  return reasons.slice(0, 3)
}

function decideTop(weather: WeatherConditions): TopVariant {
  const { feelsLike, humidity, windSpeed, uvIndex, isDay, cloudCover } = weather

  let warmth = feelsLike

  if (feelsLike > 18) {
    warmth += Math.max(0, humidity - 55) * 0.06
  }

  if (isDay) {
    warmth += uvIndex * 0.4 * (1 - cloudCover / 200)
  }

  if (windSpeed >= 15 && feelsLike < 22) {
    warmth -= windSpeed * 0.15
  }

  if (warmth >= SHIRT_THRESHOLD) return 'shirt'
  if (warmth >= SWEATER_THRESHOLD) return 'long-sleeve'
  return 'sweater'
}

function decidePants(weather: WeatherConditions): 'long' | 'short' {
  const { feelsLike, humidity, windSpeed, uvIndex, isDay, cloudCover } = weather

  let score = (PANTS_THRESHOLD - feelsLike) * 2

  if (feelsLike > 18) {
    score -= Math.max(0, humidity - 55) * 0.08
  }

  if (feelsLike < 28) {
    score += windSpeed * 0.4
  }

  if (isDay) {
    score -= uvIndex * 1.2 * (1 - cloudCover / 200)
  }

  return score > 0 ? 'long' : 'short'
}

function decideJacket(weather: WeatherConditions): 'yes' | 'no' {
  const { feelsLike, windSpeed, humidity } = weather

  if (feelsLike >= 20) return 'no'

  let score = 0

  if (feelsLike < 10) score += 3
  else if (feelsLike < 14) score += 2
  else if (feelsLike < 18) score += 1

  if (windSpeed >= 20) score += 1.5
  else if (windSpeed >= 12) score += 0.8

  if (humidity >= 75 && feelsLike < 12) score += 0.5

  return score >= 1.5 ? 'yes' : 'no'
}

export function decideOutfit(weather: WeatherConditions): OutfitDecision {
  return {
    top: decideTop(weather),
    pants: decidePants(weather),
    jacket: decideJacket(weather),
    reasons: collectReasons(weather),
  }
}

export const TOP_LABELS: Record<TopVariant, string> = {
  shirt: 'T-shirt',
  'long-sleeve': 'Shirt met lange mouwen',
  sweater: 'Trui',
}

export const PANTS_LABELS = {
  long: 'Lange broek',
  short: 'Korte broek',
} as const

export const JACKET_LABELS = {
  yes: 'Jas aan',
  no: 'Geen jas',
} as const

export const REASON_LABELS: Record<ReasonTag, string> = {
  warm: 'warm',
  vochtig: 'vochtig',
  winderig: 'winderig',
  zonnig: 'zonnig',
  fris: 'fris',
  bewolkt: 'bewolkt',
}
