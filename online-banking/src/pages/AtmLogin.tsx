
import React, { useState } from 'react';
import './AtmLogin.css'
import { LockIcon, UserIcon } from 'lucide-react';

const AtmLogin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleNumpadClick = (num: string) => {
    if (password.length < 4) {
      setPassword((prev) => prev + num);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password.length === 4) {
      setMessage(`Welcome, ${username}!`);
    } else {
      setMessage('Invalid username or password.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Bank of Banks ATM</h1>
        <p>Welcome to your secure banking experience</p>
      </header>

      <main className="main">
        <div className="atm-container-border">
          <div className="atm-container">
            <div className="atm-screen">
              <div className="atm-content">
                <h2 className="atm-title">Enter Your Credentials</h2>
                <form onSubmit={handleSubmit} className="form">
                  {message && (
                    <p className="message">{message}</p>
                  )}
                  <div className="form-group">
                    <div className="input-wrapper">
                      <UserIcon className="icon" />
                      <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                      />
                    </div>
                    <div className="input-wrapper">
                      <LockIcon className="icon" />
                      <input
                        type="password"
                        placeholder="Pin"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        maxLength={4}
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="numpad">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleNumpadClick(num.toString())}
                        className="numpad-button"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleNumpadClick('0')}
                      className="numpad-button wide"
                    >
                      0
                    </button>
                  </div>

                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Bank of Banks. All rights reserved. | For assistance, call 1-800-BANK-BANK</p>
      </footer>
    </div>
  );
}

export default AtmLogin;
