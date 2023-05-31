import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const setting: AppRouteModule = {
  path: '/setting',
  name: 'seting',
  component: LAYOUT,
  redirect: '/setting/warehouses',
  meta: {
    orderNo: 10,
    icon: 'mdi:cog',
    title: t('routes.setting.setting'),
  },
  children: [
    {
      path: 'warehouses',
      name: 'warehouses',
      component: () => import('/@/views/setting/warehouse/index.vue'),
      meta: {
        title: t('views.warehouse.name'),
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'create',
          name: 'warehouse-create',
          component: () => import('/@/views/setting/warehouse/create.vue'),
          meta: {
            title: t('common.create'),
            hideTab: true,
          },
        },
        {
          path: 'update/:id',
          name: 'warehouse-update',
          component: () => import('/@/views/setting/warehouse/update.vue'),
          meta: {
            title: t('common.update'),
            hideTab: true,
          },
        },
        {
          path: ':id',
          name: 'warehouse-detail',
          component: () => import('/@/views/setting/warehouse/detail.vue'),
          meta: {
            title: t('common.detail'),
            hideTab: true,
          },
        },
      ],
    },
    {
      path: 'supplier',
      name: 'supplier',
      component: () => import('/@/views/supplier/supplier.vue'),
      meta: {
        title: t('routes.supplier.supplier'),
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'create',
          name: 'supplier-create',
          component: () => import('/@/views/supplier/create.vue'),
          meta: {
            title: t('common.create'),
            hideTab: true,
          },
        },
        {
          path: 'update/:id',
          name: 'supplier-update',
          component: () => import('/@/views/supplier/update.vue'),
          meta: {
            title: t('common.update'),
            hideTab: true,
          },
        },
        {
          path: ':id',
          name: 'supplier-detail',
          component: () => import('/@/views/supplier/detail.vue'),
          meta: {
            title: t('common.detail'),
            hideTab: true,
          },
        },
      ],
    },
  ],
}

export default setting
