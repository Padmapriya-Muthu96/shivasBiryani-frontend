import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  
//For to add card items to the cart
  const addToCart = (item) => {
    const existingItem = cartItems.find(i => i.item === item.item);
    if (existingItem) {
      setCartItems(prev =>
        prev.map(i =>
          i.item === item.item ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };
//For implement to increase item quantity in cart
  const increaseQuantity=(itemName)=>{
    setCartItems(prevItems=>
      prevItems.map(item=>
        item.item===itemName?{...item,quantity:item.quantity+1}:item
      )
    )
  }
//For implement to decrease item quantity in cart
  const decreaseQuantity=(itemName)=>{
    setCartItems(prevItems=>
      prevItems.map(item=>
        item.item===itemName?{...item,quantity:item.quantity-1}:item
      )
      .filter(item=>item.quantity>0)
    )
  }
  return (
    <CartContext.Provider value={{ cartItems,setCartItems, addToCart, increaseQuantity,decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
