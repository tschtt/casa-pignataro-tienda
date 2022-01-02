<template>
  <main v-if="!loading" class="[ page-articulos ][ stack stack-500 ]" :loading="loading">
    <h2 class="title color-main">
      Resultados
    </h2>
    <div class="no-results card" v-if="!articles.length">
      <span class="material-icons">
        content_paste_search
      </span>
      <p class="font-heading text-500">
        No encontramos resultados para tu busqueda
      </p>
    </div>
    <ArticleGrid
      v-if="articles.length"
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

    const loading = ref(true)
    const articles = ref([])

    useFetch(async () => {
      const { buscar, ...query } = $route.value.query

      if(buscar) {
        query.search = buscar
      }
      
      articles.value = await $articles.findMany(query)

      loading.value = false
    })
    
    return {
      articles,
      loading,
    }
  }
}
</script>

<style lang="scss" scoped>

.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-400);
  padding: var(--space-600);
  
  max-width: max-content;
  margin-inline: auto;
  

  > span {
    display: none;
    font-size: 50px;
  }

}

@media (min-width: 600px) {

  .no-results {
    place-self: center;

    > span {
      display: block;
    }
  }
  
}

</style>