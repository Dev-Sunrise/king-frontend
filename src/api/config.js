import axios from './axios'

// auth
const registerUser = (username, email, password, avatar_url) => {
  return axios.post('api/auth/register', {
    username,
    email,
    password,
    avatar_url
  })
}

const loginUser = (email, password) => {
  return axios.post('api/auth/login', {
    email,
    password
  })
}

// user
const getUser = (id) => {
  return axios.get(`api/user/${id}`)
}

const updateUserImage = (id, avatar_url) => {
  return axios.put(`api/user/update/${id}`, { avatar_url })
}

const updateUserUsername = (id, username) => {
  return axios.put(`api/user/update/${id}`, { username })
}

const createFavorite = (authorId, imageId) => {
  return axios.post('api/user/favorite', { authorId, imageId })
}

const deleteFavorite = (authorId, imageId) => {
  return axios.patch('api/user/unfavorite', { authorId, imageId })
}

// Image
const createImage = (title, category, description, image_url, author) => {
  return axios.post('api/image/create', {
    title,
    category,
    description,
    image_url,
    author
  })
}

const getImages = (query = '', page = 1, limit = 30) => {
  return axios.get(`api/image/all?query=${query}&page=${page}&limit=${limit}`)
}

const getImage = (id) => {
  return axios.get(`api/image/${id}`)
}

const getImagesByUser = (idUser) => {
  return axios.get(`/api/image/byAuthor/${idUser}`)
}

const getImagesFavoriteByUser = (idUser) => {
  return axios.get(`/api/image/favoriteByAuthor/${idUser}`)
}

const deleteImage = (id) => {
  return axios.delete(`/api/image/delete/${id}`)
}

export {
  createFavorite,
  createImage,
  deleteFavorite,
  deleteImage,
  getImage,
  getImages,
  getImagesByUser,
  getImagesFavoriteByUser,
  getUser,
  loginUser,
  registerUser,
  updateUserImage,
  updateUserUsername
}
