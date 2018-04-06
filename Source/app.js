/**
 * Einstiegspunkt für den serverseitigen Code
 * 
 */

const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const app = express();
app.use("/static", express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* middleware.. */

app.use((request, response, next) => {
    /* test for error handling */
    //let error = new Error("Oh noes. An error! Everyone to the escape pods!") 
    //error.status = 500;
    //next(error);
    //return;
    /**/

    console.log(request.originalUrl);
    next();
});

/* */

/* Error middleware */

app.use((error, request, response, next) => {
    
    response.locals.error = error;
    response.status(500);
    response.render("error");
    
});

/* */


app.set("view engine", "pug");
app.set('views', path.join(__dirname, './views'));

// Heroku setzt den Port nach eigenem Ermessen über eine 
// Umgebungsvariable PORT... 
let port = process.env.PORT || 3000;

// Alle routes von routes/index.js hinzufügen
app.use(require("./routes/index"));
app.use("/cards", require("./routes/cards"));

/* Der 404 error handler wird ganz am Ende eingefügt,
   also auch nach den normalen Routes. 
   Damit wird er zuletzt ausgeführt, wenn sonst alles
   durch ist und damit wissen wir: für diesen Request
   gibt es keinen Handler..! 
 */

app.use((request, response, next) => {
    
    response.locals.error = new Error("Page not found");
    response.locals.error.status = 404;
    response.status(404);
    response.render("error");
    
});

/* */

app.listen(port);