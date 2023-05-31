<template>
  <TableAction
    stopButtonPropagation
    :actions="tableAction(record)"
    :dropDownActions="dropDownAction(record)"
  />

  <BasicModal
    @register="register"
    :title="
      [$t('common.update'), $t('views.warehouse_location.name')].join(' ')
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
      @submit="handlerUpdate"
      :submitting="loading"
      :initValue="record"
    />
  </BasicModal>
</template>
<script lang="ts">
import {
  TableAction,
  actionDelete,
  actionUpdate,
  ActionItem,
} from '/@/components/Table'
import { useModal, BasicModal } from '/@/components/Modal'
import {
  deleteWarehouseLocation,
  updateWarehouseLocation,
} from '/@/api/sys/warehouseLocation'
import { useMessage } from '/@/hooks/web/useMessage'
import { useI18n } from '/@/hooks/web/useI18n'
import LocationForm from './form.vue'
import { ref } from 'vue'

export default {
  components: { TableAction, BasicModal, LocationForm },
  props: {
    record: { type: Object, required: true },
    onActionSuccess: { type: Function },
    onDoingAction: { type: Function },
    mode: { type: String, default: 'table' },
    warehouse: { type: Object, required: true },
  },
  setup(props) {
    const { notification } = useMessage()
    const { t } = useI18n()
    const [register, { openModal, closeModal }] = useModal()
    const loading = ref(false)
    async function handleDelete(record: Recordable) {
      try {
        props.onDoingAction && props.onDoingAction(true)
        await deleteWarehouseLocation(record.id)
        notification.success({
          message: t('common.deleteSuccess'),
          duration: 3,
        })
        props.onActionSuccess && props.onActionSuccess('delete')
      } catch (error) {
        throw error
      } finally {
        props.onDoingAction && props.onDoingAction(false)
      }
    }

    return {
      register,
      loading,
      tableAction: (record: Recordable) => {
        let actions: ActionItem[] = []

        if (record.permissions && record.permissions.can_update) {
          actions.push(
            actionUpdate(() => {
              openModal()
            }, props.mode == 'table')
          )
        }

        return actions
      },
      dropDownAction: (record: Recordable) => {
        let actions: ActionItem[] = []

        if (record.permissions && record.permissions.can_delete) {
          actions.push(actionDelete(handleDelete.bind(null, record)))
        }
        return actions
      },
      handlerUpdate: async (data: object) => {
        loading.value = true
        data.warehouse_id = props.warehouse.id
        props.onDoingAction && props.onDoingAction(true)
        try {
          await updateWarehouseLocation(props.record.id as number, data)
          notification.success({
            message: t('common.updateSuccess'),
            duration: 3,
          })
          closeModal()
          props.onActionSuccess && props.onActionSuccess('update')
        } catch (error) {
        } finally {
          loading.value = false
          props.onDoingAction && props.onDoingAction(false)
        }
      },
    }
  },
}
</script>
