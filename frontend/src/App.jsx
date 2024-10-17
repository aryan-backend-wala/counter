import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('')
    
  async function sendName(){
    const res = await fetch("http://localhost:3000/post", {
      method: 'POST',
      body: JSON.stringify({
        name: message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    setName(data.message);
  }

  return (
    <div>
      <label>
        <input 
          id="message"
          type="text"
          placeholder="Joe"
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button onClick={sendName}>send</button>
      <h3 className="name">{name}</h3>
    </div>
  );
}