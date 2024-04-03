const {Pool} = require("pg");//imports pool class from  pg library 
const express = require('express'); //imports express

const pool = new Pool({ //creates a pool to connect to database
    user: "postgres",
    password: "postgres",
    host: "database-1.chzinffvuhzb.us-east-1.rds.amazonaws.com",
    port: 5432,
    database: "aws_MemWarehouse",
    ssl: {
        rejectUnauthorized: false, // You may need to set this to true in production with a valid certificate
    },
});

//method for getting departments
const getDepartments = (req, res) => {
    const selectQuery = 'SELECT * FROM department';

    pool.query(selectQuery, (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(result)
            res.json(result.rows);
        }
    });
};

//method for getting employees
const getEmployees = (req, res) => {
    const selectQuery = 'SELECT * FROM staff limit 50';

    pool.query(selectQuery, (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(result)
            res.json(result.rows);
        }
    });
};

const getSupplierBrands = (req, res) => {
    const selectQuery = 'SELECT DISTINCT * FROM product limit 50';

    pool.query(selectQuery, (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(result)
            res.json(result.rows);
        }
    });
};

//export the methods so they can be called in server.js
module.exports = {
    getDepartments,
    getEmployees,
    getSupplierBrands,
    pool,
};