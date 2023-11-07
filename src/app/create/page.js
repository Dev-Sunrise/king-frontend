'use client'

import { createImage } from '@/api/config'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import UploadImage from '@/components/UploadImage'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Create = () => {
  const isBrowser = () => typeof window !== 'undefined'
  const router = useRouter()

  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')

  useEffect(() => {
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (!user) router.push('/login')
  }, [router, user])

  const handleUploadImage = (e) => {
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
      setImage(reader.result)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title === '') {
      toast.error('Please enter your title!')
      return
    }
    if (category === '') {
      toast.error('Please enter your category!')
      return
    }
    if (image <= 0) {
      toast.error('Please select your image!')
      return
    }

    try {
      setLoading(true)
      await createImage(
        title.trim(),
        category.trim().toLowerCase(),
        description.trim(),
        image,
        user._id
      )
      setLoading(false)
      toast.success('Create image successfully!')
      setTitle('')
      setCategory('')
      setDescription('')
      setImage('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="flex items-center justify-center container-component">
      <div className="max-w-[800px] flex-col md:flex-row overflow-auto w-full bg-white dark:bg-black-10 p-[15px] md:p-5 rounded-2xl flex items-center gap-x-5 gap-y-[40px] md:gap-y-0 shadow-2xl ">
        <UploadImage
          onChange={handleUploadImage}
          image={image}
          className="max-w-[270px] flex-shrink-0 overflow-hidden w-full h-[460px]"
        ></UploadImage>
        <form className="flex flex-col items-end" autoComplete="off">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            className="text-4xl w-full font-bold pb-[5px] mb-[5px] border-gray-800 border-b-2 border-x-0 border-t-0 rounded-none dark:border-white leading-4"
            inputClass="placeholder:text-gray-76 dark:placeholder:text-white"
            placeholder="Create Title..."
          />
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="w-full md:w-[180px] font-bold pb-[5px] mb-[5px] border-gray-400 border-b-2 border-x-0 border-t-0 rounded-none dark:border-white mt-5"
            inputClass="placeholder:text-gray-76 dark:placeholder:text-white"
            placeholder="Create Category..."
          />

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            className="dark:placeholder:text-white dark:border-white "
            placeholder="Description..."
          ></Textarea>
          <Button
            isLoading={loading}
            disabled={loading}
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Create
