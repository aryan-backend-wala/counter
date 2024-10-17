import { useEffect, useState } from "react";

export default function App(){
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/")
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .then(data => setMessage(data.message))
    .catch(err => console.log('Error: ',err))
  }, [])

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}