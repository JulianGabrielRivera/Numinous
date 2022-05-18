import blackHeart from '../assets/images/heart2.png';
import redHeart from '../assets/images/heart1.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { XIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Rating from '../components/Rating';

const Places = (props) => {
  const { data, setState } = props;

  return (
    <div className='imageContainer'>
      {data.map((place) => {
        return (
          <div key={place._id}>
            <Link to={`/placedetails/${place._id}`}>
              <div
                style={{
                  position: 'relative',

                  padding: '20px',
                }}
              >
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
                />

                <h5
                  style={{
                    position: 'absolute',
                    bottom: '0px',
                    left: '45px',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '20px',
                  }}
                >
                  {place.name}
                </h5>
                {/* <Rating data={placesData} /> */}
                {/* we changed url to img because we arent using our json anymore, we are using our mongodb */}

                <div
                  style={{
                    width: '300px',
                    height: '230px',
                    padding: '5px',
                    backgroundImage: `url(${place.img})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '10px',
                  }}
                >
                  <div data-user-id={place._id}>
                    <XIcon
                      className='h-5 w-5 text-blue-500'
                      style={{ height: '35px', float: 'right' }}
                      onClick={(e) => {
                        e.preventDefault();

                        axios
                          .delete(
                            `http://localhost:5005/api/places/${place._id}`
                          )

                          .then((response) => {
                            console.log(response);

                            // window.location.reload(false);

                            // axios
                            //   .get('http://localhost:5005/api/places')
                            //   .then((response) => {
                            //     console.log(response.data.message);
                            //     dataClone([...response.data.message]);
                            //     // setPlacesDataClone([...response.data.message]);
                            //   })
                            //   .catch((err) => console.log(err));
                            setState([...response.data.message]);
                          })

                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    />
                  </div>
                </div>
                {/* <img src={place.img} alt='' style={imageSize} /> */}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Places;
