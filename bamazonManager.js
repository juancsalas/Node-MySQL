var mysql = require("mysql");
var Table = require('easy-table');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "marzana",
    database:"bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    optionMenu();
});

// Function provides manager five actions to take. 
// Each option is a specific case for the switch statement below.
function optionMenu(){
    inquirer
    .prompt({
        name: "menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Nothing, I've changed my mind."
        ]
    })
    .then(function(answer) {
        switch(answer.menu){
            case "View Products for Sale":
                showProducts();

                // continuePrompt is delayed to allow showProducts to be completed
                setTimeout(continuePrompt,300);
            break;

            case "View Low Inventory":
                lowInventory();

                // continuePrompt is delayed to allow lowInventory to be completed
                setTimeout(continuePrompt,300);
            break;

            case "Add to Inventory":
                showProducts()

                // addInventory is delayed to allow lowInventory to be completed
                setTimeout(addInventory,300);
            break;

            case "Add New Product":
                newProduct();
            break;

            case "Nothing, I've changed my mind.":
                console.log("\nHave a nice day!\n");
                connection.end();
            break;
        }
    });
}

// This function gives the user a "neater" way to continue doing things in the store of exist the MySQL connection
// If the user selects NO, the app ends the connection to MySQL
// If the user selects YES, then it calls on the optionMenu function which display the five actions the user can take
function continuePrompt(){
    inquirer
    .prompt({
        name: "repeat",
        type: "list",
        message: "Is there anything else you'd like to do?",
        choices: [
            "Yes",
            "No, I'm done."
        ]
    })
    .then(function(answer) {
        switch(answer.repeat){
            case "Yes":
                optionMenu();
            break;

            case "No, I'm done.":
                console.log("\nHave a nice day!\n");
                connection.end();
            break;
        }
    });
}

// Function shows the products in the store.
// It's the same function from bamazonCustomer.js
function showProducts(){

    var query = "SELECT * FROM products;"
    connection.query(query, function(err, res){
    
        var productTable = new Table
           
        res.forEach(function(product) {
            productTable.cell("Item ID", product.Item_ID)
            productTable.cell("Product", product.Product_Name)
            productTable.cell("Department", product.Department_Name)
            productTable.cell("Price($)", product.Price, Table.number(2))
            productTable.cell("Quantity Left", product.Stock_Quantity, Table.number(0))
            productTable.newRow()
        })
        
        console.log("\nITEMS FOR SALE: \n\n" + productTable.toString());

    });
    
}

// Function displays all items with stock less than 5
// It's the same as the showProducts function except with a condition of less than 6
function lowInventory() {
    var query = "SELECT * FROM products WHERE Stock_Quantity < 6;"
    connection.query(query, function(err, res){
    
        var productTable = new Table
           
        res.forEach(function(product) {
            productTable.cell("Item ID", product.Item_ID)
            productTable.cell("Product", product.Product_Name)
            productTable.cell("Department", product.Department_Name)
            productTable.cell("Price($)", product.Price, Table.number(2))
            productTable.cell("Quantity Left", product.Stock_Quantity, Table.number(0))
            productTable.newRow()
        })
        
        console.log("\nITEMS FOR SALE: \n\n" + productTable.toString());
    
    });
}

// Function allows the manager to add inventory by using the itemID
// User is prompt to inpute the itemID and the amount of stock being added
// Promise adds the amount added to the existing amount and gets passed into the updateStock function along with other data
function addInventory(){
    inquirer
    .prompt([
        {
            name: "itemID",
            type: "input",
            message: "Input the Item ID you want to add inventory to:",
            validate: function(value){

                // If statement condition makes sure that a value is entered and not left blank
                if(value){
                    return true;
                }
                return false;
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many do you want to add?",
            validate: function(value){

                // If statement condition makes sure that a value is entered and not left blank
                // isNaN is used to assure that the value is a number and not string
                if (value && isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    .then(function(answer){
        var query = "SELECT Stock_Quantity, Product_Name FROM products WHERE Item_ID = ?;";
        connection.query(query, (answer.itemID), function(err,res){
            var stockQuantity = res[0].Stock_Quantity;
            var product = res[0].Product_Name;
            
            updateStock(answer.itemID, answer.quantity, stockQuantity,product)
        })
    })
}

// Function connnects to MySQL to update the stock quantity it recives from the addInventory function
function updateStock (itemID, userQuantity, stockQuantity, product){

    // parseInt is used to assure than userQuantity is a number and not a string
    var updateStock = stockQuantity + parseInt(userQuantity);

    var query = "UPDATE products SET ? WHERE ?;"
    connection.query(query,
        [
            { Stock_Quantity: updateStock}, 
            { Item_ID: itemID }
        ],
        function(err, res){
            if (err) throw err;
        }
    );

    // Console logs the new amount of the specific item being updated
    // continuePrompt gets called to ask user if they want to do anything else
    console.log("\nStock for " + product + " has been increased to " + updateStock + "\n");
    continuePrompt();
}   

// Function allows user to create new products
// Prompts as for Item ID, name, price, department, and initial stock
function newProduct () {
    inquirer
    .prompt([
        {
            name: "itemID",
            type: "input",
            message: "Input the new item ID:",
            validate: function(value){
                if(value){
                    return true;
                }
                return false;
            }
        },
        {
            name: "productName",
            type: "input",
            message: "Input the new item name:",
            validate: function(value){
                if(value){
                    return true;
                }
                return false;
            }
        },
        {
            // Depeartment is a listed option to prevent user from inputting anything and keeping order
            name: "department",
            type: "list",
            message: "Choose the department location for this item:",
            choices: [
                "Clothing",
                "Electronics",
                "Furniture",
                "Home Appliances",
                "Stationery"
            ]
        },
        {
            name: "price",
            type: "input",
            message: "Input the new item unit price:",
            validate: function(value){
                if (value && isNaN(value) === false) {
                return true;
                }
                return false;
            }
        },
        {
            name: "stock",
            type: "input",
            message: "Input the new item stock quantity:",
            validate: function(value){
                if (value && isNaN(value) === false) {
                return true;
                }
                return false;
            }
        }
    ])

    // Promise sends the inputted info and updates the table in MySQL database with the new item
    .then(function(answer){
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                Item_ID: answer.itemID,
                Product_Name: answer.productName,
                Department_Name: answer.department,
                Price: answer.price,
                Stock_Quantity: answer.stock,
            },
            function(err,res){ 
                if (err) throw err;
            }

        )

        // showProducts function is called to display the updated list of items
        //continuePromp function is called with a delay to assure it is displayed after showProducts is completed
        showProducts();
        setTimeout(continuePrompt,300)
    })
    
}