import { useState } from 'react'
import Button from '../../Button'
import IconClose from '../../icons/IconClose'
import Input from '@/components/Input'

const ModalEditUsername = ({
  handleCloseMdal,
  open = false,
  loading,
  username,
  setUsername,
  handleSubmit = () => {}
}) => {
  const handleClose = () => {
    handleCloseMdal(), setUsername('')
  }

  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-center ${
        open ? '' : 'opacity-0 invisible'
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-25"
        onClick={handleClose}
      ></div>

      <div className="relative z-30 bg-white w-[375px] rounded-lg p-5">
        <span
          onClick={handleClose}
          className="absolute top-[-15px] right-[-15px] bg-colorPrimary text-white   p-[5px] bg-gray-33  rounded-md  cursor-pointer"
        >
          <IconClose />
        </span>
        <form autoComplete="off">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            className="w-full font-bold pb-[5px] mb-5 border-gray-400 border-b-2 border-x-0 border-t-0 rounded-none"
            inputClass="placeholder:text-gray-76 "
            placeholder="Enter your username..."
          />
          <Button
            isLoading={loading}
            disabled={loading}
            type="submit"
            onClick={handleSubmit}
          >
            Update Username
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ModalEditUsername
