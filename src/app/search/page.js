'use client'

import { getImages } from '@/api/config'
import PinImageItem from '@/components/PinImageItem'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

export default function Search() {
  const isBrowser = () => typeof window !== 'undefined'
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null

  const [ListImages, setListImages] = useState([])
  const [nextPage, setNextPage] = useState(1)
  const [query, setQuery] = useState()

  useEffect(() => {
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const getAllImage = async (query, page) => {
    const images = await getImages(query, page)
    if (nextPage > 1) {
      setListImages([...ListImages, ...images])
    } else {
      setListImages(images)
    }
  }

  useEffect(() => {
    getAllImage(query, nextPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, nextPage])

  const handelScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setNextPage((prev) => prev + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handelScroll)
    return () => window.removeEventListener('scroll', handelScroll)
  }, [])

  const handleCreateFavorite = async (item) => {
    await createFavorite(user._id, item._id)
    toast.success('Create favorite image successfully!')
  }

  const handelSearchImage = debounce((e) => {
    setQuery(e.target.value)
    console.log('first')
  }, 500)

  return (
    <section className="container-component">
      <div className="mb-5 text-center ">
        <input
          type="text"
          onChange={handelSearchImage}
          className="bg-transparent max-w-[500px] w-full px-[10px] py-[10px] outline-none border-gray-ac border rounded-[5px] "
          placeholder="Enter your keywords..."
        />
      </div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 490: 1, 640: 3, 1024: 5 }}>
        <Masonry gutter="20px">
          {ListImages?.map((item, index) => (
            <PinImageItem
              key={index}
              data={item}
              createFavorite={() => handleCreateFavorite(item)}
            ></PinImageItem>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  )
}
