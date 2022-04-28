import express from "express";
import livrosRoutes from "./livrosRoutes.js"
import autoresRoutes from "./autoresRoutes.js"

//Rotas, instancia do app
const routes = (app) => {

    app.route('/').get((req, res) => {
        res.status(200).send({ titulo: "Curso de Node" })
    })

    app.use(
        express.json(),
        livrosRoutes, //rota disponivel
        autoresRoutes
    )
}
export default routes;