import Places from './Places';
import Video from '../components/Video';
const HomePage = (props) => {
  const {
    data,
    setState,
    nameSort,
    dataClone,
    filterState,
    originalPlaces,
    setLikes,
    filterDataClone,
    filterPlacesByString,
  } = props;
  return (
    <>
      {/* <Video
        nameSort={nameSort}
        setState={setState}
        dataClone={dataClone}
        filterState={filterState}
        originalPlaces={originalPlaces}
<<<<<<< HEAD
        filterDataClone={filterDataClone}
        filterPlacesByString={filterPlacesByString}
      />
      <Places
        data={data}
        setState={setState}
        setLikes={setLikes}
        filterDataClone={filterDataClone}
      />
=======
      /> */}
      {/* <Places data={data} setState={setState} setLikes={setLikes} /> */}
>>>>>>> d55ea5b19ba821384cdfdd855d48fe0979de498a
    </>
  );
};

export default HomePage;
