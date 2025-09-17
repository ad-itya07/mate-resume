import type { UserDetails, ValidationErrors } from "./types"

export const validateUserDetails = (details: UserDetails): ValidationErrors => {
  const errors: ValidationErrors = {}

  // Name validation
  if (!details.name.trim()) {
    errors.name = "Name is required"
  }

  // Email validation
  if (!details.email.trim()) {
    errors.email = "Email is required"
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(details.email)) {
      errors.email = "Please enter a valid email address"
    }
  }

  // Phone number validation
  if (!details.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required"
  } else {
    const phoneRegex = /^\+?[\d\s\-$$$$]{10,}$/
    if (!phoneRegex.test(details.phoneNumber)) {
      errors.phoneNumber = "Phone number must be at least 10 digits"
    }
  }

  return errors
}
