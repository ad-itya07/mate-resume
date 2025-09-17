"use client"

import { useState, useEffect } from "react"
import { UserForm } from "@/components/user-form"
import type { UserDetails } from "@/lib/types"

export default function HomePage() {
  const [userData, setUserData] = useState<UserDetails>({
    name: "",
    email: "",
    phoneNumber: "",
    position: "",
    description: "",
  })

  useEffect(() => {
    const savedData = localStorage.getItem("userDetails")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setUserData(parsedData)
      } catch (error) {
        console.error("Error parsing saved user data:", error)
      }
    }
  }, [])

  const handleDataChange = (data: UserDetails) => {
    setUserData(data)
    localStorage.setItem("userDetails", JSON.stringify(data))
  }

  return <UserForm initialData={userData} onDataChange={handleDataChange} />
}
