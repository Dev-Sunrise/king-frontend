/* eslint-disable @next/next/no-img-element */
'use client'

import {
  deleteFavorite,
  deleteImage,
  getImagesByUser,
  getImagesFavoriteByUser,
  getUser,
  updateUserImage,
  updateUserUsername
} from '@/api/config'
import ModalEditUserImage from '@/components/Modal/ModalEditUserImage'
import ModalEditUsername from '@/components/Modal/ModalEditUsername'
import IconClock from '@/components/icons/IconClock'
import IconCreate from '@/components/icons/IconCreate'
import IconDelete from '@/components/icons/IconDelete'
import IconEdit from '@/components/icons/IconEdit'
import IconHeart from '@/components/icons/IconHeart'
import IconPenEdit from '@/components/icons/IconPenEdit'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { toast } from 'react-toastify'

export default function Profile() {
  const isBrowser = () => typeof window !== 'undefined'
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null

  const router = useRouter()
  const params = useParams()

  const [showModalAvatar, setShowModalAvatar] = useState(false)
  const [showModalUsername, setShowModalUsername] = useState(false)
  const [data, setData] = useState({})
  const [avatar, setAvatar] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [toggleTab, setToggleTab] = useState(1)
  const [createdImages, setCreatedImages] = useState([])
  const [favoritedImages, setFavoritedImages] = useState([])

  useEffect(() => {
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!user) router.push('/login')
  }, [router, user])

  const handleCloseMdal = () => {
    setShowModalAvatar(false)
    setShowModalUsername(false)
    setAvatar('')
  }

  const getAUser = async () => {
    const user = await getUser(params?.id)
    setData(user)
  }

  useEffect(() => {
    getAUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllCreatedImage = async () => {
    const images = await getImagesByUser(params?.id)
    setCreatedImages(images)
  }

  useEffect(() => {
    getAllCreatedImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllFavortedImage = async () => {
    const images = await getImagesFavoriteByUser(params?.id)
    setFavoritedImages(images)
  }

  useEffect(() => {
    getAllFavortedImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUploadAvatar = (e) => {
    const file = e.target.files[0]
    if (file?.size >= 80000) {
      toast.error('This image is too big!. Recommend: 600 or less')
      return
    }
    setFileToBase(file)
  }

  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader?.readAsDataURL(file)
    reader.onloadend = () => {
      setAvatar(reader.result)
    }
  }

  const handleUpdateAvatar = async () => {
    if (avatar <= 0) {
      toast.error('Please select your avatar!')
      return
    }
    try {
      setLoading(true)
      await updateUserImage(params?.id, avatar)
      setLoading(false)
      setShowModalAvatar(false)
      getAUser()
      toast.success('Update avatar successfully!')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateUsername = async () => {
    if (username <= 0) {
      toast.error('Please enter your username!')
      return
    }
    try {
      setLoading(true)
      await updateUserUsername(params?.id, username)
      setLoading(false)
      setShowModalUsername(false)
      setUsername('')
      getAUser()
      toast.success('Update username successfully!')
    } catch (error) {
      console.log(error)
    }
  }

  const handleToogleTab = (index) => {
    setToggleTab(index)
  }

  const handleDeleteCreatedImage = async (id) => {
    await deleteImage(id)
    getAllFavortedImage()
    toast.success('Delete created image successfully!')
  }

  const handleDeleteFavoritedImage = async (id) => {
    await deleteFavorite(params?.id, id)
    getAllFavortedImage()
    toast.success('Delete favorited image successfully!')
  }

  return (
    <section className="container-component">
      <div>
        <div className="flex justify-center mt-5">
          <div className="relative">
            <img
              src={!data ? '/avatar.png' : data?.avatar_url?.url}
              alt=""
              width={0}
              height={0}
              className="object-cover h-[200px] bg-center bg-no-repeat w-[200px] rounded-full border-4 border-gray-76 dark:border-white"
            ></img>
            {user?._id === params?.id && (
              <span
                onClick={() => setShowModalAvatar(true)}
                className="absolute bottom-0 right-[10px] cursor-pointer"
              >
                <IconEdit />
              </span>
            )}
          </div>
        </div>
        <div className="mt-[30px] text-center">
          <h2 className="relative inline-block text-2xl font-extrabold capitalize">
            {data?.username}
            {user?._id === params?.id && (
              <span
                onClick={() => setShowModalUsername(true)}
                className="absolute bottom-0 right-[-20px] cursor-pointer"
              >
                <IconPenEdit />
              </span>
            )}
          </h2>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-center mb-5 gap-x-5">
          <div
            onClick={() => handleToogleTab(1)}
            className={`px-[10px] py-[5px] flex items-center gap-x-[10px] cursor-pointer font-bold transition-all  ${
              toggleTab === 1
                ? 'border-b-red-e6 border-b-2 '
                : 'hover:bg-opacity-40 hover:bg-gray-ac rounded-md border-b-2 border-b-transparent'
            }`}
          >
            <IconCreate />
            Created
          </div>
          <div
            onClick={() => handleToogleTab(2)}
            className={`px-[10px] py-[5px] flex items-center gap-x-[10px] cursor-pointer font-bold transition-all  ${
              toggleTab === 2
                ? 'border-b-red-e6 border-b-2 '
                : 'hover:bg-opacity-40 hover:bg-gray-ac rounded-md border-b-2 border-b-transparent'
            }`}
          >
            <IconHeart />
            Favorited
          </div>
        </div>

        <div className="">
          <div className={`${toggleTab === 1 ? 'block' : 'hidden'}`}>
            {toggleTab === 1 && (
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 490: 1, 640: 3, 1024: 5 }}
              >
                <Masonry gutter="20px">
                  {createdImages?.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[14px] relative overflow-hidden bg-black w-full group "
                    >
                      {user?._id === params?.id && (
                        <button
                          onClick={() => handleDeleteCreatedImage(item._id)}
                          className="absolute top-[10px] left-[10px] z-50 opacity-0 scale-[0.8] transition-all group-hover:scale-100 group-hover:opacity-100 text-red-e6 w-10 h-10 flex items-center justify-center bg-white rounded-lg"
                        >
                          <IconDelete />
                        </button>
                      )}
                      <div className="absolute top-[10px] right-[10px] z-10 flex flex-col items-end gap-y-[5px]">
                        <div className=" bg-white-33 mb-[3px] px-3 rounded-[32px] text-[11px] text-white font-black capitalize flex items-center gap-x-[5px]">
                          <span className="w-[11px] h-[11px] rounded-full border-blue-06 border-2"></span>
                          <span>Image</span>
                        </div>
                      </div>
                      <Link href={`/detail/${item._id}`}>
                        <picture>
                          <source srcSet={item?.image_url?.url} />
                          <img
                            src={item?.image_url?.url}
                            alt="Image"
                            width={0}
                            height={0}
                            className="object-cover w-full h-full bg-center bg-no-repeat"
                          ></img>
                        </picture>
                      </Link>
                      <div className="absolute opacity-0 text-white scale-[0.8] transition-all group-hover:scale-100 group-hover:opacity-100 rounded-[14px] z-10 p-3 bg-black-cc right-[10px] left-[10px] bottom-[10px]">
                        <Link href={`/detail/${item?._id}`}>
                          <h2 className="font-light capitalize leading-6 text-white line-clamp-1 text-[20px]">
                            {item?.title}
                          </h2>
                        </Link>
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] flex items-center gap-x-[5px] text-colorGray-a8">
                            <IconClock />
                            {new Date(item?.createdAt).toLocaleDateString(
                              'vi-VI'
                            )}
                          </p>
                          <p className=" mt-[5px] text-xs max-w-[100px] capitalize text-colorGray-a8 line-clamp-1">
                            {item?.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            )}
          </div>

          <div className={`${toggleTab === 2 ? 'block' : 'hidden'}`}>
            {toggleTab === 2 && (
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 490: 1, 640: 3, 1024: 5 }}
              >
                <Masonry gutter="20px">
                  {favoritedImages?.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[14px] relative overflow-hidden bg-black w-full group "
                    >
                      {user?._id === params?.id && (
                        <button
                          onClick={() => handleDeleteFavoritedImage(item._id)}
                          className="absolute top-[10px] left-[10px] z-50 opacity-0 scale-[0.8] transition-all group-hover:scale-100 group-hover:opacity-100 text-red-e6 w-10 h-10 flex items-center justify-center bg-white rounded-lg"
                        >
                          <IconDelete />
                        </button>
                      )}
                      <div className="absolute top-[10px] right-[10px] z-10 flex flex-col items-end gap-y-[5px]">
                        <div className=" bg-white-33 mb-[3px] px-3 rounded-[32px] text-[11px] text-white font-black capitalize flex items-center gap-x-[5px]">
                          <span className="w-[11px] h-[11px] rounded-full border-blue-06 border-2"></span>
                          <span>Image</span>
                        </div>
                      </div>
                      <Link href={`/detail/${item._id}`}>
                        <picture>
                          <source srcSet={item?.image_url?.url} />
                          <img
                            src={item?.image_url?.url}
                            alt="Image"
                            width={0}
                            height={0}
                            className="object-cover w-full h-full bg-center bg-no-repeat"
                          ></img>
                        </picture>
                      </Link>
                      <div className="absolute opacity-0 text-white scale-[0.8] transition-all group-hover:scale-100 group-hover:opacity-100 rounded-[14px] z-10 p-3 bg-black-cc right-[10px] left-[10px] bottom-[10px]">
                        <Link href={`/detail/${item?._id}`}>
                          <h2 className="font-light capitalize leading-6 text-white line-clamp-1 text-[20px]">
                            {item?.title}
                          </h2>
                        </Link>
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] flex items-center gap-x-[5px] text-colorGray-a8">
                            <IconClock />
                            {new Date(item?.createdAt).toLocaleDateString(
                              'vi-VI'
                            )}
                          </p>
                          <p className=" mt-[5px] text-xs max-w-[100px] capitalize text-colorGray-a8 line-clamp-1">
                            {item?.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            )}
          </div>
        </div>
      </div>

      <ModalEditUserImage
        open={showModalAvatar}
        handleCloseMdal={handleCloseMdal}
        handleUploadAvatar={handleUploadAvatar}
        avatar={avatar}
        handleSubmit={handleUpdateAvatar}
        loading={loading}
      ></ModalEditUserImage>
      <ModalEditUsername
        open={showModalUsername}
        handleCloseMdal={handleCloseMdal}
        handleSubmit={handleUpdateUsername}
        setUsername={setUsername}
        loading={loading}
        username={username}
      ></ModalEditUsername>
    </section>
  )
}
