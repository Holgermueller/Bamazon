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