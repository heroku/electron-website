const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const url = require("url");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
var sfUsername, sfPassword, username;
const db = require("./db.js");

express()
    .use(express.static(path.join(__dirname, "public")))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cookieParser())
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .get("/", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/index", {
                account: data.account,
                vehicle: data.vehicle
            });
        });
    })
    .get("/announce", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/announce", {
                account: data.account,
                vehicle: data.vehicle
            });
        });
    })
    .get("/order", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/order", {
                account: data.account,
                vehicle: data.vehicle
            });
        });
    })
    .get("/customize", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/customize", {
                account: data.account,
                vehicle: data.vehicle
            });
        });
    })
    .get("/manufacturing", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/manufacturing", {
                account: data.account,
                vehicle: data.vehicle
            });
        });
    })
    .get("/dashboard", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/dashboard", {
                account: data.account,
                vehicle: data.vehicle
            });
        });
    })
    .get("/dberror", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/dberror", {
                account: data.account,
                vehicle: data.vehicle
            });
        });
    })
    .get("/api/account", function (req, res) {
        var username = req.query.username;
        //db.getAccountByUsername(username, function (account) {
        db.getContactByUsername(username, function (account) {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(account, null, 3));
        });
    })
    .get("/api/vehicle", function (req, res) {
        var username = req.query.username;
        db.getVehicleByUsername(username, function (vehicle) {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(vehicle, null, 3));
        });
    })
    .post("/api/vehicle", function (req, res) {
        var vehicle = req.body;
        db.updateVehicle(vehicle, function (updatedVehicle) {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(updatedVehicle, null, 3));
        });
    })
    .post("/api/pricequote", function (req, res) {
        var vehicle = req.body;
        var data = db.getPrice(vehicle);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(data, null, 3));
    })
    .post("/api/loan", function (req, res) {
        console.log('Creating loan...');
        var loan = req.body;
        db.createLoan(loan, function (newLoan) {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(newLoan, null, 3));
        });
    })    
    .listen(PORT, () => console.log(`Listening on ${PORT}`));