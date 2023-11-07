import React, { useState } from 'react'
import UploadImage from '../../UploadImage'
import Button from '../../Button'
import { toast } from 'react-toastify'
import IconClose from '../../icons/IconClose'

const ModalEditUserImage = ({
  handleCloseMdal = () => {},
  handleUploadAvatar = () => {},
  open = false,
  avatar = '',
  loading,
  handleSubmit = () => {}
}) => {
  const handleClose = () => {
    handleCloseMdal()
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
        <div className="flex items-center justify-center mb-5">
          <UploadImage
            name="avatar"
            onChange={handleUploadAvatar}
            className="w-[200px] h-[200px]"
            image={avatar}
          ></UploadImage>
        </div>
        <Button
          isLoading={loading}
          disabled={loading}
          type="submit"
          onClick={handleSubmit}
        >
          Update Avatar
        </Button>
      </div>
    </div>
  )
}

export default ModalEditUserImage
