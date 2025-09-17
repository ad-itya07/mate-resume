"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PDFPreview } from "@/components/pdf-preview"
import type { UserDetails } from "@/lib/types"

export default function PreviewPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<UserDetails | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem("userDetails")
    if (storedData) {
      setUserData(JSON.parse(storedData))
    } else {
      // Redirect to home if no data found
      router.push("/")
    }
  }, [router])

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return <PDFPreview userData={userData} />
}
