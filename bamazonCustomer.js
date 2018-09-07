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
    console.log("\nWelcome to Bamazon's cat-themed marketplace, connected at: " + connection.threadId +" \n");
    displayItems();
})

/* 

3. once order is placed, check if store has enough of the product to meet request
4. * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
5. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.
*/

// Displays all items available for sale, including the ids, names, and prices
function displayItems () {
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res);  
        startShopping(res);
    })
}


// inquirer -- ask user id of product they want to buy, then how many units would you like to buy
function startShopping (inventory) {
    inquirer
        .prompt({
            name: "whichOne",
            type: "input",
            message: "What is the id # of the item you're looking to purchase?"
        }).then(function(answers) {
            console.log("then");
            // get their answer

            // need function -- checkInventory(); -- queries database @ user input id and returns that row, set variable = to that 
            // var product = checkInventory(productId)
                    // this will include a for loop that loops through each row until it finds row with Id that user inputs
                    // returns info from that row 
            // see if product exists, make sure quantity is > 0 

            // howMany(pass it product info);
            howMany();
        })  
};

// break everything into functions 

function howMany () {
    inquirer
        .prompt({
            name: "quantity",
            type: "input",
            message: "How many units of this product are you looking to purchase?"
        })
        .then(function(answers) {
            console.log("done");
        });
}