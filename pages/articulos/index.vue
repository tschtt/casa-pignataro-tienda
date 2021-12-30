<template>
  <main class="[ page-articulos ][ stack ]">
    <h2 class="title">
      Resultados
    </h2>
    <ArticleGrid 
      :articles="articles"
    />
  </main>
</template>

<script>
import { ref, useFetch, useRoute } from "@nuxtjs/composition-api"
import { useResource } from "~/composables/index.js"
export default {
  key(route) {
    return route.fullPath
  },
  setup() {
    const $articles = useResource('/articles')
    const $route = useRoute()

    const articles = ref([])

    useFetch(async () => {
      const { buscar, ...query } = $route.value.query

      if(buscar) {
        query.search = buscar
      }
      
      articles.value = await $articles.findMany(query)
    })
    
    return {
      articles,
    }
  }
}
</script>

<style>

</style>