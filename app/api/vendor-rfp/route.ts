import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please contact administrator.' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const type = formData.get('type') as string

    if (type === 'vendor') {
      // Vendor Registration Form
      const name = formData.get('name') as string
      const contactNo = formData.get('contactNo') as string
      const companyNo = formData.get('companyNo') as string
      const productDetails = formData.get('productDetails') as string

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 3px solid #1e40af; padding-bottom: 10px;">
            New Vendor Registration
          </h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Vendor Information</h3>
            
            <p style="margin: 10px 0;">
              <strong style="color: #1f2937;">Full Name:</strong><br/>
              ${name}
            </p>
            
            <p style="margin: 10px 0;">
              <strong style="color: #1f2937;">Contact Number:</strong><br/>
              ${contactNo}
            </p>
            
            ${companyNo ? `
            <p style="margin: 10px 0;">
              <strong style="color: #1f2937;">Company Number:</strong><br/>
              ${companyNo}
            </p>
            ` : ''}
            
            <p style="margin: 10px 0;">
              <strong style="color: #1f2937;">Product Details:</strong><br/>
              <div style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px; margin-top: 5px;">
                ${productDetails}
              </div>
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            This is an automated notification from your website's vendor registration form.
          </p>
        </div>
      `

      const { data, error } = await resend.emails.send({
        from: 'Vendor Registration <onboarding@resend.dev>',
        to: ['shahkrishil1108@gmail.com'],
        subject: `New Vendor Registration - ${name}`,
        html: emailHtml,
      })

      if (error) {
        console.error('Resend API error:', JSON.stringify(error, null, 2))
        return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 })
      }

      return NextResponse.json({ success: true, data })
      
    } else if (type === 'rfp') {
      // RFP Form
      const name = formData.get('name') as string
      const email = formData.get('email') as string
      const contactNo = formData.get('contactNo') as string
      const companyName = formData.get('companyName') as string
      const requirements = formData.get('requirements') as string

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c; border-bottom: 3px solid #ea580c; padding-bottom: 10px;">
            New Request for Proposal (RFP)
          </h2>
          
          <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Client Information</h3>
            
            <p style="margin: 10px 0;">
              <strong style="color: #1f2937;">Full Name:</strong><br/>
              ${name}
            </p>
            
            <p style="margin: 10px 0;">
              <strong style="color: #1f2937;">Email Address:</strong><br/>
              <a href="mailto:${email}" style="color: #ea580c;">${email}</a>
            </p>
            
            <p style="margin: 10px 0;">
              <strong style="color: #1f2937;">Contact Number:</strong><br/>
              ${contactNo}
            </p>
            
            ${companyName ? `
            <p style="margin: 10px 0;">
              <strong style="color: #1f2937;">Company Name:</strong><br/>
              ${companyName}
            </p>
            ` : ''}
            
            <p style="margin: 10px 0;">
              <strong style="color: #1f2937;">Project Requirements:</strong><br/>
              <div style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px; margin-top: 5px; border-left: 3px solid #ea580c;">
                ${requirements}
              </div>
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
            This is an automated notification from your website's RFP form.
          </p>
        </div>
      `

      const { data, error } = await resend.emails.send({
        from: 'RFP Submissions <onboarding@resend.dev>',
        to: ['shahkrishil1108@gmail.com'],
        subject: `New RFP Submission - ${name}${companyName ? ` (${companyName})` : ''}`,
        html: emailHtml,
      })

      if (error) {
        console.error('Resend API error:', JSON.stringify(error, null, 2))
        return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 })
      }

      return NextResponse.json({ success: true, data })
    }

    return NextResponse.json({ error: 'Invalid form type' }, { status: 400 })
    
  } catch (error) {
    console.error('API Error:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    )
  }
}
