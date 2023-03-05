import React, { useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spiner from './Spiner'

const randomImg = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [pins, setPins] = useState(null)
  const [text, setText] = useState('created')
  const [activeBtn, setActiveBtn] = useState('created')
  const Navigate = useNavigate()
  const { userId } = useParams()

  const activeBtnStyle = 'bg-red-500 text-white rounded-full font-bold p-2 w-20 outline-none'
  const notActiveBtnStyle = 'bg-primary mr-4 text-black rounded-full font-bold p-2 w-20 outline-none'

  useEffect(() => {
    if (text === 'created') {
      const createdPinsQuery = userCreatedPinsQuery(userId)

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data)
        })
    } else {
      const savePinsQuery = userSavedPinsQuery(userId)

      client.fetch(savePinsQuery)
        .then((data) => {
          setPins(data)
        })
    }
  }, [text, userId])

  const logout = () => {
    localStorage.clear()
    Navigate('/login')
  }

  useEffect(() => {
    const query = userQuery(userId)

    client.fetch(query)
      .then((data) => {
        setUser(data[0])
      })
  }, [userId])

  if (!user) return <Spiner massage='Loding Profile...' />

  return (
    <div className='relative pb-2 justify-center items-center h-full'>
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImg}
              className='w-full h-370 2xl:510 shadow-lg object-cover'
            />
            <img
              className='rounded-full w-20 h-20 object-cover -mt-10 shadow-xl '
              src={user.image}
            />
            <h1 className='font-bold text-3xl mt-3 text-center '>{user.userName}</h1>
            <div className="absolute top-0 right-0 p-2 z-1">
              {userId === user._id && (
                <GoogleLogout
                  clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout color="red" fontSize={21} />
                    </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy="single_host_origin"
                />
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textConten)
                setActiveBtn('created')
              }}
              className={`${activeBtn === 'created' ? activeBtnStyle : notActiveBtnStyle}`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textConten)
                setActiveBtn('save')
              }}
              className={`${activeBtn === 'save' ? activeBtnStyle : notActiveBtnStyle}`}
            >
              Save
            </button>
          </div>

          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className='flex justify-center items-center w-full mt-2 font-bold text-3xl'>
              No Post Found!
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default UserProfile