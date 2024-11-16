// https-server.mjs
//ESLint @typescript-eslint/no-require-imports
import https from 'https'; //modulo ES6
import fs from 'fs';
import { constants } from 'crypto';
// ECMA Scripts
const opciones = {
  key: fs.readFileSync('ruta/a/clave-privada.pem'),
  cert: fs.readFileSync('ruta/a/certificado.pem'),
  // Opciones adicionales de seguridad
  ciphers: [
    'ECDHE-RSA-AES128-GCM-SHA256',
    'ECDHE-RSA-AES256-GCM-SHA384',
    'AES128-GCM-SHA256',
    'AES256-GCM-SHA384',
  ].join(':'),
  honorCipherOrder: true,
  secureOptions: constants.SSL_OP_NO_SSLv3 | constants.SSL_OP_NO_TLSv1,
};

https.createServer(opciones, (req, res) => {
  res.writeHead(200);
  res.end('Conexión segura establecida\n');
}).listen(443, () => {
  console.log('Servidor HTTPS escuchando en https://localhost');
});
