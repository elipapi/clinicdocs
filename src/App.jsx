import { useEffect, useMemo, useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import './App.css'

const patients = [
  {
    id: 1,
    name: 'Elena Torres',
    condition: 'Post-op ACL rehabilitation',
    adherence: 92,
    painLevel: 3,
    mobility: 74,
    lastSession: 'Apr 18, 2026',
    nextSession: 'Apr 23, 2026',
    goals: ['Restore knee extension', 'Improve single-leg stability'],
    updates: [
      { date: 'Apr 07', note: 'Reduced swelling after adjusted loading protocol.' },
      { date: 'Apr 12', note: 'Single-leg squat control improved by 15%.' },
      { date: 'Apr 18', note: 'Reported better confidence during stairs.' },
    ],
  },
  {
    id: 2,
    name: 'Marco Ruiz',
    condition: 'Chronic lower back pain',
    adherence: 78,
    painLevel: 5,
    mobility: 61,
    lastSession: 'Apr 17, 2026',
    nextSession: 'Apr 22, 2026',
    goals: ['Increase core endurance', 'Reduce morning stiffness'],
    updates: [
      { date: 'Apr 05', note: 'Tolerates 20 min walking with less discomfort.' },
      { date: 'Apr 10', note: 'Trigger points still active in lumbar area.' },
      { date: 'Apr 17', note: 'Needs better consistency in home exercises.' },
    ],
  },
  {
    id: 3,
    name: 'Sofia Mendoza',
    condition: 'Shoulder impingement syndrome',
    adherence: 85,
    painLevel: 2,
    mobility: 81,
    lastSession: 'Apr 19, 2026',
    nextSession: 'Apr 25, 2026',
    goals: ['Full overhead ROM', 'Strengthen rotator cuff'],
    updates: [
      { date: 'Apr 08', note: 'External rotation strength trending up.' },
      { date: 'Apr 14', note: 'Pain-free range reached in frontal plane.' },
      { date: 'Apr 19', note: 'Mild soreness only after high repetitions.' },
    ],
  },
]

const aiFeedbackByCondition = {
  'Post-op ACL rehabilitation': {
    focus: 'Prioritize neuromuscular knee control and progressive unilateral loading.',
    nextIdeas: [
      'Add deceleration drills with visual cues to improve movement quality.',
      'Progress from supported to unsupported single-leg Romanian deadlifts.',
      'Use brief fatigue checkpoints to adapt intensity in-session.',
    ],
    caution: 'Monitor valgus collapse during dynamic transitions.',
  },
  'Chronic lower back pain': {
    focus: 'Blend symptom-guided mobility with graded core endurance exposure.',
    nextIdeas: [
      'Introduce anti-rotation holds with breathing tempo control.',
      'Use pain journal prompts to identify aggravating daily patterns.',
      'Progress walking intervals by 10% if next-day symptoms remain stable.',
    ],
    caution: 'Avoid sudden volume spikes when pain exceeds baseline by 2+ points.',
  },
  'Shoulder impingement syndrome': {
    focus: 'Continue scapular coordination and overhead tolerance progression.',
    nextIdeas: [
      'Add eccentric external rotation work at moderate load.',
      'Integrate wall-slide variations with thoracic extension bias.',
      'Introduce sport-specific reaching patterns at submax intensity.',
    ],
    caution: 'Pause overhead progression if sharp anterior pain appears.',
  },
}

function App() {
  const [role, setRole] = useState(null)
  const [selectedRole, setSelectedRole] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [clinicianName, setClinicianName] = useState('')
  const [loginError, setLoginError] = useState('')
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id)
  const [sessionNote, setSessionNote] = useState('')

  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === selectedPatientId),
    [selectedPatientId]
  )

  const aiFeedback = aiFeedbackByCondition[selectedPatient.condition]

  useEffect(() => {
    const session = localStorage.getItem('clinicdocs-session')
    if (!session) return

    try {
      const parsed = JSON.parse(session)
      setRole(parsed.role)
      setClinicianName(parsed.name)
      setIsAuthenticated(true)
    } catch {
      localStorage.removeItem('clinicdocs-session')
    }
  }, [])

  const handleLogin = (name, role) => {
    localStorage.setItem(
      'clinicdocs-session',
      JSON.stringify({ name, role })
    )
    setClinicianName(name)
    setRole(role)
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return (
      <main className="login-shell">
        <section className="login-card">
          <div className="brand-row">
            <div className="brand-icon">❤</div>
            <div>
              <p className="brand-title">ClinicDoc</p>
              <p className="brand-subtitle">Clinical Documentation System</p>
            </div>
          </div>

          <h1>Welcome back</h1>
          <p className="login-copy">
            Sign in with Google to continue
          </p>

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential)

              handleLogin(decoded.name, 'physio')
            }}
            onError={() => {
              setLoginError('Google sign-in failed')
            }}
          />
    
          {loginError && <p className="login-error">{loginError}</p>}<div className="benefits-grid">
            <article className="benefit-card">
              <strong>Save Time</strong>
              <p>1–2 hours daily</p>
            </article>

            <article className="benefit-card">
              <strong>Secure</strong>
              <p>GDPR compliant</p>
            </article>

            <article className="benefit-card">
              <strong>AI-Powered</strong>
              <p>Smart suggestions</p>
            </article>

            <article className="benefit-card">
              <strong>Team Ready</strong>
              <p>Multi-role access</p>
            </article>
          </div>
        </section>
      </main>
    )
  }

  // PATIENT VIEW
  if (role === 'patient') {
    return (
      <main className="app-shell">
        <header className="top-bar">
          <h1>Patient Dashboard — {clinicianName}</h1>
          <button
            className="ghost"
            onClick={() => {
              localStorage.clear()
              setIsAuthenticated(false)
            }}
          >
            Logout
          </button>
        </header>

        <section className="panel">
          <h2>{selectedPatient.name}</h2>
          <p>{selectedPatient.condition}</p>
          <p>Pain: {selectedPatient.painLevel}/10</p>
          <p>Mobility: {selectedPatient.mobility}%</p>
        </section>
      </main>
    )
  }

  // PHYSIO VIEW (DEFAULT)
  return (
    <main className="app-shell">
      <header className="top-bar">
        <h1>Physio Dashboard — {clinicianName}</h1>
        <button
          className="ghost"
          onClick={() => {
            localStorage.clear()
            setIsAuthenticated(false)
          }}
        >
          Logout
        </button>
      </header>

      <section className="content-grid">
        <aside className="panel">
          <h2>Patients</h2>
          {patients.map((p) => (
            <button
              key={p.id}
              className={`patient-item ${
                p.id === selectedPatientId ? 'active' : ''
              }`}
              onClick={() => setSelectedPatientId(p.id)}
            >
              {p.name}
            </button>
          ))}
        </aside>

        <section className="panel">
          <h2>{selectedPatient.name}</h2>
          <p>{aiFeedback.focus}</p>
          <ul>
            {aiFeedback.nextIdeas.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>

        <aside className="panel">
          <h2>Session Notes</h2>
          <textarea
            value={sessionNote}
            onChange={(e) => setSessionNote(e.target.value)}
          />
        </aside>
      </section>
    </main>
  )
}

export default App