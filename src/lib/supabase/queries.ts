"use server"

import { Database } from '@/lib/supabase.types'
import { supabaseServer } from '.';
import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';

export type TweetType = Database['public']['Tables']['tweets']['Row'] & {
    profiles: Pick<
        Database['public']['Tables']['profiles']['Row'], 'full_name' | 'username'
    >,
    likesCount: number,
    isLikedByUser: boolean
}

type TweetReturnType = Database['public']['Tables']['tweets']['Row'] & {
    profiles: Pick<
        Database['public']['Tables']['profiles']['Row'], 'full_name' | 'username'
    >,
    likes: {
        user_id: string
    }[]
}

type GetTweetsReturnType = {
    data: TweetType[];
    error: PostgrestError;
    count: null;
    status: number;
    statusText: string;
} | {
    data: TweetType[];
    error: null;
    count: number | null;
    status: number;
    statusText: string;
}

export const getTweets = async (userId?: string) => {
    const response = await supabaseServer.from('tweets').select(`
        *,
        profiles (
            full_name,
            username
        ),
        likes (
            user_id
        )
    `)
        .order('created_at', {
            ascending: false
        })
        .returns<TweetReturnType[]>();

    const cleanedResponse: GetTweetsReturnType = {
        ...response,
        data: response.data ? response.data.map<TweetType>(tweet => mapResponseToTweetType(tweet, userId)) : []
    }

    return cleanedResponse;
}

const mapResponseToTweetType = (tweet: TweetReturnType, userId?: string) => {
    return {
        ...tweet,
        likesCount: tweet.likes.length,
        isLikedByUser: userId === undefined ? false : tweet.likes.some(like => like.user_id === userId)
    }
}

export const getTweetById = async (id: string, userId?: string) => {
    const response = await supabaseServer.from('tweets').select(`
        *,
        profiles (
            full_name,
            username
        ),
        likes (
            user_id
        )
    `)
        .eq("id", id)
        .returns<TweetReturnType>()
        .maybeSingle();

    if (response.data === null) return null;


    return mapResponseToTweetType(response.data, userId);
}