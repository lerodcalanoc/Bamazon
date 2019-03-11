var inquirer = require("inquirer");
var mysql = require("mysql");
var figlet = require("figlet");
var chalk = require("chalk");
require("dotenv").config()

var connection = mysql.createConnection({
    host: process.env.BAMAZON_HOST,
    port: 3306,
    user: process.env.BAMAZON_USER,
    password: process.env.BAMAZON_PASSWORD,
    database: 'bamazon'
})

connection.connect(function (err) {
    if (err) throw err
    validateInput()
})

var bamazonFig = "bamazon";
figlet(bamazonFig, function (err, data) {
	if (err) {
		console.log('Something went wrong...');
		console.dir(err);
		return;
    }
	console.log(chalk.keyword('orange')("Welcome to", data));
});

function displayInventory() {
    query = 'SELECT * FROM products';


    connection.query(query, function (err, data) {
        if (err) throw err;

        console.log(" Existing Inventory:");
        console.log(chalk.keyword('red')("---------------------------------------------------------------------\n"));


        for (var i = 0; i < data.length; i++) {
            var products = '';
            products += (chalk.keyword('green')(' Product ID: ' + data[i].product_id + ' | '));
            products += (chalk.keyword('green')(' Product Name: ' + data[i].product_name + ' | '));
            products += (chalk.keyword('green')(' Department: ' + data[i].department_name + ' | '));
            products += (chalk.keyword('green')(' Price: $' + data[i].price + '\n'));


            console.log(products)
        }
        console.log(chalk.keyword('red')("---------------------------------------------------------------------\n"));

        promptPurchase();
    })
}

function promptPurchase() {

    inquirer.prompt([{
            type: 'input',
            name: 'product_id',
            message: 'Please enter the item ID you would like to purchase:',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many products do you need?',
            validate: validateInput,
            filter: Number

        }

    ]).then(function (input) {

        var item = input.product_id;
        var quantity = input.quantity;

        var query = 'SELECT * FROM products WHERE ?';

        connection.query(query, {
                product_id: item
            }, function (err, data) {
                if (err) throw err;


                if (data.length === 0) {
                    console.log(chalk.keyword('red')("\n Error: Please select valid product ID!\n"));
                    displayInventory();
                } else {
                    var productData = data[0];

                    if (quantity <= productData.stock_quantity) {
                        console.log(chalk.keyword('green')('\n This product is in stock. Placing order now.\n'));

                        var updateQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE product_id = ' + item;

                        connection.query(updateQuery, function (err, data) {
                            if (err) throw err;


                            console.log(chalk.keyword('blue')(' Your total is $' + truncateNumber(productData.price * quantity, 2)));
                            console.log(chalk.keyword('blue')('\n Thank you for shopping with Bamazon!'));
                            console.log(chalk.keyword('red')("\n---------------------------------------------------------------------\n"));

                            connection.end()


                        });

                    } else {
                        console.log(chalk.keyword('green')('\n Insufficient quantity! There is not enough product in stock.\n'));
                        console.log(chalk.keyword('green')(' Please modify your order.'));
                        console.log(chalk.keyword('red')("\n---------------------------------------------------------------------\n"));

                        displayInventory();
                    }
                }

            }

        )


    })


}

function truncateNumber(num, precision) {
    var c = Math.pow(10, precision);
    return Math.trunc(num * c) / c;
}


function validateInput(val) {
    var integer = Number.isInteger(parseFloat(val));
    var sign = Math.sign(val);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole number greater than zero!'
    }

}


displayInventory();