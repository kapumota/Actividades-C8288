// https-client.js
//const https = require('https');
import https from 'https';

const opciones = {
  hostname: 'www.ejemplo-seguro.com',
  port: 443,
  path: '/',
  method: 'GET',
  headers: {
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'Keep-Alive',
  },
  rejectUnauthorized: false, //no en produccion
};

const req = https.request(opciones, (res) => {
  console.log(`Estado: ${res.statusCode}`);
  console.log(`Encabezados: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`Cuerpo: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`Problema con la solicitud: ${e.message}`);
});

req.end();
