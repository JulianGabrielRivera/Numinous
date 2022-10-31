import { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { storeContext } from "../context/store.context";
const Cart = () => {
  const { cartItems, totalPrice, totalQuantities, setShowCart } =
    useContext(storeContext);
  console.log(cartItems);
  const cartRef = useRef();
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="submit" onClick={setShowCart(false)}></button>

        {cartItems.length < 1 && (
          <div>
            <p>Shopping Cart is currently empty</p>{" "}
            <Link to={"/"}>Go buy something</Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((place, index) => {
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
                  <h1>{place.price}</h1>
                  <p>{totalPrice}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
