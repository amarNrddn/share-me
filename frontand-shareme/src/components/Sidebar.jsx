import React from 'react'
import logo from '../assets/logo.png'
import { HiMenu } from 'react-icons/hi'
import { Link, NavLink } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import { categories } from '../utils/data'

const Sidebar = ({ user, closeTogle }) => {
  const isNotActiveStyle = 'flex items-center px-5 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
  const isActiveStyle = 'flex items-center px-5 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

  const hendeleCloseSidebar = () => {
    if (closeTogle) closeTogle(false)
  }

  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar '>
      <div className="flex flex-col">
        <Link
          to='/'
          className='flex px-5 gap-2 pt-1 w-190  my-6 items-center'
          onClick={hendeleCloseSidebar}
        >
          {/* <img src={logo} className='w-full' /> */}
          <h1 className='font-bold text-[20px] text-red-500'>Sepecial Team</h1>
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={hendeleCloseSidebar}
          >
            <AiFillHome />
            Home
          </NavLink>
          <h3 className='mr-2 text-base px-5 2x1:text-xl'>Category</h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
              onClick={hendeleCloseSidebar}
              key={category.name}
            >
              <img src={category.image} className='w-8 h-8 rounded-full shadow-sm mr-2' />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>

      {user && (
        <div className="">
          <Link to={`user-profile/${user._id}`}
            className='flex my-5 mb-3 gap-2 p-2 items-center bg-white  shadow-lg mx-3 '
          >
            <img src={user.image} className='w-10 h-10 rounded-full' />
            <p>{user.userName}</p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Sidebar