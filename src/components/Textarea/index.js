import React from 'react'

const Textarea = ({
  placeholder = '',
  name = '',
  value = '',
  className = '',
  onChange = () => {}
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full mt-5 outline-none pb-[5px] mb-[20px] border-gray-76 border-b-2 resize-none h-[160px] md:h-[220px] bg-transparent  ${className}`}
      placeholder={placeholder}
    ></textarea>
  )
}

export default Textarea
