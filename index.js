const express = require('express')
const app = express()
const port = 3000

app.get('/instrument', (req, res) => {
  return res.send(`Hello ${req.query.name}!`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))