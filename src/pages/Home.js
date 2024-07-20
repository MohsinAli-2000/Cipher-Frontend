import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [plaintext, setPlaintext] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const handleEncrypt = async () => {
    const response = await axios.post('/api/messages/encrypt', { plaintext }, { headers: { 'Authorization': localStorage.getItem('token') } });
    setEncrypted(response.data.encrypted);
  };

  const handleDecrypt = async () => {
    const response = await axios.post('/api/messages/decrypt', { encrypted }, { headers: { 'Authorization': localStorage.getItem('token') } });
    setDecrypted(response.data.plaintext);
  };

  return (
    <div>
      <h1>Encrypt and Decrypt Messages</h1>
      <div>
        <label>Enter your message:</label>
        <input type="text" value={plaintext} onChange={(e) => setPlaintext(e.target.value)} />
      </div>
      <div>
        <button onClick={handleEncrypt}>Encrypt</button>
      </div>
      <div>
        <label>Encrypted message:</label>
        <textarea value={encrypted} readOnly />
      </div>
      <div>
        <label>Enter encrypted message:</label>
        <input type="text" value={encrypted} onChange={(e) => setEncrypted(e.target.value)} />
      </div>
      <div>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>
      <div>
        <label>Decrypted message:</label>
        <textarea value={decrypted} readOnly />
      </div>
    </div>
  );
}

export default Home;
