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

const FingerprintIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24">
    <path d="M12 1C7.03 1 3 5.03 3 10v4"/>
    <path d="M12 1c4.97 0 9 4.03 9 9v4"/>
    <path d="M6 10c0-3.31 2.69-6 6-6s6 2.69 6 6v2"/>
    <path d="M9 10c0-1.66 1.34-3 3-3s3 1.34 3 3v5"/>
    <path d="M12 13v6"/>
    <path d="M3 14v3a9 9 0 0 0 9 9 9 9 0 0 0 9-9v-3"/>
  </svg>
)

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
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
  const [ssn, setSsn] = useState('')
  const [dob, setDob] = useState('')
  const [citizenship, setCitizenship] = useState('')
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
              <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
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
                className="pill-button"
                onClick={() => setStep(4)}
                disabled={!firstName || !lastName || !address}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: ID INFO */}
        {step === 4 && (
          <div className="step-container slide-in">
            <div className="step-header">
              <div className="header-icon-circle">
                <FingerprintIcon />
              </div>
              <h1 className="step-title-inline">ID info</h1>
            </div>

            <div className="id-field-group">
              <div className="id-input-row">
                <input
                  type="password"
                  value={ssn}
                  onChange={(e) => setSsn(e.target.value)}
                  placeholder="SSN or ITIN"
                  className="id-input"
                  id="ssn"
                />
                <InfoIcon />
              </div>
              <p className="id-note">We'll use this to provide loan options with no impact to your credit score.</p>
            </div>

            <div className="id-field-group">
              <div className="id-input-row">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="Date of birth"
                  className="id-input id-input-date"
                  id="dob"
                />
              </div>
            </div>

            <div className="id-field-group">
              <div className="id-input-row select-row">
                <select
                  value={citizenship}
                  onChange={(e) => setCitizenship(e.target.value)}
                  className="id-input id-select"
                  id="citizenship"
                >
                  <option value="">Select citizenship status</option>
                  <option value="us">U.S. Citizen</option>
                  <option value="pr">Permanent Resident</option>
                  <option value="visa">Visa Holder</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDownIcon />
              </div>
              <p className="id-note">You do not need to be a U.S. citizen to apply.</p>
            </div>

            <div className="btn-row mt-8 pb-16">
              <button
                className="pill-button pill-button-disabled-style"
                onClick={() => setStep(5)}
                disabled={!ssn || !dob || !citizenship}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: LOAN AGREEMENT */}
        {step === 5 && (
          <div className="step-container slide-in pb-16">
            <div className="agreement-header-row">
              <h1 className="agreement-title">Your loan agreement</h1>
              <button className="download-btn" title="Download">
                <DownloadIcon />
              </button>
            </div>

            <div className="agreement-body">
              {/* Bank address block */}
              <div className="bank-block">
                <div className="bank-logo-box">
                  <span>WELLS<br/>FARGO</span>
                </div>
                <div className="bank-address">
                  <p>Wells Fargo Bank N.A.</p>
                  <p>Personal Lending</p>
                  <p>PO Box 563983</p>
                  <p>Charlotte, NC 28256-9907</p>
                </div>
              </div>

              <div className="agreement-meta">
                <div className="meta-row">
                  <span><strong>Wells Fargo Bank, N. A.</strong></span>
                  <span><strong>Loan Agreement for Wells Fargo Pay On</strong></span>
                </div>
                <div className="meta-row">
                  <span><strong>Loan Account:</strong> 66216064180001</span>
                  <span><strong>Loan Date:</strong> 03/17/2026</span>
                </div>
                <div className="meta-row">
                  <span><strong>Borrower Name(s):</strong> {firstName} {lastName}</span>
                  <span><strong>Loan Amount:</strong> ${loanAmount}</span>
                </div>
              </div>

              <p className="agreement-para">
                In this Pay On Loan Agreement (the "Agreement"), the words "you" and "your" refer to each Borrower(s) named above. The words "Bank", "we," "our," and "us," refer to Wells Fargo Bank, N.A, and its successors and assigns. The word "Account" refers to the Loan Account listed above. The word "Merchant" refers to the retail merchant identified in the Itemization of Amount financed, who will receive the loan proceeds on your behalf. Each person who signs this Agreement will be bound by its terms and will be directly liable to the Bank for the entire amount owed. You request and agree that all loan proceeds should be disbursed to the Merchant on your behalf. If you prefer to receive loan funds directly, you may apply directly to us for a personal loan.
              </p>

              {/* Truth-In-Lending Table */}
              <div className="tila-table">
                <div className="tila-title">Truth-In-Lending Disclosure Statement</div>
                <div className="tila-grid">
                  <div className="tila-cell">
                    <p className="tila-label">ANNUAL PERCENTAGE RATE</p>
                    <p className="tila-desc">The cost of your credit as a yearly rate.*</p>
                    <p className="tila-value">28.283%</p>
                  </div>
                  <div className="tila-cell">
                    <p className="tila-label">FINANCE CHARGE</p>
                    <p className="tila-desc">The dollar amount the credit will cost you.*</p>
                    <p className="tila-value">$12,570.92</p>
                  </div>
                  <div className="tila-cell">
                    <p className="tila-label">Amount Financed</p>
                    <p className="tila-desc">The amount of credit provided on your behalf.*</p>
                    <p className="tila-value">$9,945.00</p>
                  </div>
                  <div className="tila-cell">
                    <p className="tila-label">Total of Payments</p>
                    <p className="tila-desc">The amount you will have paid after you have made all payments as scheduled.*</p>
                    <p className="tila-value">$22,515.92</p>
                  </div>
                </div>
              </div>

              <div className="agree-accept-row">
                <button className="primary-button" onClick={() => alert('Loan Agreement Accepted!')}>Accept &amp; Sign</button>
              </div>
            </div>
          </div>
        )}

      </main>

      <ChatGuide step={step} />
    </div>
  )
}

export default App
