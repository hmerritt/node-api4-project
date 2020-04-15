const express = require("express");
const db = require("./postDb");

const router = express.Router();

router.get("/", (req, res, next) => {
    db.get()
        .then((users) => {
            res.send(users);
        })
        .catch((error) => {
            next(error);
        });
});

router.get("/:id", validatePostId(), (req, res) => {
    res.send(req.post);
});

router.delete("/:id", validatePostId(), (req, res, next) => {
    db.remove(req.post.id)
        .then(() => {
            res.json(req.post);
        })
        .catch((error) => {
            next(error);
        });
});

router.put("/:id", validatePostId(), (req, res, next) => {});

//  Custom middleware
function validatePostId(req, res, next) {
    return (req, res, next) => {
        db.getById(req.params.id)
            .then((post) => {
                //  Check if post exists
                if (post) {
                    //  All good -> continue
                    //  Add post to request object
                    req.post = post;
                    next();
                } else {
                    //  User does not exist
                    res.status(400).json({
                        message: "invalid post id",
                    });
                }
            })
            .catch((error) => {
                //  Server failed when accessing database
                next(error);
            });
    };
}

module.exports = router;
