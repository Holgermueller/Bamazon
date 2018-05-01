//require node packages
const inquirer = require('inquirer');
const mysql = require('mysql');
//connect to mysql database
const connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "Kafka#678",
    database:"bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connect as id " + connection.threadId);
    connection.end();
})

//insert info for 10 random 'mock' items into database

//create a function to view items available for sale
//should show: ids, names, and prices for products

//prompt user with two messages:
//1) ask for ID of item they'd like to buy
//2) as how many units they'd like to buy

//when customer places order, app should check if store had enough stock to fill customer's order
//If not: console log: Insufficient quantity!, and prevent order from going through

//if store has enough stock, update database to reflect quantity remaining
//after update, show customer cost of their purchase