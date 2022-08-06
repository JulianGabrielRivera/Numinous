import Places from './Places';
import Video from '../components/Video';
const HomePage = (props) => {
  const {
    data,
    setState,
    nameSort,
    dataClone,
    filterState,
    placesDataState,
    setLikes,
    filterDataClone,
    filterPlacesByString,
    setFilterDataCloneTwo,
    filteredPlacesTwo,
  } = props;

  return (
    <>
      <Video
        nameSort={nameSort}
        setState={setState}
        dataClone={dataClone}
        filterState={filterState}
        filterDataClone={filterDataClone}
        filterPlacesByString={filterPlacesByString}
        placesDataState={placesDataState}
        setFilterDataCloneTwo={setFilterDataCloneTwo}
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
