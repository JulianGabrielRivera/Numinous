// manage state of application

import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
const storeContext = React.createContext();

function StoreProviderWrapper({ children }) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const setProducts = () => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
  };
  setProducts();
  let localCart = localStorage.getItem("cart");

  useEffect(() => {
    //turn it into js
    localCart = JSON.parse(localCart);
    //load persisted cart into state if it exists
    if (localCart) setCartItems(localCart);
  }, []);

  // setProducts();
  // let cart = JSON.parse(localStorage.getItem("cart"));
  // const addItemtoLocalStorageCart = (placeId, quantity) => {
  //   let place = places.find((place) => {
  //     return (place.id = placeId);
  //   });
  //   const addNewPlace = { ...place, quantity };

  //   if (cart.length == 0) {
  //     cart.push(addNewPlace);
  //   } else {
  //     if (place) {
  //       cart.map((item) => {
  //         return { ...item, quantity: item.quantity + quantity };
  //       });
  //     }
  //   }

  //   console.log(cart);
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };

  let foundPlace;
  let index;
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

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
    const foundPlaceInCart = cartItems.find((item) => {
      console.log(item);
      return place._id === item._id;
    });
    console.log(foundPlaceInCart);
    console.log(quantity);
    setTotalQuantities(
      (prevTotalQuantities) => +prevTotalQuantities + quantity
    );
    setTotalPrice((prevTotalPrice) => prevTotalPrice + place.price * quantity);
    if (foundPlaceInCart) {
      let updatedCart = [...cartItems];
      console.log(updatedCart);
      updatedCart.forEach((cartItem) => {
        if (cartItem._id === place._id) {
          cartItem.quantity += quantity;
        }
      });
      setCartItems(updatedCart);
      // const updatedCart = cartItems.map((cartItem) => {
      //   console.log(cartItem.name, place.name);
      //   if (cartItem._id === place._id)
      //     return {
      //       ...cartItem,
      //       quantity: cartItem.quantity + quantity,
      //     };

      // future session cart maybe
      // console.log(cartItems);

      // console.log(cartItems[0].price);
      // axios
      //   .post(
      //     `${APIURL}/api/cartitems`,
      //     { cartItems: cartItems },
      //     {
      //       headers: { Authorization: `Bearer ${storedToken}` },
      //     }
      //   )
      //   .then((response) => {
      //     console.log(response);
      //   });
    } else {
      place.quantity = quantity;
      console.log(place);
      setCartItems([...cartItems, place]);
      // future session cart maybe

      //   axios
      //     .post(`${APIURL}/api/cartitems`, cartItems, {
      //       headers: { Authorization: `Bearer ${storedToken}` },
      //     })
      //     .then((response) => {
      //       console.log(response);
      //     });
      // }

      setQty(1);
    }
  };
  console.log(totalQuantities);
  let stringCart = JSON.stringify(cartItems);
  localStorage.setItem("cart", stringCart);

  const toggleCartItemQuantity = (id, value) => {
    foundPlace = cartItems.find((item) => id === item._id);
    index = cartItems.findIndex((place) => place._id === id);

    // const newCartItems = cartItems.filter((item) => item._id !== id);
    if (value === "inc") {
      if (foundPlace) {
        foundPlace.quantity += 1;
      }
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundPlace.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundPlace.quantity > 1 && foundPlace) {
        foundPlace.quantity -= 1;
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundPlace.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  return (
    <storeContext.Provider
      value={{
        showCart,
        cartItems,
        setCartItems,
        setTotalPrice,
        totalPrice,
        totalQuantities,
        qty,
        decQty,
        incQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,

        // addItemtoLocalStorageCart,
      }}
    >
      {/* wraps everything(all our components)with our context provider */}
      {children}
    </storeContext.Provider>
  );
}

export { StoreProviderWrapper, storeContext };
