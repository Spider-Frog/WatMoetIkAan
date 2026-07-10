export interface WeatherConditions {
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  uvIndex: number
  isDay: boolean
  cloudCover: number
  rainChance: number
  thunderChance: number
}

export interface OpenMeteoResponse {
  current: {
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    wind_speed_10m: number
    uv_index: number
    is_day: number
    cloud_cover: number
  }
  hourly: {
    time: string[]
    precipitation_probability: number[]
    weather_code: number[]
  }
}

export type TopVariant = 'shirt' | 'long-sleeve' | 'sweater'
export type PantsVariant = 'long' | 'short'
export type JacketVariant = 'yes' | 'no'

export type ReasonTag = 'warm' | 'vochtig' | 'winderig' | 'zonnig' | 'fris' | 'bewolkt'

export interface OutfitDecision {
  top: TopVariant
  pants: PantsVariant
  jacket: JacketVariant
  reasons: ReasonTag[]
}
