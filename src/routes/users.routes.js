const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const usersRoutes = Router();

function myMiddleware(request, response, next) {
    if(!request.body.isAdmin) {
       return response.json({message: "user unauthorized!"});
    } 
    console.log(request.body);
    next();
}

const usersController = new UsersController();
// usersRoutes.use(myMiddleware);
usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;