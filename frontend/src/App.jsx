import { useEffect, useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);
  
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
    fetchCounter()
  }, [])

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

  const INCREMENT = 'increment';
  const DECREMENT = 'decrement';

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => deInc(INCREMENT)}>Increment</button>
      <button onClick={() => deInc(DECREMENT)}>Decrement</button>
    </div>
  );
}