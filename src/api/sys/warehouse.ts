import { defHttp } from '/@/utils/http/axios'

enum Api {
  Warehouses = '/api/warehouses',
}

export function createWarehouse(data: object, query?: object) {
  return defHttp.post({ url: Api.Warehouses, data: data, params: query })
}

export function updateWarehouse(id: number, data: object, query?: object) {
  return defHttp.put({
    url: `${Api.Warehouses}/${id}`,
    data: data,
    params: query,
  })
}

export function getWarehouse(id: number, query?: object) {
  return defHttp.get({ url: `${Api.Warehouses}/${id}`, params: query })
}

export function getWarehouses(query?: object) {
  return defHttp.get({ url: Api.Warehouses, params: query })
}

export function deleteWarehouse(id: number, query?: object) {
  return defHttp.delete({ url: `${Api.Warehouses}/${id}`, params: query })
}
