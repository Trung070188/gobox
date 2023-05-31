<template>
  <PageWrapper :title="$t('views.warehouse.name')">
    <template #extra>
      <CreateButton @click="() => $router.push({ name: 'warehouse-create' })" />
    </template>
    <div><PaginateTable /></div>
  </PageWrapper>
</template>
<script lang="ts">
import { PageWrapper } from '/@/components/Page'
import { CreateButton } from '/@/components/Button'
import PaginateTable from './paginateTable.vue'
export default {
  components: { PageWrapper, CreateButton, PaginateTable },
}
</script>
