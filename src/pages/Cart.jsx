import { useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../context/store.context";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    totalQuantities,
    setShowCart,
    incQty,
    decQty,
    qty,
    setCartItems,
    toggleCartItemQuantity,
  } = useContext(storeContext);
  console.log(cartItems);

  const { storedToken } = useContext(AuthContext);
  console.log(storedToken);
  let carto = localStorage.getItem("cart");
  carto = JSON.parse(carto);
  console.log(carto);
  // setCartItems(carto);
  let price = 0;
  console.log(price);
  const cartRef = useRef();
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        {/* <button type="submit" onClick={setShowCart(false)}></button> */}

        {carto.length < 1 && (
          <div>
            <p>Shopping Cart is currently empty</p>{" "}
            <Link to={"/"}>Go buy something</Link>
          </div>
        )}
        <div className="product-container">
          {carto.length >= 1 &&
            carto.map((place, index) => {
              console.log(place);
              return (
                <div key={index}>
                  <div
                    className="placeImg"
                    style={{
                      width: "300px",
                      height: "230px",
                      padding: "5px",
                      backgroundImage: `url(${place.url})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "10px",
                    }}
                  ></div>
                  <h1>{place.name}</h1>
                  <div style={{ display: "flex" }}>
                    <button
                      style={{ width: 25, height: 25 }}
                      onClick={() => toggleCartItemQuantity(place._id, "dec")}
                    >
                      -
                    </button>
                    <span>{place.quantity}</span>
                    <button
                      style={{ width: 25, height: 25 }}
                      onClick={() => toggleCartItemQuantity(place._id, "inc")}
                    >
                      +
                    </button>
                  </div>
                  <h1>{place.price}</h1>
                </div>
              );
            })}
        </div>
      </div>
      <div class="shopping-cost">
        {carto.forEach((item) => {
          return (price += item.price * item.quantity);
        })}

        {/* {totalPrice} */}
        <p>{price}</p>
      </div>
      <div class="shopping-links">
        <Link to={"/"}>Go back to shopping</Link>
        <Link to={"/shipping"}>Continue to Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;
