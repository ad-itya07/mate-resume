"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icon } from "@/components/icon"
import type { UserDetails, ValidationErrors } from "@/lib/types"
import { validateUserDetails } from "@/lib/validation"
import { generatePDF } from "@/lib/pdf-generator"

interface UserFormProps {
  initialData?: UserDetails
  onDataChange?: (data: UserDetails) => void
}

export function UserForm({ initialData, onDataChange }: UserFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<UserDetails>(
    initialData || {
      name: "",
      email: "",
      phoneNumber: "",
      position: "",
      description: "",
    },
  )
  const [errors, setErrors] = useState<ValidationErrors>({})

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onDataChange?.(newData)

    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  const handleViewPDF = () => {
    const validationErrors = validateUserDetails(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    router.push("/preview")
  }

  const handleDownloadPDF = () => {
    const validationErrors = validateUserDetails(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    generatePDF(formData)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10">Add Your Details</h1>

        <div className="space-y-6">
          {[
            { label: "Name", field: "name", type: "text", placeholder: "John Doe", icon: "user" },
            { label: "Email", field: "email", type: "email", placeholder: "Johndoe@gmail.com", icon: "mail" },
            { label: "Phone Number", field: "phoneNumber", type: "tel", placeholder: "(220) 222 - 20002", icon: "phone-call" },
            { label: "Position", field: "position", type: "text", placeholder: "Junior Front end Developer", icon: "position" },
          ].map(({ label, field, type, placeholder, icon }) => (
            <div key={field} className="relative">
              <div className="flex items-center bg-gray-50 rounded-xl border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-green-400 transition">
                <Icon name={icon} size={20} className="text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <Input
                    type={type}
                    placeholder={placeholder}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field as keyof UserDetails, e.target.value)}
                    className="border-0 bg-transparent p-0 text-gray-900 placeholder-gray-400 focus-visible:ring-0"
                  />
                  {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                </div>
              </div>
            </div>
          ))}

          <div className="relative">
            <div className="flex items-start bg-gray-50 rounded-xl border border-gray-300 px-4 py-3 focus-within:ring-2 focus-within:ring-green-400 transition">
              <Icon name="Description" size={20} className="text-gray-500 mr-3 mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Textarea
                  placeholder="Work experiences"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="border-0 bg-transparent p-0 text-gray-900 placeholder-gray-400 focus-visible:ring-0 min-h-[120px] resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mt-10">
          <Button
            onClick={handleViewPDF}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md"
          >
            <Icon name="view" size={20} className="mr-2" />
            View PDF
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md"
          >
            <Icon name="Download" size={20} className="mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
