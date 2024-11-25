npm install express oauth2-server body-parser

**Configuración del servidor con Express y OAuth 2.0**

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const OAuth2Server = require('oauth2-server');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

// Configuración del modelo de OAuth2
const oauth = new OAuth2Server({
    model: require('./model'), // Implementación del modelo
    accessTokenLifetime: 60 * 60, // 1 hora
    allowBearerTokensInQueryString: true
});

// Middleware para manejar OAuth
app.use(async (req, res, next) => {
    const request = new Request(req);
    const response = new Response(res);
    try {
        const token = await oauth.authenticate(request, response);
        req.user = token;
        next();
    } catch (err) {
        res.status(err.code || 500).json(err);
    }
});

// Ruta protegida
app.get('/secure', (req, res) => {
    res.json({ message: 'Acceso concedido', user: req.user });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

**Modelo de almacenamiento y validación**
const db = {
    clients: [
        {
            clientId: 'client-id',
            clientSecret: 'client-secret',
            grants: ['password', 'authorization_code', 'refresh_token'],
            redirectUris: ['http://localhost:3000/callback']
        }
    ],
    tokens: [],
    users: [
        {
            id: '1',
            username: 'usuario',
            password: 'contraseña'
        }
    ]
};

module.exports = {
    getClient: function(clientId, clientSecret) {
        const client = db.clients.find(c => c.clientId === clientId && c.clientSecret === clientSecret);
        if (!client) return null;
        return {
            id: client.clientId,
            grants: client.grants,
            redirectUris: client.redirectUris
        };
    },
    getUser: function(username, password) {
        const user = db.users.find(u => u.username === username && u.password === password);
        return user || null;
    },
    saveToken: function(token, client, user) {
        const accessToken = {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: { id: client.id },
            user: { id: user.id }
        };
        db.tokens.push(accessToken);
        return accessToken;
    },
    getAccessToken: function(accessToken) {
        return db.tokens.find(t => t.accessToken === accessToken) || null;
    }
};


**Cliente OAuth 2.0 en el Frontend**

async function obtenerToken() {
    const response = await fetch('http://localhost:3000/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            grant_type: 'password',
            username: 'usuario',
            password: 'contraseña',
            client_id: 'client-id',
            client_secret: 'client-secret'
        })
    });
    const data = await response.json();
    return data.access_token;
}


async function accederRutaProtegida() {
    const token = await obtenerToken();
    const response = await fetch('http://localhost:3000/secure', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);
}

accederRutaProtegida();

**Algoritmos de cifrado utilizados en OAuth 2.0**

**Ejemplo en JavaScript con jsonwebtoken**
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Clave secreta para HMAC
const secret = 'mi_secreto';

// Clave privada para RSA
const privateKey = fs.readFileSync('private.key');

// Datos de la carga útil
const payload = {
    sub: '1234567890',
    name: 'Juan Pérez',
    admin: true
};

// Generar JWT con HMAC SHA-256
const tokenHS256 = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1h' });

// Generar JWT con RSA SHA-256
const tokenRS256 = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });

console.log('JWT HS256:', tokenHS256);
console.log('JWT RS256:', tokenRS256);


**Ejemplo en JavaScript con jose**
const { JWE, JWK } = require('jose');

// Generar una clave pública y privada para cifrado
const key = JWK.generateSync('RSA', 2048, { alg: 'RSA-OAEP-256', use: 'enc' });

// Datos de la carga útil
const payload = {
    sub: '1234567890',
    name: 'Juan Pérez',
    admin: true
};

// Encriptar el JWT
const jwe = JWE.encrypt(JSON.stringify(payload), key, {
    alg: 'RSA-OAEP-256',
    enc: 'A256GCM'
});

console.log('JWE:', jwe);

// Desencriptar el JWT
const decrypted = JWE.decrypt(jwe, key);
const decryptedPayload = JSON.parse(decrypted.toString());

console.log('Decrypted Payload:', decryptedPayload);

**Ejemplo en JavaScript con crypto**
const crypto = require('crypto');

// Generar un code_verifier
function generateCodeVerifier() {
    return crypto.randomBytes(32).toString('hex');
}

// Generar un code_challenge a partir del code_verifier
function generateCodeChallenge(codeVerifier) {
    return crypto.createHash('sha256').update(codeVerifier).digest('base64url');
}

const codeVerifier = generateCodeVerifier();
const codeChallenge = generateCodeChallenge(codeVerifier);

console.log('Code Verifier:', codeVerifier);
console.log('Code Challenge:', codeChallenge);

**Configuración básica de TLS con Express**
const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

// Cargar certificados TLS
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

// Definir rutas
app.get('/', (req, res) => {
    res.send('Servidor seguro con TLS');
});

// Iniciar el servidor HTTPS
https.createServer(options, app).listen(443, () => {
    console.log('Servidor HTTPS escuchando en el puerto 443');
});

**Generación y firma de JWTs con HS256 y RS256**
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Clave secreta para HMAC
const secret = 'mi_secreto';

// Clave privada para RSA
const privateKey = fs.readFileSync('private.key');

// Clave pública para RSA
const publicKey = fs.readFileSync('public.key');

// Datos de la carga útil
const payload = {
    sub: '1234567890',
    name: 'Juan Pérez',
    admin: true
};

// Generar JWT con HMAC SHA-256
const tokenHS256 = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1h' });

// Generar JWT con RSA SHA-256
const tokenRS256 = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });

console.log('JWT HS256:', tokenHS256);
console.log('JWT RS256:', tokenRS256);

// Verificar JWT HS256
try {
    const decodedHS256 = jwt.verify(tokenHS256, secret);
    console.log('Decoded HS256:', decodedHS256);
} catch (err) {
    console.error('Error verificando HS256:', err);
}

// Verificar JWT RS256
try {
    const decodedRS256 = jwt.verify(tokenRS256, publicKey);
    console.log('Decoded RS256:', decodedRS256);
} catch (err) {
    console.error('Error verificando RS256:', err);
}

**TypeScript con jsonwebtoken**

import jwt from 'jsonwebtoken';
import fs from 'fs';

// Clave secreta para HMAC
const secret: string = 'mi_secreto';

// Clave privada para RSA
const privateKey: Buffer = fs.readFileSync('private.key');

// Clave pública para RSA
const publicKey: Buffer = fs.readFileSync('public.key');

// Datos de la carga útil
const payload = {
    sub: '1234567890',
    name: 'Juan Pérez',
    admin: true
};

// Generar JWT con HMAC SHA-256
const tokenHS256: string = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '1h' });

// Generar JWT con RSA SHA-256
const tokenRS256: string = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });

console.log('JWT HS256:', tokenHS256);
console.log('JWT RS256:', tokenRS256);

// Verificar JWT HS256
try {
    const decodedHS256 = jwt.verify(tokenHS256, secret);
    console.log('Decoded HS256:', decodedHS256);
} catch (err) {
    console.error('Error verificando HS256:', err);
}

// Verificar JWT RS256
try {
    const decodedRS256 = jwt.verify(tokenRS256, publicKey);
    console.log('Decoded RS256:', decodedRS256);
} catch (err) {
    console.error('Error verificando RS256:', err);
}

**Encriptación y desencriptación de JWTs con JWE**

const { JWE, JWK } = require('jose');

// Generar una clave pública y privada para cifrado
const key = JWK.generateSync('RSA', 2048, { alg: 'RSA-OAEP-256', use: 'enc' });

// Datos de la carga útil
const payload = {
    sub: '1234567890',
    name: 'Juan Pérez',
    admin: true
};

// Encriptar el JWT
const jwe = JWE.encrypt(JSON.stringify(payload), key, {
    alg: 'RSA-OAEP-256',
    enc: 'A256GCM'
});

console.log('JWE:', jwe);

// Desencriptar el JWT
const decrypted = JWE.decrypt(jwe, key);
const decryptedPayload = JSON.parse(decrypted.toString());

console.log('Decrypted Payload:', decryptedPayload);


**Implementación de PKCE en un cliente OAuth 2.0**

const crypto = require('crypto');
const fetch = require('node-fetch');

// Generar un code_verifier
function generateCodeVerifier() {
    return crypto.randomBytes(32).toString('hex');
}

// Generar un code_challenge a partir del code_verifier
function generateCodeChallenge(codeVerifier) {
    return crypto.createHash('sha256').update(codeVerifier).digest('base64url');
}

(async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    
    console.log('Code Verifier:', codeVerifier);
    console.log('Code Challenge:', codeChallenge);
    
    // Paso 1: Redirigir al usuario al servidor de autorización con el code_challenge
    const authorizationUrl = `https://auth.example.com/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=https://client.example.com/callback&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    
    console.log('Authorization URL:', authorizationUrl);
    
    // Suponiendo que el usuario autoriza y se redirige con un código de autorización
    const authorizationCode = 'AUTHORIZATION_CODE_RECEIVED';
    
    // Paso 2: Intercambiar el código de autorización por un token de acceso utilizando el code_verifier
    const tokenResponse = await fetch('https://auth.example.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri: 'https://client.example.com/callback',
            client_id: 'CLIENT_ID',
            code_verifier: codeVerifier
        })
    });
    
    const tokenData = await tokenResponse.json();
    console.log('Token Data:', tokenData);
})();

**Configuración de TLS en un servidor OAuth 2.0 JavaScript con Express y HTTPS**

const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// Cargar certificados TLS
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

// Middleware
app.use(bodyParser.json());

// Ruta de autorización simulada
app.post('/authorize', (req, res) => {
    // Lógica de autorización
    res.json({ message: 'Autorización exitosa' });
});

// Ruta de token simulada
app.post('/token', (req, res) => {
    // Lógica de emisión de tokens
    res.json({ access_token: 'ACCESS_TOKEN', token_type: 'Bearer', expires_in: 3600 });
});

// Iniciar el servidor HTTPS
https.createServer(options, app).listen(443, () => {
    console.log('Servidor HTTPS escuchando en el puerto 443');
});
