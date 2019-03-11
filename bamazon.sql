DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	product_id INTEGER (11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(8,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (product_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Kindle Fire', 'Amazon Products', 99.99, 299),
		('PlayStation 4 Pro 1TB', 'Sony Products', 349.00, 1453),
		('Apple Watch Series 4', 'Apple Products', 450.00, 349),
		('Eloquent JavaScript : A Modern Introduction to Programming', 'Books', 25.21, 789),
		('Optimum Nutrition Gold Standard Whey Protein Powder', 'Supplements', 29.99, 3000),
		('Bounty Quick-Size Paper Towels', 'Home Goods', 28.00, 4500),
		('Amazon Basics 12-Speed Blender with Glass Jar', 'Amazon Products', 21.84, 3500),
		('Beats Studio3 Wireless Over-Ear Headphones', 'Beats Products', 349.95, 2456),
		('All-Purpose Dumbbells', 'Fitness', 38.95, 1300),
		('BIC Soft Feel Ball Pen', 'School and Office Supplies', 7.50, 34526);
		