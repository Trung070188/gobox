/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string
  password: string
}

export interface RoleInfo {
  roleName: string
  value: string
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number
  token: string
  role: RoleInfo
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  id: number
  name: string
  email: string
  profile_photo_url: string
  created_at: string
  updated_at: string
  roles?: RoleInfo[]
}

/**
 * @description: Login interface parameters
 */
export interface LimLoginParams {
  access_token: string
  refresh_token: string
  expires_in: number
}
