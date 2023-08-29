import Footer from "../components/Footer";
import HeroTask from "../components/HeroTask";
import NavBarTask from "../components/NavBarTask";

const Home = () => {
  return (
    <>
      <NavBarTask />
      <div style={{marginTop:"64px", minWidth: "340px"}}>
        <HeroTask />
      </div>
    </>
  );
};

export default Home;
