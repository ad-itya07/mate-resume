import jsPDF from "jspdf"
import type { UserDetails } from "./types"

export const generatePDF = (userData: UserDetails): void => {
  const doc = new jsPDF()

  doc.setFont("helvetica")

  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("User Details", 20, 30)

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")

  let yPosition = 60
  const lineHeight = 20
  const labelWidth = 40

  doc.setFont("helvetica", "bold")
  doc.text("Name:", 20, yPosition)
  doc.setFont("helvetica", "normal")
  doc.text(userData.name, 20 + labelWidth, yPosition)
  yPosition += lineHeight

  doc.setFont("helvetica", "bold")
  doc.text("Email:", 20, yPosition)
  doc.setFont("helvetica", "normal")
  doc.text(userData.email, 20 + labelWidth, yPosition)
  yPosition += lineHeight

  doc.setFont("helvetica", "bold")
  doc.text("Phone Number:", 20, yPosition)
  doc.setFont("helvetica", "normal")
  doc.text(userData.phoneNumber, 20 + labelWidth, yPosition)
  yPosition += lineHeight

  doc.setFont("helvetica", "bold")
  doc.text("Position:", 20, yPosition)
  doc.setFont("helvetica", "normal")
  doc.text(userData.position, 20 + labelWidth, yPosition)
  yPosition += lineHeight

  doc.setFont("helvetica", "bold")
  doc.text("Description:", 20, yPosition)
  yPosition += 10

  doc.setFont("helvetica", "normal")

  const splitDescription = doc.splitTextToSize(userData.description, 150)
  doc.text(splitDescription, 20, yPosition)

  doc.save(`${userData.name.replace(/\s+/g, "_")}_details.pdf`)
}
