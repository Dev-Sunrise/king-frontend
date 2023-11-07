import LoadingButton from '../LoadingButton/Index'

const Button = ({
  children,
  isLoading = false,
  type = 'button',
  onClick = () => {},
  disabled,
  className = '',
  ...props
}) => {
  const child = !!isLoading ? <LoadingButton></LoadingButton> : children

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-white font-bold bg-red-e6 border transition-all border-red-e6 h-[40px] rounded-[5px] hover:bg-opacity-90 flex items-center justify-center gap-x-[10px] ${
        isLoading ? 'bg-transparent' : ''
      } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      {...props}
    >
      {child}
    </button>
  )
}

export default Button
