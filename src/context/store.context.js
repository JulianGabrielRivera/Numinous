// manage state of application

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const storeContext = createContext();

function StoreProviderWrapper({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(1);
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  console.log(cartItems);
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 <= 1) {
        return 1;
      } else {
        return prevQty - 1;
      }
    });
  };
  const onAdd = (place, quantity) => {
    const foundPlaceInCart = cartItems.find((item) => place._id === item._id);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + place.price * quantity);
    if (foundPlaceInCart) {
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem._id === place._id)
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
      });
      setCartItems(updatedCart);
    } else {
      place.quantity = quantity;
      setCartItems([...cartItems, { ...place }]);
    }
  };

  return (
    <storeContext.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        decQty,
        incQty,
        onAdd,
        setShowCart,
      }}
    >
      {/* wraps everything(all our components)with our context provider */}
      {children}
    </storeContext.Provider>
  );
}

export { StoreProviderWrapper, storeContext };
