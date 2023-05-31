<template>
  <BasicTable
    @register="registerTable"
    :title="$t('views.warehouse_location.name')"
  >
    <template #toolbar> <slot name="toolbar"></slot> </template>

    <template #active_txt="{ record }">
      <Tag :color="record.active ? 'green' : 'red'">{{
        record.active_txt
      }}</Tag>
      &nbsp;
      <Tag color="green" v-if="record.is_main">{{ record.is_main_txt }}</Tag>
    </template>

    <template #action="{ record }">
      <ActionBar
        mode="table"
        :record="record"
        :warehouse="warehouse"
        @actionSuccess="afterActionSuccess"
      />
    </template>
  </BasicTable>
</template>
<script lang="ts">
import { BasicTable, useTable } from '/@/components/Table'
import { getWarehouseLocations } from '/@/api/sys/warehouseLocation'
import { tableColumns } from './data'
import ActionBar from './actionBar.vue'
import { Tag } from 'ant-design-vue'
import { useI18n } from '/@/hooks/web/useI18n'
export default {
  components: { BasicTable, ActionBar, Tag },
  props: { warehouse: { type: Object, required: true } },
  setup(props) {
    const { t } = useI18n()

    const [registerTable, { reload }] = useTable({
      api: getWarehouseLocations,
      pagination: false,
      defSort: {
        sort: 'created_at:-1',
      },
      sortFn: (sort) => {
        return {
          sort: `${sort.field}:${sort.order == 'ascend' ? 1 : -1}`,
        }
      },
      searchInfo: {
        warehouse_id: props.warehouse.id,
        include: ['permissions'],
        limit: -1,
      },
      fetchSetting: {
        listField: 'data',
        pageField: 'page',
        totalField: 'meta.pagination.total',
        sizeField: 'limit',
      },
      columns: tableColumns,
      rowKey: 'id',
      showIndexColumn: false,
      actionColumn: {
        width: 160,
        title: t('common.action'),
        fixed: 'right',
        slots: { customRender: 'action' },
      },
    })

    return {
      registerTable,
      reload,
      afterActionSuccess: (action: string) => {
        switch (action) {
          case 'delete':
            reload({ page: 1 })
            break
          case 'update':
            reload()
            break

          default:
            break
        }
      },
    }
  },
}
</script>
