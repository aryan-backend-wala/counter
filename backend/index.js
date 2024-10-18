import express from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import path from "path";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000
const secretKey = 'your-secret-key';

app.use(express.json())
const __dirname = path.resolve();


let counter = 0;

app.get('/api/counter', (req, res) => {
  res.json({ counter })
})

app.post('/api/counter/login', (req, res) => {
  const { username, password } = req.body;
  if(username === 'admin' && password === "1234") {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

app.post('/api/counter/:action', (req, res) => {
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} 

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})
