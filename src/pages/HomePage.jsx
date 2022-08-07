import Places from './Places';
import Video from '../components/Video';
const HomePage = (props) => {
  const {
    data,
    setPlacesData,
    nameSort,
    dataClone,
    filterState,
    placesDataState,
    likes,
    setLikes,
    filterDataClone,
    filterPlacesByString,
    setFilterDataCloneTwo,
    filteredPlacesTwo,
    deletePlace = { deletePlace },
  } = props;

  return (
    <>
      <Video
        nameSort={nameSort}
        dataClone={dataClone}
        filterState={filterState}
        filterDataClone={filterDataClone}
        filterPlacesByString={filterPlacesByString}
        placesDataState={placesDataState}
        setFilterDataCloneTwo={setFilterDataCloneTwo}
      />
      <Places
        data={data}
        setPlacesData={setPlacesData}
        filterState={filterState}
        setLikes={setLikes}
        filterDataClone={filterDataClone}
        likes={likes}
        deletePlace={deletePlace}
      />
    </>
  );
};

export default HomePage;
