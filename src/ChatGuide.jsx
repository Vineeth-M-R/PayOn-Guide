import { useState, useRef, useEffect } from 'react'

const MsgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

// Per-step quick suggestion chips and their canned responses
const STEP_SUGGESTIONS = {
  3: [
    {
      label: 'Names',
      response: 'Please enter your legal name exactly as it appears on your government-issued ID. This includes your first name, middle initial (optional), last name, and suffix if applicable (e.g., Jr., Sr.).'
    },
    {
      label: 'Primary address',
      response: 'Your primary address is your current residential address — the place where you physically live most of the time. Enter your full street address including street number, name, city, state, and ZIP code.'
    },
    {
      label: 'Mailing address',
      response: 'A mailing address is where you receive mail, such as a P.O. Box or a different address from your home. If your mailing address is the same as your residential address, you don\'t need to enter it separately.'
    },
    {
      label: 'Spouse address',
      response: 'If your spouse lives at a different address, you may need to provide it for verification or joint application purposes. If you share the same address, simply enter your shared home address.'
    },
    {
      label: 'Substitute address',
      response: 'If you are enrolled in a state address confidentiality program (ACP), you may provide a substitute address instead of your actual residential address.'
    },
  ],
  4: [
    {
      label: 'Why ID verification?',
      response: 'Federal law requires financial institutions to verify the identity of every applicant. This helps prevent fraud, identity theft, and money laundering. Your SSN or ITIN is used solely for verification and to run a soft credit check that won\'t affect your credit score.'
    },
    {
      label: 'Citizenship requirements?',
      response: 'You do not need to be a U.S. citizen to apply for a Wells Fargo Pay On loan. Permanent residents, visa holders, and other non-citizens may be eligible. Simply select your citizenship status from the dropdown and we\'ll determine your eligibility accordingly.'
    },
    {
      label: 'SSN Consent?',
      response: 'By providing your Social Security Number (SSN) or Individual Taxpayer Identification Number (ITIN), you consent to Wells Fargo using it to verify your identity and retrieve your credit profile for the purpose of this loan application. This is a soft inquiry and will not impact your credit score until you sign the final loan agreement.'
    },
  ],
  5: [
    {
      label: 'TL;DR',
      response: 'In short: You\'re borrowing $9,945 at a 28.283% annual interest rate. Over the life of the loan you\'ll pay $12,570.92 in interest, bringing your total repayment to $22,515.92. Make sure you\'re comfortable with these numbers before signing.'
    },
    {
      label: 'Total cost',
      response: 'The total cost of this loan is $22,515.92, which includes the $9,945 principal amount financed plus $12,570.92 in finance charges (interest). This assumes all payments are made on time and as scheduled.'
    },
    {
      label: 'Hidden fees?',
      response: 'Wells Fargo Pay On loans do not charge origination fees or prepayment penalties — you can pay off your loan early without any extra charges. The only cost beyond your principal is the interest, represented by the Finance Charge of $12,570.92 in this agreement.'
    },
    {
      label: 'Late payment',
      response: 'If you miss a payment or pay late, you may be charged a late fee and your account may be reported as delinquent to credit bureaus, which could negatively impact your credit score. Wells Fargo recommends setting up autopay to avoid missed payments. Contact customer service immediately if you\'re unable to make a payment on time.'
    },
  ]
}

export default function ChatGuide({ step }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your guide. Do you have any questions about this form?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const prevStepRef = useRef(step)

  // Reset chat greeting when step changes (but only for steps that have suggestions)
  useEffect(() => {
    if (prevStepRef.current !== step && STEP_SUGGESTIONS[step]) {
      setMessages([
        { text: "Hi there! I'm your guide. Do you have any questions about this form?", sender: 'bot' }
      ])
    }
    prevStepRef.current = step
  }, [step])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const addReply = (text) => {
    setMessages(prev => [...prev, { text, sender: 'bot' }])
  }

  const handleSuggestion = (suggestion) => {
    setMessages(prev => [...prev, { text: suggestion.label, sender: 'user' }])
    setTimeout(() => addReply(suggestion.response), 500)
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const query = input.trim()
    setMessages(prev => [...prev, { text: query, sender: 'user' }])
    setInput('')

    setTimeout(() => {
      const q = query.toLowerCase()
      let reply = "I'm here to help! Feel free to tap one of the quick suggestions above, or ask me anything about the fields on this page."
      if (q.includes('address')) reply = "Please provide your current residential address — street number, street name, city, state, and ZIP code."
      else if (q.includes('loan') || q.includes('amount')) reply = "The loan amount is the principal you wish to borrow. You can confirm or adjust it before continuing."
      else if (q.includes('email')) reply = "We'll use your email for account communications and important loan updates."
      else if (q.includes('mobile') || q.includes('phone')) reply = "Your mobile number may be used for verification and account notifications."
      else if (q.includes('ssn') || q.includes('itin')) reply = "Your SSN or ITIN is required for identity verification. This will not affect your credit score."
      else if (q.includes('citizenship')) reply = "You do not need to be a U.S. citizen to apply. Select the option that best describes your status."
      else if (q.includes('suffix')) reply = "Suffix is optional — for example Jr., Sr., or III. Leave it blank if it doesn't apply."
      addReply(reply)
    }, 500)
  }

  const suggestions = STEP_SUGGESTIONS[step] || []

  return (
    <>
      <button
        className={`chat-fab ${isOpen ? 'chat-fab-hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <MsgIcon />
        <span>Need help?</span>
      </button>

      <div className={`chat-top-bar ${isOpen ? 'chat-top-bar-open' : ''}`}>
        <div className="chat-header">
          <div className="chat-title">
            <MsgIcon />
            <span>Guide Assistant</span>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message-bubble message-${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick suggestion chips */}
        {suggestions.length > 0 && (
          <div className="suggestions-row">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="suggestion-chip"
                onClick={() => handleSuggestion(s)}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="chat-input"
          />
          <button type="submit" className="chat-send" disabled={!input.trim()}>
            <SendIcon />
          </button>
        </form>
      </div>

      <div
        className={`chat-backdrop ${isOpen ? 'chat-backdrop-active' : ''}`}
        onClick={() => setIsOpen(false)}
      />
    </>
  )
}
