import { NextRequest, NextResponse } from 'next/server'

// System Context for Trimity Consultants
const TRIMITY_SYSTEM_PROMPT = `
You are the AI Engineering Consultant assistant for Trimity Consultants, a premier MEPF (Mechanical, Electrical, Plumbing, Fire Fighting) engineering consulting firm based in Ahmedabad, India.

Key Company Facts:
- Experience: 18+ years of industry excellence.
- Track Record: Delivered over 700+ landmark projects across India (650+) and Africa (15+ international projects).
- Service Offerings:
  1. HVAC Systems (Heating, Ventilation & Air Conditioning, Chilled Water Plant design, VRF/VRV, cleanroom ventilation)
  2. Electrical & Low Voltage Systems (Substations, DG sets, Solar PV, High-rise distribution, CCTV, Access Control, BMS)
  3. Plumbing & Public Health Engineering (Water Supply, Drainage, STP/ETP, Rainwater Harvesting)
  4. Fire Fighting & Protection (Sprinklers, Hydrants, Smoke Extraction, NFPA / NBC compliance)
  5. Project Management & BIM (Building Information Modeling 3D/4D/5D coordination)
- Sustainability: IGBC (Indian Green Building Council) certified design practices.
- Address & Contact: Yash Anant, 1402-B, Ashram Road, Navrangpura, Ahmedabad 380009. Phone: +91 96624 74538 | Email: info@trimity.in

Guidelines:
- Maintain a highly professional, knowledgeable, and polite engineering consultant tone.
- Keep responses concise, clear, and actionable (2-4 bullet points or short paragraphs).
- Direct clients to request an RFP or contact +91 96624 74538 for custom project proposals.
`

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message parameter is required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY

    if (apiKey && process.env.GEMINI_API_KEY) {
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
          const errText = await response.text()
          console.warn('Gemini API response error status:', response.status, errText)
        }
      } catch (err) {
        console.warn('Gemini API call error, using fallback context response:', err)
      }
    }

    // Smart semantic fallback matching if API key call fails
    const lower = message.toLowerCase()
    let reply = ""

    if (lower.includes('hvac') || lower.includes('air conditioning') || lower.includes('cooling')) {
      reply = "Trimity provides state-of-the-art **HVAC Design**, including centralized chilled water plants, VRF/VRV systems, ventilation, and cleanroom air handling for commercial, healthcare, and residential projects."
    } else if (lower.includes('electrical') || lower.includes('power') || lower.includes('lighting') || lower.includes('solar')) {
      reply = "Our **Electrical & Low Voltage** consulting covers HT/LT power distribution, transformer substations, DG backup, solar PV systems, ELV networks, fire alarms, and Building Management Systems (BMS)."
    } else if (lower.includes('plumbing') || lower.includes('water') || lower.includes('drainage') || lower.includes('stp')) {
      reply = "We design comprehensive **Plumbing & PHE Systems**, featuring sustainable water supply networks, STP/ETP recycling plants, storm water management, and rainwater harvesting."
    } else if (lower.includes('fire') || lower.includes('safety') || lower.includes('sprinkler') || lower.includes('hydrant')) {
      reply = "Trimity specializes in **Fire Fighting & Life Safety**, designing NBC and NFPA compliant fire hydrants, automatic sprinkler systems, clean agent suppression, and smoke extraction."
    } else if (lower.includes('bim') || lower.includes('3d') || lower.includes('model') || lower.includes('revit')) {
      reply = "We utilize **Building Information Modeling (BIM)** to detect 3D clashes before construction, streamline MEP coordination, and deliver accurate bill of quantities (BOQ)."
    } else if (lower.includes('cost') || lower.includes('price') || lower.includes('quote') || lower.includes('rfp') || lower.includes('fee')) {
      reply = "Project consultancy fees depend on scope, built-up area, and required MEPF modules. Please submit your project details via our **Vendor & RFP** page or call us directly at **+91 96624 74538** for an accurate quote."
    } else if (lower.includes('experience') || lower.includes('projects') || lower.includes('portfolio') || lower.includes('location')) {
      reply = "Trimity has delivered over **700+ projects** in **18+ years**, operating across India (650+ projects) and Africa (15+ infrastructure projects). Our HQ is in Ahmedabad, Gujarat."
    } else {
      reply = `Thank you for asking about **Trimity Consultants**. We specialize in complete **MEPF (Mechanical, Electrical, Plumbing & Fire Safety)** engineering with 700+ delivered projects.\n\nTo discuss your specific project requirements, call our senior engineers at **+91 96624 74538** or email **info@trimity.in**.`
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 })
  }
}
