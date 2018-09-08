var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "udU&8Ma2nE17",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\nWelcome to Bamazon's cat-themed marketplace, connected at: " + connection.threadId + " \n");
    displayItems();
})

var idChoice;
var quantityChoice;


// Displays all items available for sale, including the ids, names, and prices
function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res);
        startShopping(res);
    })
}

function getProductInfo() {
    connection.query("SELECT * FROM products WHERE item_id =" + idChoice, function (err, res) {
        var productInfo = res;
    });
}
// inquirer -- ask user id of product they want to buy, then how many units would you like to buy
function startShopping(inventory) {
    inquirer
        .prompt({
            name: "whichOne",
            type: "input",
            message: "What is the id # of the item you're looking to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }).then(function (answers) {
            idChoice = answers.whichOne;
            howMany();

        });

}


function howMany() {
    inquirer
        .prompt({
            name: "quantity",
            type: "input",
            message: "How many units of this product are you looking to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        })
        .then(function (answers) {
            quantityChoice = answers.quantity;


        })
};


