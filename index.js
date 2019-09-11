const express = require('express')
const http = require('http');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/instrument', async (req, res) => {
  console.log('/instrument: calling', req.query.name);
  const response = await callInstrumentService('http://localhost:8080/instrument', req.query.name);
  return res.send(`Hello ${response}!`)
})

app.get('/instrument-file', async (req, res) => {
  console.log('/instrument-file: loading file', req.query.name)
  const instrumentFile = await loadInstrumentFile(req.query.name);
  return res.send(instrumentFile);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const callInstrumentService = (url) => {
  return new Promise((resolve, reject) => http.get(url, (res) => {
    console.log('statusCode:', res.statusCode);

    res.on('data', (d) => {
      resolve(d);
    });

  }).on('error', (e) => {
    console.error(e);
    reject(e);
  }));
}

const loadInstrumentFile = (name) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`instruments/${name}.mp3`, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  })
}