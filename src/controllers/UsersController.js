const AppError = require("../utils/AppError");

class UsersController {
/**
 * index  - GET para listar varios registros.
 * show   - GET para exibir um registro especifico.
 * create - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para remover um registro.
 */

 create ( request, response ) {
    const { name, email, password, isAdmin } = request.bodyy;
    if(!name) {
        throw new AppError("Nome não informado!");
    }
    response.status(201).json({ name, email, password, isAdmin });
 }

}

module.exports = UsersController;