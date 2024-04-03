const cors = require("cors"); //imports cors
const express = require("express"); //imports express
const { getDepartments } = require("./database"); //imports getData function from database.js
const { getEmployees } = require("./database"); //imports getEmployees function from database.js
const { pool } = require("./database"); //imports pool (database) from database.js
const { getSupplierBrands } = require("./database") ////imports getSupplierBrands function from database.js

const app = express();// Adding middleware to parse incoming JSON data

app.use(express.json())
app.use(cors())

//define port for web server to run on
const port = 3001;
// New route for handling employees in the staff page
app.get('/api/staff/employees', async (req, res) => {
  try {
      const employees = await getEmployees(req, res);
      res.json(employees);
  } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/searchProduct', async (req, res) => {
  const { query } = req.query;
  const searchQuery = 'SELECT * FROM product WHERE itemnumber = $1';

  try {
    // Convert itemNumber to an integer if needed

    // Execute the query with the integer parameter
    const result = await pool.query(searchQuery, [query]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing search query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/searchPharmacy', async (req, res) => {
    const { query } = req.query;
    const departmentName = 'pharmacy';
    const searchQuery = 'SELECT * FROM product WHERE departmentname = $1 AND type ILIKE $2';
    
    try {
      const result = await pool.query(searchQuery, [departmentName, `%${query}%`]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing search query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.get('/api/searchFurniture', async (req, res) => {
    const { query } = req.query;
    const departmentName = 'furniture';
    const searchQuery = 'SELECT * FROM product WHERE departmentname = $1 AND type ILIKE $2';
    
    try {
      const result = await pool.query(searchQuery, [departmentName, `%${query}%`]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing search query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.get('/api/searchHomeAppliances', async (req, res) => {
    const { query } = req.query;
    const departmentName = 'home appliances';
    const searchQuery = 'SELECT * FROM product WHERE departmentname = $1 AND type ILIKE $2';
    
    try {
      const result = await pool.query(searchQuery, [departmentName, `%${query}%`]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing search query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.get('/api/searchGrocery', async (req, res) => {
    const { query } = req.query;
    const departmentName = 'grocery';
    const searchQuery = 'SELECT * FROM product WHERE departmentname = $1 AND type ILIKE $2';
    
    try {
      const result = await pool.query(searchQuery, [departmentName, `%${query}%`]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing search query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.get('/api/searchClothing', async (req, res) => {
    const { query } = req.query;
    const departmentName = 'clothing';
    const searchQuery = 'SELECT * FROM product WHERE departmentname = $1 AND type ILIKE $2';
    
    try {
      const result = await pool.query(searchQuery, [departmentName, `%${query}%`]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing search query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//brody
app.get('/api/signUp', async (req, res) => {
  const { signMID } = req.query;
  const { signName } = req.query;
  const { signNumber } = req.query;
  const { signAddress } = req.query;
  const { signMembership } = req.query;
  const { signSID } = req.query;
  const insertQuery = 'INSERT INTO member (memberid, name, phonenumber, address, memberstatus, storenumber) VALUES($1, $2, $3, $4, $5, $6)';
  
  console.log('Inserting tuple into table "member": ', signMID, signName, signNumber, signAddress, signMembership, signSID);

  try {
    const result = await pool.query(insertQuery, [`${signMID}`, `${signName}`, `${signNumber}`, `${signAddress}`, `${signMembership}`, `${signSID}`]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing sign up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/logIn', async (req, res) => {
  const { loginMID } = req.query;
  const { loginName } = req.query;
  const selQuery = 'SELECT * FROM member WHERE memberid = $1 AND name = $2';
  
  console.log('Searching member for user: ', loginMID, loginName);

  try {
    const result = await pool.query(selQuery, [`${loginMID}`, `${loginName}`]);
    res.json(result.rows);
    console.log(result.rows);
  } catch (error) {
    console.error('Error executing sign up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//end of brody code

app.get('/api/getSupplierBrands', getSupplierBrands);
app.get('/api/getDepartments', getDepartments);// Defining a route for handling GET requests to the '/api/getDepartments' endpoint
app.get('/api/getEmployees', getEmployees);// Defining a route for handling GET requests to the '/api/getEmployees' endpoint

// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
