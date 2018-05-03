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

//create a function to view items available for sale
function itemsDisplay() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Current inventory: ")
        console.log("ID#")
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " " + res[i].product_name + " " + "$" + res[i].price);
        }
        console.log("==========================================")
        customerOrder()
    })
}

//prompt user with two messages:
//1) ask for ID of item they'd like to buy
//2) as how many units they'd like to buy
function customerOrder(questions) {

    inquirer.prompt([{
        name: "idInput",
        message: "Please enter the ID number of the item you'd like to purchase.",
        type: "input",
    },
    {
        name: "quantityInput",
        message: "How many would you like?",
        type: "input"
    }]).then(answers => {
        // Use user feedback for... whatever!!
        console.log("You chose item " + answers.idInput);
        console.log("You'd like " + answers.quantityInput + " of them.")
    });
    //PUT THIS SOMEWHERE!!!: connection.end();    
}



//when customer places order, app should check if store had enough stock to fill customer's order
//If not: console log: Insufficient quantity!, and prevent order from going through

//if store has enough stock, update database to reflect quantity remaining
//after update, show customer cost of their purchase