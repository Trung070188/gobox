<template>
  <div>
    <Button type="primary" size="large" block @click="doLogin"> LimID </Button>
  </div>
</template>
<script setup lang="ts">
import { Button } from 'ant-design-vue'
import { useUserStore } from '/@/store/modules/user'
import { ref } from 'vue'
import { useI18n } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'
import { useDesign } from '/@/hooks/web/useDesign'
import { useGlobSetting } from '/@/hooks/setting'

const { notification, createErrorModal } = useMessage()
const userStore = useUserStore()
const { t } = useI18n()
const loading = ref(false)
const { prefixCls } = useDesign('login')

const globSetting = useGlobSetting()

async function handleLogin(data) {
  try {
    loading.value = true
    const userInfo = await userStore.limLogin(data)
    if (userInfo) {
      notification.success({
        message: t('sys.login.loginSuccessTitle'),
        description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.name}`,
        duration: 3,
      })
    }
  } catch (error) {
    createErrorModal({
      title: t('sys.api.errorTip'),
      content:
        ((error as unknown) as Error).message ||
        t('sys.api.networkExceptionMsg'),
      getContainer: () =>
        document.body.querySelector(`.${prefixCls}`) || document.body,
    })
  } finally {
    loading.value = false
  }
}

const doLogin = () => {
  window.onmessage = async (e) => {
    if (e.data && e.data.lim) {
      await handleLogin(e.data.lim.token)
    }
  }

  let popup = window.open(
    `${globSetting.apiUrl}/auth/lim/redirect`,
    '',
    'width=700,height=500'
  )
}
</script>
