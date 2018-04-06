const express = require("express");
const router = express.Router();

// ==> const data = (require("flashcards.json")).data;
const { data } = require("../data/flashcards.json");
const { cards } = data;

router.get("/:id", (request, response) => {
    const { side } = request.query; // check if query contains the side parameter
    const { id } = request.params;

    const templateData = { };

    templateData.id = id;
    templateData.text = cards[id][side];

    if ( side === "question" ) {
        templateData.hint = cards[id].hint;
        templateData.sideToShow = "answer";
        templateData.sideToShowDisplay = "Show answer";
    } else {
        templateData.sideToShow = "question";
        templateData.sideToShowDisplay = "Show question";
    }

    templateData.baseUrl = request.baseUrl;

    response.render("card", templateData);
});

router.get("/", (request, response) => {
    const id = Math.floor(Math.random() * cards.length);
    response.redirect(`${request.baseUrl}/${id}?side=question`);
});

module.exports = router;