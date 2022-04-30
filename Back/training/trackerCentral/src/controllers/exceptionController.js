import exceptions from "../models/Exceptions.js";
import { promises, readFile } from 'fs';



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

    static excluirExceptionsPorId = (req, res) => {
        const id = req.params.id;

        exceptions.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Exception removida com sucesso' })
            } else {
                res.status(500).send({ message: `${err.message} -  falha ao remover Exception.` })
            }
        })
    }

    static excluirExceptionsPorTraceId = (req, res) => {
        const traceId = req.params.traceid;

        exceptions.findOneAndDelete({ 'traceId': traceId }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Exception removida com sucesso' })
            } else {
                res.status(500).send({ message: `${err.message} -  falha ao remover Exception.` })
            }
        })
    }

    static listarMetodo = async function (req, res) {
        const filePath = 'src/controllers/files/text1.md';
        console.log()
        try {
            const encoding = 'utf-8';
            const text = await promises.readFile(filePath, encoding);
            res.status(200).json(text)
        } catch (error) {
            treatError(error)
        }
    }

}


function treatError(error) {

    throw new Error((error.code, 'There is not file in the given path!'));

}



export default ExceptionsController;