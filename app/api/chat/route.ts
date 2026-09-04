import { NextRequest, NextResponse } from 'next/server'

// Comprehensive System Knowledge Base for Trimity Consultants
const TRIMITY_SYSTEM_PROMPT = `
You are the official AI Engineering Consultant assistant for Trimity Consultants, a top-tier MEPF (Mechanical, Electrical, Plumbing, Fire Fighting) engineering design and consulting firm based in Ahmedabad, India.

CRITICAL KNOWLEDGE BASE:

1. COMPANY OVERVIEW & IDENTITY:
- Firm Name: Trimity Consultants
- Domain: End-to-end MEPF Engineering Consulting, Project Management, and BIM 3D Coordination.
- Track Record: 18+ years of engineering excellence.
- Portfolio: 700+ completed projects across India (650+) and Africa (15+ international projects).
- Certifications & Compliance: IGBC (Indian Green Building Council) certified sustainable design practices, NBC (National Building Code of India), IS Codes, NFPA, and ASHRAE compliant.

2. HEAD OFFICE & SURROUNDINGS:
- Head Office Address: Yash Anant, 1402-B, Ashram Road, Near Navrangpura Telephone Exchange, Navrangpura, Ahmedabad, Gujarat 380009, India.
- Prime Location & Surroundings: Situated on Ashram Road—Ahmedabad's primary commercial & financial corridor, right opposite/near Navrangpura Telephone Exchange, minutes away from the Sabarmati Riverfront and CG Road business hubs.
- Office Working Hours: Monday to Saturday, 9:30 AM to 7:00 PM IST (Sunday closed).
- Direct Contact: Phone: +91 96624 74538 | Email: info@trimity.in | Web: trimity.in

3. MEPF SERVICES & TECHNICAL SPECIALIZATIONS:
- HVAC Systems: Centralized chilled water plants, VRV/VRF multi-split systems, cleanroom air handling (AHU) for hospitals/pharma, smoke extraction, ducting, heat load calculation, energy recovery.
- Electrical & Low Voltage: Transformer substations (HT/LT), DG backup automation, solar PV rooftop/ground grid, power distribution, architectural & emergency lighting, ELV systems (CCTV, Access Control, Public Address, Fire Alarm), Building Management Systems (BMS).
- Plumbing & Public Health Engineering (PHE): Hydro-pneumatic water supply, gravity & drainage networks, Sewage Treatment Plants (STP), Effluent Treatment Plants (ETP), zero liquid discharge (ZLD), rainwater harvesting.
- Fire Fighting & Life Safety: Automatic sprinkler networks, internal/external fire hydrants, FM200/Novec gas suppression for server rooms, smoke management, fire pumps, NBC & NFPA compliance.
- BIM & 3D Coordination: Revit MEP 3D modeling, inter-disciplinary clash detection (HVAC vs Structure vs Electrical vs Plumbing), 4D construction timeline simulation, 5D BOQ & cost extraction.

4. SECTORS SERVED:
- Healthcare & Hospitals (Specialized sterile HVAC, cleanrooms, medical gas pipelines).
- Luxury Hotels, Resorts & Restaurants (VRF/Chillers, acoustic insulation, greywater reuse).
- High-Rise Residential & Commercial Towers (High-pressure fire systems, HT power distribution).
- Shopping Malls & Retail Centers (High-traffic HVAC, smoke extraction, multi-tenant metering).
- Industrial Factories & Warehouses (Heavy electrical load design, ETP, industrial ventilation).

RESPONSE GUIDELINES:
- Answer ANY question directly related to Trimity Consultants, its location, surroundings, services, project portfolio, standards, or contact options.
- Maintain a helpful, confident, professional, and courteous engineering consultant tone.
- Use clean Markdown formatting with clear bold headings and bullet points where helpful.
- For specific commercial proposals or RFP inquiries, encourage clients to call +91 96624 74538 or submit details on the Vendor & RFP page.
`

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message parameter is required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY

    if (apiKey) {
      try {
        const response = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-goog-api-key': apiKey,
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: `${TRIMITY_SYSTEM_PROMPT}\n\nClient Question: ${message}` }
                  ]
                }
              ]
            })
          }
        )

        if (response.ok) {
          const data = await response.json()
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
          if (text) {
            return NextResponse.json({ reply: text })
          }
        } else {
          const errBody = await response.text()
          console.warn('Gemini API return status:', response.status, errBody)
        }
      } catch (err) {
        console.warn('Gemini API call exception, falling back to local semantic router:', err)
      }
    }

    // Extended Semantic Router Fallback
    const lower = message.toLowerCase().trim()
    let reply = ""

    if (
      lower.includes('head office') ||
      lower.includes('office') ||
      lower.includes('address') ||
      lower.includes('location') ||
      lower.includes('where are you') ||
      lower.includes('headquarters') ||
      lower.includes('located') ||
      lower.includes('ahmedabad') ||
      lower.includes('navrangpura') ||
      lower.includes('ashram road') ||
      lower.includes('surrounding') ||
      lower.includes('landmark')
    ) {
      reply = "Trimity's **Head Office** is located at:\n\n📍 **Yash Anant, 1402-B, Ashram Road, Near Navrangpura Telephone Exchange, Navrangpura, Ahmedabad, Gujarat 380009, India**.\n\n🌆 **Surroundings & Connectivity:**\n• Located on Ashram Road—Ahmedabad's prime business corridor.\n• Right near Navrangpura Telephone Exchange.\n• Minutes away from the Sabarmati Riverfront and CG Road commercial hubs.\n\n📞 Phone: **+91 96624 74538** | Email: **info@trimity.in**"
    } else if (lower.includes('hour') || lower.includes('time') || lower.includes('timing') || lower.includes('open') || lower.includes('working') || lower.includes('sunday')) {
      reply = "Trimity Consultants Head Office Working Hours:\n\n⏰ **Monday – Saturday:** 9:30 AM to 7:00 PM IST\n🗓️ **Sunday:** Closed\n\nFor urgent inquiries outside working hours, email us at **info@trimity.in** or call **+91 96624 74538**."
    } else if (lower.includes('hvac') || lower.includes('air conditioning') || lower.includes('chiller') || lower.includes('cooling') || lower.includes('ventilation') || lower.includes('cleanroom')) {
      reply = "Trimity delivers complete **HVAC Systems Design**:\n\n• Centralized Chilled Water Plants\n• VRV / VRF Multi-split air conditioning\n• Cleanroom & Hospital AHU ventilation\n• Smoke extraction & ductwork design compliant with ASHRAE standards."
    } else if (lower.includes('electrical') || lower.includes('power') || lower.includes('lighting') || lower.includes('solar') || lower.includes('substation') || lower.includes('bms') || lower.includes('cctv')) {
      reply = "Our **Electrical & Low Voltage** consulting covers:\n\n• HT/LT Power Distribution & Substation design\n• Diesel Generator (DG) auto-backup systems\n• Rooftop & Ground Solar PV integration\n• ELV Systems (CCTV, Access Control, Fire Alarms, BMS automation)."
    } else if (lower.includes('plumbing') || lower.includes('water') || lower.includes('drainage') || lower.includes('stp') || lower.includes('etp') || lower.includes('rainwater')) {
      reply = "We engineer comprehensive **Plumbing & Public Health Engineering (PHE)**:\n\n• Hydro-pneumatic & gravity water supply networks\n• Drainage & Stormwater management\n• STP / ETP wastewater recycling plants & Zero Liquid Discharge (ZLD)\n• Rainwater harvesting systems."
    } else if (lower.includes('fire') || lower.includes('safety') || lower.includes('sprinkler') || lower.includes('hydrant') || lower.includes('nfp') || lower.includes('nbc')) {
      reply = "Trimity specializes in **Fire Fighting & Life Safety Engineering**:\n\n• Automatic sprinkler networks & internal/external hydrants\n• FM200 & Novec gas suppression for server rooms\n• Smoke extraction & stairwell pressurization\n• Full compliance with National Building Code (NBC) & NFPA standards."
    } else if (lower.includes('bim') || lower.includes('3d') || lower.includes('model') || lower.includes('revit') || lower.includes('clash') || lower.includes('boq')) {
      reply = "We utilize **Building Information Modeling (BIM 3D)** in Revit to perform multi-disciplinary clash detection before construction, streamline MEP coordination, and extract precise 5D BOQ estimates."
    } else if (lower.includes('hospital') || lower.includes('healthcare') || lower.includes('hotel') || lower.includes('resort') || lower.includes('tower') || lower.includes('residential') || lower.includes('commercial') || lower.includes('mall') || lower.includes('industrial') || lower.includes('factory')) {
      reply = "Trimity designs specialized MEPF infrastructure across key sectors:\n\n🏥 **Healthcare & Hospitals:** Sterile HVAC, cleanrooms, medical gas.\n🏨 **Hospitality & Hotels:** Acoustic plumbing, energy recovery chillers.\n🏢 **High-Rise Residential & Commercial:** HT substations, high-pressure fire pumps.\n🏭 **Industrial Factories:** Heavy power distribution, industrial ETPs."
    } else if (lower.includes('cost') || lower.includes('price') || lower.includes('quote') || lower.includes('rfp') || lower.includes('fee') || lower.includes('proposal') || lower.includes('estimate')) {
      reply = "Consultancy fees are customized based on project scale, built-up area, and required MEPF scope.\n\nPlease submit your requirements via our **Vendor & RFP** page or contact our senior engineers directly at **+91 96624 74538**."
    } else if (lower.includes('experience') || lower.includes('project') || lower.includes('portfolio') || lower.includes('track record') || lower.includes('years') || lower.includes('africa') || lower.includes('india')) {
      reply = "With **18+ years** of engineering leadership, Trimity has successfully delivered over **700+ landmark projects** across India (650+) and Africa (15+ international infrastructure projects)."
    } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('reach') || lower.includes('call') || lower.includes('mail')) {
      reply = "Connect directly with Trimity Consultants:\n\n📞 Phone: **+91 96624 74538**\n✉️ Email: **info@trimity.in**\n🏢 Head Office: **Yash Anant, 1402-B, Ashram Road, Near Navrangpura Telephone Exchange, Navrangpura, Ahmedabad 380009**"
    } else {
      reply = `Thank you for asking about **Trimity Consultants**!\n\nWe are a premier **MEPF (Mechanical, Electrical, Plumbing & Fire Safety)** consulting firm with 18+ years experience and 700+ delivered projects.\n\n📍 **Head Office:** Yash Anant, 1402-B, Ashram Road, Navrangpura, Ahmedabad 380009\n📞 **Phone:** +91 96624 74538\n✉️ **Email:** info@trimity.in`
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 })
  }
}
