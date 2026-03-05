export interface Alumni {
  id: string
  name: string
  graduation_year: number
  university: string
  city: string
  country: string
  lat: number
  lng: number
  field_of_study: string
  bio: string
  photo_url?: string
  linkedin?: string
  instagram?: string
  github?: string
  other_link?: string
  status: 'pending' | 'approved'
  created_at: string
}

export interface AlumniFormData {
  name: string
  graduation_year: number
  university: string
  city: string
  country: string
  lat: number
  lng: number
  field_of_study: string
  bio: string
  photo_url?: string
  linkedin?: string
  instagram?: string
  github?: string
  other_link?: string
}
