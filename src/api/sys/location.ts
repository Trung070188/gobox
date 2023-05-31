import { defHttp } from '/@/utils/http/axios'

import {
  GetCityInfoModel,
  GetDistrictInfoModel,
  GetWardInfoModel,
} from './model/locationModel'

enum Api {
  Cities = '/api/cities',
  Districts = '/api/districts',
  Wards = '/api/wards',
}

export function getCities(params?: object) {
  return defHttp.get<GetCityInfoModel[]>({ url: Api.Cities, params: params })
}

export function createCity(data: object) {
  return defHttp.post({ url: Api.Cities, data: data })
}

export function getDistricts(params?: object) {
  return defHttp.get<GetDistrictInfoModel[]>({
    url: Api.Districts,
    params: params,
  })
}

export function getWards(params?: object) {
  return defHttp.get<GetWardInfoModel[]>({ url: Api.Wards, params: params })
}
