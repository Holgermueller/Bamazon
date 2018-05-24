# Bamazon

A node powered online shopping center.

To create this, you'll need to download the following node packages:

* Mysql
* Inquirer
* Colors

## See it work:

### Bamazon Customer:

1. First, run the command **node bamazonCustomer.js**.

![Image of Step one](./Images/Bam-img-1.png)

2. Node then displays the *list* of items in the databse.
3. Select which *item* you'd like to buy.

![Image for steps two and three](./Images/Bam-img-2.png)

4. Once you've selected the item you'd like to buy, enter the *quantity* you'd like to purchase.

![Image for step 4](./Images/Bam-img-3.png)

![Image for step 5](./Images/Bam-img-4.png)

5. If you there isn't enough stock to fulfill the order, this message will appear in **red**.

![image for step 6](./Images/Bam-img-5.png)

6. However, if there is enough stock to fulfill the order, this message will appear:

![image for step 7](./Images/Bam-img-6.png)

![image for conclusion](./Images/Bam-img-7.png)

7. At the same time, the quantity of the ordered item will be subtracted from the MySQL database.

![mysqlimg1](./Images/wrk-bnch-b4.png)

![mysqlimg2](./Images/wrk-bnc-after.png)