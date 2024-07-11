require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");

const express = require("express");

const routes = require("./routes");

// Rotas e Criação das Tabelas
migrationsRun();

const app = express();
app.use(express.json());
app.use(routes);

app.use( (error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.log(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})
const PORT = 2413;
const serverStart = `\n\nThis Server RocketNotes is running on port ${PORT}\n\n`;

// Server active on port
app.listen(PORT, () => console.log(serverStart));