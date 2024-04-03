import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);//for fetching departments
  const [employees, setEmployees] = useState([]);//for fetching employees
  const [currentPage, setCurrentPage] = useState('home');//page for home

  //New
  const [combinedProductCart, setCombinedProductCart] = useState([]);

  const [searchInputProduct, setSearchInputProduct] = useState('');//search input for grocery
  const [searchResultsProduct, setSearchResultsProduct] = useState([]);//search results for grocery
  //End New 

  const [searchInputGrocery, setSearchInputGrocery] = useState('');//search input for grocery
  const [searchResultsGrocery, setSearchResultsGrocery] = useState([]);//search results for grocery

  const [searchInputClothing, setSearchInputClothing] = useState('');//search input for grocery
  const [searchResultsClothing, setSearchResultsClothing] = useState([]);//search results for grocery

  const [searchInputHA, setSearchInputHA] = useState('');//search input for home appliances
  const [searchResultsHA, setSearchResultsHA] = useState([]);//search results for home appliances

  const [searchInputFurniture, setSearchInputFurniture] = useState('');//search input for furniture
  const [searchResultsFurniture, setSearchResultsFurniture] = useState([]);//search results for furniture

  const [searchInputPharmacy, setSearchInputPharmacy] = useState('');//search input for pharmacy
  const [searchResultsPharmacy, setSearchResultsPharmacy] = useState([]);//search results for pharmacy

  const [supplierBrands, setSupplierBrands] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  //brody code
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [signMID, setSignMID] = useState('');
  const [signName, setSignName] = useState('');
  const [signNumber, setSignNumber] = useState('');
  const [signAddress, setSignAddress] = useState('');
  const [signMembership, setSignMembership] = useState('');
  const [signSID, setSignSID] = useState('');
  
  const [loginMID, setLoginMID] = useState('');
  const [loginName, setLoginName] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [currentMID, setCurrentMID] = useState('');
  const [currentName, setCurrentName] = useState('');
  const [currentNumber, setCurrentNumber] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentMembership, setCurrentMembership] = useState('');
  const [currentSID, setCurrentSID] = useState('');
  //end of Brody code

  const sortedEmployees = employees.sort((a, b) => a.jobtitle.localeCompare(b.jobtitle));

  const handleViewProfilePage = () => {
    navigateTo('ViewProfile');
  };

  const handleSearchGrocery = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/searchGrocery?query=${searchInputGrocery}`);
      const result = await response.json();
      setSearchResultsGrocery(result);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleSearchClothing = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/searchClothing?query=${searchInputClothing}`);
      const result = await response.json();
      setSearchResultsClothing(result);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleSearchHomeAppliances = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/searchHomeAppliances?query=${searchInputHA}`);
      const result = await response.json();
      setSearchResultsHA(result);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleSearchFurniture = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/searchFurniture?query=${searchInputFurniture}`);
      const result = await response.json();
      setSearchResultsFurniture(result);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleSearchPharmacy = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/searchPharmacy?query=${searchInputPharmacy}`);
      const result = await response.json();
      setSearchResultsPharmacy(result);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleSearchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/searchProduct?query=${searchInputProduct}`);
      const result = await response.json();

// Check if the result array is not empty
if (result && result.length > 0) {
  setCombinedProductCart((prevCombinedProductCart) => [...prevCombinedProductCart, ...result]);
  setSearchResultsProduct(result);
} else {
  // Handle the case where there are no search results
  console.log('No search results found.');
}
      //setCombinedProductCart((prevCombinedProductCart) => [...prevCombinedProductCart, ...result]);
      //setSearchResultsProduct(result);
      
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const fetchData = async (endpoint) => {
    try {
      console.log(`Fetching data from: /api/${endpoint}`);
      const response = await fetch(`http://localhost:3001/api/${endpoint}`);
      const result = await response.json();

      if (endpoint === 'getDepartments') {
        console.log('Departments from server:', result);
        setData(result);
      } else if (endpoint === 'getEmployees') {
        console.log('Employees from server:', result);
        setEmployees(result);
      } else if (endpoint === 'getSupplierBrands') {
        console.log('SupplierBrands from server:', result);
        setSupplierBrands(result);
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  //to delete items from cart in main screen
  const handleItemClick = (selectedProductId) => {
    // Remove the selected product from the array
    const updatedProductStrings = combinedProductCart.filter(
      (product) => product.itemnumber !== selectedProductId
    );
  
    // Set the state with the updated array
    setCombinedProductCart(updatedProductStrings);
  
    // If needed, you can use the updated array in other parts of your application
  };

  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    navigateTo('supplierBrands'); // Change to 'supplierBrands' to navigate to the new page
  };

  const handleSwitchToGrocery = () => {
    navigateTo('GrocerySearch');
  };

  const handleSwitchToClothing = () => {
    navigateTo('ClothingSearch');
  };

  const handleSwitchToHA = () => {
    navigateTo('HomeAppliancesSearch');
  };

  const handleSwitchToFurniture = () => {
    navigateTo('FurnitureSearch');
  };

  const handleSwitchToPharmacy = () => {
    navigateTo('PharmacySearch');
  };

  const handleReturn = () => {
    navigateTo('home');
  };

  const handleSwitchToContactUs = () => {
    navigateTo('ContactUs');
  };

  const handleSwitchToStaff = () => {
    navigateTo('Staff');
  };

  useEffect(() => {
    if (currentPage === 'supplierBrands') {
      fetchData('getSupplierBrands');
    }
  }, [currentPage, selectedSupplier]);

  useEffect(() => {
    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/getEmployees');
            const result = await response.json();
            setEmployees(result);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    fetchEmployees();
}, []);

//brody
const handleSignUpPage = () => {
  navigateTo('SignUp');
};

const handleLogInPage = () => {
  navigateTo('LogIn');
};


const handleSignUpAction = async () => {
  try {
    console.log(`Adding tuple to: /api/signUp`);
    const response = await fetch(`http://localhost:3001/api/signUp?signMID=${signMID}&signName=${signName}&signNumber=${signNumber}&signAddress=${signAddress}&signMembership=${signMembership}&signSID=${signSID}`);
    const result = await response.json();

    navigateTo('home');
  } catch (error) {
    console.error('Error Signing Up:', error);
  }
};

const handleLogInAction = async () => {
  try {
    console.log(`Adding tuple to: /api/logIn`);
    const response = await fetch(`http://localhost:3001/api/logIn?loginMID=${loginMID}&loginName=${loginName}`);
    const result = await response.json();

    console.log('User from server:', result);
    setCurrentUser(result);

    navigateTo('home');
  } catch (error) {
    console.error('Error Signing Up:', error);
  }
};

//end of brody code

  const renderContent = () => {
    if (currentPage === 'home') {
      return (
<div>
<header className="maroon-header">
<img src="/SUNCO.png" alt="Sun Co Logo" className="logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
        <h1>Sun Co</h1>
      </header>

        <div class="container">

        <div class="left-section">
          <p><strong>More Information:</strong></p>
          <button class="switch-page-button" onClick={handleSwitchToContactUs}>
            Contact Us
          </button>
          <button class="switch-page-button" onClick={handleSwitchToStaff}>
            Staff
          </button>
          <p><strong>View our Suppliers:</strong></p>
          <button class="switch-page-button" onClick={() => handleSelectSupplier('Cloud')}>
            Cloud
          </button>
          <button class="switch-page-button" onClick={() => handleSelectSupplier('Nestle')}>
            Nestle
          </button>
        </div>
      
        <div class="center-section">
          <button class="department-search-button" onClick={handleSwitchToGrocery}>
            Grocery Search
          </button>
          <button class="department-search-button" onClick={handleSwitchToClothing}>
            Clothing Search
          </button>
          <button class="department-search-button" onClick={handleSwitchToHA}>
            Home Appliances Search
          </button>
          <button class="department-search-button" onClick={handleSwitchToFurniture}>
            Furniture Search
          </button>
          <button class="department-search-button" onClick={handleSwitchToPharmacy}>
            Pharmacy Search
          </button>
        </div>
      
        <div class="right-section">
          <button class="switch-page-button" onClick={handleLogInPage}>
            Log In
          </button>
          <button class="switch-page-button" onClick={handleSignUpPage}>
            Sign Up
          </button>
          <button className="switch-page-button" onClick={handleViewProfilePage}>
            View Profile
          </button>
      
          <div class="data-list">
            <h2>Shopping Cart:</h2>
            {combinedProductCart.map((result) => (
              <li key={result.id} onClick={() => handleItemClick(result.itemnumber)} style={{ cursor: 'pointer' }}>
                <strong>Name:</strong> {result.name}, <strong>Brand:</strong> {result.brand} <strong>ID:</strong> {result.itemnumber}
              </li>
            ))}
          </div>
        </div>
      
      </div>
      </div>
      );
    } else if (currentPage === 'GrocerySearch') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#D3D3D3' }}>
  <h2>Grocery Department Search</h2>

  <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
    {/* Left Column */}
    <div className="left-column">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter search term..."
          value={searchInputGrocery}
          onChange={(e) => setSearchInputGrocery(e.target.value)}
        />
        <button className = 'search-button' onClick={handleSearchGrocery}>Search</button>
      </div>

      <p className="search-hint">
        <strong>Search Terms:</strong> dairy, produce, frozen, canned foods, snacks, meat. Or press 'Search' with an empty search bar to view all department products.
      </p>

      <ul className="data-list">
        {searchResultsGrocery.map((result) => (
          <li key={result.id}>
            <strong>Name:</strong> {result.name}, <strong>Brand:</strong> {result.brand}, <strong>ID:</strong> {result.itemnumber}
          </li>
        ))}
      </ul>

      <div>
        <button className="return-button" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>

    {/* Right Column */}
    <div className="right-column">
      <div className="search-bar2">
        <input
          type="text"
          placeholder="Enter product number..."
          value={searchInputProduct}
          onChange={(e) => setSearchInputProduct(e.target.value)}
        />
        <button classname = 'return-button' onClick={handleSearchProduct}>Add To Cart</button>
      </div>

      <ul className="data-list">
        {searchResultsProduct.map((result) => (
          <li key={result.id}>
            Success, added {result.name} ID: {result.itemnumber}
          </li>
        ))}
      </ul>

      <h2>Shopping Cart:</h2>
      <ul className="data-list">
        {combinedProductCart.map((result) => (
          <li key={result.id}>
            <strong>ID:</strong> {result.itemnumber} <strong>Name:</strong> {result.name} <strong>Quantity:</strong> {result.quantity}
          </li>
        ))}
      </ul>
    </div>
  </div>
  <Footer />
</div>

      );
    } else if (currentPage === 'ClothingSearch') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#D3D3D3' }}>
  <h2>Clothing Department Search</h2>

  <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
    {/* Left Column */}
    <div className="left-column">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter search term..."
          value={searchInputClothing}
          onChange={(e) => setSearchInputClothing(e.target.value)}
        />
        <button className = 'search-button' onClick={handleSearchClothing}>Search</button>
      </div>

      <p className="search-hint">
        <strong>Search Terms:</strong> shoes, shirts, hats, pants, belts, bags. Or press 'Search' with an empty search bar to view all department products.
      </p>

      <ul className="data-list">
        {searchResultsClothing.map((result) => (
          <li key={result.id}>
            <strong>Name:</strong> {result.name}, <strong>Brand:</strong> {result.brand}, <strong>ID:</strong> {result.itemnumber}
          </li>
        ))}
      </ul>

      <div>
        <button className="return-button" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>

    {/* Right Column */}
    <div className="right-column">
      <div className="search-bar2">
        <input
          type="text"
          placeholder="Enter product number..."
          value={searchInputProduct}
          onChange={(e) => setSearchInputProduct(e.target.value)}
        />
        <button classname = 'return-button' onClick={handleSearchProduct}>Add To Cart</button>
      </div>

      <h2>Shopping Cart:</h2>
      <ul className="data-list">
        {combinedProductCart.map((result) => (
          <li key={result.id}>
            <strong>ID:</strong> {result.itemnumber} <strong>Name:</strong> {result.name} <strong>Quantity:</strong> {result.quantity}
          </li>
        ))}
      </ul>
    </div>
  </div>
  <Footer />
</div>
      );
    } else if (currentPage === 'HomeAppliancesSearch') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#D3D3D3' }}>
  <h2>Home Appliances Department Search</h2>

  <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
    {/* Left Column */}
    <div className="left-column">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter search term..."
          value={searchInputHA}
          onChange={(e) => setSearchInputHA(e.target.value)}
        />
        <button className = 'search-button' onClick={handleSearchHomeAppliances}>Search</button>
      </div>

      <p className="search-hint">
        <strong>Search Terms:</strong> laundry, cleaning supplies, hardware, kitchenware, toiletries. Or press 'Search' with an empty search bar to view all department products.
      </p>

      <ul className="data-list">
        {searchResultsHA.map((result) => (
          <li key={result.id}>
            <strong>Name:</strong> {result.name}, <strong>Brand:</strong> {result.brand}, <strong>ID:</strong> {result.itemnumber}
          </li>
        ))}
      </ul>

      <div>
        <button className="return-button" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>

    {/* Right Column */}
    <div className="right-column">
      <div className="search-bar2">
        <input
          type="text"
          placeholder="Enter product number..."
          value={searchInputProduct}
          onChange={(e) => setSearchInputProduct(e.target.value)}
        />
        <button classname = 'return-button' onClick={handleSearchProduct}>Add To Cart</button>
      </div>

      <h2>Shopping Cart:</h2>
      <ul className="data-list">
        {combinedProductCart.map((result) => (
          <li key={result.id}>
            <strong>ID:</strong> {result.itemnumber} <strong>Name:</strong> {result.name} <strong>Quantity:</strong> {result.quantity}
          </li>
        ))}
      </ul>
    </div>
  </div>
  <Footer />
</div>

      );
    } else if (currentPage === 'FurnitureSearch') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#D3D3D3' }}>
  <h2>Furniture Department Search</h2>

  <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
    {/* Left Column */}
    <div className="left-column">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter search term..."
          value={searchInputFurniture}
          onChange={(e) => setSearchInputFurniture(e.target.value)}
        />
        <button className = 'search-button' onClick={handleSearchFurniture}>Search</button>
      </div>

      <p className="search-hint">
        <strong>Search</strong> Terms: couch, bed, table, chair, bedding, desk, mattress. Or press 'Search' with an empty search bar to view all department products.
      </p>

      <ul className="data-list">
        {searchResultsFurniture.map((result) => (
          <li key={result.id}>
            <strong>Name:</strong> {result.name}, <strong>Brand:</strong> {result.brand}, <strong>ID:</strong> {result.itemnumber}
          </li>
        ))}
      </ul>

      <div>
        <button className="return-button" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>

    {/* Right Column */}
    <div className="right-column">
      <div className="search-bar2">
        <input
          type="text"
          placeholder="Enter product number..."
          value={searchInputProduct}
          onChange={(e) => setSearchInputProduct(e.target.value)}
        />
        <button classname = 'return-button' onClick={handleSearchProduct}>Add To Cart</button>
      </div>

      <h2>Shopping Cart:</h2>
      <ul className="data-list">
        {combinedProductCart.map((result) => (
          <li key={result.id}>
            <strong>ID:</strong> {result.itemnumber} <strong>Name:</strong> {result.name} <strong>Quantity:</strong> {result.quantity}
          </li>
        ))}
      </ul>
    </div>
  </div>
  <Footer />
</div>

      );
    } else if (currentPage === 'PharmacySearch') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#D3D3D3', minHeight: '100vh' }}>
  <h2>Pharmacy Department Search</h2>

  <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
    {/* Left Column */}
    <div className="left-column">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter search term..."
          value={searchInputPharmacy}
          onChange={(e) => setSearchInputPharmacy(e.target.value)}
        />
        <button className = 'search-button' onClick={handleSearchPharmacy}>Search</button>
      </div>

      <p className="search-hint">
        <strong>Search Terms:</strong> over-the-counter, patches, vitamins, topicals. Or press 'Search' with an empty search bar to view all department products.
      </p>

      <ul className="data-list">
        {searchResultsPharmacy.map((result) => (
          <li key={result.id}>
            <strong>Name:</strong> {result.name}, <strong>Brand:</strong> {result.brand}, <strong>ID:</strong> {result.itemnumber}
          </li>
        ))}
      </ul>

      <div>
        <button className="return-button" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>

    {/* Right Column */}
    <div className="right-column">
      <div className="search-bar2">
        <input
          type="text"
          placeholder="Enter product number..."
          value={searchInputProduct}
          onChange={(e) => setSearchInputProduct(e.target.value)}
        />
        <button classname = 'return-button' onClick={handleSearchProduct}>Add To Cart</button>
      </div>

      <h2>Shopping Cart:</h2>
      <ul className="data-list">
        {combinedProductCart.map((result) => (
          <li key={result.id}>
            <strong>ID:</strong> {result.itemnumber} <strong>Name:</strong> {result.name} <strong>Quantity:</strong> {result.quantity}
          </li>
        ))}
      </ul>
    </div>
  </div>
  <Footer />
</div>

      );
    } else if (currentPage === 'supplierBrands') {
      return (
        <div>
          <h2>{selectedSupplier}'s Brands</h2>
          <button className="return-button" onClick={() => setCurrentPage('home')}>
            Back to Home
          </button>
          <ul className="data-list">
            {supplierBrands
              .filter((brand) => brand.suppliername === selectedSupplier)
              .map((brand) => (
                <li key={brand.id}>{brand.brand}</li>
              ))}
          </ul>
        </div>
      );
    } else if (currentPage === 'ContactUs') {
      return (
        <div>
          <h2> </h2>
          {
            <div className="contact-us-section">
              <h2>Contact Us</h2>
              <p>Store's Number: +1 (123) 456-7890</p>
              <p>Store's Address: 123 Main Street, Cityville</p>
            </div>
          }
          <button className="return-button" onClick={handleReturn}>
            Return
          </button>
        </div>
      );
    } else if (currentPage === 'Staff') {
      return (
        <div>
          <h2>Staff Page</h2>
            <ul className="employees-list">
                {employees.map((employee) => (
                    <li key={employee.id}>
                      {employee.name} - {employee.jobtitle}
                      </li>
                ))}
            </ul>
            <button onClick={handleReturn}>Go Back</button>
        </div>
      );
    } else if (currentPage === 'LogIn') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#D3D3D3' }}>
        <h2>Log In as a Member</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
          {/* Left Column */}
            <div className="left-column">
            <h2><button className="return-button" onClick={handleReturn}>
            Return
          </button></h2>
          <h2>  </h2>
          <div className="signUp-Phone">
            <input
              type="text"
              placeholder="Member ID"
              value={loginMID}
              onChange={(e) => setLoginMID(e.target.value)}
            />
          </div>
          <div className="signUp-Phone">
            <input
              type="text"
              placeholder="Full Name"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
          </div>
          <button className="signUpButton" onClick={handleLogInAction}>
            Log In
          </button>
          <h2>  </h2>
            </div>

          {/* Right Column */}
            <div className="right-column">

            </div>
        </div>
        <Footer />
        </div>
      );
    } else if (currentPage === 'SignUp') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#D3D3D3' }}>
        <h2>Sign Up For a Membership</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
          {/* Left Column */}
            <div className="left-column">
            <h2><button className="return-button" onClick={handleReturn}>
            Return
          </button></h2>
          <h2>  </h2>
            <div classname="signUpInputs">
            <div className="signUp-MID">
              <input
                type="text"
                placeholder="Member ID"
                value={signMID}
                onChange={(e) => setSignMID(e.target.value)}
              />
            </div>
            <div className="signUp-Name">
              <input
                type="text"
                placeholder="Name"
                value={signName}
                onChange={(e) => setSignName(e.target.value)}
              />
            </div>
            <div className="signUp-Phone">
              <input
                type="text"
                placeholder="Phone Number"
                value={signNumber}
                onChange={(e) => setSignNumber(e.target.value)}
              />
            </div>
            <div className="signUp-Address">
              <input
                type="text"
                placeholder="Address"
                value={signAddress}
                onChange={(e) => setSignAddress(e.target.value)}
              />
            </div>
            <div className="signUp-Membership">
              <input
                type="text"
                placeholder="Membership Status"
                value={signMembership}
                onChange={(e) => setSignMembership(e.target.value)}
              />
            </div>
            <div className="signUp-SID">
              <input
                type="text"
                placeholder="Store Number"
                value={signSID}
                onChange={(e) => setSignSID(e.target.value)}
              />
            </div>
          </div>
          <button className="signUpButton" onClick={handleSignUpAction}>
            Sign Up
          </button>
          <h2>  </h2>
            </div>

          {/* Right Column */}
            <div className="right-column">

            </div>
        </div>
        <Footer />
        </div>
      );
    } else if (currentPage === 'ViewProfile') {
      if (currentUser.length === 0)
      {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#D3D3D3' }}>
        <h2>View Your Profile Information</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
          {/* Left Column */}
            <div className="left-column">
              <h2>
              <button className="return-button" onClick={handleReturn}>
                Return
              </button>
              </h2>
              You are not signed in. Sign in or create an account to view your info.
              <h2>
               <button className="switch-page-button" onClick={handleSignUpPage}>
                  Sign Up
               </button>
          
                <button className="switch-page-button" onClick={handleLogInPage}>
                  Log In
                </button>
              </h2>
            </div>
          {/* Right Column */}
            <div className="right-column">

            </div>
        </div>
        <Footer />
        </div>
        );
      }
      else{
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#D3D3D3' }}>
        <h2>View Your Profile Information</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
          {/* Left Column */}
            <div className="left-column">
            <ul className="data-list">
        {currentUser.map((result) => (
          <li key={result.id}>
            <strong>Name: </strong> {result.name}
          </li>
        ))}
      </ul>
      <ul className="data-list">
        {currentUser.map((result) => (
          <li key={result.id}>
            <strong>Phone Number: </strong> {result.phonenumber}
          </li>
        ))}
      </ul>
      <ul className="data-list">
        {currentUser.map((result) => (
          <li key={result.id}>
            <strong>Address: </strong> {result.address}
          </li>
        ))}
      </ul>
      <ul className="data-list">
        {currentUser.map((result) => (
          <li key={result.id}>
            <strong>Membership Status: </strong> {result.memberstatus}
          </li>
        ))}
      </ul>
      <ul className="data-list">
        {currentUser.map((result) => (
          <li key={result.id}>
            <strong>Member ID: </strong> {result.memberid}
          </li>
        ))}
      </ul>
      <ul className="data-list">
        {currentUser.map((result) => (
          <li key={result.id}>
            <strong>Store ID: </strong> {result.storenumber}
          </li>
        ))}
      </ul>
      <button className="return-button" onClick={handleReturn}>
            Return
          </button>
        </div>
          {/* Right Column */}
            <div className="right-column">

            </div>
        </div>
        <Footer />
        </div>
      )};
    }
    //End of New Brody Code

  };

  return <>{renderContent()}</>;
};
//New
const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#8c1d40', padding: '20px', color: '#fff', textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '350px' }}>
      <img src="/SUNCO.png" alt="Company Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
      <span style={{ fontWeight: 'bold', fontSize: '36px', color: 'black' }}>SUN CO</span>
    </footer>
  );
};
//End New
export default App;