import { ref } from 'vue'

export function useGeolocation() {
  const latitude = ref<number | null>(null)
  const longitude = ref<number | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  function requestLocation(): Promise<void> {
    if (!navigator.geolocation) {
      error.value = 'Je browser ondersteunt geen locatie.'
      return Promise.resolve()
    }

    loading.value = true
    error.value = null

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude.value = position.coords.latitude
          longitude.value = position.coords.longitude
          loading.value = false
          resolve()
        },
        (err) => {
          loading.value = false
          if (err.code === err.PERMISSION_DENIED) {
            error.value = 'Locatie is niet toegestaan. Kies hieronder zelf een plaats.'
          } else {
            error.value = 'Kon je locatie niet vinden. Kies hieronder zelf een plaats.'
          }
          resolve()
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
      )
    })
  }

  return { latitude, longitude, error, loading, requestLocation }
}
