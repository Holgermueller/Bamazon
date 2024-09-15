//require node packages
const inquirer = require("inquirer");
const mysql = require("mysql");
//connect to mysql database
const connection = mysql.createConnection({
  host: "localhost",
  port: "xxxx",
  user: "xxxx",
  password: "xxxx",
  database: "bamazon_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connect as id " + connection.threadId);
  addProducts();
  afterConnection();
});

//insert info for 10 random 'mock' items into database
function addProducts() {
  console.log("Inserting new product...n");
  let query = connection.query(
    "INSERT INTO products SET?",
    {
      product_name: "microwave",
      department_name: "home and kitchen",
      price: 30,
      stock_quantity: 10,
    },
    function (err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      //addProducts();
    }
  );
  console.log(query.sqp);
}

function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
