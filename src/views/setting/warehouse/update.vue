<template>
  <PageWrapper
    :title="[$t('common.update'), $t('views.warehouse.name')].join(' ')"
    v-loading="loading"
  >
    <div>
      <Form
        v-if="warehouse"
        :initValue="warehouse"
        @submit="handlerSubmit"
        :submitting="loading"
      />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
import { PageWrapper } from '/@/components/Page'
import { updateWarehouse, getWarehouse } from '/@/api/sys/warehouse'
import Form from './form.vue'
import { ref, onMounted } from 'vue'
import { useI18n } from '/@/hooks/web/useI18n'
import { router } from '/@/router'
import { useMessage } from '/@/hooks/web/useMessage'
import { useRoute } from 'vue-router'

export default {
  components: { Form, PageWrapper },
  setup() {
    const { notification } = useMessage()
    const { t } = useI18n()
    const route = useRoute()

    const loading = ref(false)
    const warehouse = ref(null)

    onMounted(async () => {
      try {
        loading.value = true
        let response = await getWarehouse(
          (route.params.id as unknown) as number
        )
        warehouse.value = response.data
      } catch (error) {
        throw error
      } finally {
        loading.value = false
      }
    })
    return {
      warehouse,
      handlerSubmit: async (data: object) => {
        loading.value = true
        try {
          await updateWarehouse((route.params.id as unknown) as number, data)
          notification.success({
            message: t('common.updateSuccess'),
            duration: 3,
          })
          router.push({ name: 'warehouses' })
        } catch (error) {
        } finally {
          loading.value = false
        }
      },
      loading,
    }
  },
}
</script>
