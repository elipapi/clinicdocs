/**
 * Login Page
 */

import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import './Login.css'

export const Login = ({ onLogin, error }) => {
  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential)
    onLogin(decoded)
  }

  const handleError = () => {
    // Error is handled by parent
  }

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
          onSuccess={handleSuccess}
          onError={handleError}
        />

        {error && <p className="login-error">{error}</p>}

        <div className="benefits-grid">
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
