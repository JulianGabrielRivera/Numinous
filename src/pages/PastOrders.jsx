import { useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const PastOrders = () => {
  const { storedToken } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/past-orders`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
      });
  }, []);

  return <div className="orderContainer"></div>;
};

export default PastOrders;
