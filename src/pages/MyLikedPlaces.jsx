import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const MyLikedPlaces = () => {
  const [likedPlaces, setLikedPlaces] = useState([]);

  const { storedToken } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/likedplaces`, {
        headers: {
          authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.foundPlaces.places);
        let allLikedPlaces = response.data.foundPlaces.places;
        setLikedPlaces(allLikedPlaces);
      });
  }, []);

  return (
    <>
      <div className="eachPlaceLiked">
        {likedPlaces.map((eachPlace, i) => {
          return (
            <div key={i} className="placesLiked">
              <img src={eachPlace.url} alt="" width={250} />
              <p>{eachPlace.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyLikedPlaces;
