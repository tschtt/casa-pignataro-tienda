<template>
  <div id="app">
    <LayoutHeader />
    <LayoutNav />
    <div class="layout-main-container">
      <Nuxt />
    </div>
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

<style lang="scss" scoped>

#app {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  min-height: 100%;
}

.layout-main-container {

  > main {
    max-width: 1200px;
    margin: auto;
  }
  
}

</style>