<template>
  <nav class="layout-nav">
    <nuxt-link class="link" to="/" v-for="categorie in categories" :key="categorie.id">
      {{ categorie.name }}
    </nuxt-link>
  </nav>
</template>

<script>
import { ref, useFetch } from '@nuxtjs/composition-api'
import { useResource } from '~/composables/index.js'

export default {
  setup() {
    const $categories = useResource('/categories')

    const categories = ref([])

    useFetch(async () => {
      categories.value = await $categories.findMany()
    })

    return {
      categories
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


</style>