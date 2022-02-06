<template>
  <main v-if="!loading" class="[ page-articulos ][  ]" :loading="loading">
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
    <div class="order">
      <label for="order-by">Ordenar por</label>
      <select id="order-by" v-model="orderBy" @input="setOrder">
        <option value="ninguno">Mas relevantes</option>
        <option value="menor">Mayor precio</option>
        <option value="mayor">Menor precio  </option>
      </select>
    </div>
    <SectionFilters class="filters" v-if="articles.length" v-bind.sync="filters" />
    <ArticleGrid class="results" v-if="articles.length" :articles="articles" />
    <nav class="actions">
      <button v-if="more" @click="loadArticles" class="button">
        Mas resultados
      </button>
    </nav>
  </main>
</template>

<script>
import { computed, ref, useFetch, useRoute, useRouter } from "@nuxtjs/composition-api"
import SectionFilters from "./-SectionFilters.vue"
import { useResource } from "~/composables/index.js"
export default {
  components: {
    SectionFilters,
  },
  key(route) {
    return route.fullPath
  },
  setup() {
    const $articles = useResource('/articles')
    const $route = useRoute()
    const $router = useRouter()

    const loading = ref(true)

    const articles = ref([])
    const filters = ref({})
    
    const orderBy = ref('ninguno')
    const limit = ref(12)
    const offset = ref(0)
    const more = ref(true)

    const query = computed(() => {
      const { buscar, ...query } = $route.value.query

      query.faceted = true
      query.limit = limit.value
      query.offset = offset.value
      query.active = true

      if(buscar) {
        query.search = buscar
      }

      console.log(query)

      return query
    })
    
    const setOrder = (event) => {
      if(event.target.value === 'menor') {
        $router.replace({ path: '/articulos', query: { ...$route.value.query, order_by: 'value', order: 'desc' } })
      }
      else if(event.target.value === 'mayor') {
        $router.replace({ path: '/articulos', query: { ...$route.value.query, order_by: 'value', order: 'asc' } })
      } 
      else {
        $router.replace({ path: '/articulos', query: { ...$route.value.query, order_by: undefined, order: undefined } })
      }
    }
    
    const loadArticles = async () => {
      const result = await $articles.findMany(query.value)
      
      filters.value = result.filters
      articles.value.push(...result.items)

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
      filters,
      orderBy,
      loadArticles,
      more,

      setOrder,

      limit,
      offset,
    }
  }
}
</script>

<style lang="scss" scoped>

.page-articulos {

  display: grid;
  gap: var(--space-500) var(--space-500);

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

@media (min-width: 1000px) {
  
  .page-articulos {
    grid-template-columns: minmax(30ch, max-content) 1fr auto;

    > .title {
      grid-column: 1 / 3;
      grid-row: 1;
    }

    > .order {
      grid-column: 3 / 4;
      grid-row: 1;
    }

    > .no-results {
      grid-column: 1 / -1;
      grid-row: 2;
    }

    > .filters {
      grid-column: 1 / 2;
      grid-row: 2;
      align-self: baseline;
    }

    > .results {
      grid-column: 2 / -1;
      grid-row: 2;
    }

    > .actions {
      grid-column: 2 / -1;
      grid-row: 3;
    }
  }
  
}

</style>