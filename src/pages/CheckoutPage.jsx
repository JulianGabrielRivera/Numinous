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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/saved-checkout`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCards(response.data.cards.cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   Modal stuff
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cards, setCards] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [selectedCard, setSelectedCard] = useState("");

  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateAddress1 = (e) => setAddress1(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateZipcode = (e) => setZipcode(+e.target.value);
  const updatePhoneNumber = (e) => setPhoneNumber(+e.target.value);
  const updateCardNumber = (e) => setCardNumber(+e.target.value);
  const updateNameOnCard = (e) => setNameOnCard(e.target.value);
  const updateMonthExpires = (e) => {
    setExpirationMonth(e.target.value);
  };
  const updateYearExpires = (e) => setExpirationYear(+e.target.value);
  const updateSecurityCode = (e) => setSecurityCode(+e.target.value);
  console.log(selectedCard);
  console.log(cardNumber);
  console.log(expirationMonth);
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

    const paymentObject = {
      nameOnCard,
      creditCard: cardNumber,
      expirationMonth,
      expirationYear,
      securityCode,
    };
    console.log(totalPrice);
    console.log(addressObject);
    const authToken = localStorage.getItem("authToken");
    console.log(cartItems);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/new-order`,
        { cartItems, addressObject, totalPrice, paymentObject },
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
              <h3>Payment method</h3>
              <h5>
                <b>Your credit or debit cards</b>
              </h5>
              {/* <div className="savedCardInfo"> */}
              {cards.map((card) => {
                return (
                  <>
                    <div className="savedCardInfo">
                      {/* <input
                      type="checkbox"
                      value={selectedCard}
                      onClick={(e) => {
                        setSelectedCard({ ...card });
                      }}
                    /> */}
                      {/* <label htmlFor="coding"> */}
                      <p> {card.nameOnCard}</p>
                      <p>
                        {card.expirationMonth}/{card.expirationYear}
                      </p>
                      <p>{card.creditCard}</p>
                      {/* </label> */}
                    </div>
                  </>
                );
              })}

              <Button variant="primary" onClick={handleShow}>
                Add a credit or debit card
              </Button>
            </div>
            <>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add a credit or debit card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Name on card</Form.Label>
                      <Form.Control
                        type="text"
                        value={nameOnCard}
                        onChange={updateNameOnCard}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Expiration Date</Form.Label>
                      <select
                        value={expirationMonth}
                        onChange={updateMonthExpires}
                      >
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </select>
                      <select
                        value={expirationYear}
                        onChange={updateYearExpires}
                      >
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                        <option>2033</option>
                      </select>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Card number</Form.Label>
                      <Form.Control
                        type="text"
                        value={cardNumber}
                        onChange={updateCardNumber}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Security Code</Form.Label>
                      <Form.Control
                        type="text"
                        value={securityCode}
                        onChange={updateSecurityCode}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Add your card
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
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
                  {/* </div> */}
                  {/* </div> */}
                </>
              );
            })}
            <button className="btn btn-secondary bt-lg mt-3" type="submit">
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
