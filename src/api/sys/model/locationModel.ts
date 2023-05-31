export interface GetCityInfoModel {
  id: number
  name: string
  priority: number
  active: boolean
  active_txt: string
  created_at: string
  updated_at: string
}

export interface GetDistrictInfoModel {
  id: number
  name: string
  city_id: number
  priority: number
  active: boolean
  active_txt: string
  created_at: string
  updated_at: string
}

export interface GetWardInfoModel {
  id: number
  name: string
  district_id: number
  priority: number
  active: boolean
  active_txt: string
  created_at: string
  updated_at: string
}
