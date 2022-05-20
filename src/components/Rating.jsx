const Rating = (props) => {
  const { data } = props;
  console.log(data);

  const stars = [];

  // starnumber would be rating of what u put and depending on rating you push
  // we would use the rating we get from our props in starnumber
  // <button onClick={()=>{functionToUpdateRating(starNumber)}}>starticon</button>

  let ratingNumber = Number(data);

  let starNumber = Math.round(ratingNumber);

  const myFilledStarArray = [];

  for (let i = 0; i < starNumber; i++) {
    myFilledStarArray.push(<div>★</div>);
  }

  const myEmptyStarArray = [];
  for (let i = 0; i < 5 - starNumber; i++) {
    myEmptyStarArray.push(<div>☆</div>);
  }

  return (
    <div style={{ display: 'flex', fontSize: '2rem' }}>
      {myFilledStarArray} {myEmptyStarArray}
    </div>
  );
};
export default Rating;
