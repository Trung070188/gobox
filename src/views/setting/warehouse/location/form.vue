<template>
  <BasicForm @register="registerForm" :schemas="schemas" />
</template>
<script lang="ts">
import { BasicForm, useForm } from '/@/components/Form'
import { useI18n } from '/@/hooks/web/useI18n'
import { onMounted } from 'vue'
import { useHelperStore } from '/@/store/modules/helper'

export default {
  components: { BasicForm },
  props: {
    onSubmit: { type: Function },
    submitting: { type: Boolean, default: false },
    initValue: { type: Object },
    warehouse: { type: Object, required: true },
  },
  setup(props) {
    const { t } = useI18n()
    const helperStore = useHelperStore()

    const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
      layout: 'horizontal',
      submitFunc: handleSubmit,
      actionColOptions: { span: 24 },
      labelCol: { span: 4 },
      labelAlign: 'left',
      submitButtonOptions: {
        loading: props.submitting,
        disabled: props.submitting,
      },
    })
    //表单提交
    async function handleSubmit() {
      const data = await validate()
      props.onSubmit(data)
    }

    onMounted(() => {
      if (props.initValue && props.initValue.id) {
        let _initValue = { ...props.initValue }
        _initValue.active = !!_initValue.active
        _initValue.type += ''
        setFieldsValue(_initValue)
      }
    })

    return {
      registerForm,
      handleSubmit,
      resetFields,
      schemas: [
        {
          field: 'name',
          component: 'Input',
          label: t('views.warehouse_location.input_name'),
          rules: [{ required: true }],
          componentProps: {
            placeholder: t('views.warehouse_location.input_name'),
          },
          defaultValue: props.warehouse.code + '-',
        },
        {
          field: 'code',
          component: 'Input',
          label: t('views.warehouse_location.input_code'),
          componentProps: {
            placeholder: t('views.warehouse_location.input_code'),
          },
          defaultValue: props.warehouse.code + '-',
        },
        {
          field: 'type',
          component: 'Select',
          label: t('views.warehouse_location.input_type'),
          rules: [{ required: true }],
          componentProps: {
            placeholder: t('views.warehouse_location.input_type'),
            options: helperStore.getWarehouseTypes,
          },
          defaultValue: '1',
        },
        {
          field: 'active',
          component: 'Checkbox',
          label: t('views.warehouse_location.input_active'),
          componentProps: {
            placeholder: t('views.warehouse_location.input_active'),
          },
          defaultValue: true,
        },
      ],
    }
  },
}
</script>
