import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'

const NavBar = ({ search, setSearch, user }) => {
  const naviget = useNavigate()

  if (!user) return null

  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white outline-none border-none focus-within:shadow-sm ">
        <IoMdSearch fontSize={21} className='ml-1' />
        <input
          type='text'
          onChange={(e) => setSearch(e.target.value)}
          placeholder='search'
          value={search}
          onFocus={() => naviget('/search')}
          className='p-2 w-full outline-none bg-white '
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
          <img src={user.image} className='h-12 w-14 rounded-lg' />
        </Link>
        <Link to='create-pin' className='bg-black text-white rounded-lg w-12 h-12 md:h-12 md:w-14 flex justify-center items-center  '>
          <IoMdAdd />
        </Link>
      </div>
    </div>
  )
}

export default NavBar