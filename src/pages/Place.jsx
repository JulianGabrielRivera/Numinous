import blackHeart from "../assets/images/heart2.png";
import redHeart from "../assets/images/heart1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { XIcon } from "@heroicons/react/solid";
import { ThumbDownIcon } from "@heroicons/react/solid";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { motion } from "framer-motion";
import { useDrag } from "react-dnd";

import Chat from "../components/Chat";

// const APIURL = process.env.REACT_APP_SERVER_URL;
const Place = (props) => {
  const [newPlace, setNewPlace] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const {
    filterDataClone,

    filterState,
    deletePlace,
  } = props;

  const { storedToken, user, totalLikes, setTotalLiked } =
    useContext(AuthContext);
  console.log(user);
  console.log(filterDataClone);
  console.log(isLiked);
  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("/signup");
  };
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "div",

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // const handleClick = () => {
  //   axios
  //     .post(`${APIURL}/api/like/${placeId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // console.log(user.places, "yo");
  let newArr;

  return (
    <motion.div className="imageContainer">
      {filterDataClone.map((place, i) => {
        // console.log(place, i);
        return (
          <div key={place._id}>
            <div
              style={{
                position: "relative",
                padding: "20px",
              }}
              ref={dragRef}
            >
              <ThumbDownIcon
                style={{
                  height: "25px",
                  position: "absolute",
                  left: "40",
                  bottom: "30",
                  color: "none",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(isLiked);
                  // if (isLiked)
                  axios
                    .post(
                      `${process.env.REACT_APP_SERVER_URL}/api/unlike/${place._id}`,
                      null,
                      {
                        headers: {
                          Authorization: `Bearer ${storedToken}`,
                        },
                      }
                    )
                    .then((response) => {
                      // setIsLiked(response.data.likedUser.isLiked);
                      // console.log(isLiked);

                      // let foundPlace = response.data.likedUser._id;
                      // console.log(foundPlace);
                      // console.log(response.data.user.places);
                      // response.data.user.places.forEach((place) => {
                      //   if (foundPlace !== place._id) {
                      //     setIsLiked(response.data.likedUser.isLiked);
                      //     console.log(isLiked);
                      //   }
                      // });
                      // let newArr = filterDataClone.map((item) => {
                      //   // console.log(item._id);
                      //   // console.log(response.data.likedUser._id);
                      //   if (item._id === response.data.likedUser._id)
                      //     return {
                      //       ...item,
                      //       likes: response.data.likedUser.likes,
                      //       isLiked: false,
                      //     };
                      //   else {
                      //     console.log("hey");
                      //     return { ...item };
                      //   }
                      // });
                      // console.log(response.data.likedUser.isLiked);
                      // console.log(newArr);

                      console.log(response.data.likedUser);
                      setIsLiked(response.data.likedUser.isLiked);
                      console.log(isLiked);
                      filterState(response.data.newUser);
                      setTotalLiked(response.data.newUser.length);
                    })
                    .catch((err) => console.log(err));
                }}
              />
              <img
                src={blackHeart}
                alt=""
                style={{
                  height: "25px",
                  position: "absolute",
                  top: "30px",
                  left: "35px",
                }}
                onMouseOver={(e) => (e.currentTarget.src = redHeart)}
                onMouseOut={(e) => (e.currentTarget.src = blackHeart)}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(!isLiked);
                  if (!isLiked)
                    axios
                      .post(
                        `${process.env.REACT_APP_SERVER_URL}/api/like/${place._id}`,
                        { totalLikes },
                        {
                          headers: {
                            Authorization: `Bearer ${storedToken}`,
                          },
                        }
                      )
                      .then((response) => {
                        // console.log(response);
                        // console.log(response.data.likedUser.isLiked);
                        // // setIsLiked(response.data.likedUser.isLiked);
                        // console.log(response.data.likedUser);
                        // let foundPlace = response.data.likedUser._id;
                        // console.log(foundPlace);

                        // response.data.user.places.forEach((place) => {
                        //   console.log(place);
                        //   if (foundPlace === place._id) {
                        //     setIsLiked(true);
                        //     console.log(isLiked);
                        //   }
                        // });
                        console.log("yo");
                        console.log(response);
                        console.log(response.data.newUser);
                        // const arrayofPlaces = response.data.user.places;
                        // const newArr2 = arrayofPlaces.map((place) => {
                        //   if (place._id === response.data.likedUser._id) {
                        //     return {
                        //       ...place,
                        //       likes: response.data.likedUser.likes,
                        //       isLiked: true,
                        //     };
                        //   } else {
                        //     return { ...place };
                        //   }
                        // });
                        // console.log(newArr2);
                        // if (arrayofPlaces.includes(response.data.likedUser)) {
                        //   setIsLiked(true);
                        //   console.log(isLiked);
                        // } else {
                        //   setIsLiked(false);
                        //   console.log(isLiked);
                        // }
                        // let newArr = filterDataClone.map((item) => {
                        //   if (item._id === response.data.likedUser._id) {
                        //     return {
                        //       ...item,
                        //       likes: response.data.likedUser.likes,
                        //       isLiked: isLiked,
                        //     };
                        //   } else {
                        //     console.log("yo");
                        //     return { ...item };
                        //   }
                        // });
                        // console.log(response.data.likedUser.isLiked);
                        setIsLiked(response.data.likedUser.isLiked);
                        filterState(response.data.newUser);
                        setTotalLiked(response.data.newUser.length);

                        // setPlacesData([...newArr, response.data.likedUser]);
                        // filterState([...newArr, response.data.likedUser]);

                        // if (response.data.likedUser._id === place._id) {

                        //   data.filter()
                        // }

                        // setPlacesData([...data, response.data.likedUser]);
                        // console.log(newPlace);
                        // setLikes(
                        //   (likes) => (likes += response.data.likedUser.likes)
                        // );
                        // setPlacesData([...dat]);
                      })
                      .catch((err) => console.log(err));
                }}
              />

              <Link to={`/placedetails/${place._id}`}>
                {" "}
                <h5
                  style={{
                    position: "absolute",

                    top: "49%",
                    right: "45%",
                    transform: "translate(45%,-45%)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {place.name}
                </h5>
              </Link>

              {/* <Rating data={placesData} /> */}
              {/* we changed url to img because we arent using our json anymore, we are using our mongodb */}

              <div
                layout
                className="placeImg"
                style={{
                  width: "300px",
                  height: "230px",
                  padding: "5px",
                  backgroundImage: `url(${place.url})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "10px",
                  border: isDragging ? "1px solid black" : "0px",
                }}
                // ref={(ref) => (place[i] = ref)}
              >
                <div>
                  <XIcon
                    className="h-5 w-5 text-blue-500 xicon"
                    style={{ height: "35px", float: "right", zIndex: 1 }}
                    onClick={(e) => {
                      e.preventDefault();

                      axios
                        .delete(
                          `${process.env.REACT_APP_SERVER_URL}/api/places/${place._id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${storedToken}`,
                            },
                          }
                        )
                        .then((response) => {
                          console.log(response.data.message);

                          // axios
                          // .post('http://localhost:5005/api/places/create', requestBody, {
                          //   headers: { Authorization: `Bearer ${storedToken}` },
                          // })

                          // window.location.reload(false);

                          axios
                            .get("http://localhost:5005/api/places")
                            .then((response) => {
                              console.log(response.data.message);

                              deletePlace([...response.data.message]);
                              // setPlacesDataClone([...response.data.message]);
                            })
                            .catch((err) => console.log(err));
                        })

                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  />
                </div>

                <div
                  style={{
                    marginLeft: "60px",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  {place.likes}
                </div>
              </div>
              {/* <img src={place.img} alt='' style={imageSize} /> */}
            </div>
          </div>
        );
      })}
      <Chat />
    </motion.div>
  );
};

export default Place;
