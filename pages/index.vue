<template>
  <main class="page-home">
    <h2 class="hide-visually">
      Artículos
    </h2>
    <div class="stack stack-600">
      <ArticleCategorie
        v-for="categorie in categories" :key="categorie.id"
        v-bind="categorie"
      />
    </div>
  </main>
</template>

<script>
import { ref, useFetch } from '@nuxtjs/composition-api'
import ArticleCategorie from './-ArticleCategorie.vue'
import { useResource } from '~/composables/index.js'


export default {
  components: {
    ArticleCategorie,
  },
  setup() {
    const $categories = useResource('/categories')

    const categories = ref([])

    useFetch(async () => {
      categories.value = await $categories.findMany()
    })

    return {
      categories
    }
  },
}
</script>
