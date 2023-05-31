<template>
  <Button type="primary" v-bind="getBindValue" @click="onClick">
    <template #icon><Icon icon="mdi:plus-outline" /></template>
    {{ $t('common.create') }}
  </Button>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import Icon from '/@/components/Icon/src/Icon.vue'
import { computed, unref, defineComponent } from 'vue'
import { useAttrs } from '/@/hooks/core/useAttrs'

export default defineComponent({
  name: 'CreateButton',
  components: { Button, Icon },
  props: { onClick: { type: Function } },
  setup(props, { attrs }) {
    return {
      attrs: useAttrs({ excludeDefaultKeys: false }),
      getBindValue: computed(() => ({ ...unref(attrs), ...props })),
    }
  },
})
</script>
