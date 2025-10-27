import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../state/authContext';
import './signin-assets.css';

/**
 * PUBLIC_INTERFACE
 * SignIn renders the provided pixel-perfect sign-in UI as a React component.
 */
export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      const back = params.get('return') || '/';
      navigate(back);
    } catch (er) {
      setError(er.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', padding: 16 }}>
      <main id="screen-sign-in-11-235" className="screen" role="main" aria-label="Sign In Screen">
        {/* Header/time elements kept for fidelity but static */}
        <div id="comp-13-71" className="comp status-bar" aria-hidden="true">
          <div id="comp-13-71-128-302" className="symbols" />
          <div id="comp-13-71-128-319" className="time-wrap">
            <span id="comp-13-71-128-320" className="time-text">19:27</span>
          </div>
        </div>

        {/* Title */}
        <div id="group-13-110" className="group title">
          <p id="text-12-29" className="text hello">Hello,</p>
          <p id="text-12-30" className="text welcome">Welcome Back!</p>
        </div>

        {/* Email */}
        <form onSubmit={onSubmit}>
          <div id="comp-30-585" className="comp input-field" data-role="input_area">
            <div id="rect-I30-585-30-298" className="input-bg" />
            <label id="label-I30-585-30-301" className="label" htmlFor="email">Email</label>
            <input
              id="ph-I30-585-30-300"
              className="placeholder"
              style={{ background: 'transparent', border: 'none', outline: 'none', width: '80%' }}
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
              type="email"
              required
            />
          </div>

          {/* Password */}
          <div id="comp-30-590" className="comp input-field" data-role="input_area">
            <div id="rect-I30-590-30-298" className="input-bg" />
            <label id="label-I30-590-30-301" className="label" htmlFor="password">Enter Password</label>
            <input
              id="ph-I30-590-30-300"
              className="placeholder"
              style={{ background: 'transparent', border: 'none', outline: 'none', width: '80%' }}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              type="password"
              required
            />
          </div>

          {/* Forgot password placeholder */}
          <div id="group-12-91" className="group forgot">
            <span id="text-12-94" className="link forgot-link" role="link" tabIndex={0}>Forgot Password?</span>
          </div>

          {/* CTA Sign In */}
          <button id="button-54-668" className="button cta" type="submit" disabled={loading} aria-label="Sign In">
            <span id="label-I54-668-53-624" className="cta-label">{loading ? 'Signing in...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Bottom indicator */}
        <div id="comp-42-614" className="comp home-indicator" aria-hidden="true">
          <div id="rect-I42-614-42-603" className="home-line"></div>
        </div>

        {/* Bottom text */}
        <p id="text-13-67" className="text signup">Don’t have an account? Sign up</p>

        {error && (
          <div role="alert" style={{ position: 'absolute', left: 30, right: 30, top: 560, color: '#EF4444', fontSize: 12 }}>
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
