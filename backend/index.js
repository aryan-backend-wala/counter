const express = require('express')
const cors = require("cors")
const jwt = require("jsonwebtoken")
const app = express();

const port = 3000
const secretKey = 'your-secret-key';

app.use(cors({ origin: 'http://localhost:5173'}))
app.use(express.json())

let counter = 0;

app.get('/counter', (req, res) => {
  res.json({ counter })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if(username === 'admin' && password === "1234") {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

app.post('/counter/:action', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if(err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    const { action } = req.params;
    if(action === 'increment') {
      counter += 1;
    } else if(action === 'decrement') {
      counter -= 1;
    } else {
      return res.status(400).json({ message: 'Invalid Action'})
    }
    res.json({ message: `${action} Successful`, counter })
  })

})


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
