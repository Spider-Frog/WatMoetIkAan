export interface SavedLocation {
  name: string
  latitude: number
  longitude: number
  country: string
}

export interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
}

export interface GeocodingResponse {
  results?: GeocodingResult[]
}
