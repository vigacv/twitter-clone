"use server"

import { randomUUID } from 'crypto'
import { supabaseServer } from '.';

export const likeTweet = async ({
    tweetId,
    userId
}: {
    tweetId: string,
    userId: string
}) => {
    const { data, error } = await supabaseServer.from('likes').insert({
        id: randomUUID(),
        tweet_id: tweetId,
        user_id: userId,
    })

    console.log({ data, error })
}

export const unlikeTweet = async ({
    tweetId,
    userId
}: {
    tweetId: string,
    userId: string
}) => {
    const { data, error } = await supabaseServer
        .from('likes')
        .delete()
        .eq("tweet_id", tweetId)
        .eq("user_id", userId);

    console.log({ data, error })
}

export const reply = async ({
    tweetId,
    userId,
    replyText
}: {
    tweetId: string,
    userId: string,
    replyText: string
}) => {
    if (replyText === "") return;

    const { data, error } = await supabaseServer
        .from('replies')
        .insert({
            id: randomUUID(),
            text: replyText,
            user_id: userId,
            tweet_id: tweetId
        })

    console.log({ data, error })
}