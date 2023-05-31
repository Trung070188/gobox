<!--<template>-->
<!--  <div>-->
<!--    <BasicTable @register="registerTable">-->
<!--      <template #toolbar>-->
<!--        <a-button type="primary" @click="handleCreate"> Thêm mới</a-button>-->
<!--      </template>-->
<!--      &lt;!&ndash; <template #bodyCell="{ column, record }">    -->
<!--        <template v-if="column.key === 'action'">-->
<!--          <TableAction-->
<!--            :actions="[-->
<!--              {-->
<!--                icon: 'clarity:note-edit-line',-->
<!--                onClick: handleEdit.bind(null, record),-->
<!--              },-->
<!--              {-->
<!--                icon: 'ant-design:delete-outlined',-->
<!--                color: 'error',-->
<!--                popConfirm: {-->
<!--                  title: '是否确认删除',-->
<!--                  placement: 'left',-->
<!--                  confirm: handleDelete.bind(null, record),-->
<!--                },-->
<!--              },-->
<!--            ]"-->
<!--          />-->
<!--        </template>-->
<!--      </template> &ndash;&gt;-->

<!--      <template #action="{ record }">-->
<!--        <TableAction-->
<!--          :actions="[-->
<!--            {-->
<!--              icon: 'clarity:note-edit-line',-->
<!--              onClick: handleEdit.bind(null, record),-->
<!--              // auth: 'other', // 根据权限控制是否显示: 无权限，不显示-->
<!--            },-->
<!--            {-->
<!--              icon: 'ic:outline-delete-outline',-->
<!--              color: 'error',-->
<!--                popConfirm: {-->
<!--                  title: 'Xóa',-->
<!--                  // placement: 'left',-->
<!--                  confirm: handleDelete.bind(null, record),-->
<!--                },-->
<!--              // onClick: handleDelete.bind(null, record),-->
<!--              // auth: 'super', // 根据权限控制是否显示: 有权限，会显示-->
<!--            },-->
<!--          ]"-->
<!--        />-->
<!--      </template>-->
<!--    </BasicTable>-->
<!--    <SupplierModal @register="registerModal" @success="handleSuccess" />-->
<!--  </div>-->
<!--</template>-->
<!--<script lang="ts">-->
<!--import { defineComponent} from 'vue'-->

<!--import { BasicTable, useTable, TableAction } from '/@/components/Table'-->
<!--import { useModal } from '/@/components/Modal'-->
<!--import SupplierModal from './SupplierModal.vue'-->
<!--import { $get, $delete } from '/@/utils'-->

<!--import { columns, searchFormSchema } from './dept.data'-->

<!--export default defineComponent({-->
<!--  name: 'DeptManagement',-->
<!--  components: { BasicTable, SupplierModal, TableAction },-->
<!--  setup() {-->
<!--    const [registerModal, { openModal }] = useModal()-->
<!--    const [registerTable, { reload }] = useTable({-->
<!--      title: 'Danh sách',-->
<!--      api: data,-->
<!--      columns,-->
<!--      formConfig: {-->
<!--        labelWidth: 120,-->
<!--        schemas: searchFormSchema,-->
<!--      },-->

<!--      pagination: false,-->
<!--      striped: false,-->
<!--      useSearchForm: true,-->
<!--      showTableSetting: true,-->
<!--      bordered: true,-->
<!--      showIndexColumn: false,-->
<!--      canResize: false,-->
<!--      actionColumn: {-->
<!--        width: 80,-->
<!--        title: 'Action',-->
<!--        dataIndex: 'action',-->
<!--        slots: { customRender: 'action' },-->
<!--        fixed: undefined,-->
<!--      },-->
<!--    })-->
<!--    async function data(params: Record<string, any>) {-->
<!--      console.log(params);-->
<!--      const res = await $get('/api/supplier', params)-->
<!--      return res.data.data-->
<!--    }-->
<!--    function handleCreate() {-->
<!--      openModal(true, {-->
<!--        isUpdate: false,-->
<!--      })-->
<!--    }-->

<!--    function handleEdit(record: Recordable) {-->
<!--      openModal(true, {-->
<!--        record,-->
<!--        isUpdate: true,-->
<!--      })-->
<!--    }-->

<!--    async function handleDelete(record: Recordable) {-->
<!--      await $delete(`/api/supplier/${record.id}`)-->
<!--    }-->

<!--    function handleSuccess() {-->
<!--      reload()-->
<!--    }-->
<!--    function handleOpen(record: Recordable) {-->
<!--    }-->

<!--    return {-->
<!--      registerTable,-->
<!--      registerModal,-->
<!--      handleCreate,-->
<!--      handleEdit,-->
<!--      handleDelete,-->
<!--      handleSuccess,-->
<!--      handleOpen,-->
<!--      data,-->
<!--    }-->
<!--  },-->
<!--})-->
<!--</script>-->
