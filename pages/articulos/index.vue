<template>
  <main class="[ page-articulos ][ stack stack-500 ]">
    <h2 class="title color-main">
      Resultados
    </h2>
    <div class="no-results" v-if="!loading && !articles.length">
      <span class="material-icons">
        content_paste_search
      </span>
      <p class="font-heading text-500">
        No encontramos lo que estabas buscando
      </p>
    </div>
    <ArticleGrid
      v-if="!loading && articles.length"
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

.page-articulos {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
}

.no-results {
  align-self: flex-start;
  
  display: flex;
  align-items: center;
  
  gap: var(--space-400);

  > span {
    display: none;
    font-size: 50px;
  }

  > p {
    max-width: 20ch;
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