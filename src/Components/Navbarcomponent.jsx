import React, { useState } from 'react';
import titlelogo from '../assets/titlelogo.png';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';



function Navbarcomponent({cart}) {
  const navigate=useNavigate();
  const { cartItems, increaseQuantity, decreaseQuantity } = useCart();
  // const totalItem=cart.reduce((sum,item)=>sum+item.qty,0)
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  // const { cartItems } = useCart();
 
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleConformOrder=(e)=>{
    e.preventDefault();
navigate('/user-address-details')
  }
  const handleHome=(e)=>{
    e.preventDefault();
    navigate('/');
  }
  

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light px-3">
      <a className="navbar-brand d-flex align-items-center" href="#home">
        <img
          src={titlelogo}
          width="120"
          height="120"
          className="d-inline-block align-top me-2"
          alt="Shiva’s Kitchen Logo"
        />
        <span className="fw-bold" style={{ color: '#99060b', fontSize: '40px' }}>
          Shiva’s Kitchen
        </span>
      </a>

      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-controls="navbarNav"
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

     

      <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li>
          <a
              className="nav-link home-btn"
              href="#home"
              id="home"
              role="button"
              onClick={handleHome}
              aria-expanded="false"
              style={{ fontSize: 'large' }}
            >
              <b>Home</b>
            </a>
          </li>

          
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#menu"
              id="menuDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ fontSize: 'large' }}
            >
              <b>Menu</b>
            </a>
            <ul className="dropdown-menu" aria-labelledby="menuDropdown" style={{backgroundColor: '#faeec5'}}>
              {[
                'chicken Biryani',
                'seerakasamba chicken Biryani',
                'mutton Biryani',
                'seeragasamba mutton Biryani',
                'chicken 65(6-piece)',
                'chicken lollipop(4-piece)',
                'fish fry(2-piece)',
                'egg fry rice',
                'chicken fry rice',
                'egg gravy(2-egg)'
              ].map((item, index) => (
                <li key={index}>
                  <a className="dropdown-item" href="#">{item}</a>
                </li>
              ))}
            </ul>
          </li>

          {/* <li className="nav-item">
            <form className="d-flex mx-2">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </li> */}

          {/* <li className="nav-item">
            <button className="btn btn-outline-primary mx-2">Login</button>
          </li> */}

          <li className="nav-item">
            <button
              className="btn "
              style={{backgroundColor:'#2e77ff',color:'white'}}
              onClick={() => setShowCart(!showCart)}
            >
              Cart ({totalItems})
            </button>
          </li>
        </ul>
      </div>
    </nav>

    {/* CART DROPDOWN SECTION */}
    {showCart && (
  <div
    style={{
      position: 'absolute',
      right: 20,
      top: 100,
      backgroundColor: '#d5ecf5',
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '20px',
      width: '300px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      zIndex: 1000
    }}
  >
    <h5>Your Cart</h5>
    {cartItems.length === 0 ? (
      <p>No items in cart.</p>
    ) : (
      <>
        <ul className="list-group">
        {cartItems.map((item, index) => (
  <li
    key={index}
    className="list-group-item d-flex justify-content-between align-items-center"
    style={{ backgroundColor: '#d5ecf5' }}
  >
    <div style={{ flex: 1 }}>
      <strong>{item.item}</strong>
      <br />
      ₹{item.price} × {item.quantity}
    </div>

    <div className="d-flex align-items-center">
      <button
        className="btn btn-sm btn-outline-secondary mx-1"
        onClick={() => decreaseQuantity(item.item)}
        style={{backgroundColor:'#fa9684'}}
      >
        −
      </button>
      <span>{item.quantity}</span>
      <button
        className="btn btn-sm btn-outline-secondary mx-1"
        onClick={() => increaseQuantity(item.item)}
        style={{backgroundColor:'#a4f5c0'}}
      >
        +
      </button>
    </div>

    <span>₹{item.price * item.quantity}</span>
  </li>
))}
        </ul>
        <p className="mt-3 text-end fw-bold">
          Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
        </p>
        <button
      className="btn btn-sm btn-outline-primary mt-3 ms-2"
      style={{ color: 'black', backgroundColor: '#a4f5c0' }}
      onClick={handleConformOrder}
    >
      Confirm Order
    </button>
      </>
    )}
    <button
      className="btn btn-sm btn-secondary mt-3"
      style={{ color: 'black', backgroundColor: '#fa9684' }}
      onClick={() => setShowCart(false)}
    >
      Close
    </button>
    
  </div>
)}
  </>
  );
}

export default Navbarcomponent;
