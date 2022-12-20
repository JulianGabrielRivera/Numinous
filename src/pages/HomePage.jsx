import Places from "./Places";
import Video from "../components/Video";
import { AuthContext } from "../context/auth.context";
import { useEffect, useContext, useState } from "react";
import axios from "axios";

const HomePage = (props) => {
  const { storedToken, setTotalLiked, totalLikes } = useContext(AuthContext);

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

    deletePlace,
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
        totalLikes={totalLikes}
      />
      <Places
        data={data}
        setPlacesData={setPlacesData}
        filterState={filterState}
        setLikes={setLikes}
        filterDataClone={filterDataClone}
        likes={likes}
        setFilterDataCloneTwo={setFilterDataCloneTwo}
        deletePlace={deletePlace}
      />
    </>
  );
};

export default HomePage;
