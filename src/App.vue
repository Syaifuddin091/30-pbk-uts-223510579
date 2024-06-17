<template>
    <div id="app">
      <router-view />
    </div>
</template>
  
<script setup>
  import { RouterView } from "vue-router";
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  onMounted(() => {
  router.push('/Home')
})
</script>
  
<style>
</style>