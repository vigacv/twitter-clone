import LeftSideBar from "./components/left-sidebar";
import MainComponent from "./components/main-component";
import { BsSearch } from 'react-icons/bs'

export const Home = () => {
  return (
    <div className='w-full h-full flex justify-center items-center relative bg-black'>
      <div className='max-w-[70vw] w-full h-full flex relative'>
        <LeftSideBar />
        <MainComponent />
        <section className="sticky top-2 overflow-scroll mt-2 w-[27%] flex flex-col items-stretch h-screen px-6">
          <div className="">
            <div className="relative w-full h-full group">
              <input
                type="text"
                name="search"
                id="searchBox"
                placeholder="Search Twitter"
                className="w-full h-full bg-neutral-900/90 rounded-xl py-4 pl-14 pr-4 
                outline-none focus:border-primary focus:border-2"
              />
              <label
                htmlFor="searchBox"
                className="absolute top-0 left-0 h-full flex items-center justify-center p-4
                text-gray-500 peer-focus:text-primary"
              >
                <BsSearch className="w-5 h-5" />
              </label>
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-neutral-900 my-4">
            <h3 className="font-bold text-xl my-2 px-4">What's happening</h3>
            <div>
              {
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="hover:bg-white/10 p-4 last:rounded-b-xl transition duration-200 hover:cursor-pointer">
                    <div className="font-bold text-lg">#trending {i + 1}</div>
                    <div className="text-xs text-neutral-400">35.4k</div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-neutral-900 my-4">
            <h3 className="font-bold text-xl my-2 px-4">Who to follow</h3>
            <div>
              {
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="hover:bg-white/10 p-4 last:rounded-b-xl transition 
                    duration-200 hover:cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-neutral-600 rounded-full"></div>
                      <div className="flex flex-col">
                        <div className="font-bold text-white">Other User</div>
                        <div className="text-gray-500 text-xs">@otheruser1232</div>
                      </div>
                    </div>
                    <button className="rounded-full px-6 py-2 bg-white text-neutral-950">
                      Follow
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </div >
    </div >
  )
}

export default Home;