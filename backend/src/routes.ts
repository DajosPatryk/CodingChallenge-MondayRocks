import { Router } from 'express';
import { Database } from "./db";

const routes = Router();
const db = new Database();

/*
* Swagger documentation
*/
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
routes.use("/docs", swaggerUi.serve);
routes.get("/docs", swaggerUi.setup(swaggerDocument));

/*
* Customer overview
* Retrieves customers array with a from and to query, their ids, their names and their scores
*/
routes.get('/customer-overview', async (req, res) => {
    // Retrieving and validating query
    let { id = "-1", from = -1, to = -1 } = req.query;
    from = !isNaN(Number(from)) ? Number(from) : -1;
    to = !isNaN(Number(to)) ? Number(to) : -1;

    return res.json(db.getUsers(String(id), from, to));
});

/*
* Customer data
* Retrieves customer with id and updates their name
*/
routes.patch('/customer-data/:id', (req, res) => {
    db.updateUserName(req.params.id, req.body.name);
    return res.json("Ok");
});

/*
* Customer purchase history
* Retrieves customer with id and retrieves their purchase history with product data
*/
routes.get('/customer-purchase-history/:id', (req, res) => {
    return res.json(db.getUserPurchases(req.params.id));
});

export default routes;