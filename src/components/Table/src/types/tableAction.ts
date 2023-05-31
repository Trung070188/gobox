import { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'
import { TooltipProps } from 'ant-design-vue/es/tooltip/Tooltip'
import { RoleEnum } from '/@/enums/roleEnum'

import { useI18n } from '/@/hooks/web/useI18n'
const { t } = useI18n()

export interface ActionItem extends ButtonProps {
  onClick?: Fn
  label?: string
  color?: 'success' | 'error' | 'warning'
  icon?: string
  popConfirm?: PopConfirm
  disabled?: boolean
  divider?: boolean
  // 权限编码控制是否显示
  auth?: RoleEnum | RoleEnum[] | string | string[]
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean)
  tooltip?: string | TooltipProps
}

export interface PopConfirm {
  title: string
  okText?: string
  cancelText?: string
  confirm: Fn
  cancel?: Fn
  icon?: string
}

export const actionDelete: (handler: Fn, tooltip?: boolean) => ActionItem = (
  handler: Fn,
  tooltip?: boolean = false
) => {
  return {
    label: tooltip ? null : t('common.delete'),
    icon: 'mdi-trash-outline',
    color: 'error',
    popConfirm: {
      title: t('common.deleteConfirm'),
      confirm: handler,
    },
    tooltip: tooltip ? t('common.delete') : null,
  }
}

export const actionDetail: (handler: Fn, tooltip?: boolean) => ActionItem = (
  handler: Fn,
  tooltip?: boolean = false
) => {
  return {
    label: tooltip ? null : t('common.detail'),
    icon: 'mdi-eye-outline',
    color: 'info',
    onClick: handler,
    tooltip: tooltip ? t('common.detail') : null,
  }
}

export const actionUpdate: (handler: Fn, tooltip?: boolean) => ActionItem = (
  handler: Fn,
  tooltip?: boolean = false
) => {
  return {
    label: tooltip ? null : t('common.update'),
    icon: 'mdi-square-edit-outline',
    color: 'warning',
    onClick: handler,
    tooltip: tooltip ? t('common.update') : null,
  }
}
