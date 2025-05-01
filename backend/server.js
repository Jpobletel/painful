import express from 'express';
import cors from 'cors';
import Client from 'pg';
import rutasGestion from './rutas_gestion.js'; // <--- Importa tus rutas

const app = express();



// const client = new Client({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// client.connect()
//     .then(() => console.log('Conectado a PostgreSQL'))
//     .catch(err => console.error('Error de conexión', err));

app.use(cors());
app.use(express.json()); // <--- Asegúrate de poder leer JSON
app.use('/', rutasGestion); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});