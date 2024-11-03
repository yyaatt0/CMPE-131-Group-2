import React, { useState } from 'react';
import './UserLogin.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMsg('Passwords do not match.');
    } else {
      setSuccessMsg('Password reset successful.');
    }
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <h1>Bank of Banks</h1>
        </nav>
      </header>

      <div className="fgroup">
        <h2>Forgot Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="fgroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
            />
          </div>

          <div className="fgroup">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="newPassword"
              required
            />
          </div>

          <div className="fgroup">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              id="confirmPassword"
              required
            />
          </div>

          <button type="submit">Submit</button>
          <br />
          {successMsg && <div className="success-message">{successMsg}</div>}
          {errorMsg && <div className="error-message">{errorMsg}</div>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;