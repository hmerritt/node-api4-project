const express = require("express");
const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();
server.use(express.json());

//  Applly custom middleware
server.use(logger());
server.use("/users", userRouter);
server.use("/posts", postRouter);

server.get("/", (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
});

//  Generic server error middleware
server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Somthing went wrong",
    });
});

module.exports = server;
