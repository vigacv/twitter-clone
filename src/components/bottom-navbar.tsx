import Link from 'next/link'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiHomeCircle } from 'react-icons/bi'
import { BsBell, BsEnvelope } from 'react-icons/bs'

const NAVIGATION_ITEMS = [
    {
        title: 'Home',
        icon: BiHomeCircle
    },
    {
        title: 'Search',
        icon: AiOutlineSearch
    },
    {
        title: 'Notifications',
        icon: BsBell
    },
    {
        title: 'Messages',
        icon: BsEnvelope
    }
]


const BottomNavBar = () => {
    return (
        <div className='sticky bottom-0 h-[53px] bg-black border-gray-600 border-t-2 md:hidden'>
            <nav className='flex items-center justify-around h-full'>
                {
                    NAVIGATION_ITEMS.map((item) => (
                        <Link
                            className='hover:bg-white/10 text-2xl transition duration-200 flex 
                  items-center justify-start w-fit space-x-2 rounded-3xl p-2 text-white'
                            href={item.title === "Home" ? "/" : `/${item.title.toLowerCase()}`}
                            key={item.title}>
                            <div>
                                <item.icon />
                            </div>
                        </Link>
                    ))
                }
            </nav>
        </div>
    )
}

export default BottomNavBar