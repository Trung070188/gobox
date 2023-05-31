import type { DropMenu } from '../components/Dropdown'
import type { LocaleSetting, LocaleType } from '/#/config'

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
  VN_VI: 'vi',
}

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.VN_VI,
  // Default locale
  fallback: LOCALE.VN_VI,
  // available Locales
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US, LOCALE.VN_VI],
}

// locale list
export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
  {
    text: 'Tiếng việt',
    event: LOCALE.VN_VI,
  },
]
