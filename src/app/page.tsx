import LeftSideBar from "./components/left-sidebar";
import MainComponent from "./components/main-component";

export const Home = () => {
  return (
    <div className='w-full h-full flex justify-center items-center relative bg-black'>
      <div className='max-w-screen-xl w-full h-full flex relative'>
        {/* Left sidebar for navigation/header */}
        <LeftSideBar />
        <MainComponent />
        {/* <section>right section</section> */}
      </div>
    </div>
  )
}

export default Home;