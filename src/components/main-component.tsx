import React from 'react'
import ComposeTweet from './server-components/compose-tweet'
import { getTweets } from '@/lib/supabase/queries'
import Tweet from './client-components/tweet'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/supabase.types'


const MainComponent = async () => {

    const supabase = createServerComponentClient<Database>({ cookies })

    const authResponse = await supabase.auth.getUser();

    const res = await getTweets(authResponse.data.user?.id);

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
                    <Tweet key={i} tweet={tweet} />
                ))}
            </div>
        </main>
    )
}

export default MainComponent;