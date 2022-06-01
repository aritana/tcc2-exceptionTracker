import express from "express";
import exceptionRoutes from "./exceptionRoutes.js"


//Rotas, instancia do app
const routes = (app) => {

    app.route('/').get((req, res) => {
        res.status(200).send({ titulo: "Exception Tracker Back End" })
    })

    app.use(
        express.json(),
        exceptionRoutes
    )
}
export default routes;