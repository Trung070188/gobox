import { BasicColumn } from '/@/components/Table/src/types/table'
import { useI18n } from '/@/hooks/web/useI18n'
import { DescItem } from '/@/components/Description/index'
import { Tag } from 'ant-design-vue'
import { h } from 'vue'

const commonTagRender = (color: string) => (curVal) =>
  h(Tag, { color }, () => curVal)

const { t } = useI18n()

export const tableColumns: BasicColumn[] = [
  {
    title: t('views.warehouse.id'),
    dataIndex: 'id',
    fixed: 'left',
    sorter: true,
  },
  {
    title: t('views.warehouse.code'),
    dataIndex: 'code',
    fixed: 'left',
  },
  {
    title: t('views.warehouse.input_name'),
    dataIndex: 'name',
    fixed: 'left',
  },
  {
    title: t('views.warehouse.input_active'),
    dataIndex: 'active',
    fixed: 'left',
    slots: { customRender: 'active_txt' },
  },
  {
    title: t('views.warehouse.created_at'),
    dataIndex: 'created_at',
    fixed: 'left',
    sorter: true,
    defaultSortOrder: 'descend',
  },
]

export const infoSchema: DescItem[] = [
  {
    label: t('views.warehouse.code'),
    field: 'code',
    render: commonTagRender('blue'),
  },
  {
    label: t('views.warehouse.input_name'),
    field: 'name',
  },
  {
    label: t('views.warehouse.input_active'),
    field: 'active_txt',
  },
  {
    label: t('views.warehouse.input_street'),
    field: 'address.data.full_street',
  },
  {
    label: t('views.warehouse.input_owner'),
    field: 'owner',
  },
  {
    label: t('views.warehouse.input_phone'),
    field: 'phone',
  },
  {
    label: t('views.warehouse.created_at'),
    field: 'created_at',
  },
  {
    label: t('views.warehouse.updated_at'),
    field: 'updated_at',
  },
]
