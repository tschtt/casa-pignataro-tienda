<template>
  <main class="page-article-id stack">
    <h2 class="title">
      {{ name }}
    </h2>
    <p class="subtitle color-gray-800">
      {{ value }}
    </p>
    <a class="link-detalles color-gray-900" href="#detalles">
      Ver detalles
    </a>
    <section class="section-images">
      <h3 class="hide-visually">
        Imágenes
      </h3>
      <ImageDisplay 
        :images="images"
      />
    </section>
    <section id="detalles" class="section-detalles">
      <h3 class="subtitle">
        Información del producto
      </h3>
      <pre>{{ description }}</pre>
    </section>
  </main>
</template>

<script>
import { computed, ref, useFetch, useRoute } from "@nuxtjs/composition-api"
import { useResource } from "~/composables/index.js"
export default {
    setup() {
      const $articles = useResource("/articles");
      const $route = useRoute();
      
      // Static data
      const id = $route.value.params.id;
      
      // Reactive data
      const article = ref({});
      
      // Computed
      const name = computed(() => {
        return article.value.name || "Nombre del artículo";
      });
      
      const value = computed(() => {
        const sign = "$";
        const value = article.value.value || 0;
        return `${sign}${value.toFixed(2)}`;
      });
      
      const description = computed(() => {
        return article.value.description;
      });
      
      const images = computed(() => {
        return article.value.images || [];
      });
      
      // Hooks
      useFetch(async () => {
        article.value = await $articles.findOne(id);
      });
      
      return {
        article,
        name,
        value,
        images,
        description,
      };
    },
}
</script>

<style lang="scss" scoped>

.page-article-id {
  max-width: 600px;
  margin-inline: auto;
}

@media (min-width: 1000px) {
  
  .page-article-id {
    --stack-space: 0;
    
    display: grid;
    grid-template-columns: 100px 1fr 1fr;
    grid-template-rows: min-content 1fr min-content auto;
    gap: var(--space-400);

    max-width: 1000px;

    > .title {
      grid-column: 3 / 4;
      grid-row: 1 / 2;
    }

    > .link-detalles {
      grid-column: 3 / 4;
      grid-row: 2 / 3;
    }

    > .subtitle {
      grid-column: 3 / 4;
      grid-row: 3 / 4;
    }

    > .section-images {
      grid-column: 1 / 3;
      grid-row: 1 / 4;
    }

    > .section-detalles {
      grid-column: 2 / -1;
      grid-row: 4 / -1;
    }
  }
  
}

</style>