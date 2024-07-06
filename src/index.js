const express = require("express")
const app = express();
const PORT = 2413;


app.get("/", (request, response) => {
    response.send("Hello Word")
})

app.get("/hello", (request, response) => {
    response.send("Return Hello World!")
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});