import React, { useState, useEffect, useRef } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import {  Link, Route, Routes } from 'react-router-dom'

import { Sidebar, UserProfile } from '../components'
import { client } from '../client'
import { userQuery } from '../utils/data'
import Pins from './Pins'
import logo from '../assets/logo.png'
import { fetchUser } from '../components/fetchUser'

const Home = () => {
  const [togleSidebar, setTogleSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null)

  const userInfo = fetchUser()

  useEffect(() => {
    const query = userQuery(userInfo?.googleId)

    client.fetch(query)
      .then((data) => {
        setUser(data[0])
      })
  }, [])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col transition-height h-screen duration-75 ease-in-out '>
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>

      <div className="flex md:hidden flex-row">
        <div className="flex flex-row justify-between p-2 w-full items-center shadow-md ">
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setTogleSidebar(true)} />
          <Link to='/'>
            {/* <img src={logo} className='w-28' /> */}
            <h1 className='font-bold text-[20px] text-red-500'>Sepecial Team</h1>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <div className="flex w-[4rem] h-[4rem] bg-red-400 rounded-full">
              <img src={user?.image} className='p-1 object-cover rounded-full' />
            </div>
          </Link>
        </div>

        {togleSidebar && (
          <div className='fixed w-4/5 h-screen overflow-y-auto bg-white shadow-md z-10 animate-slide-in'>
            <div className="absolute w-full flex justify-end items-center p-2 ">
              <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setTogleSidebar(false)} />
            </div>
            <Sidebar user={user && user} closeTogle={setTogleSidebar} />
          </div>
        )}
      </div>

      <div className="flex-1 pb-2 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes >
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home