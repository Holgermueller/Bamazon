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
                'Add a new product',
                'Exit Menu'
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

                case "Exit menu":
                    exitMenu();
                    break;

                default:
                    break;
            };
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
        };
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
        chooseATask();
    });
};

function addToInventory() {
    console.log(">>>>>Adding to stock<<<<<".green);
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {

        let choices = [];
        let quantityInput = [];

        for (let i = 0; i < res.length; i++) {
            choices.push(res[i].product_name);
        };

        inquirer.prompt([{
            name: "idInput",
            message: "Choose the item you'd like to replenish.".green,
            type: 'list',
            choices: choices
        }, {
            name: 'quantityInput',
            message: 'How many would you like to add?'.green,
            type: quantityInput
        }]).then(answers => {

            let chosenProduct;
            for (let i = 0; i < res.length; i++) {
                if (res[i].product_name === answers.idInput) {
                    chosenProduct = res[i];
                };
            };
            connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
                [answers.quantityInput, chosenProduct.item_id], function (err, res) {
                    console.log(">>>>>Quantity updated!!<<<<<".blue);
                });
            chooseATask();
        });
        //no code below this line, for this function
    });
};

function addNewProduct() {
    console.log(">>>>>Adding new Item<<<<<".green);

            inquirer.prompt([{
                //add item name
                name: "nameInput",
                message: "Provie the name of the item you want to enter:",
                type: "input"
            },
            //choose a dept for it
            {
                name: "getDept",
                message: "Provide the name of department it belongs in:",
                type: "input"
            },
            //enter the price
            {
                name: "getPrice",
                message: "Enter the price:",
                type: "input"
            },
            //enter quantity
            {
                name: "getQuantity",
                message: "Enter the quantity:",
                type: "input"
            }]).then((answers) => {
                connection.query("INSERT INTO products () VALUES ?",
                [answers.product_name, answers.department_name, parseInt(answers.price), parseInt(answers.stock_quantity)],
                function (err, res) {
                    console.log(res);
                });
            });
};

function exitMenu() {
    console.log("Good bye.".blue);
}



//connection.end()