import React from 'react'
import { BsDot, BsChat, BsThreeDots } from 'react-icons/bs'
import { AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai'
import { IoStatsChart, IoShareOutline } from 'react-icons/io5'

function MainComponent() {
    return (
        <main className="ml-[275px] mx-2 flex w-full max-w-[600px] h-full min-h-screen flex-col
          border-l-[0.5px] border-r-[0.5px] border-gray-600"
        >
            <h1 className="text-xl font-bold my-4 p-6 backdrop-blur bg-black/10 sticky top-0">Home</h1>
            <div className="border-t-[0.5px] border-b-[0.5px] border-gray-600 relative
            flex items-stretch py-4 px-4 space-x-2"
            >
                <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
                <div className="flex flex-col w-full">
                    <input
                        type="text"
                        className="w-full h-full bg-transparent border-b-[0.5px] border-gray-600
                    p-4 outline-none border-none text-2xl placeholder:text-gray-600"
                        placeholder="What's happening?"
                    />
                    <div className="w-full justify-between items-center flex">
                        <div></div>
                        <div className="w-full max-w-[100px]">
                            <button
                                className='rounded-full bg-primary px-4 py-2 w-full text-lg 
                    text-center hover:bg-opacity-70 transition duration-200 font-bold'
                            >
                                Tweet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="border-b-[0.5px]  border-gray-600 p-4 flex space-x-4">
                        <div>
                            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center my-1 w-full justify-between">
                                <div className="flex items-center space-x-1 w-full">
                                    <div className="font-bold">Gabriel CV</div>
                                    <div className="text-gray-500">@vigacv</div>
                                    <div className="text-gray-500">
                                        <BsDot />
                                    </div>
                                    <div className="text-gray-500">1 hour ago</div>
                                </div>
                                <div>
                                    <BsThreeDots />
                                </div>
                            </div>
                            <div className="text-white text-base">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum quis aperiam quidem nisi voluptas sed, reprehenderit corporis rerum dolorem labore, nesciunt excepturi praesentium, aliquam libero neque adipisci! Hic, quos dolor.
                            </div>
                            <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2">

                            </div>
                            <div className="flex justify-around w-full mt-4">
                                <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
                                    <BsChat />
                                </div>
                                <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
                                    <AiOutlineRetweet />
                                </div>
                                <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
                                    <AiOutlineHeart />
                                </div>
                                <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
                                    <IoStatsChart />
                                </div>
                                <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
                                    <IoShareOutline />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default MainComponent