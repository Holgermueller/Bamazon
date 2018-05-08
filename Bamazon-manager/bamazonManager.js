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
    console.log("connect as id " + connection.threadId);
    chooseATask()
})

function chooseATask() {

    let task =

        inquirer.prompt([{/* Pass your questions in here */
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
}

function viewAllProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " Name:" + res[i].product_name + " $" + res[i].price + " Quantity:" + res[i].stock_quantity);
            connection.end();
        }
    });

}

//connection.end()