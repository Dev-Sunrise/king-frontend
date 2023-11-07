const Label = ({ children, name = '' }) => {
  return (
    <label
      htmlFor={name}
      className="font-bold capitalize transition-all cursor-pointer hover:text-red-e6"
    >
      {children}
    </label>
  )
}

export default Label
