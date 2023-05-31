<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <FilterBar v-model="filter" @filter="handleFilter" />
    </template>
    <template #action="{ record }">
      <ActionBar
        mode="table"
        :record="record"
        @actionSuccess="afterActionSuccess"
      />
    </template>
  </BasicTable>
</template>
<script lang="ts">
import { BasicTable, useTable } from '/@/components/Table'
import { tableColumns } from './data'
import ActionBar from './actionBar.vue'
import FilterBar from './filterBar.vue'
import { ref } from 'vue'
import { removeEmptyObject } from '/@/utils'
import { useI18n } from '/@/hooks/web/useI18n'
import { useRoute } from 'vue-router'
import { getSuppliers } from '/@/api/sys/supplier'

export default {
  components: { BasicTable, ActionBar, FilterBar },
  setup() {
    const { t } = useI18n()

    const route = useRoute()

    const filter = ref({
      name: route.query.name || '',
      type: route.query.type || '',
      include: ['permissions'],
    })
    const [registerTable, { reload }] = useTable({
      api: getSuppliers,
      defSort: {
        sort: 'created_at:-1',
      },
      sortFn: (sort) => {
        return {
          sort: `${sort.field}:${sort.order == 'ascend' ? 1 : -1}`,
        }
      },
      searchInfo: removeEmptyObject(filter.value),
      fetchSetting: {
        listField: 'data',
        pageField: 'page',
        totalField: 'meta.pagination.total',
        sizeField: 'limit',
      },
      columns: tableColumns,
      pagination: { pageSize: 25 },
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
      handleFilter: async () => {
        console.log(filter.value);
        await reload({ page: 1, filterInfo: removeEmptyObject(filter.value) })
      },
      filter,
      afterActionSuccess: (action: string) => {
        switch (action) {
          case 'delete':
            reload({ page: 1 })
            break

          default:
            break
        }
      },
    }
  },
}
</script>
