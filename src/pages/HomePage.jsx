import Places from './Places';
import Video from '../components/Video';
const HomePage = (props) => {
  const { data, setState, nameSort } = props;
  return (
    <>
      <Video nameSort={nameSort} />
      <Places data={data} setState={setState} />
    </>
  );
};

export default HomePage;
