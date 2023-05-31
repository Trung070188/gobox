import { defHttp } from '/@/utils/http/axios'
import {GetSupplierInfoModel} from "/@/api/sys/model/supplierModel";

enum Api {
  Supplier = '/api/supplier',
}

export function createSupplier(data: object, query?: object) {
  return defHttp.post({ url: Api.Supplier, data: data, params: query })
}

export function updateSupplier(id: number, data: object, query?: object) {
  return defHttp.put({
    url: `${Api.Supplier}/${id}`,
    data: data,
    params: query,
  })
}

export function getSupplier(id: number, query?: object) {
  return defHttp.get({ url: `${Api.Supplier}/${id}`, params: query })
}

export function getSuppliers(query?: object) {
  return defHttp.get({ url: Api.Supplier, params: query })
}

export function deleteSupplier(id: number, query?: object) {
  return defHttp.delete({ url: `${Api.Supplier}/${id}`, params: query })
}

export function getSupplierCreate(params?: object) {
  return defHttp.get<GetSupplierInfoModel[]>({ url: Api.Supplier, params: params })
}

