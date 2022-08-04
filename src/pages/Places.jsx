import Video from '../components/Video';

import Place from './Place';

import FilterPlaces from '../components/FilterPlaces';

const Places = (props) => {
  const { data, setLikes, deletePlace, filteredPlaces, showAll, handleSearch } =
    props;

  return (
    <>
      <div>
        <Video />
        <FilterPlaces
          filteredPlaces={filteredPlaces}
          showAll={showAll}
          handleSearch={handleSearch}
        />
      </div>

      <div className='imageContainer'>
        <Place data={data} setLikes={setLikes} deletePlace={deletePlace} />
      </div>
    </>
  );
};

export default Places;
