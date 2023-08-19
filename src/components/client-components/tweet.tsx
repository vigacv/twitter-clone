"use client"

import React, { useState, useTransition } from 'react'
import { TweetType } from '@/lib/supabase/queries'
import dayjs from 'dayjs'
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsDot, BsThreeDots } from 'react-icons/bs'
import { IoStatsChart, IoShareOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import relativeTime from 'dayjs/plugin/relativeTime'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { likeTweet, unlikeTweet } from '@/lib/supabase/mutations'
import ReplyDialog from './reply-dialog'
import { useRouter } from 'next/navigation'


dayjs.extend(relativeTime);

type TweetProps = {
    tweet: TweetType
}

const Tweet = ({ tweet }: TweetProps) => {

    const [supabase] = useState(() => createBrowserSupabaseClient());
    let [isLikePending, startTransition] = useTransition();

    const router = useRouter();

    const toogleLike = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        try {
            const authRes = await supabase.auth.getUser();

            if (!authRes.data || !authRes.data.user) {
                toast('Please login to like a tweet')
                return;
            }

            const user = authRes.data.user;

            startTransition(async () => {
                if (tweet.isLikedByUser) {
                    await unlikeTweet({
                        tweetId: tweet.id,
                        userId: user.id
                    })
                    tweet.likesCount--;
                } else {
                    await likeTweet({
                        tweetId: tweet.id,
                        userId: user.id
                    })
                    tweet.likesCount++;
                }
                tweet.isLikedByUser = !tweet.isLikedByUser;
            }
            )
        } catch {
            toast('Authentication failed')
        }
    }

    return (
        <>
            <div onClick={() => {
                router.push(`/tweet/${tweet.id}`)
            }} className="border-b-[0.5px] hover:bg-white/5 transition-all cursor-pointer  border-gray-600 p-4 flex space-x-4" >
                <div>
                    <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center my-1 w-full justify-between">
                        <div className="flex flex-col md:flex-row md:space-x-2">
                            <div className="font-bold">{tweet.profiles.full_name || ""}</div>
                            <div className='flex items-center'>
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
                        </div>
                        <div>
                            <BsThreeDots />
                        </div>
                    </div>
                    <div className="text-white text-base">
                        {tweet.text}
                    </div>
                    {/* <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2">
                    </div> */}
                    <div className="flex justify-around w-full mt-4 items-center" onClick={e => e.stopPropagation()}>
                        <ReplyDialog tweet={tweet} />
                        <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2 flex items-center space-x-2 md:space-x-5">
                            <AiOutlineRetweet />
                            <span>0</span>
                        </div>
                        <button
                            disabled={isLikePending}
                            onClick={toogleLike}
                            className="rounded-full flex items-center space-x-2 md:space-x-5 hover:bg-white/10 transition duration-200 cursor-pointer p-2"
                        >
                            {tweet.isLikedByUser ? <AiFillHeart className="w-5 h-5 text-rose-600" /> : <AiOutlineHeart className="w-5 h-5" />}
                            <span>{tweet.likesCount}</span>
                        </button>
                        <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2 flex items-center space-x-2 md:space-x-5">
                            <IoStatsChart />
                            <span>0</span>
                        </div>
                        <div className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2">
                            <IoShareOutline />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Tweet;