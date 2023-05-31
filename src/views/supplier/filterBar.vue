<template>
  <div style="width: 100%">
    <Form layout="inline" @submit="onFilter">
      <FormItem>
        <Input
          style="width: 300px"
          v-model:value="model.name"
          :placeholder="$t('views.supplier.search_box')"
        />
      </FormItem>

      <FormItem>
        <Select
          style="width: 200px"
          :options="statusOptions"
          v-model:value="model.type"
          :placeholder="$t('views.supplier.input_type')"
        />
      </FormItem>

      <FormItem>
        <Button type="primary" html-type="submit">
          {{ $t('common.searchText') }}
        </Button>
        <Button
          html-type="reset"
          style="margin-left: 10px"
          @click="resetFilter"
        >
          {{ $t('common.resetText') }}
        </Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import { isEqual } from 'lodash'
import { Form, FormItem, Input, Button, Select } from 'ant-design-vue'
import { useHelperStore } from '/@/store/modules/helper'

export default {
  components: { Form, FormItem, Input, Button, Select },
  props: { modelValue: { type: Object }, onFilter: { type: Function } },
  setup(props: any, { emit }) {
    const helperStore = useHelperStore()

    const model = ref({ name: '', type: '' })

    onMounted(() => {
      model.value = props.modelValue
    })

    watch(
      () => props.modelValue,
      (value, oldValue) => {
        if (!isEqual(value, oldValue) && !isEqual(value, model.value)) {
          model.value = value
        }
      },
      { deep: true }
    )

    watch(model, (value) => {
      if (!isEqual(value, props.modelValue)) {
        emit('update:modelValue', value)
      }
    })
    return {
      model,
      // statusOptions: [
      //   { label: 'Cá nhân', value: 2 },
      //   { label: 'Doanh nghiệp', value: 1 },
      // ],
      statusOptions: helperStore.getSupplierTypes,
      resetFilter: () => {
        model.value = { name: '', type: '' }
       setTimeout(function () {
         props.onFilter();
       },1000)
      },
    }
  },
}
</script>
