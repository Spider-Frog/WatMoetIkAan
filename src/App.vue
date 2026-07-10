<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import LocationPicker from './components/LocationPicker.vue'
import OutfitCharacter from './components/OutfitCharacter.vue'
import { useGeolocation } from './composables/useGeolocation'
import { useSavedLocation } from './composables/useSavedLocation'
import { useWeather } from './composables/useWeather'
import {
  decideOutfit,
  JACKET_LABELS,
  PANTS_LABELS,
  REASON_LABELS,
  TOP_LABELS,
} from './utils/outfitDecision'
import type { GeocodingResult } from './types/location'

const geo = useGeolocation()
const { loadSavedLocation, saveLocation } = useSavedLocation()
const { weather, error: weatherError, loading: weatherLoading, fetchWeather } = useWeather()

const activeLocationName = ref<string | null>(null)
const activeCoords = ref<{ lat: number; lon: number } | null>(null)
const showLocationPicker = ref(false)
const useManualOnly = ref(false)

const hasGeolocation = typeof navigator !== 'undefined' && !!navigator.geolocation

const isLoading = computed(() => geo.loading.value || weatherLoading.value)

const geoErrorOnly = computed(() => geo.error.value && !weather.value)

const errorMessage = computed(() => {
  if (weatherError.value) return weatherError.value
  if (geoErrorOnly.value && !showLocationPicker.value) return geo.error.value
  return null
})

const decision = computed(() => {
  if (!weather.value) return null
  return decideOutfit(weather.value)
})

const warmthClass = computed(() => {
  if (!weather.value) return ''
  const t = weather.value.feelsLike
  if (t >= 22) return 'warm'
  if (t >= 15) return 'mild'
  return 'cool'
})

function formatPlace(result: GeocodingResult): string {
  return result.admin1 ? `${result.name}, ${result.admin1}` : result.name
}

async function loadWeatherForCoords(lat: number, lon: number, name: string) {
  activeLocationName.value = name
  activeCoords.value = { lat, lon }
  showLocationPicker.value = false
  useManualOnly.value = false
  geo.error.value = null
  await fetchWeather(lat, lon)
}

async function refreshWeather() {
  if (activeCoords.value) {
    await loadWeatherForCoords(
      activeCoords.value.lat,
      activeCoords.value.lon,
      activeLocationName.value ?? 'Jouw locatie',
    )
    return
  }

  await checkWeatherWithGeolocation()
}

async function checkWeatherWithGeolocation() {
  await geo.requestLocation()

  if (geo.latitude.value !== null && geo.longitude.value !== null) {
    await loadWeatherForCoords(geo.latitude.value, geo.longitude.value, 'Jouw locatie')
  } else {
    showLocationPicker.value = true
  }
}

async function handleManualSelect(result: GeocodingResult) {
  const name = formatPlace(result)
  saveLocation({
    name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
  })
  await loadWeatherForCoords(result.latitude, result.longitude, name)
}

function openLocationPicker() {
  showLocationPicker.value = true
  useManualOnly.value = true
}

function useDeviceLocation() {
  useManualOnly.value = false
  checkWeatherWithGeolocation()
}

onMounted(async () => {
  const saved = loadSavedLocation()
  if (saved) {
    await loadWeatherForCoords(saved.latitude, saved.longitude, saved.name)
    return
  }

  await checkWeatherWithGeolocation()
})
</script>

<template>
  <main class="page" :class="warmthClass">
    <div class="card">
      <h1 class="title">Wat moet ik aan?</h1>

      <div v-if="isLoading" class="state loading-state">
        <div class="spinner" aria-hidden="true" />
        <p class="state-text">Even kijken…</p>
      </div>

      <div v-else-if="errorMessage" class="state error-state">
        <p class="state-text">{{ errorMessage }}</p>
        <button class="btn" type="button" @click="checkWeatherWithGeolocation">Opnieuw proberen</button>
        <LocationPicker @select="handleManualSelect" />
      </div>

      <div v-else-if="showLocationPicker && !decision" class="state picker-state">
        <p v-if="geo.error" class="state-text">{{ geo.error }}</p>
        <p v-else class="state-text">Waar wil je het weer voor checken?</p>
        <LocationPicker @select="handleManualSelect" />
        <button
          v-if="!useManualOnly && hasGeolocation"
          class="btn btn-link"
          type="button"
          @click="useDeviceLocation"
        >
          Gebruik mijn locatie
        </button>
      </div>

      <div v-else-if="decision && weather" class="state result-state">
        <OutfitCharacter :top="decision.top" :pants="decision.pants" :jacket="decision.jacket" />

        <ul class="outfit-list">
          <li>
            <span class="outfit-label">Bovenkant</span>
            <span class="outfit-value">{{ TOP_LABELS[decision.top] }}</span>
          </li>
          <li>
            <span class="outfit-label">Broek</span>
            <span class="outfit-value">{{ PANTS_LABELS[decision.pants] }}</span>
          </li>
          <li>
            <span class="outfit-label">Jas</span>
            <span class="outfit-value">{{ JACKET_LABELS[decision.jacket] }}</span>
          </li>
        </ul>

        <p class="feels-like">Voelt als {{ Math.round(weather.feelsLike) }}°C</p>
        <p v-if="activeLocationName" class="location-name">{{ activeLocationName }}</p>

        <div v-if="decision.reasons.length" class="chips">
          <span v-for="reason in decision.reasons" :key="reason" class="chip">
            {{ REASON_LABELS[reason] }}
          </span>
        </div>

        <button class="btn btn-secondary" type="button" @click="refreshWeather">
          Opnieuw checken
        </button>

        <template v-if="showLocationPicker">
          <LocationPicker compact @select="handleManualSelect" />
        </template>
        <button v-else class="btn btn-link" type="button" @click="openLocationPicker">
          Andere plaats kiezen
        </button>
      </div>
    </div>
  </main>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}
</style>

<style scoped>
.page {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: linear-gradient(160deg, #fff8f0 0%, #fce8f0 50%, #e8f4f8 100%);
  font-family: 'Nunito', system-ui, sans-serif;
  transition: background 0.6s ease;
}

.page.cool {
  background: linear-gradient(160deg, #fff8f0 0%, #e8f0f8 50%, #dce8f5 100%);
}

.page.mild {
  background: linear-gradient(160deg, #fff8f0 0%, #f0e8f5 50%, #e8f4f0 100%);
}

.page.warm {
  background: linear-gradient(160deg, #fff8f0 0%, #fce8e0 50%, #fff0e8 100%);
}

.card {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-radius: 28px;
  padding: 2rem 1.75rem;
  box-shadow: 0 8px 32px rgba(180, 140, 160, 0.15);
  text-align: center;
}

.title {
  margin: 0 0 1.25rem;
  font-size: 1.6rem;
  font-weight: 800;
  color: #6b5a6e;
  letter-spacing: -0.02em;
}

.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.state-text {
  margin: 0;
  font-size: 1.05rem;
  color: #8a7a8e;
  line-height: 1.5;
}

.outfit-list {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.outfit-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 1rem;
  background: #faf5fa;
  border-radius: 16px;
  gap: 0.75rem;
}

.outfit-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: #b0a0b4;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.outfit-value {
  font-size: 1rem;
  font-weight: 800;
  color: #6b5a6e;
  text-align: right;
}

.feels-like {
  margin: 0;
  font-size: 1rem;
  color: #9a8a9e;
  font-weight: 600;
}

.location-name {
  margin: -0.5rem 0 0;
  font-size: 0.85rem;
  color: #b0a0b4;
  font-weight: 600;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.chip {
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  background: #f0e4f0;
  color: #8a7a9e;
}

.btn {
  margin-top: 0.5rem;
  padding: 0.65rem 1.4rem;
  border: none;
  border-radius: 999px;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  background: #c8a8d8;
  color: #fff;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(180, 140, 180, 0.3);
}

.btn:active {
  transform: translateY(0);
}

.btn-secondary {
  background: #e8dce8;
  color: #7a6a7e;
}

.btn-secondary:hover {
  box-shadow: 0 4px 12px rgba(180, 140, 180, 0.2);
}

.btn-link {
  background: transparent;
  color: #9a8ab0;
  box-shadow: none;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
}

.btn-link:hover {
  transform: none;
  box-shadow: none;
  color: #7a6a8e;
  text-decoration: underline;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0e0f0;
  border-top-color: #c8a8d8;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
