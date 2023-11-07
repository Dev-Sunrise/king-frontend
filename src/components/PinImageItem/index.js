import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import IconClock from '../icons/IconClock'
import IconHeart from '../icons/IconHeart'
import IconUnHeart from '../icons/IconUnHeart'

const PinImageItem = ({ data, createFavorite = () => {} }) => {
  const { category, author, createdAt, favorites, image_url, title, _id } = data
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null

  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    favorites.filter((item) => {
      item == user?._id ? setFavorited(true) : setFavorited(false)
    })
  }, [favorites, user?._id])

  const handleCreateFavorite = () => {
    createFavorite(), setFavorited(true)
  }

  return (
    <div className="rounded-[14px] relative overflow-hidden bg-black w-full group ">
      {favorited ? (
        <button
          className={`absolute top-[10px] left-[10px] z-50 opacity-0 scale-[0.8] transition-all group-hover:scale-100 group-hover:opacity-100 text-red-e6 w-10 h-10 flex items-center justify-center bg-white rounded-lg cursor-not-allowed`}
        >
          <IconHeart />
        </button>
      ) : (
        <button
          onClick={user ? handleCreateFavorite : null}
          className={`absolute top-[10px] left-[10px] z-50 opacity-0 scale-[0.8] transition-all group-hover:scale-100 group-hover:opacity-100 hover:text-red-e6 text-gray-33 w-10 h-10 flex items-center justify-center bg-white rounded-lg ${
            !user ? 'cursor-not-allowed' : ''
          }`}
        >
          <IconUnHeart />
        </button>
      )}
      <div className="absolute top-[10px] right-[10px] z-10 flex flex-col items-end gap-y-[5px]">
        <div className=" bg-white-33 mb-[3px] px-3 rounded-[32px] text-[11px] text-white font-black capitalize flex items-center gap-x-[5px]">
          <span className="w-[11px] h-[11px] rounded-full border-blue-06 border-2"></span>
          <span>Image</span>
        </div>
        <Link href={`/profile/${author._id}`}>
          <picture>
            <source srcSet={author?.avatar_url.url} />
            <Image
              src={author?.avatar_url.url}
              width={0}
              height={0}
              alt="Avatar User"
              className="object-cover w-[30px] h-[30px] rounded-full"
            />
          </picture>
        </Link>
      </div>
      <Link href={`/detail/${_id}`}>
        <picture>
          <source srcSet={image_url?.url} />
          <Image
            src={image_url?.url}
            alt="Image"
            width={0}
            height={0}
            className="object-cover w-full h-full bg-center bg-no-repeat"
          ></Image>
        </picture>
      </Link>
      <div className="absolute opacity-0 text-white scale-[0.8] transition-all group-hover:scale-100 group-hover:opacity-100 rounded-[14px] z-10 p-3 bg-black-cc right-[10px] left-[10px] bottom-[10px]">
        <Link href={`/detail/${_id}`}>
          <h2 className="font-light capitalize leading-6 text-white line-clamp-1 text-[20px]">
            {title}
          </h2>
        </Link>
        <div className="flex items-center justify-between">
          <p className=" mt-[5px] text-xs max-w-[100px] text-colorGray-a8 line-clamp-1">
            {author?.username}
          </p>
          <p className=" mt-[5px] text-xs max-w-[100px] capitalize text-colorGray-a8 line-clamp-1">
            {category}
          </p>
        </div>
        <p className="text-[10px] flex items-center gap-x-[5px] text-colorGray-a8">
          <IconClock />
          {new Date(createdAt).toLocaleDateString('vi-VI')}
        </p>
      </div>
    </div>
  )
}

export default PinImageItem
