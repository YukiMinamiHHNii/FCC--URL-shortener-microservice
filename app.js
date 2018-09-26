const express = require("express"),
			dotenv = require("dotenv").load(),
			shorturlRouter = require("./src/routers/shorturl");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use("/", express.static(__dirname + "/views"));
app.use("/api/shorturl", shorturlRouter);

app.listen(process.env.SERVER_PORT);
console.log(`App running on port ${process.env.SERVER_PORT}`);
