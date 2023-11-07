const loading = () => {
  return (
    <div className="flex items-center w-full h-[calc(100vh-76px)] justify-center">
      <div className="loader">
        <div className="inner one" />
        <div className="inner two" />
        <div className="inner three" />
      </div>
    </div>
  )
}

export default loading
