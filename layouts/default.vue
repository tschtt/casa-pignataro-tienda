<template>
  <div id="app">
    <div class="app-header-container">
      <LayoutHeader :show-nav.sync="showNav" />
    </div>
    <div class="app-nav-container">
      <LayoutNav :show-nav.sync="showNav" />
    </div>
    <div class="app-main-container">
      <Nuxt />
    </div>
    <div class="app-footer-container">
      <LayoutFooter />
    </div>
  </div>
</template>

<script>
import { ref } from "@nuxtjs/composition-api"

import LayoutHeader from "./-LayoutHeader.vue"
import LayoutNav from "./-LayoutNav.vue"
import LayoutFooter from "./-LatoutFooter.vue"

export default {
  components: {
    LayoutHeader,
    LayoutNav,
    LayoutFooter,
  },
  setup() {
    const showNav = ref(false)
    return {
      showNav
    }
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
    z-index: 3;

}

  .app-nav-container {
    background-color: var(--color-gray-300);
    border-bottom: 2px solid var(--color-gray-400);
    padding-inline: var(--space-500);
    z-index: 2;
  }

  .app-main-container {
    background-color: var(--color-gray-300);
    padding: var(--space-500);
    z-index: 1;
  }
}


.app-header-container, .app-nav-container, .app-main-container {

  > * {
    max-width: 1000px;
    margin: auto;
  }
  
}

</style>