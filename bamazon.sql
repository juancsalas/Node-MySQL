CREATE database bamazon

USE bamazon;

CREATE TABLE products (
  Item_ID VARCHAR(10) NOT NULL,
  Product_Name VARCHAR(100) NOT NULL,
  Department_Name VARCHAR(100) NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  Stock_Quantity INT NOT NULL,
  PRIMARY KEY (Item_ID)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("EL-101", "Television", "Electronics", 275.99, 75);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("EL-102", "Laptop", "Electronics", 895.99, 55);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("EL-103", "Smart Phone", "Electronics", 535.99, 95);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("CL-101", "Jeans", "Clothing", 45.99, 200);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("CL-102", "Shoes", "Clothing", 99.99, 150);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("CL-103", "Shorts", "Clothing", 24.99, 125);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("FU-101", "Desk", "Furniture", 119.99, 35);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("FU-102", "Mattress", "Furniture", 1199.99, 45);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)    
    VALUES ("FU-103", "Couch", "Furniture", 799.99, 25);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("ST-101", "Pens", "Stationery", 2.99, 300);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("ST-102", "Notebooks", "Stationery", 9.99, 285);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("ST-103", "Binders", "Stationery", 6.99, 135);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("HOAP-101", "Refrigerator", "Home Appliances", 789.99, 85);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("HOAP-102", "Microwave", "Home Appliances", 89.99, 105);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES ("HOAP-103", "Stove", "Home Appliances", 459.99, 90);

