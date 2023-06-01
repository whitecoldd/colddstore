import Slider from "../components/Slider";
import Featured from "../components/Featured";
import CatGrid from "../components/CatGrid";

const Home = () => {
  return (
    <div>
      <Slider />
      <Featured type={"Featured"} />
      <CatGrid />
      <Featured type={"Trending"} />
    </div>
  );
};

export default Home;
