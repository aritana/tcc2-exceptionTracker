import express from "express";
import ExceptionsController from "../controllers/exceptionController.js";


const router = express.Router();

router
    .get("/exceptions", ExceptionsController.listarexceptions)
    .get("/exceptions/traceid", ExceptionsController.listarexceptionsPorTraceId)
    .get("/exceptions/service", ExceptionsController.listarexceptionsPorService)
    .get("/exceptions/:id", ExceptionsController.listarexceptionsPorId)
    .delete("/exceptions/id/:id", ExceptionsController.excluirExceptionsPorId)
    .delete("/exceptions/traceid/:traceid", ExceptionsController.excluirExceptionsPorTraceId)

export default router;