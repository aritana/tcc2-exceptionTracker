import livros from "../models/Livro.js";


class LivroController {


    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor')
            .exec((err, livros) => {
                res.status(200).json(livros)
            })
    }

    static listarLivrosPorId = (req, res) => {
        const id = req.params.id
        livros.findById(id)
            .populate('autor', 'nome')//exibir somente o nome
            .exec((err, livros) => {
                if (!err) {
                    res.status(200).json(livros)
                } else {
                    res.status(400).send({ message: `${err.message} -  Id do livro não localizado.` })
                }
            })
    }

    static cadastrarLivro = (req, res) => {

        let livro = new livros(req.body);
        livro.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} -  falha ao cadastrar livro.` })
            } else {
                res.status(201).send(livro.toJSON())
            }
        })
    }
    static atualizarLivro = (req, res) => {
        const id = req.params.id
        livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Livro atualizado com sucesso' })
            } else {
                res.status(500).send({ message: `${err.message} -  falha ao atualizar livro.` })
            }
        })
    }

    static excluirLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Livro removido com sucesso' })
            } else {
                res.status(500).send({ message: `${err.message} -  falha ao remover livro.` })
            }
        })
    }

    static listarLivrosPorEditora = (req, res) => {
        const editora = req.query.editora
        //localiza a editora, opcoes de query vazias
        livros.find({ 'editora': editora }, {}, (err, livros) => {
            res.status(200).send(livros);
        })
    }
}
export default LivroController;