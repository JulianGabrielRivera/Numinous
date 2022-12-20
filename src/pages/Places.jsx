import Place from "./Place";

const APIURL = process.env.REACT_APP_SERVER_URL;
const Places = (props) => {
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

  // console.log(filterDataClone);
  // console.log(data);

  // const handleClick = () => {
  //   axios
  //     .post(`${APIURL}/api/like/${placeId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <Place
      data={data}
      setState={setState}
      setLikes={setLikes}
      filterDataClone={filterDataClone}
      likes={likes}
      setPlacesData={setPlacesData}
      filterState={filterState}
      deletePlace={deletePlace}
    />
  );
};

export default Places;
