# Bamazon

![](https://media.giphy.com/media/QH1nENuKLB5Re/giphy.gif) [Click here to watch the demo video.](https://vimeo.com/322811994)

Bamazon is an Amazon-like store front that utilizes Node.js and MySQL.
The app takes in orders from customers and depletes stock from the store's inventory.

# How the app works:
* Open the terminal and type in the command:
  `node bamazonCustomer.js`
* It will first display all of the items available for sale. Include the IDs, names, and prices of products for sale.
* The app will prompt users with two messages:

  - The first will ask them the ID of the product they would like to buy.
  
  - The second message will ask how many units of the product they would like to buy.

* Once the customer has placed the order, the app will check if the store has enough of the product to meet the customer's request.
* If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
* However, if the store does have enough of the product, it should fulfill the customer's order.
  - This means updating the SQL database to reflect the remaining quantity.
  - Once the update goes through, it show the customer the total cost of their purchase.
  
 # Technology and Packages used:
 
    Node.js

    MySQL

    Figlet

    Chalk
