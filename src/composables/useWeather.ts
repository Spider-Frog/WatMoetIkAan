import { ref } from 'vue'
import type { OpenMeteoResponse, WeatherConditions } from '../types/weather'

export function useWeather() {
  const weather = ref<WeatherConditions | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  async function fetchWeather(lat: number, lon: number): Promise<void> {
    loading.value = true
    error.value = null
    weather.value = null

    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lon),
      current: [
        'temperature_2m',
        'apparent_temperature',
        'relative_humidity_2m',
        'wind_speed_10m',
        'uv_index',
        'is_day',
        'cloud_cover',
      ].join(','),
      timezone: 'auto',
    })

    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)

      if (!response.ok) {
        throw new Error('Weather fetch failed')
      }

      const data = (await response.json()) as OpenMeteoResponse
      const current = data.current

      weather.value = {
        temperature: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        uvIndex: current.uv_index,
        isDay: current.is_day === 1,
        cloudCover: current.cloud_cover,
      }
    } catch {
      error.value = 'Kon het weer niet ophalen. Probeer het opnieuw.'
    } finally {
      loading.value = false
    }
  }

  return { weather, error, loading, fetchWeather }
}
