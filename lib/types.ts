export interface UserDetails {
  name: string
  email: string
  phoneNumber: string
  position: string
  description: string
}

export interface ValidationErrors {
  name?: string
  email?: string
  phoneNumber?: string
  position?: string
  description?: string
}
