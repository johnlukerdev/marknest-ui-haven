import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { name, email, topic, message, to } = await req.json()

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found')
      return new Response('Email service not configured', { status: 500 })
    }

    const emailBody = `
New contact form submission:

Name: ${name}
Email: ${email}
Topic: ${topic}

Message:
${message}

---
Submitted from Contact Support form
    `.trim()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Contact Form <noreply@yourdomain.com>',
        to: [to],
        subject: `Contact Form: ${topic} - ${name}`,
        text: emailBody,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend API error:', error)
      return new Response('Failed to send email', { status: 500 })
    }

    return new Response('Email sent successfully', { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response('Internal server error', { status: 500 })
  }
})