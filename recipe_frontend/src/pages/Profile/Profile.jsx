import React from 'react';
import useAuth from '../../hooks/useAuth';

/**
 * PUBLIC_INTERFACE
 * Profile page with basic editable fields.
 */
export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = React.useState(user?.name || '');
  const [email, setEmail] = React.useState(user?.email || '');

  return (
    <section className="card" style={{ padding: 16 }}>
      <h1>Profile</h1>
      <div style={{ display: 'grid', gap: 10, maxWidth: 420 }}>
        <label>
          Name
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button className="btn">Save</button>
      </div>
    </section>
  );
}
