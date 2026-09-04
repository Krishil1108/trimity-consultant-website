import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

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

    const resend = new Resend(process.env.RESEND_API_KEY)

    const formData = await request.formData()
    const type = formData.get('type') as string

    if (type === 'vendor') {
      // Vendor Registration Form
      const name = formData.get('name') as string
      const email = formData.get('email') as string || ''
      const contactNo = formData.get('contactNo') as string
      const companyNo = formData.get('companyNo') as string || ''
      const companyName = formData.get('companyName') as string || ''
      const category = formData.get('category') as string || ''
      const city = formData.get('city') as string || ''
      const productDetails = formData.get('productDetails') as string
      const profileFile = formData.get('profile') as File | null
      const brochureFile = formData.get('brochure') as File | null

      // Process attachments
      const attachments = []
      
      if (profileFile) {
        const buffer = Buffer.from(await profileFile.arrayBuffer())
        attachments.push({
          filename: profileFile.name,
          content: buffer,
        })
      }
      
      if (brochureFile) {
        const buffer = Buffer.from(await brochureFile.arrayBuffer())
        attachments.push({
          filename: brochureFile.name,
          content: buffer,
        })
      }

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #1e293b;">
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 24px; border-radius: 12px 12px 0 0; color: white;">
            <h2 style="margin: 0; font-size: 22px;">New Vendor Partnership Registration</h2>
            <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 14px;">Trimity Consultants Procurement Portal</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <h3 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Vendor Details</h3>
            
            <p style="margin: 8px 0;"><strong>Full Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Company Name:</strong> ${companyName || 'Not specified'}</p>
            <p style="margin: 8px 0;"><strong>Category:</strong> <span style="background-color: #dbeafe; color: #1d4ed8; padding: 3px 8px; rounded: 4px; font-weight: bold;">${category || 'General Supplier'}</span></p>
            <p style="margin: 8px 0;"><strong>Contact Number:</strong> ${contactNo}</p>
            ${email ? `<p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` : ''}
            ${city ? `<p style="margin: 8px 0;"><strong>Location / City:</strong> ${city}</p>` : ''}
            ${companyNo ? `<p style="margin: 8px 0;"><strong>GST / Reg No:</strong> ${companyNo}</p>` : ''}
            
            <h4 style="color: #0f172a; margin: 16px 0 6px 0;">Products / Capabilities Summary:</h4>
            <div style="white-space: pre-wrap; background-color: #ffffff; padding: 14px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 14px; line-height: 1.5;">
              ${productDetails}
            </div>
            
            ${attachments.length > 0 ? `
            <div style="margin-top: 16px; padding: 12px; background: #e0f2fe; border-radius: 8px; border: 1px solid #bae6fd;">
              <strong style="color: #0369a1;">📎 Uploaded Documents (${attachments.length}):</strong><br/>
              ${attachments.map(a => `<span style="font-size: 13px; color: #0284c7;">• ${a.filename}</span>`).join('<br/>')}
            </div>
            ` : ''}
          </div>
          
          <p style="color: #94a3b8; font-size: 12px; margin-top: 16px; text-align: center;">
            Sent automatically from Trimity Consultants (trimity.in/vendor-rfp)
          </p>
        </div>
      `

      const { data, error } = await resend.emails.send({
        from: 'Vendor Registration <onboarding@resend.dev>',
        to: ['trimitybackoffice@gmail.com'],
        subject: `New Vendor Registration - ${name}${companyName ? ` (${companyName})` : ''}`,
        html: emailHtml,
        ...(attachments.length > 0 && { attachments }),
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
      const companyName = formData.get('companyName') as string || ''
      const projectType = formData.get('projectType') as string || ''
      const projectArea = formData.get('projectArea') as string || ''
      const location = formData.get('location') as string || ''
      const services = formData.get('services') as string || ''
      const requirements = formData.get('requirements') as string
      const attachmentFile = formData.get('attachment') as File | null

      // Process attachment
      const attachments = []
      
      if (attachmentFile) {
        const buffer = Buffer.from(await attachmentFile.arrayBuffer())
        attachments.push({
          filename: attachmentFile.name,
          content: buffer,
        })
      }

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #1e293b;">
          <div style="background: linear-gradient(135deg, #ea580c, #f97316); padding: 24px; border-radius: 12px 12px 0 0; color: white;">
            <h2 style="margin: 0; font-size: 22px;">New Request for Proposal (RFP)</h2>
            <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 14px;">Trimity Engineering Consulting Proposal Influx</p>
          </div>
          
          <div style="background-color: #fff7ed; padding: 24px; border: 1px solid #ffedd5; border-top: none; border-radius: 0 0 12px 12px;">
            <h3 style="color: #9a3412; margin-top: 0; border-bottom: 2px solid #fed7aa; padding-bottom: 8px;">Client & Project Scope</h3>
            
            <p style="margin: 8px 0;"><strong>Client Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #ea580c; font-weight: bold;">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Contact Number:</strong> ${contactNo}</p>
            ${companyName ? `<p style="margin: 8px 0;"><strong>Company / Developer:</strong> ${companyName}</p>` : ''}
            ${projectType ? `<p style="margin: 8px 0;"><strong>Building / Project Type:</strong> <span style="background: #ffedd5; color: #c2410c; padding: 2px 6px; rounded: 4px; font-weight: bold;">${projectType}</span></p>` : ''}
            ${projectArea ? `<p style="margin: 8px 0;"><strong>Estimated Area:</strong> ${projectArea}</p>` : ''}
            ${location ? `<p style="margin: 8px 0;"><strong>Site Location:</strong> ${location}</p>` : ''}
            ${services ? `<p style="margin: 8px 0;"><strong>Requested MEPF Services:</strong> <br/><span style="color: #ea580c; font-weight: bold;">${services}</span></p>` : ''}
            
            <h4 style="color: #9a3412; margin: 16px 0 6px 0;">Detailed Scope & Specifications:</h4>
            <div style="white-space: pre-wrap; background-color: #ffffff; padding: 14px; border-radius: 8px; border: 1px solid #fdba74; font-size: 14px; line-height: 1.5;">
              ${requirements}
            </div>
            
            ${attachments.length > 0 ? `
            <div style="margin-top: 16px; padding: 12px; background: #fff; border-radius: 8px; border: 1px solid #fed7aa;">
              <strong style="color: #c2410c;">📎 Architectural Drawing / BOQ Attachment:</strong><br/>
              ${attachments.map(a => `<span style="font-size: 13px; color: #ea580c;">• ${a.filename}</span>`).join('<br/>')}
            </div>
            ` : ''}
          </div>
          
          <p style="color: #94a3b8; font-size: 12px; margin-top: 16px; text-align: center;">
            Sent automatically from Trimity Consultants (trimity.in/vendor-rfp)
          </p>
        </div>
      `

      const { data, error } = await resend.emails.send({
        from: 'RFP Submissions <onboarding@resend.dev>',
        to: ['trimitybackoffice@gmail.com'],
        subject: `New RFP - ${name}${companyName ? ` (${companyName})` : ''} [${projectType || 'MEPF Project'}]`,
        html: emailHtml,
        ...(attachments.length > 0 && { attachments }),
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
