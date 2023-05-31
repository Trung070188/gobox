<template>
  <div v-loading="loading">
    <PaginateTable :warehouse="warehouse" ref="table">
      <template #toolbar>
        <CreateButton @click="openModal" />

        <BasicModal
          @register="register"
          :title="
            [$t('common.create'), $t('views.warehouse_location.name')].join(' ')
          "
          width="50%"
          :showOkBtn="false"
          :showCancelBtn="false"
          :footer="null"
          v-loading="loading"
        >
          <LocationForm
            ref="newForm"
            :warehouse="warehouse"
            @submit="handlerNew"
            :submitting="loading"
          />
        </BasicModal>
      </template>
    </PaginateTable>
  </div>
</template>
<script lang="ts">
import { CreateButton } from '/@/components/Button'
import PaginateTable from './paginateTable.vue'
import { useModal, BasicModal } from '/@/components/Modal'
import LocationForm from './form.vue'
import { ref } from 'vue'
import { useMessage } from '/@/hooks/web/useMessage'
import { useI18n } from '/@/hooks/web/useI18n'
import { createWarehouseLocation } from '/@/api/sys/warehouseLocation'

export default {
  components: { CreateButton, PaginateTable, BasicModal, LocationForm },
  props: { warehouse: { type: Object, required: true } },
  setup(props) {
    const [register, { openModal, closeModal }] = useModal()
    const loading = ref(false)
    const { notification } = useMessage()
    const { t } = useI18n()
    const table = ref(null)
    const newForm = ref(null)

    return {
      register,
      openModal,
      handlerNew: async (data: object) => {
        data.warehouse_id = props.warehouse.id
        data.code = data.code == props.warehouse.code + '-' ? '' : data.code
        loading.value = true
        try {
          await createWarehouseLocation(data)
          notification.success({
            message: t('common.createSuccess'),
            duration: 3,
          })
          closeModal()
          table.value.reload({ page: 1 })
          newForm.value.resetFields()
        } catch (error) {
          throw error
        } finally {
          loading.value = false
        }
      },
      loading,
      table,
      newForm,
    }
  },
}
</script>
