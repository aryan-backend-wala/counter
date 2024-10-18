import { useEffect, useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function fetchCounter(){
      try{
        const res = await fetch("http://localhost:3000/counter")
        const data = await res.json()
        setCounter(data.counter)
      } catch(err) {
        console.error('Error fetching counter: ', err)
      }
    }
    const storedUser = sessionStorage.getItem('username');
    if(storedUser) {
      setIsLoggedIn(true)
      fetchCounter()
    }
  }, [isLoggedIn])

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    
    const msg = await res.json();
    if(res.ok) {
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);
      setIsLoggedIn(true)
      alert(msg.message)
    } else {
      alert(msg.message)
    }
  }

  async function deInc(action){
    try {
      const res = await fetch(`http://localhost:3000/counter/${action}`, {
        method: 'POST'
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
    sessionStorage.clear()
    setIsLoggedIn(false)
  }

  const INCREMENT = 'increment';
  const DECREMENT = 'decrement';

  if(!isLoggedIn) {
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