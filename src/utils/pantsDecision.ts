import type { PantsDecision, ReasonTag, WeatherConditions } from '../types/weather'

const COMFORT_THRESHOLD = 21

export function decidePants(weather: WeatherConditions): PantsDecision {
  const { feelsLike, humidity, windSpeed, uvIndex, isDay, cloudCover } = weather

  let score = (COMFORT_THRESHOLD - feelsLike) * 2

  if (feelsLike > 18) {
    score -= Math.max(0, humidity - 55) * 0.08
  }

  if (feelsLike < 28) {
    score += windSpeed * 0.4
  }

  if (isDay) {
    score -= uvIndex * 1.2 * (1 - cloudCover / 200)
  }

  const reasons: ReasonTag[] = []

  if (feelsLike >= 24) reasons.push('warm')
  else if (feelsLike <= 16) reasons.push('fris')

  if (humidity >= 70 && feelsLike > 18) reasons.push('vochtig')

  if (windSpeed >= 15 && feelsLike < 28) reasons.push('winderig')

  if (isDay && uvIndex >= 3 && cloudCover < 60) reasons.push('zonnig')
  else if (cloudCover >= 70) reasons.push('bewolkt')

  return {
    variant: score > 0 ? 'long' : 'short',
    reasons: reasons.slice(0, 3),
  }
}

export const REASON_LABELS: Record<ReasonTag, string> = {
  warm: 'warm',
  vochtig: 'vochtig',
  winderig: 'winderig',
  zonnig: 'zonnig',
  fris: 'fris',
  bewolkt: 'bewolkt',
}
