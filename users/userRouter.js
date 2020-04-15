const express = require("express");
const db = require("./userDb");

const router = express.Router();

router.post("/", validateUser(), (req, res) => {
    // do your magic!
});

router.post("/:id/posts", validatePost(), (req, res) => {
    // do your magic!
});

router.get("/", (req, res, next) => {
    db.get()
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            next(error);
        });
});

router.get("/:id", validateUserId(), (req, res) => {
    res.send(req.user);
});

router.get("/:id/posts", validateUserId(), (req, res) => {
    // do your magic!
});

router.delete("/:id", validateUserId(), (req, res, next) => {
    db.remove(req.user.id)
        .then(() => {
            res.json(req.user);
        })
        .catch((error) => {
            next(error);
        });
});

router.put("/:id", validateUserId(), (req, res) => {
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
                    res.status(400).json({
                        message: "invalid user id",
                    });
                }
            })
            .catch((error) => {
                //  Server failed when accessing database
                next(error);
            });
    };
}

function validateUser() {
    return (req, res, next) => {
        //  Check that the request body exists
        if (req.body) {
            //  Check for the name key
            if (req.body.name) {
                next();
            } else {
                res.status(400).json({
                    message: "missing required name field",
                });
            }
        } else {
            res.status(400).json({
                message: "missing user data",
            });
        }
    };
}

function validatePost(req, res, next) {
    return (req, res, next) => {
        //  Check that the request body exists
        if (req.body) {
            //  Check for the name key
            if (req.body.text) {
                next();
            } else {
                res.status(400).json({
                    message: "missing required text field",
                });
            }
        } else {
            res.status(400).json({
                message: "missing post data",
            });
        }
    };
}

module.exports = router;
