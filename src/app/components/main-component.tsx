import React from 'react'
import { BsDot, BsChat, BsThreeDots } from 'react-icons/bs'
import { AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai'
import { IoStatsChart, IoShareOutline } from 'react-icons/io5'
import ComposeTweet from './server-components/compose-tweet'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getTweets } from '@/lib/supabase/getTweets'

dayjs.extend(relativeTime);

const MainComponent = async () => {

    const res = await getTweets();

    return (
        <main className="flex xl:w-[50%] h-full min-h-screen flex-col
          border-l-[0.5px] border-r-[0.5px] border-gray-600"
        >
            <h1 className="text-xl font-bold my-4 p-6 backdrop-blur bg-black/10 sticky top-0">
                Home
            </h1>
            <div className="border-t-[0.5px] border-b-[0.5px] border-gray-600 relative
            flex items-stretch py-4 px-4 space-x-2"
            >
                <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
                <ComposeTweet />
            </div>
            <div className="w-full">
                {
                    res?.error && <div>Something wrong happened in the server</div>
                }
                {res?.data && res.data.map((tweet, i) => (
                    <div key={i}
                        className="border-b-[0.5px]  border-gray-600 p-4 flex space-x-4"
                    >
                        <div>
                            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex items-center my-1 w-full justify-between">
                                <div className="flex items-center space-x-1">
                                    <div className="font-bold">{tweet.profiles.full_name || ""}</div>
                                    <div className="text-gray-500">@{tweet.profiles.username}</div>
                                    <div className="text-gray-500">
                                        <BsDot />
                                    </div>
                                    <div className="text-gray-500">
                                        {
                                            dayjs(tweet.created_at).fromNow()
                                        }
                                    </div>
                                </div>
                                <div>
                                    <BsThreeDots />
                                </div>
                            </div>
                            <div className="text-white text-base">
                                {tweet.text}
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