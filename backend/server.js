import express from 'express';
import cors from 'cors';
import rutasGestion from './rutas_gestion.js'; // <--- Importa tus rutas

const app = express();

app.use(cors());
app.use(express.json()); // <--- Asegúrate de poder leer JSON
app.use('/', rutasGestion); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});