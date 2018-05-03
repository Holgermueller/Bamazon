//require node packages
const inquirer = require('inquirer');
const mysql = require('mysql');
//connect to mysql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kafka#678",
    database: "bamazon_DB"
});

//client.connect();

connection.connect(function (err) {
    if (err) throw err;
    //console.log("connect as id " + connection.threadId);
    itemsDisplay()
    
})

function itemsDisplay() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("Current inventory: ")
        console.log("ID#")
        for (let i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " " + res[i].product_name + " " + "$" + res[i].price);
        }
        console.log("==========================================")
        customerPrompt()
    })
}

function customerPrompt() {
    inquirer.prompt([{ 
        name: "Bamazon",
        message: "Please enter the ID number of the item you'd like to purchase.",
        type: "input",
    },
    {
        name: "Bamazon",
        message: "How many of thie item would you like?",
        type: "input"
        /* Pass your questions in here */
}]).then(answers => {
            // Use user feedback for... whatever!!
        });
        //PUT THIS SOMEWHERE!!!: connection.end();
        
    }

//create a function to view items available for sale
//should show: ids, names, and prices for products

//prompt user with two messages:
//1) ask for ID of item they'd like to buy
//2) as how many units they'd like to buy

//when customer places order, app should check if store had enough stock to fill customer's order
//If not: console log: Insufficient quantity!, and prevent order from going through

//if store has enough stock, update database to reflect quantity remaining
//after update, show customer cost of their purchase