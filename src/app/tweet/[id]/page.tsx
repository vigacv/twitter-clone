import ReplyDialog from '@/components/client-components/reply-dialog'
import Tweet from '@/components/client-components/tweet'
import { supabaseServer } from '@/lib/supabase'
import { Database } from '@/lib/supabase.types'
import { getTweetById } from '@/lib/supabase/queries'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import dayjs from 'dayjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import router from 'next/router'
import React from 'react'
import { AiOutlineRetweet, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsDot, BsThreeDots } from 'react-icons/bs'
import { IoStatsChart, IoShareOutline } from 'react-icons/io5'

type TweetReplyReturnType = Database['public']['Tables']['replies']['Row'] & {
    profiles: Pick<
        Database['public']['Tables']['profiles']['Row'], 'full_name' | 'username'
    >
}

const TweetPage = async ({ params }: { params: { id: string } }) => {
    const supabase = createServerComponentClient<Database>({ cookies })

    const authResponse = await supabase.auth.getUser();

    const tweet = await getTweetById(params.id, authResponse.data.user?.id);

    const replies = await supabaseServer
        .from('replies')
        .select(`
            *,
            profiles (
                full_name,
                username
            )
        `)
        .eq("tweet_id", params.id)
        .returns<TweetReplyReturnType[]>();

    return (
        <main className="flex xl:w-[50%] h-full min-h-screen flex-col
          border-l-[0.5px] border-r-[0.5px] border-gray-600"
        >
            {
                tweet ? <Tweet tweet={tweet} />
                    : <div>No tweet found</div>
            }
            {
                replies.data?.map((reply) => (
                    <div key={reply.id} className="border-b-[0.5px] border-gray-600 p-4 flex space-x-4" >
                        <div>
                            <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex items-center my-1 w-full justify-between">
                                <div className="flex items-center space-x-1">
                                    <div className="font-bold">{reply!.profiles?.full_name || ""}</div>
                                    <div className="text-gray-500">@{reply!.profiles?.username}</div>
                                    <div className="text-gray-500">
                                        <BsDot />
                                    </div>
                                </div>
                                <div>
                                    <BsThreeDots />
                                </div>
                            </div>
                            <div className="text-white text-base">
                                {reply.text}
                            </div>
                            <div className="bg-slate-400 aspect-square w-full h-80 rounded-xl mt-2">

                            </div>
                        </div>
                    </div >
                ))
            }
        </main>
    )
}

export default TweetPage