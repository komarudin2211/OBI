const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3500;

const invetory = require("./backend/inventory");

const user = require("./backend/user");
const roles = require("./backend/roles");
const product = require("./backend/product");
const warehouse = require("./backend/warehouse");

var bodyParser = require('body-parser');
const { func } = require('prop-types');

app.use(bodyParser.json());
app.use(cookieParser("asiap"));

app.use(
    "/api",
    product,
    roles,
    user,
    warehouse,
    invetory
);

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(req, res) {
    if(req.originalUrl != '/api/user/login' && !req.signedCookies.fullname && req.originalUrl != '/login' &&  req.originalUrl != '/signup'){
           return res.redirect("/login");
    }else {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});

app.listen(port);

console.log("***************************************");
console.log("*** system running on port : ", port, " ***");
console.log("***************************************");

module.exports = app
