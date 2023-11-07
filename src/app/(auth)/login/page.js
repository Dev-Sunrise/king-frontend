'use client'

import { loginUser } from '@/api/config'
import Button from '@/components/Button'
import Field from '@/components/Field'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import bgLogin from '/public/bg-login.jpg'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email <= 0) {
      toast.error('Please enter your email!')
      return
    }
    if (password <= 0) {
      toast.error('Please enter your password!')
      return
    }

    try {
      setLoading(true)
      let res = await loginUser(email, password)
      localStorage.setItem('user', JSON.stringify(res))
      setLoading(false)
      toast.success('Login successfully!')
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="container-component bg-[url('/bg-login.jpg')] bg-no-repeat bg-center bg-cover relative">
      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md p-[15px]">
        <div className="overflow-hidden bg-white dark:bg-black-14 rounded-[14px] flex items-center shadow-2xl lg:max-w-[860px] md:max-w-[500px] w-full max-h-[calc(90vh-60px)]">
          <div className="flex-shrink-0 hidden w-2/4 lg:block">
            <Image src={bgLogin} alt="Background Register"></Image>
          </div>
          <div className="flex-shrink-0 p-[15px] flex-1">
            <h3 className="mb-[18px] font-bold leading-[40px] text-[32px] capitalize text-center">
              Login page
            </h3>
            <form className="mb-5" autoComplete="off">
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
              <Button
                isLoading={loading}
                disabled={loading}
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </form>
            <p className="mb-[5px] pb-[5px] text-center">
              You have not had an account?{' '}
              <Link
                href={'/register'}
                className="font-bold underline text-red-e6"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
