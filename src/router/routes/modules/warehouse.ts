import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const warehouse: AppRouteModule = {
  path: '/warehouse',
  name: 'm-warehouses',
  component: LAYOUT,
  redirect: '/warehouses/incomes',
  meta: {
    orderNo: 10,
    icon: 'mdi:warehouse',
    title: t('routes.warehouse.warehouse'),
  },
  children: [
    {
      path: 'incomes',
      name: 'warehouse-income',
      component: () => import('/@/views/warehouse/income/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.warehouse.income'),
      },
    },
    {
      path: 'outgoings',
      name: 'warehouse-outgoing',
      component: () => import('/@/views/warehouse/outgoing/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.warehouse.outgoing'),
      },
    },
  ],
}

export default warehouse
