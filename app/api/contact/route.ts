import { NextResponse } from "next/server"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
  consent: boolean
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json()

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // TODO: Add SendGrid integration when SENDGRID_API_KEY is available
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    //
    // Send confirmation email to user
    // await sgMail.send({
    //   to: data.email,
    //   from: 'noreply@reservefns.com',
    //   subject: 'Thank you for contacting Reserve Financial Services',
    //   html: `<p>Dear ${data.firstName},</p><p>Thank you for reaching out...</p>`
    // })
    //
    // Send notification to team
    // await sgMail.send({
    //   to: 'info@reservefns.com',
    //   from: 'noreply@reservefns.com',
    //   subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    //   html: `...`
    // })

    // TODO: Add database integration when connected
    // Save to database
    // await db.insert(contacts).values({
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   email: data.email,
    //   phone: data.phone,
    //   message: data.message,
    //   consent: data.consent,
    //   createdAt: new Date()
    // })

    // For now, log the submission
    console.log("Contact form submission:", data)

    return NextResponse.json({ success: true, message: "Form submitted successfully" })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 })
  }
}
