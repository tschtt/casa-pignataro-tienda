<template>
  <main class="page-articles">
    <header class="header">
      <h2 class="title color-main">{{ query.search && `Resultados para: ${query.search}` || 'Resultados de la busqueda' }}</h2>
      <p>{{ count }} resultados</p>
    </header>
    <SectionFilters class="section filters card" v-bind="filters" />
    <section class="section results">
      <h3 class="hide-visually">Listado de resultados</h3>
      <ArticleGrid :articles="articles" />
    </section>
    <section v-if="more" class="section actions card">
      <h3 class="hide-visually">Acciones</h3>
      <button class="icon-before" icon="add">
        Más artículos
      </button>
    </section>
  </main>
</template>

<script>
/* eslint-disable */
import { computed, reactive, toRefs, useFetch, useRoute } from '@nuxtjs/composition-api'
import { useResource } from "~/composables/index.js"

import SectionFilters from './-SectionFilters.vue'

export default {
  components: {
    SectionFilters,
  },
  key(route) {
    return route.fullPath
  },
  setup(props, { emit }) {
    const $articles = useResource('/articles')
    const $route = useRoute()
    
    // data
    
    const state = reactive({
      count: 0,
      articles: [],
      filters: {},
      limit: 12,
      offset: 0,
    })

    // computed

    const query = computed(() => {
      const result = {}
      const { search, orderBy, order, minValue, maxValue, fkSection, fkCategory, fkAttributeValue } = $route.value.query
      if(search) {
        result.search = search
      }
      if(orderBy) {
        result.orderBy = orderBy
      }
      if(order) {
        result.order = order
      }
      if(minValue) {
        result.minValue = minValue
      }
      if(maxValue) {
        result.maxValue = maxValue
      }
      if(fkSection) {
        result.fkSection = fkSection
      }
      if(fkCategory) {
        result.fkCategory = fkCategory
      }
      if(fkAttributeValue) {
        result.fkAttributeValue = fkAttributeValue
      }
      return result
    })

    const more = computed(() => {
      return state.offset < state.count
    })

    // actions

    async function loadMore() {
      const result = await $articles.findMany(query.value)
      state.articles.push(...result)
      state.offset += state.limit
    }

    async function load() {
      const result = await $articles.findMany({ faceted: true, ...query.value })
      state.count = result.count
      state.articles = result.items
      state.filters = result.filters
      state.offset += state.limit
    }

    // init

    useFetch(async () => {
      await load()
    })

    return {
      ...toRefs(state),
      loadMore,
      query,
      more,
    }
  },
}
</script>

<style lang="scss" scoped>

.page-articles {
  display: grid;
  gap: var(--space-400);
}

.header {
  > * + * {
    margin-top: var(--space-200);
  }
}

.filters {

  ul {
    padding: 0;
  }
  
  a {
    text-decoration: none;
    letter-spacing: 0.1em;
    color: var(--color-gray-600);
    padding: var(--space-300) var(--space-500);
    border-top: 1px solid var(--color-gray-400);
    border-left: 3px solid transparent;
    display: block;
  }

  a:hover {
    color: var(--color-gray-900);
  }

  a[selected] {
    border-left: 3px solid var(--color-main);
    color: var(--color-gray-900);
  }
  .filters-actions {
    display: flex;
    justify-content: space-around;
    padding: var(--space-200);
  
    > button + button {
      border-left: 1px solid var(--color-gray-400);
    }
  
    > button {
      flex-basis: 0;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-100);
      padding: var(--space-200);
      background: transparent;
      cursor: pointer;
    }
  }
}

.results {
  .article-grid {
    --grid-columns-100: 1;
    --grid-columns-200: 2;
    --grid-columns-300: 3;      
  }
}

.actions {
  display: flex;
  justify-content: space-around;
  padding: var(--space-200);
  transition: box-shadow 200ms ease;

  &:hover {
    box-shadow: var(--shadow-300);
  }

  > button + button {
    border-left: 1px solid var(--color-gray-400);
  }

  > button {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: .1em;
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-100);
    padding: var(--space-200);
    background: transparent;
    cursor: pointer;
  }
}

@media (min-width: 900px) {
  .page-articles {
    grid-template-columns: minmax(30ch, max-content) 1fr;
    gap: var(--space-600);
  }

  .header {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
  }

  .filters {
    align-self: baseline;
    grid-column: 1 / 2;
    grid-row: 2 / 4;
  }

  .results {
    grid-column: 2 / -1;
    grid-row: 2 / 3;
  }

  .actions {
    grid-column: 2 / -1;
    grid-row: 3 / 4;
  }
}

</style>