<template>
  <PageWrapper
    :title="[$t('common.create'), $t('views.warehouse.name')].join(' ')"
    v-loading="loading"
  >
    <div>
      <Form @submit="handlerSubmit" :submitting="loading" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
import { PageWrapper } from '/@/components/Page'
import { createWarehouse } from '/@/api/sys/warehouse'
import Form from './form.vue'
import { ref } from 'vue'
import { useI18n } from '/@/hooks/web/useI18n'
import { router } from '/@/router'
import { useMessage } from '/@/hooks/web/useMessage'

export default {
  components: { Form, PageWrapper },
  setup() {
    const { notification } = useMessage()
    const { t } = useI18n()

    const loading = ref(false)
    return {
      handlerSubmit: async (data: object) => {
        loading.value = true
        try {
          await createWarehouse(data)
          notification.success({
            message: t('common.createSuccess'),
            duration: 3,
          })
          router.push({ name: 'warehouses' })
        } catch (error) {
          throw error
        } finally {
          loading.value = false
        }
      },
      loading,
    }
  },
}
</script>
