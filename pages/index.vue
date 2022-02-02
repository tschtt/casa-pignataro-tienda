<template>
  <main v-if="!loading" class="page-home">
    <h2 class="hide-visually">
      Página principal
    </h2>
    <section 
      v-for="section in sections" :key="section.order"
      class="categorie"
    >
      <h3 class="title color-main">
        {{ section.name }}
      </h3>
      <ArticleGrid 
        class="article-grid"
        :articles="section.articles" 
      />
      <nav class="links flex align-center">
        <nuxt-link class="link color-main" :to="`/articulos?fkSection=${section.id}`">
          Ver más
        </nuxt-link>
      </nav>
    </section>
  </main>
</template>

<script>
/* eslint-disable */
import { ref, useFetch } from '@nuxtjs/composition-api'
import { useResource } from '~/composables/index.js'


export default {
  setup() {
    const $sections = useResource('/sections')
    const $articles = useResource('/articles')

    const loading = ref(true)
    const sections = ref([])

    const load_sections = async () => {
      sections.value = await $sections.findMany()
      
      // categories.value = categories.value.sort((a, b) => {
      //   if(a.name < b.name) { return -1 }
      //   if(a.name > b.name) { return 1 }
      //   return 0
      // })

      for await (const section of sections.value) {
        section.articles = await $articles.findMany({ active: true, fkSection: section.id, limit: 4 })
      }
    }

    useFetch(async () => {
      await load_sections()
      loading.value = false
    })

    return {
      sections,
      loading,
    }
  },
}
</script>

<style lang="scss" scoped>

.categorie {
  + .categorie {
    margin-top: var(--space-700);
  }

  .links {
    display: flex;
    justify-content: flex-end;
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
    gap: var(--space-600);

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