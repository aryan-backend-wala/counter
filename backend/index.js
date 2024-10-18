const express = require('express')
const cors = require("cors")
const app = express();

const port = 3000

app.use(cors({ origin: 'http://localhost:5173'}))
app.use(express.json())

let counter = 0;

app.get('/counter', (req, res) => {
  res.json({ counter })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if(username === 'admin' && password === "1234") {
    res.json({ message: "Login Successful"})
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

app.post('/counter/:action', (req, res) => {
  const { action } = req.params;
  if(action === 'increment') {
    counter += 1;
  } else if(action === 'decrement') {
    counter -= 1;
  } else {
    return res.status(400).json({ message: 'Invalid CountFlag'})
  }
  res.json({ message: `${action} Successful`, counter })
})


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
