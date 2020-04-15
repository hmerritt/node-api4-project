const express = require("express");
const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");

const server = express();

//  Applly custom middleware
server.use(logger());
server.use("/users", userRouter);

server.get("/", (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
