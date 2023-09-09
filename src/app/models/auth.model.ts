export interface SignUp  {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface Login  {
  email: string,
  password: string
}

export interface SignUpResponse {
  msj: string,
  person: Person,
  token: string
}

export interface LoginResponse {
  msj: string,
  person: Person,
}
export interface Person {
	email: string,
  fname: string,
  lname: string,
  id_person: number
  dc_susc?: string,
  id_susc?: number,
  tp_susc?: number,
}