import { useState } from 'react'
import ChatGuide from './ChatGuide'
import './App.css'

// Inline SVG icons - no external dependency
const DollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
)

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

function App() {
  const [step, setStep] = useState(0)
  const [loanAmount, setLoanAmount] = useState('25,000.00')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleInitial, setMiddleInitial] = useState('')
  const [lastName, setLastName] = useState('')
  const [suffix, setSuffix] = useState('')
  const [address, setAddress] = useState('')
  const [apt, setApt] = useState('')

  return (
    <div className="app-container">
      <main className="form-content">

        {/* Top Brand Header */}
        <div className="brand-header">WELLS FARGO</div>

        {/* Progress Bar */}
        {step > 0 && (
          <div className="progress-container">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
          </div>
        )}

        {/* STEP 0: LANDING */}
        {step === 0 && (
          <div className="step-container fade-in text-center">
            <h1 className="landing-title">
              Pay over time with<br />Wells Fargo Pay On
            </h1>

            <div className="landing-hero">
              <div className="hero-circle hero-circle-1"></div>
              <div className="hero-circle hero-circle-2"></div>
              <div className="hero-illustration">
                <div className="hero-cal">
                  <div className="cal-header"></div>
                  <div className="cal-dots">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                  </div>
                  <div className="cal-coin">
                    <div className="coin">$</div>
                    <div className="coin-shadow"></div>
                  </div>
                </div>
              </div>
            </div>

            <p className="ready-text">Ready to apply?</p>
            <button className="landing-button" onClick={() => setStep(1)}>
              Let's go
            </button>
            <p className="housing-lender">⌂ Equal Housing Lender</p>
          </div>
        )}

        {/* STEP 1: LOAN INFO */}
        {step === 1 && (
          <div className="step-container slide-in">
            <div className="step-header">
              <div className="header-icon-circle">
                <DollarIcon />
              </div>
              <h1 className="step-title-inline">Loan info</h1>
            </div>

            <div className="field-label-row">
              <span>Confirm your loan amount</span>
              <InfoIcon />
            </div>

            <div className="loan-amount-display">
              <span className="currency">$</span>
              <input
                type="text"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="amount-input-large"
              />
            </div>
            <div className="loan-divider"></div>

            <p className="disclaimer-text">
              Applying for a Wells Fargo Pay On loan will not affect your credit score until you sign the loan agreement.
            </p>

            <div className="btn-row mt-6">
              <button
                className="pill-button"
                onClick={() => setStep(2)}
                disabled={!loanAmount}
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CONTACT INFO */}
        {step === 2 && (
          <div className="step-container slide-in">
            <div className="step-header">
              <div className="header-icon-circle">
                <PhoneIcon />
              </div>
              <h1 className="step-title-inline">Contact info</h1>
            </div>

            <div className="floating-group">
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder=" "
                className="fl-input"
                id="mobile"
              />
              <label htmlFor="mobile" className="fl-label">Mobile number</label>
            </div>

            <div className="floating-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="fl-input"
                id="email"
              />
              <label htmlFor="email" className="fl-label">Email address</label>
            </div>

            <div className="legal-box">
              <p>By selecting <strong>Continue</strong>, I agree:</p>
              <ul className="legal-list">
                <li>Wells Fargo may contact me using automated systems. Message/data rates may apply.</li>
                <li>Wells Fargo may contact me at any email address I provide.</li>
                <li>I agree to use of electronic signatures and to receive account-related documents electronically. See <a href="#">ESIGN terms</a>.</li>
              </ul>
              <p className="patriot-text mt-3">
                <strong>PATRIOT Act Notice:</strong> To help the government fight the funding of terrorism and money laundering activities, U.S. Federal law requires financial institutions to obtain, verify, and record information that identifies each person who opens an account.
              </p>
            </div>

            <button
              className="primary-button mt-6"
              onClick={() => setStep(3)}
              disabled={!mobile || !email}
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 3: PERSONAL INFO */}
        {step === 3 && (
          <div className="step-container slide-in">
            <div className="step-header">
              <div className="header-icon-circle">
                <PersonIcon />
              </div>
              <h1 className="step-title-inline">Personal info</h1>
            </div>

            <div className="floating-group">
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                placeholder=" " className="fl-input" id="fname" />
              <label htmlFor="fname" className="fl-label">First name</label>
            </div>

            <div className="floating-group">
              <input type="text" value={middleInitial} onChange={(e) => setMiddleInitial(e.target.value)}
                placeholder=" " className="fl-input" id="mi" />
              <label htmlFor="mi" className="fl-label">Middle initial <span className="opt">(optional)</span></label>
            </div>

            <div className="floating-group">
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                placeholder=" " className="fl-input" id="lname" />
              <label htmlFor="lname" className="fl-label">Last name</label>
            </div>

            <div className="floating-group select-group">
              <select value={suffix} onChange={(e) => setSuffix(e.target.value)}
                className="fl-input fl-select" id="suffix">
                <option value=""></option>
                <option value="jr">Jr.</option>
                <option value="sr">Sr.</option>
                <option value="iii">III</option>
              </select>
              <label htmlFor="suffix" className="fl-label fl-label-up">Suffix <span className="opt">(optional)</span></label>
              <span className="select-arrow"><ChevronDownIcon /></span>
            </div>

            <div className="floating-group">
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                placeholder=" " className="fl-input" id="address" />
              <label htmlFor="address" className="fl-label">Home or permanent address</label>
            </div>
            <p className="addr-note">
              For verification purposes, your primary home or business address is required.{' '}
              <a href="#">Need to use a substitute address?</a>
            </p>

            <div className="floating-group">
              <input type="text" value={apt} onChange={(e) => setApt(e.target.value)}
                placeholder=" " className="fl-input" id="apt" />
              <label htmlFor="apt" className="fl-label">Apt/suite <span className="opt">(optional)</span></label>
            </div>

            <div className="btn-row mt-6 pb-16">
              <button
                className="primary-button"
                onClick={() => alert('Application Submitted!')}
                disabled={!firstName || !lastName || !address}
              >
                Submit Application
              </button>
            </div>
          </div>
        )}

      </main>

      <ChatGuide />
    </div>
  )
}

export default App
