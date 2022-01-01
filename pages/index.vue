<template>
  <main class="page-home">
    <h2 class="hide-visually">
      Página principal
    </h2>
    <section 
      v-for="categorie in categories" :key="categorie.order"
      class="categorie"
    >
      <h3 class="title color-main">
        {{ categorie.name }}
      </h3>
      <ArticleGrid 
        class="article-grid"
        :articles="categorie.articles" 
      />
      <nav class="links flex align-center">
        <nuxt-link class="link color-main" :to="`/articulos?fkCategorie=${categorie.id}`">
          Ver más
        </nuxt-link>
      </nav>
    </section>
  </main>
</template>

<script>
import { ref, useFetch } from '@nuxtjs/composition-api'
import { useResource } from '~/composables/index.js'


export default {
  setup() {
    const $categories = useResource('/categories')
    const $articles = useResource('/articles')

    const categories = ref([])

    useFetch(async () => {
      categories.value = await $categories.findMany()
      
      categories.value = categories.value.sort((a, b) => {
        if(a.order < b.order) { return -1 }
        if(a.order > b.order) { return 1 }
        return 0
      })

      categories.value = categories.value.map(async (categorie) => {
        categorie.articles = await $articles.findMany({ fkCategorie: categorie.id, limit: 4 })
        return categorie
      })

      categories.value = await Promise.all(categories.value)
    })

    return {
      categories
    }
  },
}
</script>

<style lang="scss" scoped>

* {
  // outline: 1px solid red;
}

.categorie {
  + .categorie {
    margin-top: var(--space-500);
  }

  > * + * {
    margin-top: var(--space-400);
  }

  .links {
    display: flex;
    justify-content: end;
  }

  .link {
    --link-color-hover: var(--color-main);
    --link-color-focus: var(--color-gray-900);
  }
}

@media (min-width: 700px) {
  .categorie {
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-template-rows: auto auto;
    gap: var(--space-300);

    > * + * {
      margin-top: 0;
    }
  
    > .title {
      grid-column: 1 / 2;
      grid-row: 1;
    }
  
    > .links {
      grid-column: 2 / 3;
      grid-row: 1;
    }
  
    > .article-grid {
      grid-column: 1 / 3;
      grid-row: 2;
    }
  }  
}

</style>