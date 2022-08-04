import React, { useEffect } from 'react';

import videoBg from '../assets/video/beachvid.mp4';

const Video = (props) => {
  return (
    <>
      <div className='videoContainer'>
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          style={{ height: '400px' }}
          id='videoBackground'
          className='video'
        />
      </div>
    </>
  );
};

export default Video;
