import { defHttp } from '/@/utils/http/axios'

enum Api {
  Sys = '/api/sys',
}

export function getHelpers(query?: object) {
  return defHttp.get({ url: Api.Sys + '/helpers', params: query })
}
