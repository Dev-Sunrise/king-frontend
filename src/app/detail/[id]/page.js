/* eslint-disable @next/next/no-img-element */
'use client'

import { getImage, getImages } from '@/api/config'
import PinImageItem from '@/components/PinImageItem'
import IconHeart from '@/components/icons/IconHeart'
import { debounce } from 'lodash'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const Detail = () => {
  const isBrowser = () => typeof window !== 'undefined'
  const params = useParams()

  const [data, setData] = useState({})
  const [ListImages, setListImages] = useState([])
  const [nextPage, setNextPage] = useState(1)

  const getAImage = async () => {
    const image = await getImage(params.id)
    setData(image)
  }

  const getAllImage = debounce(async (query, page, limit) => {
    const images = await getImages(query, page, limit)
    setListImages([...ListImages, ...images])
  }, 100)

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

  useEffect(() => {
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    getAImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getAllImage(data?.category, nextPage, 10)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.category, nextPage])

  return (
    <section className="container-component">
      <div className="flex items-center justify-center mb-[60px]">
        <div className="max-w-[950px] md:max-h-[700px] min-h-[450px] flex-col md:flex-row w-full bg-white dark:bg-black-10 p-[15px] md:p-5 rounded-2xl overflow-hidden flex  gap-x-5 gap-y-[40px] md:gap-y-0 shadow-2xl">
          <div className="flex-shrink-0 md:w-[40%]  flex items-center">
            <img
              alt=""
              width={0}
              height={0}
              className="w-full h-auto rounded-lg"
              src={data?.image_url?.url}
            />
          </div>
          <div className="flex-1 flex-shrink-0 overflow-y-auto max-h-[500px] ">
            <h2 className="mb-[10px] text-4xl font-bold capitalize md:mb-5">
              {data?.title}
            </h2>
            <div className="flex items-center justify-between  mb-[10px]">
              <p className="text-sm ">
                {new Date(data?.createdAt).toLocaleDateString('vi-VI')}
              </p>
              <p className="capitalize ">{data?.category}</p>
            </div>
            <div className="flex items-center mb-5 gap-x-[10px]">
              <IconHeart />
              {data?.favorites?.length}
            </div>
            <div className="flex mb-5">
              <Link
                href={`/profile/${data?.author?._id}`}
                className="flex items-center gap-x-5"
              >
                <img
                  src={data?.author?.avatar_url?.url}
                  width={0}
                  height={0}
                  alt="Avatar User"
                  className="object-cover w-[50px] h-[50px] rounded-full"
                />
                <p className="text-lg font-bold">{data?.author?.username}</p>
              </Link>
            </div>
            <p className="text-sm">{data?.description}</p>
          </div>
        </div>
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

export default Detail
