//require node packages
const inquirer = require('inquirer');
const mysql = require('mysql');
const colors = require('colors');
//connect to mysql database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kafka#678",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("connect as id " + connection.threadId);
    customerOrder();
})

//create a function to view items available for sale
//prompt user with two messages:
//1) ask for ID of item they'd like to buy
//2) as how many units they'd like to buy
function customerOrder() {

    connection.query("SELECT * FROM products", function (err, res) {

        let choices = [];
        let quantityInput = [];

        for (let i = 0; i < res.length; i++) {
            choices.push(res[i].product_name);
        }

        inquirer.prompt([{
            name: "idInput",
            message: "Please select an item to purchase".blue,
            type: "list",
            choices: choices
        },
        {
            name: "quantityInput",
            message: "How many would you like?".blue,
            type: quantityInput
        }]).then(answers => {

            let chosenProduct;
            for (let i = 0; i < res.length; i++) {
                if (res[i].product_name === answers.idInput) {
                    chosenProduct = res[i];
                }
            }
            connection.query("SELECT stock_quantity FROM products", function (err, res) {
                //when customer places order, app should check if store had enough stock to fill customer's order
                //if store has enough stock, update database to reflect quantity remaining
                //after update, show customer cost of their purchase
                if (answers.quantityInput <= chosenProduct.stock_quantity) {

                    connection.query("SELECT price FROM products", function (err, res) {
                        //delete quantity from stock!!
                        connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                            [answers.quantityInput, chosenProduct.item_id], function (err, res) {
                                let total = answers.quantityInput * chosenProduct.price;
                                console.log("Your purchase total is: ".blue + "$".green + total);
                                console.log("Thank you for your purchase!".green);
                            })
                        connection.end();
                    })
                    //If not: console log: Insufficient quantity!, and prevent order from going through
                } else {
                    console.log("Insufficient quantity!".red);
                    connection.end();
                }
            })
        });
    })
}