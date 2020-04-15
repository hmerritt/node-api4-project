const express = require("express");
const db = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
    // do your magic!
});

router.post("/:id/posts", (req, res) => {
    // do your magic!
});

router.get("/", (req, res) => {
    db.get().then((users) => {
        res.send(users);
    });
});

router.get("/:id", validateUserId(), (req, res) => {
    res.send(req.user);
});

router.get("/:id/posts", (req, res) => {
    // do your magic!
});

router.delete("/:id", (req, res) => {
    // do your magic!
});

router.put("/:id", (req, res) => {
    // do your magic!
});

//custom middleware

function validateUserId() {
    return (req, res, next) => {
        db.getById(req.params.id)
            .then((user) => {
                //  Check if user exists
                if (user) {
                    //  All good -> continue
                    //  Add user to request object
                    req.user = user;
                    next();
                } else {
                    //  User does not exist
                    res.status(404).json({
                        message: "User not found",
                    });
                }
            })
            .catch((error) => {
                //  Server failed when accessing database
                console.log(error);
                res.status(500).json({
                    message: "Could not get user",
                });
            });
    };
}

function validateUser(req, res, next) {
    // do your magic!
}

function validatePost(req, res, next) {
    // do your magic!
}

module.exports = router;
