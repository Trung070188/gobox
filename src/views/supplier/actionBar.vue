<template>
  <TableAction
    stopButtonPropagation
    :actions="tableAction(record)"
    :dropDownActions="dropDownAction(record)"
  />
</template>
<script lang="ts">
import { router } from '/@/router'
import {
  TableAction,
  actionDelete,
  actionDetail,
  actionUpdate,
  ActionItem,
} from '/@/components/Table'
import {deleteSupplier} from "/@/api/sys/supplier";
import { useMessage } from '/@/hooks/web/useMessage'
import { useI18n } from '/@/hooks/web/useI18n'

export default {
  components: { TableAction },
  props: {
    record: { type: Object, required: true },
    onActionSuccess: { type: Function },
    onDoingAction: { type: Function },
    mode: { type: String, default: 'table' },
  },
  setup(props) {
    const { notification } = useMessage()
    const { t } = useI18n()
    async function handleDelete(record: Recordable) {
      try {
        props.onDoingAction && props.onDoingAction(true)
        await deleteSupplier(record.id)
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
      tableAction: (record: Recordable) => {
        let actions: ActionItem[] = []
        if (
          props.mode == 'table' &&
          record.permissions &&
          record.permissions.can_show
        ) {
          actions.push(
            actionDetail(
              () =>
                router.push({
                  name: 'supplier-detail',
                  params: { id: record.id },
                }),
              props.mode == 'table'
            )
          )
        }

        if (record.permissions && record.permissions.can_update) {
          actions.push(
            actionUpdate(
              () =>
                router.push({
                  name: 'supplier-update',
                  params: { id: record.id },
                }),
              props.mode == 'table'
            )
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
    }
  },
}
</script>
