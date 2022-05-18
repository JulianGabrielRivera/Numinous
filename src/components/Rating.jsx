const Rating = (props) => {
  const { data } = props;
  console.log(data);

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
