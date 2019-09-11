const express = require('express');
const http = require('http');
const fs = require('fs');
const app = express();

const serverPort = process.env.server_port || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/instrument', async (req, res) => {
  console.log('/instrument: calling', req.query.name);
  try {
    const response = await callInstrumentService(getInstrumentServiceUrl(req.query.name));
    return res.json(response);
  } catch (error) {
    console.log('/instrument - error', error);
    return res.status(500).send(JSON.stringify(error));
  }
})

app.get('/instrument-file', async (req, res) => {
  console.log('/instrument-file: loading file', req.query.name);
  try {
    const instrumentFile = await loadInstrumentFile(req.query.name);
    return res.type('mpeg3').send(instrumentFile);
  } catch (error) {
    console.log('/instrument-file - error', error);
    return res.status(500).send(JSON.stringify(error));
  }
});

app.listen(serverPort, () => console.log(`listening on port ${serverPort}!`))

const getInstrumentServiceUrl = (hostname) => {
  const host = process.env.instrument_host || hostname;
  const port = process.env.instrument_port || 8080;
  const resource = process.env.instrument_resource || 'instrument-id';
  const url = `http://${host}:${port}/${resource}`;
  console.log('instrument service url', url);
  return url;
}

const callInstrumentService = (url) => {
  return new Promise((resolve, reject) => http.get(url, (res) => {
    console.log('statusCode:', res.statusCode);
    if (res.statusCode !== 200) {
      reject(new Error(`Request failed (status code: ${res.statusCode})`));
    }

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      if (data.length > 0) {
        data = JSON.parse(data);
      } else {
        data = {};
      }
      resolve(data);
    })

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