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
      <Video
        nameSort={nameSort}
        setState={setState}
        dataClone={dataClone}
        filterState={filterState}
        originalPlaces={originalPlaces}
        filterDataClone={filterDataClone}
        filterPlacesByString={filterPlacesByString}
      />
      <Places
        data={data}
        setState={setState}
        setLikes={setLikes}
        filterDataClone={filterDataClone}
      />
    </>
  );
};

export default HomePage;
