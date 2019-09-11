const express = require('express')
const http = require('http');
const app = express()
const port = 3000

app.get('/instrument', async (req, res) => {
  const response = await callService('http://localhost:8080/instrument', req.query.name);
  return res.send(`Hello ${response}!`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const callService = (url) => {
  return new Promise((resolve, reject) => http.get(url, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      resolve(d);
    });

  }).on('error', (e) => {
    console.error(e);
    reject(e);
  }));
}