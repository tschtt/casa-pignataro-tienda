<template>
  <div id="app">
    <div class="app-header-container">
      <LayoutHeader />
    </div>
    <div class="app-nav-container">
      <LayoutNav />
    </div>
    <div class="app-main-container">
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
  .app-header-container {
    background-image: linear-gradient(#f23b3b, #d71111);
    box-shadow: var(--shadow-200);
  }

  .app-nav-container {
    background-color: var(--color-gray-300);
    border-bottom: 2px solid var(--color-gray-400);
  }

  .app-main-container {
    background-color: var(--color-gray-300);
  }
}


.app-header-container, .app-nav-container, .app-main-container {

  > * {
    max-width: 1200px;
    margin: auto;
  }
  
}

</style>