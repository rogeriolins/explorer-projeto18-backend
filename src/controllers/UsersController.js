// Gerar um hash da senha atraves do pacote BCryptJS
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController {
/**
 * index  - GET para listar varios registros;
 * show   - GET para exibir um registro especifico.
 * create - POST para criar um registro.
 * update - PUT para atualizar um registro.
 * delete - DELETE para remover um registro.
 */

 async update( request, response ) {
    const { name, email, password, password_old } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("select * from users where id = (?)", [id]);

    try {

        if(!user) {
            throw new AppError("This user does not exist!");
        }
    
        const userWithUpdatedEmail = await database.get("select * from users where email = (?)", [email]);
    
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("This email is already in use by another user!")
        }
    
        user.name = name ?? user.name;
        user.email = email ?? user.email;

        // Validar se a senha antiga foi informada
        if(password && !password_old) {
            throw new AppError("You must enter your old password!")
        }

        if(password && password_old) {
            const checkOldPassword = await compare(password_old, user.password);

            if(!checkOldPassword) {
                throw new AppError("The old password does not match!");
            }

            user.password = await hash(password, 8);
        }

        await database.run("update users set name = (?), email = (?), password = (?), updated_at = DATETIME('now') where id = (?)", 
            [ user.name, user.email, user.password, user.id ]
        );
    
        return response.status(200).json("User Updated.");

    } catch (error) {
        // Tratar a excessão do AppError aqui.        
        return response.status(error.statusCode).json({ message: error.message });
    }

 }

 async create ( request, response ) {
    const { name, email, password } = request.body;
    // if(!name) {
    //     throw new AppError("Nome não informado!");
    // }
    // response.status(201).json({ name, email, password });

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    try {
        //return response.status(201).json(checkUserExists);    
        if(checkUserExists){
            throw new AppError("This e-mail is in use!");
        }
        
        const hashedPassword = await hash(password, 8);
    
        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            [ name, email, hashedPassword ]
        );
        
        return response.status(201).json();
    } catch (error) {
        // Tratar a excessão do AppError aqui.        
        return response.status(error.statusCode).json({ message: error.message });
    }
 }

}

module.exports = UsersController;