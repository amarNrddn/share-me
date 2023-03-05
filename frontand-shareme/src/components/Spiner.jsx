import React from 'react'
import {ColorRing} from 'react-loader-spinner'

const Spiner = ({ massage }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      <p className='text-center text-lg px-2'> {massage} </p>
    </div>
  )
}

export default Spiner