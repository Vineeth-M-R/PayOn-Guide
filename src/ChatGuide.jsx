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

export default function ChatGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your guide. Do you have any questions about this form?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const query = input
    setMessages(prev => [...prev, { text: query, sender: 'user' }])
    setInput('')

    setTimeout(() => {
      let reply = "I'm here to help! Just fill out the fields as they appear, and feel free to ask about anything specific."
      const q = query.toLowerCase()
      if (q.includes('address')) reply = "Please provide your current residential address — street, city, state and zip code."
      else if (q.includes('loan') || q.includes('amount')) reply = "The loan amount is the principal you wish to borrow. You can confirm or adjust it before continuing."
      else if (q.includes('email')) reply = "We'll use your email for account communications and important loan updates."
      else if (q.includes('mobile') || q.includes('phone')) reply = "Your mobile number may be used for verification and account notifications."
      else if (q.includes('suffix')) reply = "Suffix is optional — for example Jr., Sr., or III. Leave it blank if it doesn't apply."
      setMessages(prev => [...prev, { text: reply, sender: 'bot' }])
    }, 600)
  }

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
