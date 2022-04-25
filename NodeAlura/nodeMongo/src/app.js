import express from 'express';
import db from './config/dbConnect.js';
import livros from './models/Livro.js'

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log('conexão com o banco feita com sucesso')
})


const app = express();

//para interpretar o que chega via post/put
app.use(express.json());

// const books = [
//     { id: 1, "title": "The Hobbit" },
//     { id: 2, "title": "Pirates of the Asteroids" },
// ];

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node')
});

app.get('/livros', (req, res) => {
    livros.find((err, livros) => {
        res.status(200).json(livros)
    })
})

app.get('/livros/:id', (req, res) => {
    let index = bookSearch(req.params.id);
    res.status(200);
    res.json(books[index]);
})

app.post('/livros', (req, res) => {

    let nextIndex = getNextId()
    let book = { id: nextIndex, "title": req.body.title };
    books.push(book);
    res.status(201).send('Livro cadastrado com sucesso');
});

app.put('/livros/:id', (req, res) => {
    let index = bookSearch(req.params.id);
    books[index].title = req.body.title;
    res.status(201);
    res.json(books);
})

app.delete('/livros/:id', (req, res) => {
    let { id } = req.params;
    let index = bookSearch(id);
    books.splice(index, 1);
    res.status(200);
    res.send(`Livro ${id} removido com sucesso`);
})


function bookSearch(id) {
    return books.findIndex(book => book.id == id)
}

function getNextId() {
    return books.length + 1
}


export default app;

