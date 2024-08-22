/*
const fs = require('fs');
const EventEmitter = require('events');

// Crear una instancia de EventEmitter
const emitter = new EventEmitter();

// Función para leer un archivo de manera asincrónica
function readFileAsync(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        // Emitir el evento después de completar la lectura del archivo
        emitter.emit('fileRead', data);
    });
}

// Vincular un manejador para el evento 'fileRead'
emitter.on('fileRead', (fileContent) => {
    console.log('File content processed:', fileContent);
});

// Llamar la función para leer un archivo
readFileAsync('example.txt');

const EventEmitter = require('events');
const fs = require('fs');

// Clase UserManager que hereda de EventEmitter
class UserManager extends EventEmitter {
    constructor() {
        super();
        this.users = [];
    }

    addUser(name) {
        console.log(`Adding user: ${name}`);
        this.users.push(name);
        // Emitir el evento user_added
        this.emit('user_added', name);
    }
}

const userManager = new UserManager();

// Manejador para enviar un correo de bienvenida
userManager.on('user_added', (name) => {
    console.log(`Sending welcome email to ${name}...`);
    // Simulación del envío del correo
    console.log(`Welcome email sent to ${name}.`);
});

// Manejador para registrar la actividad en un archivo de log
userManager.on('user_added', (name) => {
    const logMessage = `User added: ${name}\n`;
    console.log(`Logging user addition to file: user_activity.log`);
    fs.appendFile('user_activity.log', logMessage, (err) => {
        if (err) throw err;
        console.log('User activity logged.');
    });
});

// Manejador para actualizar la base de datos (simulada con un objeto en memoria)
userManager.on('user_added', (name) => {
    console.log(`Updating in-memory database for ${name}...`);
    // Aquí podrías actualizar una base de datos real
    console.log(`In-memory database updated for ${name}.`);
});

// Añadir un usuario para disparar los eventos
userManager.addUser('Kaperucita');

// Añadir otro usuario para ver más salidas en el terminal
userManager.addUser('Motita');


const EventEmitter = require('events');

// Crear una instancia de EventEmitter
const productionLine = new EventEmitter();

// Funciones que representan cada tarea
function assemble() {
    console.log('Task: Assembling...');
    setTimeout(() => { // Simulación de tiempo de ejecución
        console.log('Task assemble is in progress...');
        productionLine.emit('task_completed', 'assemble');
    }, 1000);
}

function paint() {
    console.log('Task: Painting...');
    setTimeout(() => { // Simulación de tiempo de ejecución
        console.log('Task paint is in progress...');
        productionLine.emit('task_completed', 'paint');
    }, 1000);
}

function inspect() {
    console.log('Task: Inspecting...');
    setTimeout(() => { // Simulación de tiempo de ejecución
        console.log('Task inspect is in progress...');
        const fail = Math.random() > 0.8; // Simular una falla con 20% de probabilidad
        if (fail) {
            console.log('Task inspect encountered an error.');
            productionLine.emit('task_failed', 'inspect');
        } else {
            productionLine.emit('task_completed', 'inspect');
        }
    }, 1000);
}

// Manejador para tareas completadas
productionLine.on('task_completed', (taskName) => {
    console.log(`Task ${taskName} completed successfully.`);
    if (taskName === 'assemble') {
        console.log('Moving to the next task: Paint.');
        paint();
    } else if (taskName === 'paint') {
        console.log('Moving to the next task: Inspect.');
        inspect();
    } else if (taskName === 'inspect') {
        console.log('Production line finished successfully.');
    }
});

// Manejador para tareas fallidas
productionLine.on('task_failed', (taskName) => {
    console.log(`Task ${taskName} failed! Stopping production line.`);
});

// Iniciar la línea de producción
console.log('Starting production line...');
assemble();

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    console.log(`Received request for ${req.url}`); // Log de la solicitud recibida
    
    const filePath = req.url === '/' ? './index.html' : `.${req.url}`;
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error: File not found - ${filePath}`); // Log de error si el archivo no se encuentra
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            console.log(`Serving file: ${filePath}`); // Log cuando el archivo es encontrado y servido
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}).listen(3000, () => {
    console.log('Server running on port 3000');
});
*/

const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const EventEmitter = require('events');

const emitter = new EventEmitter();

http.createServer((req, res) => {
    console.log(`Received ${req.method} request for ${req.url}`); // Log de la solicitud recibida

    if (req.method.toLowerCase() === 'post') {
        console.log('Parsing form data...');
        const form = new formidable.IncomingForm();
        
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error parsing form data:', err); // Log de error al parsear el formulario
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error processing upload');
                return;
            }
            
            const oldPath = files.upload.path;
            const newPath = './uploads/' + files.upload.name;
            
            console.log(`Uploading file: ${files.upload.name}...`); // Log del archivo que se está subiendo

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error('Error moving file:', err); // Log de error al mover el archivo
                    throw err;
                }
                
                // Emitir evento file_uploaded
                emitter.emit('file_uploaded', files.upload.name);
                
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File uploaded successfully');
                console.log(`File uploaded successfully: ${files.upload.name}`); // Log de éxito en la subida del archivo
            });
        });
    } else {
        console.log('Serving upload form...');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<form action="/" method="post" enctype="multipart/form-data"><input type="file" name="upload"><input type="submit"></form>');
    }
}).listen(3001, () => {
    console.log('Server running on port 3001');
});

// Manejador para registrar la actividad de subida de archivos en un log
emitter.on('file_uploaded', (fileName) => {
    const logMessage = `File uploaded: ${fileName}\n`;
    console.log(`Logging upload activity for file: ${fileName}`); // Log antes de registrar la actividad
    fs.appendFile('upload_activity.log', logMessage, (err) => {
        if (err) {
            console.error('Error logging file upload:', err); // Log de error al escribir en el archivo de log
            throw err;
        }
        console.log('File upload logged successfully.'); // Log de éxito en el registro de la actividad
    });
});
