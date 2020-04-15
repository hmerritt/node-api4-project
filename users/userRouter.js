const express = require("express");
const db = require("./userDb");

const router = express.Router();

router.post("/", validateUser(), (req, res, next) => {
    db.insert({ name: req.body.name })
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            next(error);
        });
});

router.post("/:id/posts", validatePost(), (req, res) => {
    // do your magic!
    //  Where is the db function for this?
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

router.get("/:id/posts", validateUserId(), (req, res, next) => {
    db.getUserPosts(req.user.id)
        .then((posts) => {
            res.send(posts);
        })
        .catch((error) => {
            next(error);
        });
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

router.put("/:id", validateUser(), validateUserId(), (req, res, next) => {
    db.update(req.user.id, { name: req.body.name })
        .then(() => {
            res.json({
                id: req.user.id,
                name: req.user.name,
            });
        })
        .catch((error) => {
            next(error);
        });
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

function validatePost() {
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
