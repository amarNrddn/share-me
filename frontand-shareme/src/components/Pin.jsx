import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownload } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFileArrowUpFill } from 'react-icons/bs'

import { urlFor, client } from '../client'
import { fetchUser } from './fetchUser'

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
    const [postHovered, setPostHovered] = useState(false)
    const user = fetchUser()
    const Navigate = useNavigate()

    const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user.googleId))?.length

    const savePin = (id) => {
        if (!alreadySaved) {

            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user.googleId,
                    postedBy: {
                        type: 'postedBy',
                        _ref: user.googleId
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload()
                })
        }
    }

    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload()
            })
    }

    return (
        <div className='m-2' >
            <div className="cursor-zoom-in relative w-auto rounded-lg hover:shadow-lg overflow-hidden transition-all duration-200 ease-in-out"
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => Navigate(`/pin-detail/${_id}`)}
            >
                <img src={urlFor(image).width(250).url()} className='rounded-lg w-full' />
                {postHovered && (
                    <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                        style={{ height: '100%' }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.assets?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                >
                                    <MdDownload />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button type='button' className='bg-red-500 opacity-75 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                                    {save?.length} saved
                                </button>
                            ) : (
                                <button type='button'
                                    className='bg-red-500 opacity-75 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        savePin(_id)
                                    }}
                                >
                                    save
                                </button>
                            )}
                        </div>
                        <div className="flex justify-between w-full items-center gap-2">
                            {destination && (
                                <a
                                    href='destination'
                                    target='_blank'
                                    rel='noreferrer'
                                    className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md  '
                                >
                                    <BsFileArrowUpFill />
                                    {destination.length > 20 ? destination.slice(8, 20) : destination.slice(8)}
                                </a>
                            )}

                            {postedBy?._id === user.googleId && (
                                <button
                                    type='button'
                                    className='bg-white p-2 opacity-75 hover:opacity-100 text-dark text-base rounded-3xl hover:shadow-md outline-none'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deletePin(_id)
                                    }}
                                >
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
                <img src={postedBy?.image} className='w-8 h-8 rounded-full object-cover' />
                <p className='font-semibold text-black capitalize' > {postedBy?.userName} </p>
            </Link>
        </div>
    )
}

export default Pin