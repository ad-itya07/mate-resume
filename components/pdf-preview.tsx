"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/icon"
import type { UserDetails } from "@/lib/types"
import { generatePDF } from "@/lib/pdf-generator"

interface PDFPreviewProps {
  userData: UserDetails
}

export function PDFPreview({ userData }: PDFPreviewProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push("/")
  }

  const handleDownloadPDF = () => {
    generatePDF(userData)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <Button onClick={handleBack} variant="ghost" className="p-2 hover:bg-gray-200 rounded-lg">
          <Icon name="chevron-left" size={24} className="text-gray-600" />
        </Button>
      </div>

      {/* PDF Preview Container */}
      <div className="max-w-4xl mx-auto">
        {/* PDF Document */}
        <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-12 mb-6">
          <div className="space-y-8">
            {/* Name */}
            <div className="flex items-start">
              <div className="w-32 font-bold text-gray-900 text-lg">Name:</div>
              <div className="flex-1 text-gray-600 text-lg">{userData.name}</div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="w-32 font-bold text-gray-900 text-lg">Email:</div>
              <div className="flex-1 text-gray-600 text-lg">{userData.email}</div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start">
              <div className="w-32 font-bold text-gray-900 text-lg">Phone Number:</div>
              <div className="flex-1 text-gray-600 text-lg">{userData.phoneNumber}</div>
            </div>

            {/* Position */}
            <div className="flex items-start">
              <div className="w-32 font-bold text-gray-900 text-lg">Position:</div>
              <div className="flex-1 text-gray-600 text-lg">{userData.position}</div>
            </div>

            {/* Description */}
            <div className="flex items-start">
              <div className="w-32 font-bold text-gray-900 text-lg">Description:</div>
              <div className="flex-1 text-gray-600 text-lg leading-relaxed">{userData.description}</div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleDownloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium text-lg"
          >
            <Icon name="Download" size={20} className="mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
