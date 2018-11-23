USE bamazon;

UPDATE bamazon.products SET Stock_Quantity = 75 WHERE Item_ID = "EL-101";
UPDATE bamazon.products SET Stock_Quantity = 55 WHERE Item_ID = "EL-102";
UPDATE bamazon.products SET Stock_Quantity = 0 WHERE Item_ID = "EL-103";
UPDATE bamazon.products SET Stock_Quantity = 200 WHERE Item_ID = "CL-101";
UPDATE bamazon.products SET Stock_Quantity = 150 WHERE Item_ID = "CL-102";
UPDATE bamazon.products SET Stock_Quantity = 125 WHERE Item_ID = "CL-103";
UPDATE bamazon.products SET Stock_Quantity = 1 WHERE Item_ID = "FU-101";
UPDATE bamazon.products SET Stock_Quantity = 45 WHERE Item_ID = "FU-102";
UPDATE bamazon.products SET Stock_Quantity = 5 WHERE Item_ID = "FU-103";
UPDATE bamazon.products SET Stock_Quantity = 300 WHERE Item_ID = "ST-101";
UPDATE bamazon.products SET Stock_Quantity = 285 WHERE Item_ID = "ST-102";
UPDATE bamazon.products SET Stock_Quantity = 135 WHERE Item_ID = "ST-103";
UPDATE bamazon.products SET Stock_Quantity = 3 WHERE Item_ID = "HOAP-101";
UPDATE bamazon.products SET Stock_Quantity = 105 WHERE Item_ID = "HOAP-102";
UPDATE bamazon.products SET Stock_Quantity = 90 WHERE Item_ID = "HOAP-103";

SELECT * FROM bamazon.products;