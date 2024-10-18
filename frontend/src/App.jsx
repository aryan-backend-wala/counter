import { useEffect, useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    async function fetchCounter(){
      try{
        const res = await fetch("/api/counter")
        const data = await res.json()
        setCounter(data.counter)
      } catch(err) {
        console.error('Error fetching counter: ', err)
      }
    }
    if(token) {
      fetchCounter()
    }
  }, [token])

  const handleLogin = async () => {
    const res = await fetch("/api/counter/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    
    const data = await res.json();
    if(res.ok) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
    } else {
      alert(data.message)
    }
  }

  async function deInc(action){
    try {
      const res = await fetch(`/api/counter/${action}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(!res.ok) throw new Error('Failed to update counter');
      const data = await res.json()
      setCounter(data.counter);
    } catch (err) {
      console.error('Error: ', err)
      alert('Something went wrong!')
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setToken('');
  }

  const INCREMENT = 'increment';
  const DECREMENT = 'decrement';

  if(!token) {
    return (
      <div>
        <h2>Login</h2>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }

  return (
    <div>   
      <h1>Welcome, {sessionStorage.getItem('username')}!</h1>
      <h2>{counter}</h2>
      <button onClick={() => deInc(INCREMENT)}>Increment</button>
      <button onClick={() => deInc(DECREMENT)}>Decrement</button>
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}