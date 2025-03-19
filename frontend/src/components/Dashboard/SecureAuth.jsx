import React, { useState } from 'react';
import './Dashboard.css';

const SecureAuth = () => {
  const [twoFACode, setTwoFACode] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    if (twoFACode === '123456') {
      setVerificationMessage('Two-Factor Authentication successful!');
    } else {
      setVerificationMessage('Invalid code. Please try again.');
    }
    setTwoFACode('');
  };

  return (
    <div className="dashboard-section">
      <h2>Secure Authentication &amp; Authorization</h2>
      <form className="dashboard-form" onSubmit={handleVerify}>
        <div className="form-group">
          <label htmlFor="twofa">Enter 2FA Code:</label>
          <input
            type="text"
            id="twofa"
            value={twoFACode}
            onChange={(e) => setTwoFACode(e.target.value)}
            placeholder="123456"
            required
          />
        </div>
        <button type="submit" className="dashboard-btn">Verify</button>
      </form>
      {verificationMessage && <div className="success-message">{verificationMessage}</div>}
    </div>
  );
};

export default SecureAuth;
