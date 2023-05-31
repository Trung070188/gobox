import { BasicColumn } from '/@/components/Table/src/types/table'
import { useI18n } from '/@/hooks/web/useI18n'
import { DescItem } from '/@/components/Description/index'
const { t } = useI18n()

export const tableColumns: BasicColumn[] = [
  {
    title: t('views.supplier.id'),
    dataIndex: 'id',
    fixed: 'left',
    sorter: true,
  },
  {
    title: t('views.supplier.input_name'),
    dataIndex: 'name',
    fixed: 'left',
  },
  {
    title: t('views.supplier.input_phone'),
    dataIndex: 'phone',
    fixed: 'left',
  },
  {
    title: t('views.supplier.input_street'),
    dataIndex: 'address',
    fixed: 'left',
  },
  {
    title: t('views.supplier.input_type'),
    dataIndex: 'type',
    fixed: 'left',
    slots: { customRender: 'type' },
  },
  {
    title: t('views.supplier.created_at'),
    dataIndex: 'created_at',
    fixed: 'left',
    sorter: true,
    defaultSortOrder: 'descend',
  },
]

export const infoSchema: DescItem[] = [
  {
    label: t('views.supplier.input_name'),
    field: 'name',
  },
  {
    label: t('views.supplier.input_phone'),
    field: 'phone',
  },
  {
    label: t('views.supplier.input_street'),
    field: 'address',
  },
  {
    label: t('views.supplier.input_type'),
    field: 'type',
  },
  {
    label: t('views.supplier.created_at'),
    field: 'created_at',
  },
  {
    label: t('views.supplier.updated_at'),
    field: 'updated_at',
  },
]
