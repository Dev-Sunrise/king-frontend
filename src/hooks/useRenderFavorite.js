import { useEffect, useState } from 'react'

export default function userRenderFavorite(favorites) {
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [favorited, setFavorited] = useState(false)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    favorites?.filter((item) => {
      item == user?._id ? setFavorited(true) : setFavorited(false)
    })
  }, [favorites, user?._id])

  return {
    favorited,
    setFavorited
  }
}
