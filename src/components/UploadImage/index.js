import Image from 'next/image'
import IconUpload from '../icons/IconUpload'

const UploadImage = ({ className, name = '', onChange = () => {}, image }) => {
  return (
    <label
      className={`rounded-md overflow-hidden flex flex-col items-center justify-center ${className}`}
    >
      <input type="file" name={name} onChange={onChange} className="hidden" />
      {image ? (
        <Image
          width={0}
          height={0}
          className="w-full max-h-[460px] bg-center bg-no-repeat object-cover rounded-md"
          alt=""
          src={image}
        ></Image>
      ) : (
        <div className="flex items-center justify-center w-full h-full p-[15px] overflow-hidden rounded-md cursor-pointer bg-gray-ac">
          <div className="relative flex items-center justify-center w-full h-full text-white border-2 border-white border-dashed">
            <IconUpload />
          </div>
        </div>
      )}
    </label>
  )
}

export default UploadImage
