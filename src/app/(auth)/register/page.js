'use client'

import { registerUser } from '@/api/config'
import Button from '@/components/Button'
import Field from '@/components/Field'
import Input from '@/components/Input'
import Label from '@/components/Label'
import UploadImage from '@/components/UploadImage'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import bgRegister from '/public/bg-register.jpg'

const Register = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (username <= 0) {
      toast.error('Please enter your username!')
      return
    }
    if (email <= 0) {
      toast.error('Please enter your email!')
      return
    }
    if (password <= 0) {
      toast.error('Please enter your password!')
      return
    }
    if (password.length < 8) {
      toast.error('Your password must be at least 8 characters or greater!')
      return
    }
    if (avatar <= 0) {
      toast.error('Please select your avatar!')
      return
    }

    setLoading(true)
    await registerUser(username.trim(), email.trim(), password.trim(), avatar)
    setLoading(false)
    toast.success('Register successfully!')
    router.push('/login')
  }

  return (
    <section className="container-component bg-[url('/bg-register.jpg')] bg-no-repeat bg-center bg-cover relative">
      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md p-[15px]">
        <div className="overflow-hidden bg-white dark:bg-black-14 rounded-[14px] flex items-center shadow-2xl lg:max-w-[860px] md:max-w-[500px] w-full max-h-[calc(90vh-60px)]">
          <div className="flex-shrink-0 hidden w-2/4 lg:block">
            <Image src={bgRegister} alt="Background Register"></Image>
          </div>
          <div className="flex-shrink-0 p-[15px] flex-1">
            <h3 className="mb-[18px] font-bold leading-[40px] text-[32px] capitalize text-center">
              Register page
            </h3>
            <form className="mb-5" autoComplete="off">
              <Field>
                <Label>Username</Label>
                <Input
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={'Enter your username...'}
                />
              </Field>
              <Field>
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={'Enter your email...'}
                />
              </Field>
              <Field>
                <Label>Password</Label>
                <Input
                  name="password"
                  hasIcon
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={'Enter your password...'}
                />
              </Field>
              <div className="flex flex-col items-center justify-center mb-5">
                <UploadImage
                  name="avatar"
                  onChange={handleUploadAvatar}
                  className="w-[150px] h-[150px]"
                  image={avatar}
                ></UploadImage>
              </div>
              <Button
                isLoading={loading}
                disabled={loading}
                type="submit"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </form>
            <p className="mb-[5px] pb-[5px] text-center">
              Do you already have an account?{' '}
              <Link href={'/login'} className="font-bold underline text-red-e6">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
