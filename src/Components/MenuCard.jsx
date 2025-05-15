import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import chick from '../assets/chick.png';
import chickss from '../assets/chickss.png';
import mutt from '../assets/mutt.png';
import muttss from '../assets/muttss.png';
import chick65 from '../assets/chick65.png';
import chicklp from '../assets/chicklp.png';
import fishfry from '../assets/fishfry.png';
import eggfryrice from '../assets/eggfryrice.png';
import chickfryrice from '../assets/chickfryrice.png';
import egggravy from '../assets/egggravy.png'; // Make sure all images exist

const API_BACKEND=import.meta.env.VITE_API_URL;

const imageMap = {
  'chicken Biryani': chick,
  'seerakasamba chicken Biryani': chickss,
  'mutton Biryani': mutt,
  'seeragasamba mutton Biryani': muttss,
  'chicken 65(6-piece)': chick65,
  'chicken lollipop(4-piece)': chicklp,
  'fish fry(2-piece)': fishfry,
  'egg fry rice': eggfryrice,
  'chicken fry rice': chickfryrice,
  'egg gravy(2-egg)': egggravy,
};

function MenuDisplay() {
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${API_BACKEND}/available-menu`)
      .then(res => setMenuItems(res.data))
      .catch(err => console.error(err));
  }, []);
  const handleAddtoCart = (item) => {
    axios.post(`${API_BACKEND}/user-menu`, {
      menu: item.item,
      qty: 1
    })
    .then(() => {
      alert(`${item.item} was added to cart`);
      addToCart({ item: item.item, price: item.price });
      
    })
    
     .catch(() => alert(` ${item.item} was not available or insufficient quantity`));
    
  };

  return (
    <div className="menu-grid">
      {menuItems.map((item, index) => (
        <div className="card" key={index}>
          <img src={imageMap[item.item]} alt={item.item} className="menu-img" />
          <h6 style={{paddingTop:'30px', paddingBottom:'20px'}}>{item.item}</h6>
          <div className="menu-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontWeight: 'bold' }}>₹{item.price}</span>
    <button onClick={() => handleAddtoCart(item)} className="add-button" style={{backgroundColor:'#c4f5b5'}}>Add</button>
  </div>
        </div>
      ))}
    </div>
  );
}

export default MenuDisplay;
