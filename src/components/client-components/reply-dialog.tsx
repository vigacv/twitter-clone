"use client"

import React, { useState, useTransition } from 'react'
import { BsChat, BsDot, BsThreeDots } from 'react-icons/bs'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TweetType } from '@/lib/supabase/queries'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { reply } from '@/lib/supabase/mutations'
import { toast } from 'sonner'
import { useSupabase } from '@/app/supabase-provider'


dayjs.extend(relativeTime);

type ReplyDialogProps = {
    tweet: TweetType
}

const ReplyDialog = ({ tweet }: ReplyDialogProps) => {

    const [isReplyDialogOpen, setisReplyDialogOpen] = useState(false)
    const [replyText, setReplyText] = useState("");

    let [isReplyPending, startTransition] = useTransition();

    const { supabase } = useSupabase();

    const submitReply = async () => {
        try {
            const authRes = await supabase.auth.getUser();

            if (!authRes.data || !authRes.data.user) {
                toast('Please login to reply a tweet')
                return;
            }

            const user = authRes.data.user;

            startTransition(async () => {
                try {
                    await reply({
                        replyText,
                        tweetId: tweet.id,
                        userId: user.id
                    })
                    setisReplyDialogOpen(false);
                } catch {
                    toast('Something wrong happened to the db!')
                }
            })
        } catch {
            toast('Authentication failed')
        }
    }

    return (
        <Dialog onOpenChange={setisReplyDialogOpen} open={isReplyDialogOpen}>
            <DialogTrigger asChild>
                <button
                    className="rounded-full hover:bg-white/10 transition duration-200 cursor-pointer p-2 flex items-center space-x-5">
                    <BsChat />
                    <span>{tweet.repliesCount}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="bg-black sm:max-w-2xl border-none text-white">
                <div className="border-b-[0.5px] border-gray-600 p-4 flex space-x-4" >
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
                        <div className="text-white text-base w-full my-4">
                            {tweet.text}
                        </div>
                    </div>
                </div >
                <div>
                    Replying to @{tweet.profiles.username}
                </div>
                <div className='flex w-full items-center space-x-2'>
                    <div>
                        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                    </div>
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        disabled={isReplyPending}
                        className="w-full h-full bg-transparent border-b-[0.5px] border-gray-600
                            p-4 outline-none border-none placeholder:text-gray-600"
                    />
                </div>
                <div className="w-full justify-between items-center flex">
                    <div></div>
                    <div className="w-full max-w-[100px]">
                        <button
                            onClick={submitReply}
                            type='submit'
                            className='rounded-full bg-primary px-4 py-2 w-full text-lg 
                                    text-center hover:bg-opacity-70 transition duration-200 font-bold'
                        >
                            Reply
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ReplyDialog