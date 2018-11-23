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
    showProducts();
})

// This function shows all items on sale in the store in a formatted table
function showProducts(){
    var query = "SELECT * FROM products;"
    connection.query(query, function(err, res){
    
        // The code block below uses 'easy-table' to format items nicely
        var productTable = new Table
           
        res.forEach(function(product) {
            productTable.cell("Item ID", product.Item_ID)
            productTable.cell("Product", product.Product_Name)
            productTable.cell("Department", product.Department_Name)
            productTable.cell("Price($)", product.Price, Table.number(2))
            productTable.cell("Quantity Left", product.Stock_Quantity, Table.number(0))
            productTable.newRow()
        })
        
        // Console logs the table and a heading into the terminal
        console.log("\nITEMS FOR SALE: \n\n" + productTable.toString())
        
        // Calls on purchase function so user can input their desired purchase
        purchase();
    });
}

// This function uses inquirer to prompt and store user inputs that later is used in mysql query
function purchase() {
    inquirer
    .prompt([
        {
            name: "itemID",
            type: "input",
            message: "Input the Item ID of the product you would like to purchase.",
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
            message: "How many would you like to purchase?",
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
        // Promise is used to capture various data elements from mysql database
    .then(function(answer){
        var query = "SELECT Stock_Quantity,Price,Product_Name,Item_ID FROM products where ?"
        connection.query(query, {Item_ID: answer.itemID }, function(err,res){

            if(err) throw err;
        
            // Storing into variables for easier usability
            var stock = res[0].Stock_Quantity;
            var price = res[0].Price;
            var product = res[0].Product_Name;
            
            // If statement checks whether there is stock available
            if (stock <= 0){

                console.log("\nSorry, your item is out of stock.\n")
                shopAgain();
            }
            else if (stock < answer.quantity){

                console.log("\nSorry, not enough inventory to fullfull your order.\n")

                // Function asks user if they are done or want to shop more
                shopAgain();
            }
            else {
                
                updateProduct(answer.itemID, answer.quantity, stock);
                checkoutProduct(price,answer.quantity,product)
            }
    
        })

        
    })
}

// Function updates the store stock using data from purchase function
function updateProduct(itemID, userQuantity, stockQuantity){

    // Subtracts the amount the user wants to buy from available stock
    var updateStock = stockQuantity - userQuantity;
    
    // Updates the stock of purchased item 
    var query = "UPDATE products SET ? WHERE ?;"
    connection.query(query,
        [
            { Stock_Quantity: updateStock}, 
            { Item_ID: itemID }
        ],
        function(err, res){ }
    );
}

// Function used to display total amount purchased
function checkoutProduct(price, quantity, product){
    
    // Calculates total price
    var total = price * quantity
    console.log("\nThe total for your " + quantity + " " + product + " is $" + total.toFixed(2) + "\n");
    
    // Function asks user if they are done or want to shop more
    shopAgain();
    
}

// Function to ask user if they want to shop more or not. Choosing 'no' ends mysql connection.
function shopAgain (){
    inquirer
    .prompt({
        name: "shop",
        type: "list",
        message: "Would you like to purchase anything else?",
        choices: [
            "Yes, take me back to the store.",
            "No, I'm done shopping."
        ]
    })
    .then(function(answer){
        switch(answer.shop){

            // Calls the showProducts function, which has the purchase function within so user can purchase more
            case "Yes, take me back to the store.":
                showProducts();
            break;

            // Ends connection
            case "No, I'm done shopping.":
                console.log("\nThanks for stopping by!\n");
                connection.end();
            break;
        };
    });
}