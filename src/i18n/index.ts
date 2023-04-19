import { createI18n } from 'vue-i18n'
import enUS from './locales/en-US.json'
import zhCN from './locales/zh-CN.json'

type MessageSchema = typeof enUS

const i18n = createI18n<[MessageSchema], 'en-US' | 'zh-CN'>({
    // default language is en 
    locale: localStorage.getItem("locale") || navigator.language || 'en-US',
    legacy: false,
    // allowComposition: true,
    messages: {
        'en-US': enUS,
        'zh-CN': zhCN // allow append other language
    }
})

export default i18n

