<template>
  <nav class="layout-nav"  :hidden="!showNav">
    <nuxt-link 
      v-for="section in sections" :key="section.id"
      :to="`/articulos?fkSection=${section.id}`" 
      class="link" 
    >
      {{ section.name }}
    </nuxt-link>
  </nav>
</template>

<script>
import { ref, useFetch } from '@nuxtjs/composition-api'
import { useResource } from '~/composables/index.js'

export default {
  props: {
    showNav: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const $sections = useResource('/sections')

    const sections = ref([])

    useFetch(async () => {
      sections.value = await $sections.findMany({ onlyActive: true })
      sections.value = sections.value.sort((a, b) => {
        if(a.name < b.name) { return -1 }
        if(a.name > b.name) { return 1 }
        return 0
      })
    })

    return {
      sections
    }
  }
}
</script>

<style lang="scss" scoped>

.layout-nav {
  display: flex;
  flex-wrap: wrap;
}


.link {
  display: inline-block;
  color: var(--color-gray-700);
  font-size: var(--text-400);
  font-weight: 500;
  
  text-decoration: none;

  padding: var(--space-200);

  border-bottom: 2px solid transparent;
  margin-bottom: -2px;

  width: max-content;

  transition: border-color 200ms ease, color 200ms ease;

  &:hover {
    color: var(--color-gray-900);
    border-bottom: 2px solid var(--color-gray-900);
    margin-bottom: -2px;
  }

  &:focus {
    color: var(--color-accent);
    border-bottom: 2px solid var(--color-accent);
    margin-bottom: -2px;
  }
  
}

@media (max-width: 700px) {

  .layout-nav[hidden] {
    display: none;
  }

}

</style>