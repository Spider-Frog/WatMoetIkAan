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

const skinFace = '#fff2ea'
const skinBody = '#f5e6dc'
const hairColor = '#5d4037'

const sleeveColors: Record<TopVariant, string> = {
  shirt: skinBody,
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
        <ellipse cx="83" cy="262" rx="13" ry="7" fill="#f0b8c8" />
        <ellipse cx="117" cy="262" rx="13" ry="7" fill="#f0b8c8" />
        <rect x="68" y="172" width="64" height="24" rx="12" fill="#9b8bb4" />
      </template>
      <template v-else>
        <rect x="74" y="188" width="20" height="38" rx="10" fill="#f5c6d6" />
        <rect x="106" y="188" width="20" height="38" rx="10" fill="#f5c6d6" />
        <rect x="72" y="220" width="22" height="28" rx="11" :fill="skinBody" />
        <rect x="106" y="220" width="22" height="28" rx="11" :fill="skinBody" />
        <ellipse cx="83" cy="250" rx="13" ry="7" fill="#f0b8c8" />
        <ellipse cx="117" cy="250" rx="13" ry="7" fill="#f0b8c8" />
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
      <circle cx="55" cy="174" r="12" :fill="top === 'shirt' ? skinBody : sleeveColors[top]" />
      <circle cx="145" cy="174" r="12" :fill="top === 'shirt' ? skinBody : sleeveColors[top]" />

      <!-- Body / top -->
      <rect x="66" y="118" width="68" height="58" rx="22" :fill="topColors[top]" />

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
      <circle cx="100" cy="82" r="44" :fill="skinFace" />

      <!-- Long side hair (behind face) -->
      <path
        d="M 58 64 C 50 98 50 138 60 172 L 68 164 C 60 132 60 98 68 68 Z"
        :fill="hairColor"
      />
      <path
        d="M 142 64 C 150 98 150 138 140 172 L 132 164 C 140 132 140 98 132 68 Z"
        :fill="hairColor"
      />

      <ellipse cx="72" cy="92" rx="10" ry="6" fill="#ffb8c9" opacity="0.65" />
      <ellipse cx="128" cy="92" rx="10" ry="6" fill="#ffb8c9" opacity="0.65" />

      <!-- Eyes with lashes -->
      <ellipse cx="84" cy="78" rx="6" ry="7" fill="#fff" />
      <ellipse cx="116" cy="78" rx="6" ry="7" fill="#fff" />
      <circle cx="85" cy="79" r="4.5" fill="#6b5a6e" />
      <circle cx="117" cy="79" r="4.5" fill="#6b5a6e" />
      <circle cx="86.5" cy="77" r="1.8" fill="#fff" />
      <circle cx="118.5" cy="77" r="1.8" fill="#fff" />
      <path d="m 74 72 q 2 -4 6 -2" fill="none" stroke="#6b5a6e" stroke-width="1.5" stroke-linecap="round" />
      <path d="m 86 70 q 4 -2 6 2" fill="none" stroke="#6b5a6e" stroke-width="1.5" stroke-linecap="round" />
      <path d="m 108 72 q 2 -4 6 -2" fill="none" stroke="#6b5a6e" stroke-width="1.5" stroke-linecap="round" />
      <path d="m 120 70 q 4 -2 6 2" fill="none" stroke="#6b5a6e" stroke-width="1.5" stroke-linecap="round" />

      <!-- Smile -->
      <path
        d="M 90 98 Q 100 108 110 98"
        fill="none"
        stroke="#c08090"
        stroke-width="2.5"
        stroke-linecap="round"
      />

      <!-- Top hair -->
      <path
        d="M 54 88 C 52 54 74 32 100 30 126 32 148 54 146 88 140 72 122 64 100 66 78 64 60 72 54 88 Z"
        :fill="hairColor"
      />

      <!-- Hair bow -->
      <path d="m 124 40 10 -6 -2 14 z" fill="#f5a8c8" />
      <path d="m 124 40 -10 -6 2 14 z" fill="#f5a8c8" />
      <circle cx="124" cy="40" r="4" fill="#e890b0" />
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
