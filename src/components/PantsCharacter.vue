<script setup lang="ts">
import type { PantsVariant } from '../types/weather'

defineProps<{
  variant: PantsVariant
}>()
</script>

<template>
  <div class="character" aria-hidden="true">
    <svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <!-- Shadow -->
      <ellipse cx="100" cy="268" rx="52" ry="8" fill="#e8d5e0" opacity="0.5" />

      <!-- Legs -->
      <template v-if="variant === 'long'">
        <rect x="72" y="178" width="22" height="72" rx="11" fill="#b8a9c9" />
        <rect x="106" y="178" width="22" height="72" rx="11" fill="#b8a9c9" />
        <ellipse cx="83" cy="252" rx="14" ry="8" fill="#f5c6d6" />
        <ellipse cx="117" cy="252" rx="14" ry="8" fill="#f5c6d6" />
      </template>
      <template v-else>
        <rect x="74" y="178" width="20" height="38" rx="10" fill="#f5c6d6" />
        <rect x="106" y="178" width="20" height="38" rx="10" fill="#f5c6d6" />
        <rect x="72" y="210" width="22" height="28" rx="11" fill="#ffd4a8" />
        <rect x="106" y="210" width="22" height="28" rx="11" fill="#ffd4a8" />
        <ellipse cx="83" cy="240" rx="14" ry="8" fill="#f5c6d6" />
        <ellipse cx="117" cy="240" rx="14" ry="8" fill="#f5c6d6" />
      </template>

      <!-- Shorts (short variant) -->
      <template v-if="variant === 'short'">
        <rect x="68" y="162" width="64" height="28" rx="12" fill="#a8d8ea" />
      </template>

      <!-- Long pants top -->
      <template v-if="variant === 'long'">
        <rect x="68" y="162" width="64" height="24" rx="12" fill="#9b8bb4" />
      </template>

      <!-- Body / shirt -->
      <rect x="62" y="118" width="76" height="52" rx="20" fill="#c8e6d0" />

      <!-- Arms -->
      <rect x="44" y="126" width="22" height="44" rx="11" fill="#ffd4a8" />
      <rect x="134" y="126" width="22" height="44" rx="11" fill="#ffd4a8" />
      <circle cx="55" cy="174" r="12" fill="#f5c6d6" />
      <circle cx="145" cy="174" r="12" fill="#f5c6d6" />

      <!-- Head -->
      <circle cx="100" cy="82" r="44" fill="#ffe8d0" />

      <!-- Blush -->
      <ellipse cx="72" cy="92" rx="10" ry="6" fill="#ffb8c9" opacity="0.6" />
      <ellipse cx="128" cy="92" rx="10" ry="6" fill="#ffb8c9" opacity="0.6" />

      <!-- Eyes -->
      <circle cx="84" cy="78" r="5" fill="#5a4a5e" />
      <circle cx="116" cy="78" r="5" fill="#5a4a5e" />
      <circle cx="86" cy="76" r="1.5" fill="#fff" />
      <circle cx="118" cy="76" r="1.5" fill="#fff" />

      <!-- Mouth -->
      <path
        v-if="variant === 'long'"
        d="M 88 98 Q 100 106 112 98"
        fill="none"
        stroke="#5a4a5e"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <path
        v-else
        d="M 86 96 Q 100 108 114 96"
        fill="none"
        stroke="#5a4a5e"
        stroke-width="2.5"
        stroke-linecap="round"
      />

      <!-- Hair -->
      <path
        d="M 58 72 Q 60 28 100 24 Q 140 28 142 72 Q 130 50 100 48 Q 70 50 58 72"
        fill="#8b6f8e"
      />
    </svg>
  </div>
</template>

<style scoped>
.character {
  animation: bob 3s ease-in-out infinite;
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

svg {
  width: 180px;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>
