import express from "express";
import ExceptionsController from "../controllers/exceptionController.js";


const router = express.Router();

router
    .get("/exceptions", ExceptionsController.listarexceptions)
    .get("/exceptions/traceId", ExceptionsController.listarexceptionsPorTraceId)
    .get("/exceptions/service", ExceptionsController.listarexceptionsPorService)
    .get("/exceptions/:id", ExceptionsController.listarexceptionsPorId)
// .post("/exceptions", ExceptionsController.cadastrarExceptions)
// .put("/exceptions/:id", ExceptionsController.atualizarExceptions)
// .delete("/exceptions/:id", ExceptionsController.excluirExceptions)

export default router;