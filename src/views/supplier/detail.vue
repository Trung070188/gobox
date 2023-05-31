<template>
  <PageWrapper
    :title="[$t('common.detail'), $t('views.supplier.title')].join(' ')"
    v-loading="loading"
  >
    <template #extra>
      <ActionBar
        v-if="supplier"
        :record="supplier"
        @actionSuccess="afterActionSuccess"
        mode="detail"
      />
    </template>

    <Description
      v-if="supplier"
      @register="infoRegister"
      class="enter-y vben-collapse-container"
    />
  </PageWrapper>
</template>
<script lang="ts">
import { PageWrapper } from '/@/components/Page'
import { getSupplier } from '../../api/sys/supplier'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ActionBar from './actionBar.vue'
import { router } from '/@/router'
import { Description, useDescription } from '/@/components/Description/index'
import { infoSchema } from './data'

export default {
  components: { PageWrapper, ActionBar, Description },
  setup() {
    const route = useRoute()

    const loading = ref(false)
    const supplier = ref(null)

    const [infoRegister] = useDescription({
      data: supplier,
      schema: infoSchema,
      column: 1,
    })

    onMounted(async () => {
      try {
        loading.value = true
        let response = await getSupplier(route.params.id as unknown as number, {
          include: ['permissions', 'type'],
        })
        supplier.value = response.data
      } catch (error) {
      } finally {
        loading.value = false
      }
    })
    return {
      supplier,
      loading,
      infoRegister,
      afterActionSuccess: (action: string) => {
        switch (action) {
          case 'delete':
            router.push({ name: 'list' })
            break

          default:
            break
        }
      },
    }
  },
}
</script>
