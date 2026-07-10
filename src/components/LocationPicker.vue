<script setup lang="ts">
import { ref } from 'vue'
import { useGeocoding } from '../composables/useGeocoding'
import type { GeocodingResult } from '../types/location'

const props = defineProps<{
  compact?: boolean
}>()

const emit = defineEmits<{
  select: [result: GeocodingResult]
}>()

const query = ref('')
const { results, error, loading, searchCities, clearResults } = useGeocoding()

function formatPlace(result: GeocodingResult): string {
  return result.admin1 ? `${result.name}, ${result.admin1}` : result.name
}

async function handleSearch() {
  await searchCities(query.value)
}

function handleSelect(result: GeocodingResult) {
  emit('select', result)
  query.value = formatPlace(result)
  clearResults()
}

function handleInput() {
  if (query.value.trim().length < 2) {
    clearResults()
  }
}
</script>

<template>
  <div class="picker" :class="{ compact: props.compact }">
    <p v-if="!compact" class="picker-label">Of kies zelf een plaats:</p>
    <p v-else class="picker-label">Andere plaats kiezen</p>

    <form class="search-form" @submit.prevent="handleSearch">
      <input
        v-model="query"
        class="search-input"
        type="search"
        placeholder="Bijv. Amsterdam"
        autocomplete="off"
        @input="handleInput"
      />
      <button class="search-btn" type="submit" :disabled="loading || query.trim().length < 2">
        {{ loading ? '…' : 'Zoek' }}
      </button>
    </form>

    <p v-if="error" class="picker-error">{{ error }}</p>

    <ul v-if="results.length" class="results">
      <li v-for="result in results" :key="result.id">
        <button class="result-btn" type="button" @click="handleSelect(result)">
          <span class="result-name">{{ formatPlace(result) }}</span>
          <span class="result-country">{{ result.country }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.picker {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.picker.compact {
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f0e4f0;
}

.picker-label {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 700;
  color: #8a7a8e;
}

.search-form {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.search-input {
  flex: 1;
  min-width: 0;
  padding: 0.6rem 0.9rem;
  border: 2px solid #f0e4f0;
  border-radius: 999px;
  font-family: inherit;
  font-size: 0.95rem;
  color: #6b5a6e;
  background: #fff;
  outline: none;
  transition: border-color 0.15s ease;
}

.search-input:focus {
  border-color: #d8c0e8;
}

.search-btn {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 999px;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  background: #e8dce8;
  color: #7a6a7e;
  transition: opacity 0.15s ease;
}

.search-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.picker-error {
  margin: 0;
  font-size: 0.85rem;
  color: #c08080;
}

.results {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.result-btn {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
  padding: 0.6rem 0.9rem;
  border: 2px solid #f0e4f0;
  border-radius: 16px;
  background: #fff;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.result-btn:hover {
  border-color: #d8c0e8;
  background: #fdf8fd;
}

.result-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #6b5a6e;
}

.result-country {
  font-size: 0.8rem;
  color: #9a8a9e;
}
</style>
