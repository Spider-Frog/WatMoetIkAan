<script setup lang="ts">
import type { JacketVariant, PantsVariant, TopVariant } from '../types/weather'

defineProps<{
  top: TopVariant
  pants: PantsVariant
  jacket: JacketVariant
}>()

const topColors: Record<TopVariant, string> = {
  shirt: '#c8e6d0',
  'long-sleeve': '#a8d4e6',
  sweater: '#d4a8c8',
}

const sleeveColors: Record<TopVariant, string> = {
  shirt: '#ffd4a8',
  'long-sleeve': '#a8d4e6',
  sweater: '#d4a8c8',
}
</script>

<template>
  <div class="character" aria-hidden="true">
    <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="288" rx="52" ry="8" fill="#e8d5e0" opacity="0.5" />

      <!-- Legs -->
      <template v-if="pants === 'long'">
        <rect x="72" y="188" width="22" height="72" rx="11" fill="#b8a9c9" />
        <rect x="106" y="188" width="22" height="72" rx="11" fill="#b8a9c9" />
        <ellipse cx="83" cy="262" rx="14" ry="8" fill="#f5c6d6" />
        <ellipse cx="117" cy="262" rx="14" ry="8" fill="#f5c6d6" />
        <rect x="68" y="172" width="64" height="24" rx="12" fill="#9b8bb4" />
      </template>
      <template v-else>
        <rect x="74" y="188" width="20" height="38" rx="10" fill="#f5c6d6" />
        <rect x="106" y="188" width="20" height="38" rx="10" fill="#f5c6d6" />
        <rect x="72" y="220" width="22" height="28" rx="11" fill="#ffd4a8" />
        <rect x="106" y="220" width="22" height="28" rx="11" fill="#ffd4a8" />
        <ellipse cx="83" cy="250" rx="14" ry="8" fill="#f5c6d6" />
        <ellipse cx="117" cy="250" rx="14" ry="8" fill="#f5c6d6" />
        <rect x="68" y="172" width="64" height="28" rx="12" fill="#a8d8ea" />
      </template>

      <!-- Arms -->
      <rect
        x="44"
        y="126"
        width="22"
        :height="top === 'shirt' ? 44 : 52"
        rx="11"
        :fill="sleeveColors[top]"
      />
      <rect
        x="134"
        y="126"
        width="22"
        :height="top === 'shirt' ? 44 : 52"
        rx="11"
        :fill="sleeveColors[top]"
      />
      <circle cx="55" cy="174" r="12" :fill="top === 'shirt' ? '#f5c6d6' : sleeveColors[top]" />
      <circle cx="145" cy="174" r="12" :fill="top === 'shirt' ? '#f5c6d6' : sleeveColors[top]" />

      <!-- Body / top -->
      <rect x="62" y="118" width="76" height="58" rx="20" :fill="topColors[top]" />

      <!-- Sweater detail -->
      <template v-if="top === 'sweater'">
        <line x1="78" y1="138" x2="122" y2="138" stroke="#c090b0" stroke-width="2" stroke-linecap="round" />
        <line x1="80" y1="148" x2="120" y2="148" stroke="#c090b0" stroke-width="2" stroke-linecap="round" />
        <line x1="82" y1="158" x2="118" y2="158" stroke="#c090b0" stroke-width="2" stroke-linecap="round" />
      </template>

      <!-- Jacket -->
      <template v-if="jacket === 'yes'">
        <path
          d="M 56 112 L 62 118 L 62 178 L 56 182 L 44 170 L 44 130 Z"
          fill="#7a8a9e"
        />
        <path
          d="M 144 112 L 138 118 L 138 178 L 144 182 L 156 170 L 156 130 Z"
          fill="#7a8a9e"
        />
        <rect x="58" y="114" width="84" height="68" rx="18" fill="#8a9aae" />
        <line x1="100" y1="118" x2="100" y2="178" stroke="#6a7a8e" stroke-width="2" />
        <circle cx="100" cy="148" r="3" fill="#d4c4a8" />
      </template>

      <!-- Head -->
      <circle cx="100" cy="82" r="44" fill="#ffe8d0" />

      <ellipse cx="72" cy="92" rx="10" ry="6" fill="#ffb8c9" opacity="0.6" />
      <ellipse cx="128" cy="92" rx="10" ry="6" fill="#ffb8c9" opacity="0.6" />

      <circle cx="84" cy="78" r="5" fill="#5a4a5e" />
      <circle cx="116" cy="78" r="5" fill="#5a4a5e" />
      <circle cx="86" cy="76" r="1.5" fill="#fff" />
      <circle cx="118" cy="76" r="1.5" fill="#fff" />

      <path
        d="M 88 98 Q 100 106 112 98"
        fill="none"
        stroke="#5a4a5e"
        stroke-width="2.5"
        stroke-linecap="round"
      />

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
