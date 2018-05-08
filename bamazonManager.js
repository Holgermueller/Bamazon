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
            case "view-all":
                viewAllProducts();
                break;

            case "view-low":
                viewLowProducts();
                break;

            case "add-inventory":
                addToInventory();
                break;

            case "add-new":
                addNewProduct();
                break;
        }
    });
}

//connection.end()