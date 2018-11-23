# Node-MySQL - Juan Carlos Salas
## Coding Bootcamp - Asignment 12

###### _*For a demonstration video, please [click here](https://drive.google.com/open?id=1SN9YEVd4gEZXZ290cVwuB-Yec6j_BNuG).*_

This application uses Node and MySQL to create a fictional store with pre-determined inventory, where "customers" may purchase items if so desired, and "managers" have authority to add stock or new items into the store. 

For this app to work correctly, you'll need to install the NPM modules, including file-system, easy-table and inquirer.

#### `1. node bamazonCustomer.js`

This command into the terminal will allows the customer to purhcase any item listed in the store. The first the app does is display a table, using the node package easy-table, with the items available, the amount in stock, their price, ID and corresponding department.

The user will be prompted to select the Item ID of the item they want. If left blank it will not let the user continue. 

After the user will be prompted to input how many of the items they would like. If they input a blank value or a value that is not an integer, the app won't accept or move on. 

Once the user inputs the quantity of the item they want, the app will calculate the total and display it on the terminal alongisde the number they purchased and the name of the item. In the background the app will also subtract the purchased amount from the current inventory and update the table.

PICTURE

If after inputting the quantity of the item they desire, that number is higher than the stock available, the user will receive a message saying so.

PICTURE

If there is no more items left in stock, a message refering to the item as "out of stock" will appear.

PICTURE

After any of these three scenarios occure, the user will be prompted if they want to continue shopping or exit the store. If the user chooses to continue shopping, the app will display a new table with the updated inventory and prompt the user to input the Item ID they desire.

PICTURE

If the user choses to exit the store, the app will disconnect returning them to their normal terminal display

PICTURE


<br>

#### `2. node bamazonManager.js`

This command allows a "manager" to do the following things listed in the store table. A list of the five choices below will initially appear which then the user must chose.

* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product
* Nothing, I've changed my mind

PICTURE

<br>

**View Products for Sale**

Chosing this options simply shows the current state of the store. A table will appear displaying the Item ID, Item Name, Department it belongs to, the price and the inventory for every item.

PICTURE

**View Low Inventory**

This option displays a table of the items in the store which have an inventory less than six.

PICTURE

**Add to Inventory**

This option allows the user to select an Item ID and add inventory to the existing quantity. The app will prompt the user for an Item ID and the amount of inventory they want to add. Once the information is submited, the app will add the inventory, update the table and display the item name and the new inventory quantity.

PICTURE

**Add New Product**

This option allows the user to add a new item to the store. The app will prompt the user to create a new Item ID, then will ask for the name of the item. Third, the app will display a list of departments the user can elect which corresponds to the item. Finally, the user will have to submit the price and the initial inventory quantity.

PICTURE

When everything is submitted, the app will display a table of items with the new product added.

PICTURE


**Nothing, I've changed my mind**

This option disconnects the user from the app, and sends them to their normal terminal.

**BONUS:**
For every option besides the last one, the user will prompted if they want to do anything else with the store. Choosing YES displays the beginning menu again. Choosing no will disconnect them from the, sending them to their normal terminal.

PICTURE







