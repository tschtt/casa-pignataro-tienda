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
    <nav>
      <button v-if="more" @click="loadArticles" class="button">
        Mas resultados
      </button>
    </nav>
  </main>
</template>

<script>
import { computed, ref, useFetch, useRoute } from "@nuxtjs/composition-api"
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
    
    const limit = ref(12)
    const offset = ref(0)
    const more = ref(true)

    const query = computed(() => {
      const { buscar, ...query } = $route.value.query

      query.limit = limit.value
      query.offset = offset.value
      query.onlyActive = true

      if(buscar) {
        query.search = buscar
      }

      return query
    })
    
    const loadArticles = async () => {
      const result = await $articles.findMany(query.value)

      articles.value.push(...result)

      if(result.length < limit.value) {
        more.value = false
      }

      offset.value += limit.value;
    }

    useFetch(async () => {
      await loadArticles()
      loading.value = false
    })
    
    return {
      loading,
      articles,
      loadArticles,
      more,
    }
  }
}
</script>

<style lang="scss" scoped>

.page-articulos {

  > nav {
    display: flex;
    justify-content: center;
    gap: var(--space-500);
  }

}

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