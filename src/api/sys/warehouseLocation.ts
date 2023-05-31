import { defHttp } from '/@/utils/http/axios'

enum Api {
  WarehouseLocation = '/api/warehouse-locations',
}

export function createWarehouseLocation(data: object, query?: object) {
  return defHttp.post({ url: Api.WarehouseLocation, data: data, params: query })
}

export function updateWarehouseLocation(
  id: number,
  data: object,
  query?: object
) {
  return defHttp.put({
    url: `${Api.WarehouseLocation}/${id}`,
    data: data,
    params: query,
  })
}

export function getWarehouseLocation(id: number, query?: object) {
  return defHttp.get({ url: `${Api.WarehouseLocation}/${id}`, params: query })
}

export function getWarehouseLocations(query?: object) {
  return defHttp.get({ url: Api.WarehouseLocation, params: query })
}

export function deleteWarehouseLocation(id: number, query?: object) {
  return defHttp.delete({
    url: `${Api.WarehouseLocation}/${id}`,
    params: query,
  })
}
