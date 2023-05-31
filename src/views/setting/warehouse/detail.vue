<template>
  <PageWrapper
    :title="[$t('common.detail'), $t('views.warehouse.name')].join(' ')"
    v-loading="loading"
  >
    <template #extra>
      <ActionBar
        v-if="warehouse"
        :record="warehouse"
        @actionSuccess="afterActionSuccess"
        mode="detail"
      />
    </template>

    <Description
      v-if="warehouse"
      @register="infoRegister"
      class="enter-y vben-collapse-container"
    />

    <div class="location" v-if="warehouse">
      <LocationPaginationTable :warehouse="warehouse" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
import { PageWrapper } from '/@/components/Page'
import { getWarehouse } from '/@/api/sys/warehouse'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ActionBar from './actionBar.vue'
import { router } from '/@/router'
import { Description, useDescription } from '/@/components/Description/index'
import { infoSchema } from './data'
import LocationPaginationTable from './location/index.vue'

export default {
  components: { PageWrapper, ActionBar, Description, LocationPaginationTable },
  setup() {
    const route = useRoute()

    const loading = ref(false)
    const warehouse = ref(null)

    const [infoRegister] = useDescription({
      data: warehouse,
      schema: infoSchema,
      column: 1,
    })

    onMounted(async () => {
      try {
        loading.value = true
        let response = await getWarehouse(
          (route.params.id as unknown) as number,
          { include: ['permissions', 'address'] }
        )
        warehouse.value = response.data
      } catch (error) {
      } finally {
        loading.value = false
      }
    })
    return {
      warehouse,
      loading,
      infoRegister,
      afterActionSuccess: (action: string) => {
        switch (action) {
          case 'delete':
            router.push({ name: 'warehouses' })
            break

          default:
            break
        }
      },
    }
  },
}
</script>
