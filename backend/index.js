const express = require('express')
const cors = require("cors")
const app = express();

const port = 3000

app.use(cors({ origin: 'http://localhost:5173'}))
app.use(express.json())

app.post('/post', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello ${captializeText(name)}!`});
})


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})

function captializeText(text) {
  return text.slice(0, 1).toUpperCase() + text.slice(1)
}