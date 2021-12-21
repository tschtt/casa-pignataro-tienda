<template>
  <div id="app">
    <LayoutHeader />
    <LayoutNav />
    <Nuxt />
  </div>
</template>

<script>
import LayoutHeader from "./-LayoutHeader.vue"
import LayoutNav from "./-LayoutNav.vue"
export default {
  components: {
    LayoutHeader,
    LayoutNav,
  }
}
</script>