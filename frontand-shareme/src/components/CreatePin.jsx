import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { client } from '../client'
import Spiner from './Spiner'
import { categories } from '../utils/data'

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [fields, setFieleds] = useState(false)
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [worngImageType, setWorngImageType] = useState()


  const Navigate = useNavigate()

  const uploadImg = (e) => {
    const { type, name } = e.target.files[0]

    if (type === 'image/png' || type === 'image/svg' || type === 'image/gif' || type === 'image/tiff' || type === 'image/jpeg') {
      setWorngImageType(false)
      setLoading(true)

      client.assets
        .upload('image', e.target.files[0], { contentType: type, filename: name })
        .then((document) => {
          setImageAsset(document)
          setLoading(false)
        }).catch((error) => {
          console.log('image upload error', error)
        })

    } else {
      setWorngImageType(true)
    }
  }

  const savePin = () => {
    if (title && destination && about && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id
        },
        category,
      }

      client.create(doc)
        .then(() => {
          Navigate('/')
        })
    } else {
      setFieleds(true)

      setTimeout(() => {
        setFieleds(false)
      }, 2000)
    }
  }

  return (
    <div className="">
      {fields && (
        <p className='text-center text-red-500 mb-5 text-xl transition-all duration-150 ease-in '>Please fill in all the fields!</p>
      )}

      <div className='flex felx-col justify-center items-center mt-4 lg:h-4/5'>
        <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
          <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
            <div className="flex flex-col justify-center items-center border-2 border-dotted border-gray-300 p-3 w-full h-420">
              {loading && <Spiner />}
              {worngImageType && <p>Worng Image type</p>}
              {!imageAsset ? (
                <label>
                  <div className="flex flex-col justify-center items-center h-full">
                    <div className="flex flex-col justify-center items-center">
                      <p className='font-bold'>
                        <AiOutlineCloudUpload fontSize={25} className='font-bold' />
                      </p>
                      <p className='text-lg'> Click to Upload</p>
                      <div className="">
                        <p className='mt-32 text-gray-400'>
                          use height-quality JPG, SVG, GIF leas than 20MB
                        </p>
                      </div>
                      <div className="">
                        <input
                          type='file'
                          name='upload-image'
                          onChange={uploadImg}
                          className='w-0 h-0'
                        />
                      </div>
                    </div>
                  </div>
                </label>
              ) : (
                <div className='relative h-full'>
                  <img src={imageAsset?.url} className='h-full w-full' />
                  <button
                    type='button'
                    className='absolute bottom-3 right-3 p-3 bg-white cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out '
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='add your title here'
              className='outline-none  md:text-1xl font-bold border-b-2 border-gray-200 p-2'
            />
            {user && (
              <div className="flex items-center gap-2 rounded-lg my-2 bg-white ">
                <img src={user.image} className='w-10 h-10 rounded-full' />
                <p className='font-bold'>{user.userName}</p>

              </div>
            )}
            <input
              type='text'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder='What your pin about'
              className='outline-none  md:text-1xl border-b-2 border-gray-200 p-2'
            />
            <input
              type='text'
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder='Add a destination Link'
              className='outline-none  md:text-1xl border-b-2 border-gray-200 p-2'
            />
            <div className="flex flex-col">
              <div>
                <p className='font-semibold text-lg mb-2 sm:text-xl'>Pin Category</p>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
                >
                  <option value='outher' className='bg-white'>Select Categori</option>

                  {categories.map((category) => (
                    <option className='text-base border-0 capitalize outline-none bg-white text-black' value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end items-end mt-5">
                <button
                  onClick={savePin}
                  className='bg-red-500 text-white font-bold rounded-full w-28 outline-none p-2 '
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin