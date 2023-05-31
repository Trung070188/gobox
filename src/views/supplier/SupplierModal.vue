<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'
import { BasicModal, useModalInner } from '/@/components/Modal'
import { BasicForm, useForm } from '/@/components/Form/index'
// import { formSchema } from './dept.data'
// import { $post, $put } from '/@/utils'
export default defineComponent({
  name: 'SupplierModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let supplier = ref()
    const isUpdate = ref(true)
    const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 100,
      baseColProps: { span: 24 },
      // schemas: formSchema,
      showActionButtonGroup: false,
    })

    const [registerModal, { setModalProps, closeModal }] = useModalInner(
      async (data) => {
        resetFields()
        setModalProps({ confirmLoading: false })
        isUpdate.value = !!data?.isUpdate

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          })
          supplier = data.record.id
        }
      }
    )
    const getTitle = computed(() => (!unref(isUpdate) ? 'Thêm mới' : 'Sửa'))
    async function handleSubmit() {
      try {
        const values = await validate()
        setModalProps({ confirmLoading: true })
        // if (unref(isUpdate)) {
        //   await $put(`/api/supplier/${supplier}`, values)
        // } else {
        //   await $post('/api/supplier', values)
        // }
        emit('success')
        closeModal()
      } finally {
        setModalProps({ confirmLoading: false })
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit }
  },
})
</script>
