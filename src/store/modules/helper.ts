import { defineStore } from 'pinia'
import { store } from '/@/store'
import { getHelpers } from '/@/api/sys/sys'
import { objectToArraySelect } from '/@/utils'

interface HelperState {
  helpers: Nullable<Object>
}

export const useHelperStore = defineStore({
  id: 'app-helper',
  state: (): HelperState => ({
    helpers: null,
  }),
  getters: {
    getHelpers(): Nullable<Object> {
      return this.helpers
    },
    getWarehouseTypes() {
      if (this.helpers && this.helpers.warehouse) {
        return objectToArraySelect(this.helpers.warehouse.types)
      }

      return []
    },
    getSupplierTypes() {
      if (this.helpers && this.helpers.supplier) {
        return objectToArraySelect(this.helpers.supplier.types)
      }

      return []
    },
  },
  actions: {
    setHelpers(helpers: object | null) {
      this.helpers = helpers
    },

    resetState() {
      this.helpers = null
    },

    async fetchHelpers() {
      const response = await getHelpers()

      this.setHelpers(response.data)
    },
  },
})

// Need to be used outside the setup
export function useHelperStoreWithOut() {
  return useHelperStore(store)
}
