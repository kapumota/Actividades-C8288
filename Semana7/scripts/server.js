// server.mjs
import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(
  helmet.hsts({ //configura la cabecera Strict-Transport-Security
    maxAge: 31536000, 
    includeSubDomains: true,
    preload: true,
  })
);

app.get('/', (req, res) => {
  res.send('Sitio seguro con HSTS');
});

app.listen(443, () => { //app.listen(puerto, callback)
  console.log('Servidor escuchando en https://localhost');
});
