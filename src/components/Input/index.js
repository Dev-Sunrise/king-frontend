'use client'

import { useState } from 'react'
import IconCloseEye from '../icons/IconCloseEye'
import IconOpenEye from '../icons/IconOpenEye'

const Input = ({
  hasIcon = false,
  name = '',
  type = 'text',
  onChange = () => {},
  placeholder = '',
  className = '',
  inputClass = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(true)

  return (
    <div
      className={`w-full gap-x-[5px] px-[10px] py-[5px] flex items-center border-gray-ac border rounded-[5px] overflow-hidden ${className}`}
    >
      <input
        type={hasIcon ? (showPassword ? 'password' : 'text') : type}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-transparent outline-none ${inputClass}`}
        {...props}
      />
      {hasIcon && (
        <>
          {showPassword ? (
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-colorGray-a8"
            >
              <IconCloseEye />
            </span>
          ) : (
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer text-colorGray-a8"
            >
              <IconOpenEye />
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default Input
