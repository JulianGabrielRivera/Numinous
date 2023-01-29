import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { storeContext } from "../context/store.context";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ShippingInfoPage() {
  const navigate = useNavigate();
  const { cartItems, setCartItems, totalPrice, setTotalPrice } =
    useContext(storeContext);
  const { storedToken } = useContext(AuthContext);

  //   Modal stuff
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateAddress1 = (e) => setAddress1(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateZipcode = (e) => setZipcode(+e.target.value);
  const updatePhoneNumber = (e) => setPhoneNumber(+e.target.value);

  const submitForm = (e) => {
    e.preventDefault();

    const addressObject = {
      firstName,
      lastName,
      addressLine1: address1,
      city,
      state,
      zipCode: zipcode,
      phoneNumber,
    };

    console.log(totalPrice);
    console.log(addressObject);
    const authToken = localStorage.getItem("authToken");
    console.log(cartItems);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/new-order`,
        { cartItems, addressObject, totalPrice },
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        navigate("/past-orders");
      })
      .catch((err) => console.log(err));

    setCartItems([]);
    setTotalPrice(0);
  };

  const confirmation = () => {
    toast("order confirmed");
  };

  return (
    <>
      <div className="checkoutContainer">
        <form className="checkoutForm" onSubmit={submitForm}>
          <div>
            <h3> Shipping details</h3>

            <label>First Name</label>
            <input type="text" value={firstName} onChange={updateFirstName} />

            <div>
              <label>Last Name</label>
              <input type="text" value={lastName} onChange={updateLastName} />
            </div>

            <div>
              <label>Address Line 1</label>
              <input type="text" value={address1} onChange={updateAddress1} />
            </div>

            <div>
              <label>City</label>
              <input type="text" value={city} onChange={updateCity} />
            </div>
            <div>
              <label>State</label>
              <input type="text" value={state} onChange={updateState} />
            </div>
            <div>
              <label>Zip Code</label>
              <input type="text" value={zipcode} onChange={updateZipcode} />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={updatePhoneNumber}
              />
            </div>
          </div>
          <div>
            <h3>Items and shipping</h3>
            {cartItems.map((item) => {
              return (
                <>
                  {/* <div style={{ display: "flex" }}> */}
                  <img src={item.url} width={200} alt="" />
                  {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
                  <h1 style={{ fontSize: "20px" }}>{item.name}</h1>
                  <p>{item.price}</p>
                  <p>quantity: {item.quantity}</p>
                  <p>total: {item.quantity * item.price}</p>
                  {/* </div> */}
                  {/* </div> */}
                </>
              );
            })}
            <button
              onClick={() => {
                confirmation();
              }}
              className="btn btn-secondary bt-lg mt-3"
              type="submit"
            >
              Place your order
            </button>
          </div>
          <Toaster />
        </form>
      </div>
    </>
  );
}

export default ShippingInfoPage;
