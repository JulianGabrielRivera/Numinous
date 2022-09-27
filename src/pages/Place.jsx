import blackHeart from '../assets/images/heart2.png';
import redHeart from '../assets/images/heart1.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XIcon } from '@heroicons/react/solid';
import { ThumbDownIcon } from '@heroicons/react/solid';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
const APIURL = process.env.REACT_APP_SERVER_URL;
const Place = (props) => {
  const {
    data,
    setState,
    setLikes,
    filterDataClone,
    likes,
    setPlacesData,
    filterState,
    deletePlace,
  } = props;
  console.log(filterDataClone);
  console.log(data);

  const { storedToken } = useContext(AuthContext);
  // const [like, setLike] = useState(0);
  const { placeId } = useParams();
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };
  // const handleClick = () => {
  //   axios
  //     .post(`${APIURL}/api/like/${placeId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className='imageContainer'>
      {filterDataClone.map((place) => {
        return (
          <div key={place._id}>
            <div
              style={{
                position: 'relative',

                padding: '20px',
              }}
            >
              <ThumbDownIcon
                style={{
                  height: '25px',
                  position: 'absolute',
                  left: '40',
                  bottom: '30',
                  color: 'none',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  axios
                    .post(`${APIURL}/api/unlike/${place._id}`, {
                      headers: {
                        Authorization: `Bearer ${storedToken}`,
                      },
                    })
                    .then((response) => {
                      console.log(response.data.likey);
                    })
                    .catch((err) => console.log(err));
                }}
              />
              <img
                src={blackHeart}
                alt=''
                style={{
                  height: '25px',
                  position: 'absolute',
                  top: '30px',
                  left: '35px',
                }}
                onMouseOver={(e) => (e.currentTarget.src = redHeart)}
                onMouseOut={(e) => (e.currentTarget.src = blackHeart)}
                onClick={(e) => {
                  e.preventDefault();
                  axios
                    .post(`${APIURL}/api/like/${place._id}`, {
                      headers: {
                        Authorization: `Bearer ${storedToken}`,
                      },
                    })
                    .then((response) => {
                      // setLikes(response.data.likedUser.likes);
                      // console.log(response.data);
                    })
                    .catch((err) => console.log(err));
                }}
              />

              <h5
                style={{
                  position: 'absolute',

                  top: '50%',
                  right: '50%',
                  transform: 'translate(50%,-50%)',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {place.name}
              </h5>
              {/* <Rating data={placesData} /> */}
              {/* we changed url to img because we arent using our json anymore, we are using our mongodb */}

              <div
                className='placeImg'
                style={{
                  width: '300px',
                  height: '230px',
                  padding: '5px',
                  backgroundImage: `url(${place.url})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '10px',
                }}
              >
                <div>
                  <XIcon
                    className='h-5 w-5 text-blue-500 xicon'
                    style={{ height: '35px', float: 'right', zIndex: 1 }}
                    onClick={(e) => {
                      e.preventDefault();

                      axios
                        .delete(`${APIURL}/api/places/${place._id}`, {
                          headers: {
                            Authorization: `Bearer ${storedToken}`,
                          },
                        })
                        .then((response) => {
                          console.log(response.data.message);

                          // axios
                          // .post('http://localhost:5005/api/places/create', requestBody, {
                          //   headers: { Authorization: `Bearer ${storedToken}` },
                          // })

                          // window.location.reload(false);

                          axios
                            .get('http://localhost:5005/api/places')
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
                    marginLeft: '60px',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
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
    </div>
  );
};

export default Place;
