const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
    let username = request.cookies.username;

    if (username === undefined) {
        response.redirect("/hello");
        return;
    }

    response.render("index", { name: username });
});



router.get("/hello", (request, response) => {
    const username = request.cookies.username;

    if ( username !== undefined ) {
        response.redirect("/");
        return;
    }

    response.render("hello", { name: request.cookies.username });
});

router.post("/hello", (request, response) => {
    response.cookie("username", request.body.username);
    response.redirect("/");
});

router.post("/logout", (request, response) => {
    response.clearCookie("username");
    response.redirect("/hello");
});

module.exports = router;