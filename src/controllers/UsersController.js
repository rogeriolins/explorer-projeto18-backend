// Gerar um hash da senha atraves do pacote BCryptJS
const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
/**
 * index  - GET para listar varios registros.
 * show   - GET para exibir um registro especifico.
 * create - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para remover um registro.
 */

 async create ( request, response ) {
    const { name, email, password } = request.body;
    // if(!name) {
    //     throw new AppError("Nome não informado!");
    // }
    // response.status(201).json({ name, email, password });

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    //return response.status(201).json(checkUserExists);    
    if(checkUserExists){
        throw new AppError("This e-mail is in use!");
    }
    
    const hashedPassword = hash(password, 8);

    await database.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
        [ name, email, hashedPassword ]
    );
    
    return response.status(201).json();
 }

}

module.exports = UsersController;