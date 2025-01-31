import express from 'express';
import { serverInit } from './services/servertInit.js';
import{errorHandler} from './middlewares/errorHandler.js';
import { dbConnect } from './services/db_conection.js';

import router from './routes/routes.js'

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extend: true}));

app.use('/api/v1',router)

app.get('/check-db', async (req, res) => {
    try {
        await dbConnect(); 
        res.status(200).send('Conexión a la base de datos exitosa 🎇🎉');
    } catch (error) {
        res.status(500).send('Error en la conexión a la base de datos 😱');
    }
});

app.use(errorHandler)

serverInit (app, PORT) 


export default app; 
