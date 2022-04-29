import exceptions from "../models/Exceptions.js";


class ExceptionsController {


    static listarexceptions = (req, res) => {
        exceptions.find()
            .exec((err, exceptions) => {
                res.status(200).json(exceptions)
            })
    }

    static listarexceptionsPorId = (req, res) => {
        const id = req.params.id
        exceptions.findById(id)
            .exec((err, exceptions) => {
                if (!err) {
                    res.status(200).json(exceptions)
                } else {
                    res.status(400).send({ message: `${err.message} -  Id da Exceptions não localizado.` })
                }
            })
    }

    static cadastrarExceptions = (req, res) => {

        let Exceptions = new exceptions(req.body);
        Exceptions.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} -  falha ao cadastrar Exceptions.` })
            } else {
                res.status(201).send(Exceptions.toJSON())
            }
        })
    }
    static atualizarExceptions = (req, res) => {
        const id = req.params.id
        exceptions.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Exceptions atualizado com sucesso' })
            } else {
                res.status(500).send({ message: `${err.message} -  falha ao atualizar Exceptions.` })
            }
        })
    }

    static excluirExceptions = (req, res) => {
        const id = req.params.id;

        exceptions.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Exceptions removido com sucesso' })
            } else {
                res.status(500).send({ message: `${err.message} -  falha ao remover Exceptions.` })
            }
        })
    }

    static listarexceptionsPorTraceId = (req, res) => {
        const traceId = req.query.traceId
        //localiza a traceId, opcoes de query vazias
        exceptions.find({ 'traceId': traceId }, {}, (err, exceptions) => {
            res.status(200).send(exceptions);
        })
    }

    static listarexceptionsPorService = (req, res) => {
        const service = req.query.service
        //localiza a traceId, opcoes de query vazias
        exceptions.find({ 'service': service }, {}, (err, exceptions) => {
            res.status(200).send(exceptions);
        })
    }
}
export default ExceptionsController;