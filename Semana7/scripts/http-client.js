// http-client.js
//const http = require('http');
import http from 'http';

const opciones = {
  hostname: 'www.ejemplo.com',
  port: 80,
  path: '/',
  method: 'GET',
  headers: {
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'close',
  },
};

const req = http.request(opciones, (res) => {
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

