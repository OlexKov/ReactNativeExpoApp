export interface IUser {
    id: number
    firstName: string
    lastName: string
    email: string
    photo: string
    exp: number
    roles:string[]
}

export interface IUserState {
    user: IUser | null
    token: string | null
}

export interface ILogin {
    email: string
    password: string
}

export interface IUserCreate {
    firstName: string
    lastName: string
    email: string
    password: string
    imageUri: string | undefined
}
export interface ILoginResponse {
    token: string
}