export interface User {
  email: string,
  password: string
}

export interface Nav {
  link: string,
  name: string
}

export interface Category {
  name: string,
  imageSrc?: string,
  user?: string,
  _id?: string
}
