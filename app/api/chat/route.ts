import { NextRequest, NextResponse } from 'next/server'

// Comprehensive Knowledge Base & System Context for Trimity Consultants
const TRIMITY_SYSTEM_PROMPT = `
You are the official AI Engineering Consultant assistant for Trimity Consultants, a premier MEPF (Mechanical, Electrical, Plumbing, Fire Fighting) engineering consulting firm.

Key Company Knowledge Base:
- Head Office Address: Yash Anant, 1402-B, Ashram Road, Near Navrangpura Telephone Exchange, Navrangpura, Ahmedabad, Gujarat 380009, India.
- Primary Contact: Phone: +91 96624 74538 | Email: info@trimity.in
- Industry Track Record: 18+ years of engineering excellence with 700+ delivered landmark projects across India (650+) and Africa (15+ international projects).
- Certified Practices: IGBC (Indian Green Building Council) certified sustainable design & BIM 3D clash-free coordination.
- Core Services:
  1. HVAC Systems (Centralized chilled water plants, VRV/VRV multi-split, cleanroom HVAC, smoke ventilation, AHU/chiller design).
  2. Electrical & Low Voltage Systems (Substations, HT/LT power distribution, DG automation, solar PV grid, CCTV, Fire Alarms, BMS).
  3. Plumbing & Public Health Engineering (PHE water supply, drainage, STP/ETP recycling plants, rainwater harvesting).
  4. Fire Fighting & Protection (Sprinkler networks, hydrant systems, FM200/Novec gas suppression, NBC & NFPA compliance).
  5. BIM 3D Coordination (Revit MEP 3D modeling, clash detection, 4D timeline & 5D BOQ estimation).
- Key Sectors Served: Healthcare & Hospitals, Luxury Hotels & Resorts, High-Rise Residential Towers, Commercial IT Parks, Industrial Factories.

Guidelines:
- Keep answers professional, concise, and structured with bold highlights (**bold**).
- When asked about office address, location, or headquarters, clearly state the Head Office details in Ahmedabad.
- Encourage users to request a custom quote via the Vendor & RFP page or call +91 96624 74538.
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
        }
      } catch (err) {
        console.warn('Gemini API call error, falling back to local semantic KB:', err)
      }
    }

    // Extended Semantic Knowledge Base Fallback
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
      lower.includes('navrangpura')
    ) {
      reply = "Trimity's **Head Office** is located at:\n\n📍 **Yash Anant, 1402-B, Ashram Road, Near Navrangpura Telephone Exchange, Navrangpura, Ahmedabad, Gujarat 380009, India**.\n\n📞 Phone: **+91 96624 74538**\n✉️ Email: **info@trimity.in**"
    } else if (lower.includes('hvac') || lower.includes('air conditioning') || lower.includes('chiller') || lower.includes('cooling') || lower.includes('ventilation')) {
      reply = "Trimity provides end-to-end **HVAC Systems Design**, including centralized chilled water plants, VRV/VRF multi-split systems, cleanroom air handling, and energy-efficient ductwork compliant with ASHRAE standards."
    } else if (lower.includes('electrical') || lower.includes('power') || lower.includes('lighting') || lower.includes('solar') || lower.includes('substation') || lower.includes('bms')) {
      reply = "Our **Electrical & Low Voltage** services cover HT/LT power distribution, transformer substations, DG backup, solar PV integration, ELV networks (CCTV, Access Control, Fire Alarm), and Building Management Systems (BMS)."
    } else if (lower.includes('plumbing') || lower.includes('water') || lower.includes('drainage') || lower.includes('stp') || lower.includes('etp')) {
      reply = "We engineer comprehensive **Plumbing & PHE Systems**, featuring sustainable water supply networks, STP/ETP water treatment plants, storm water management, and rainwater harvesting."
    } else if (lower.includes('fire') || lower.includes('safety') || lower.includes('sprinkler') || lower.includes('hydrant') || lower.includes('nfp')) {
      reply = "Trimity specializes in **Fire Fighting & Life Safety Engineering**, designing NBC and NFPA compliant fire hydrants, automatic sprinkler networks, FM200/Novec clean agent suppression, and smoke extraction."
    } else if (lower.includes('bim') || lower.includes('3d') || lower.includes('model') || lower.includes('revit') || lower.includes('clash')) {
      reply = "We utilize **Building Information Modeling (BIM 3D)** in Revit to perform multi-disciplinary clash detection before construction, streamline MEP coordination, and extract accurate BOQs."
    } else if (lower.includes('cost') || lower.includes('price') || lower.includes('quote') || lower.includes('rfp') || lower.includes('fee') || lower.includes('proposal')) {
      reply = "Project consultancy fees depend on scope, built-up area, and required MEPF modules. You can submit your requirements via our **Vendor & RFP** page or contact our senior engineers at **+91 96624 74538**."
    } else if (lower.includes('experience') || lower.includes('project') || lower.includes('portfolio') || lower.includes('track record') || lower.includes('years')) {
      reply = "With **18+ years** of excellence, Trimity has delivered over **700+ landmark projects** across India (650+) and Africa (15+ international projects) in healthcare, hospitality, residential, commercial, and industrial sectors."
    } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('reach') || lower.includes('call')) {
      reply = "You can reach Trimity Consultants directly:\n\n📞 Phone: **+91 96624 74538**\n✉️ Email: **info@trimity.in**\n🏢 Head Office: **Yash Anant, 1402-B, Ashram Road, Navrangpura, Ahmedabad 380009**"
    } else {
      reply = `Thank you for reaching out to **Trimity Consultants**!\n\nWe are a leading **MEPF (Mechanical, Electrical, Plumbing & Fire Safety)** engineering firm with 700+ delivered projects.\n\n📍 **Head Office:** Yash Anant, 1402-B, Ashram Road, Navrangpura, Ahmedabad 380009\n📞 **Phone:** +91 96624 74538\n✉️ **Email:** info@trimity.in`
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 })
  }
}
