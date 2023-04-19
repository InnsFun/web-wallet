<template>
  <div class="navbar fixed h-16 bg-black bg-opacity-90 z-10">
    <div class="navbar-start flex w-2/4 text-neutral-50 lg:p-8 w-1/3 ">
      <div class="dropdown">
        <label @click="walletHome()" tabindex="0" class="btn btn-ghost">
          <svg style="width: 2em;height: 2em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1698"><path d="M96 480c-9.6 0-19.2-3.2-25.6-12.8-12.8-12.8-9.6-35.2 3.2-44.8l377.6-310.4c35.2-25.6 86.4-25.6 118.4 0l377.6 307.2c12.8 9.6 16 32 3.2 44.8-12.8 12.8-32 16-44.8 3.2L531.2 166.4c-9.6-6.4-28.8-6.4-38.4 0L115.2 473.6c-6.4 6.4-12.8 6.4-19.2 6.4zM816 928H608c-19.2 0-32-12.8-32-32v-150.4c0-22.4-38.4-44.8-67.2-44.8-28.8 0-64 19.2-64 44.8V896c0 19.2-12.8 32-32 32H211.2C163.2 928 128 892.8 128 848V544c0-19.2 12.8-32 32-32s32 12.8 32 32v304c0 9.6 6.4 16 19.2 16H384v-118.4c0-64 67.2-108.8 128-108.8s131.2 44.8 131.2 108.8V864h176c9.6 0 16 0 16-19.2V544c0-19.2 12.8-32 32-32s32 12.8 32 32v304C896 896 864 928 816 928z" fill="#FFFFFF" p-id="1699"></path></svg>
        </label>
      </div>
      <a class="btn btn-ghost normal-case text-xl">{{ $t('navbar.title') }}</a>
    </div>
    <div class="navbar-center hidden lg:flex w-1/3 justify-center">
    </div>
    <div class="navbar-end flex w-2/4 p-4 lg:p-12 w-1/3">
      <div class="dropdown dropdown-end">
        <div tabindex="0" class="text-slate-50 btn btn-ghost gap-1 normal-case">
          <svg class="inline-block h-4 w-4 fill-current md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" width="20"
            height="20" viewBox="0 0 512 512">
            <path d="M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z"></path>
            <path
              d="M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z">
            </path>
          </svg> 
          <svg width="12px" height="12px" class="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a @click="setLanguage('en-US')">English</a></li>
          <li><a  @click="setLanguage('zh-CN')">简体中文</a></li>
        </ul>
      </div>
      <label @click="addAccount()" class="btn  md:flex">{{ $t('account.select_account') }}</label>
    </div>
  </div>
</template>
<script setup lang="ts">
import i18n from '../i18n';
import { computed, onMounted, reactive, watch } from "vue";

export interface State {
  accountDropdown: boolean;
}

const initialState: State = {
  accountDropdown: false,
};

// state
const state = reactive(initialState);

const setLanguage = (locale: 'zh-CN' | 'en-US') => {
  // @ts-ignore
  if (locale !== i18n.global.locale.value) {
    localStorage.setItem("locale", locale)
    // @ts-ignore
    i18n.global.locale.value = locale
    // reload page
    location.reload()
    return true
  } {
    return false
  }
}

const emit = defineEmits<{
  (e:"addAccount"):void
  (e:"walletHome"):void
}>()

function addAccount(){
  emit("addAccount")
}

function walletHome(){
  emit("walletHome")
}

</script>
  