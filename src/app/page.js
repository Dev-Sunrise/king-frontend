'use client'

import { createFavorite, getImages } from '@/api/config'
import PinImageItem from '@/components/PinImageItem'
import { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { toast } from 'react-toastify'

export default function Home() {
  const isBrowser = () => typeof window !== 'undefined'
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null

  const [ListImages, setListImages] = useState([])
  const [nextPage, setNextPage] = useState(1)

  useEffect(() => {
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const getAllImage = async (page) => {
    const images = await getImages('', page)
    setListImages([...ListImages, ...images])
  }

  useEffect(() => {
    getAllImage(nextPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPage])

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

  return (
    <section className="container-component">
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
