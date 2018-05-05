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
    customerOrder()
})

//create a function to view items available for sale
//prompt user with two messages:
//1) ask for ID of item they'd like to buy
//2) as how many units they'd like to buy
function customerOrder(questions) {

    connection.query("SELECT * FROM products", function (err, res) {

        let choices = [];

        for (let i = 0; i < res.length; i++) {
            choices.push(res[i].product_name);
        }

        inquirer.prompt([{
            name: "idInput",
            message: "Please select an item to purchase.",
            type: "list",
            choices: choices
        }]).then(answers => {
            // Use user feedback for... whatever!!
            connection.query("SELECT * FROM products", function (err, res) {
                //console.log("You chose item " + answers.idInput);
            })

            let quantityInput = [];

            inquirer.prompt([{
                name: "quantityInput",
                message: "How many would you like?",
                type: quantityInput
            }]).then(answers => {
                //when customer places order, app should check if store had enough stock to fill customer's order
                //If not: console log: Insufficient quantity!, and prevent order from going through
                    connection.query("SELECT * FROM products", function (err, res) {
                        if (quantityInput > res[choices].stock_quantity) {
                            console.log("Insufficient quantity!");
                        }
                        //if store has enough stock, update database to reflect quantity remaining
                        //after update, show customer cost of their purchase
                        else {
                            console.log("Your purchase total is: ");
                        }
                    })
                
            })
        })
        //PUT THIS SOMEWHERE!!!: connection.end();    
    })
}



function fulfillOrder() {
    connection.query("SELECT * FROM products", function (err, res) {

    })
}