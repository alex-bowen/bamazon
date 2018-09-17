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

// retrieves info on user's selected product for purchase
function getProductInfo(idChoice, quantityChoice) {
    connection.query("SELECT * FROM products WHERE item_id =" + idChoice, function (err, res) {
        var productInfo = res;
        var productQuantity = productInfo[0].stock_quantity;

        if (productQuantity > quantityChoice) {
            startSale(quantityChoice, idChoice, productInfo);
        } else {
            console.log("We don't have enough!");
        }
    });
}

// This function performs the sale, updates the database to reflect sales. 
function startSale (quantityChoice, idChoice, productInfo) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantityChoice, idChoice], function(err, res) {
        var yourTotal = quantityChoice * productInfo[0].price;  
        console.log("\nThanks! Your total is $" + yourTotal + ". Have a nice Day!");
    })
}

// This function asks the user which item they'd like to purchase, then sotres their selection in a variable for future use .
function startShopping() {
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
            checkQuantity();
        });
}

// This function asks for the user's desired quantity for their purchase, then stores their selection in a variable for future use. 
function checkQuantity() {
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
            getProductInfo(idChoice, quantityChoice);
        });
}


