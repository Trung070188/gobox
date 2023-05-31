<template>
  <BasicForm @register="registerForm" :schemas="schemas" />
</template>
<script lang="ts">
import { BasicForm, useForm, FormSchema } from '/@/components/Form'
import { useI18n } from '/@/hooks/web/useI18n'
import { getCities, getDistricts, getWards } from '/@/api/sys/location'
import { onMounted, ref } from 'vue'
import { useHelperStore } from '/@/store/modules/helper'

export default {
  components: { BasicForm },
  props: {
    onSubmit: { type: Function },
    submitting: { type: Boolean, default: false },
    initValue: { type: Object },
  },
  setup(props) {
    const { t } = useI18n()
    const helperStore = useHelperStore()
    let trung = ref('')
    let data=ref({})
    const [registerForm, { validate, updateSchema, setFieldsValue }] = useForm({
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

    const districtField: FormSchema = {
      field: 'district_code',
      component: 'ApiSelect',
      label: t('views.warehouse.input_district_code'),
      rules: [{ required: false, type: 'number' }],
      componentProps: {
        placeholder: t('views.warehouse.input_district_code'),
        resultField: 'data',
        labelField: 'name',
        valueField: 'id',
        // not request untill to select
        immediate: true,
      },
    }

    const wardField: FormSchema = {
      field: 'ward_code',
      component: 'ApiSelect',
      label: t('views.warehouse.input_ward_code'),
      rules: [{ required: false, type: 'number' }],
      componentProps: {
        placeholder: t('views.warehouse.input_ward_code'),
        resultField: 'data',
        labelField: 'name',
        valueField: 'id',
        // not request untill to select
        immediate: true,
      },
    }

    const fetchWard = (districtCode: number | undefined) => {
      if (!districtCode) {
        updateSchema(wardField)
      }
      let _wardField: FormSchema = { ...wardField }
      _wardField.componentProps = {
        ..._wardField.componentProps,
        api: getWards,
        params: {
          limit: -1,
          district_id: districtCode,
        },
      }

      updateSchema(_wardField)
    }

    const fetchDistrict = (cityCode: number | undefined) => {
      if (!cityCode) {
        updateSchema(districtField)
      }
      let _districtField: FormSchema = { ...districtField }
      _districtField.componentProps = {
        ..._districtField.componentProps,
        api: getDistricts,
        params: {
          limit: -1,
          city_id: cityCode,
        },
        onChange: (e, v) => {
          if (v) {
            fetchWard(v.value)
          }
        },
      }

      updateSchema(_districtField)
    }

    onMounted(() => {
      if (props.initValue && props.initValue.id) {
        let _initValue = { ...props.initValue }
        _initValue.active = !!_initValue.active
        if (_initValue.city_code) {
          fetchDistrict(_initValue.city_code)
        }
        if (_initValue.district_code) {
          fetchWard(_initValue.district_code)
        }
        setFieldsValue(_initValue)
      }
    })

    return {
      registerForm,
      handleSubmit,
      schemas: [
        {
          field: 'name',
          component: 'Input',
          label: t('views.supplier.input_name'),
          rules: [{ required: true }],
          componentProps: { placeholder: t('views.supplier.input_name') },
        },
        {
          field: 'address',
          component: 'Input',
          rules: [{ required: true }],
          label: t('views.supplier.input_street'),
          componentProps: { placeholder: t('views.supplier.input_street') },
        },
        {
          field: 'city_code',
          component: 'ApiSelect',
          label: t('views.warehouse.input_city_code'),
          rules: [{ required: false, type: 'number' }],
          componentProps: {
            placeholder: t('views.warehouse.input_city_code'),
            api: getCities,
            params: {
              limit: -1,
            },
            resultField: 'data',
            labelField: 'name',
            valueField: 'id',
            // not request untill to select
            immediate: true,
            onChange: (e, v) => {
              console.log(v);
              if (v) {
                fetchDistrict(v.value)
              }
            },
          },
        },
        districtField,
        wardField,
        {
          field: 'phone',
          component: 'Input',
          rules: [{ required: true }],
          label: t('views.supplier.input_phone'),
          componentProps: { placeholder: t('views.supplier.input_phone') },
        },
        {
          field: 'type',
          component: 'Select',
          label: t('views.supplier.input_type'),
          componentProps: {
            placeholder: t('views.supplier.input_type'),
            options: helperStore.getSupplierTypes,
          },
          defaultValue: '1',
        },
        {
          field: 'note',
          component: 'InputTextArea',
          label: t('views.supplier.input_note'),
          componentProps: { placeholder: t('views.supplier.input_note') },
        },
      ],
    }
  },
}
</script>
