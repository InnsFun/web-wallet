<script setup lang="ts">
import {ref} from "vue";
import { RouterView} from "vue-router";
import InnsWalletNavbar from "./components/InnsWalletNavbar.vue";

const innsWallet = ref()
 
function walletHome(){
  innsWallet.value.home()
}

function addAccount(){
  innsWallet.value.add()
}
</script>

<template>
  <InnsWalletNavbar @walletHome="walletHome" @addAccount="addAccount"/>
  <router-view v-slot="{ Component }">
    <component ref="innsWallet" :is="Component" />
 </router-view>
</template>
