import React, { useState, useEffect } from 'react'

import MasonryLayout from './MasonryLayout'
import Spiner from './Spiner'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'

const Search = ({ search }) => {
  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (search) {
      setLoading(true)
      const query = searchQuery(search.toLowerCase())

      client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    }
  }, [search])

  return (
    <div>
      {loading && <Spiner massage='Loading...' />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && search !== '' && !loading &&(
        <div className='mt-10 text-center text-xl'> Not Items Found!...</div>
      )}
    </div>
  )
}

export default Search