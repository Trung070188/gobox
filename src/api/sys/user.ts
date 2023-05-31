import { defHttp, blankHttp } from '/@/utils/http/axios'
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
} from './model/userModel'

import { ErrorMessageMode } from '/#/axios'
import { useGlobSetting } from '/@/hooks/setting'

const globSetting = useGlobSetting()

enum Api {
  Login = '/login',
  Logout = '/api/logout',
  GetUserInfo = '/api/me',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export function loginApi(
  params: LoginParams,
  mode: ErrorMessageMode = 'modal'
) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  )
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return blankHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo, baseURL: globSetting.ssoUrl },
    { errorMessageMode: 'none' }
  )
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode })
}

export function doLogout() {
  return blankHttp.post({ url: Api.Logout, baseURL: globSetting.ssoUrl })
}
