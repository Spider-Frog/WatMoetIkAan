import { ref } from 'vue'
import type { SavedLocation } from '../types/location'

const STORAGE_KEY = 'langebroekaan-location'

export function useSavedLocation() {
  const savedLocation = ref<SavedLocation | null>(null)

  function loadSavedLocation(): SavedLocation | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as SavedLocation
      if (
        typeof parsed.name === 'string' &&
        typeof parsed.latitude === 'number' &&
        typeof parsed.longitude === 'number'
      ) {
        savedLocation.value = parsed
        return parsed
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    return null
  }

  function saveLocation(location: SavedLocation) {
    savedLocation.value = location
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
  }

  function clearSavedLocation() {
    savedLocation.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  return { savedLocation, loadSavedLocation, saveLocation, clearSavedLocation }
}
