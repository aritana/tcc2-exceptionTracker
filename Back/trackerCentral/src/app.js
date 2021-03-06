import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js'

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('conexão com o banco feita com sucesso')
})

const app = express();
//para interpretar o que chega via post/put
app.use(express.json());
routes(app);//rotas
export default app;

