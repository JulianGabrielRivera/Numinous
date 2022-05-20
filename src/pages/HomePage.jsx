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
  } = props;
  return (
    <>
      <Video
        nameSort={nameSort}
        setState={setState}
        dataClone={dataClone}
        filterState={filterState}
        originalPlaces={originalPlaces}
      />
      <Places data={data} setState={setState} setLikes={setLikes} />
    </>
  );
};

export default HomePage;
