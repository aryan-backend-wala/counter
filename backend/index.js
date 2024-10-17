const express = require('express')
const cors = require("cors")
const app = express();

const port = 3000

app.use(cors({ origin: 'http://localhost:5173'}))
app.use(express.json())

let counter = 0;

app.get('/counter', (req, res) => {
  res.json({ counter: counter })
})

app.post('/counter/action', (req, res) => {
  const { countFlag } = req.body;
  const flag = parseInt(countFlag);
  if(flag === 1) {
    counter += 1;
  } else if(flag === 0) {
    counter -= 1;
  } else {
    return res.status(400).json({ message: 'Invalid CountFlag'})
  }
  res.json({ message: `${flag === 1 ? 'Increment' : 'Decrement'}`, counter })
})


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
