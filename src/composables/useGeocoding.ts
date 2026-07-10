import { ref } from 'vue'
import type { GeocodingResponse, GeocodingResult } from '../types/location'

export function useGeocoding() {
  const results = ref<GeocodingResult[]>([])
  const error = ref<string | null>(null)
  const loading = ref(false)

  async function searchCities(query: string): Promise<void> {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      results.value = []
      error.value = null
      return
    }

    loading.value = true
    error.value = null
    results.value = []

    const params = new URLSearchParams({
      name: trimmed,
      count: '5',
      language: 'nl',
      format: 'json',
    })

    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`)

      if (!response.ok) {
        throw new Error('Geocoding fetch failed')
      }

      const data = (await response.json()) as GeocodingResponse
      results.value = data.results ?? []

      if (results.value.length === 0) {
        error.value = 'Geen plaats gevonden. Probeer een andere naam.'
      }
    } catch {
      error.value = 'Kon niet zoeken. Probeer het opnieuw.'
    } finally {
      loading.value = false
    }
  }

  function clearResults() {
    results.value = []
    error.value = null
  }

  return { results, error, loading, searchCities, clearResults }
}
