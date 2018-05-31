USE bamazon_db;

CREATE TABLE departments (
    department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(255),
    over_head_costs INTEGER DEFAULT 0,
    product_sales INTEGER DEFAULT 0,
    total_profit INTEGER DEFAULT 0,
    PRIMARY KEY (department_id)
);