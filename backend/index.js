const express = require('express')
const cors = require("cors")
const app = express();

const port = 3000

app.use(cors({ origin: 'http://localhost:5173'}))

app.get('/', (req, res) => {
  res.json({ message: "Hello World!"})
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
