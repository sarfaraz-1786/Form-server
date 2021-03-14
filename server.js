const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

dotenv.config({ path: "./config.env" });

require("./DB");

const routerIndex = require("./Rrouter");

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api", routerIndex);

app.use((err, req, res, next) => {
    if (err.name === "ValidationError") {
        let valErrors = [];
        Object.keys(err.errors).forEach((key) =>
            valErrors.push(err.errors[key].message)
        );
        res.status(422).send(valErrors)
    }
});

//server Starting
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server at ${port}`));
