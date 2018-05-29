//require node packages
const inquirer = require('inquirer');
const mysql = require('mysql');
const colors = require('colors');
require("console.table");
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
    chooseATask()
});

function chooseATask() {

    let task =

        inquirer.prompt([{
            name: 'task',
            message: 'What business shall we conduct today?'.green,
            type: 'list',
            choices: [
                'View all products',
                'View low inventory',
                'Add to inventory',
                'Add a new product'
            ]
        }]).then(answers => {
            switch (answers.task) {
                case "View all products":
                    viewAllProducts();
                    break;

                case "View low inventory":
                    viewLowProducts();
                    break;

                case "Add to inventory":
                    addToInventory();
                    break;

                case "Add a new product":
                    addNewProduct();
                    break;

                default:
                    break;
            }
        });
};

function viewAllProducts() {
    console.log(">>>>>Available Stock<<<<<".blue);
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            //console.table(products);
            console.log("ID: ".yellow + res[i].item_id + " Name:".yellow + res[i].product_name + " $".green + res[i].price + " Quantity:".blue + res[i].stock_quantity);
            //connection.end();
        }
        chooseATask();
    });
};

function viewLowProducts() {
    console.log(">>>>>>Re-Order Soon!<<<<<<".red);
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log("ID: ".yellow + res[i].item_id + " Name: ".yellow + res[i].product_name + " $".green + res[i].price + " Quantity:".red + res[i].stock_quantity);
        };
    });
};

function addToInventory() {
    console.log(">>>>>Adding to stock<<<<<".green);
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        
        let quantityInput = [];
        let choices = [];
        for (let i = 0; i < res.length; i++) {
            choices.push(res[i].product_name);
        };

        inquirer.prompt([{
            name: "replenishStock",
            message: "Choose the itme you'd like to replenish.".green,
            type: 'list',
            choices: choices
        }, {
            name: 'quantityReplenishment',
            message: 'How many would you like to add?'.green,
            type: quantityInput
        }]).then(answers => {
            // Use user feedback for... whatever!!
            let 
        });
        //no code below this line, for this function
    });
};

function addNewProduct() {
    console.log(">>>>>Adding new Item<<<<<".green);

};

//connection.end()