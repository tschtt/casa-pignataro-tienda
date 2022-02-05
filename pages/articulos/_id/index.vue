<template>
  <main v-if="!loading" class="[ page-article-id ][ stack stack-500 ]">
    <section class="section-data">
      <h2 class="title">
        {{ article.name }}
      </h2>
      <p class="subtitle">
        {{ formatValue(article.value) }}
      </p>
      <a class="link-detalles color-gray-900" href="#detalles">
        Ver detalles
      </a>
    </section>
    <div class="image-selected-container">
      <transition name="fade">
        <img 
          class="image-selected"
          :src="article.images[imageSelected]" 
          :key="article.images[imageSelected]"
        >
      </transition>
    </div>
    <ImageReel
      class="image-reel"
      :images="article.images"
      @click="imageSelected=$event"
    />
    <section id="detalles" class="section-detalles stack stack-300">
      <h3 class="subtitle">
        Información del producto
      </h3>
      <pre>{{ article.description }}</pre>
    </section>
    <section v-if="article.attributes.length" class="section-categorias stack stack-400">
      <h3 class="subtitle">
        Características
      </h3>
      <dl class="definition-list">
        <div v-for="(attribute, index) in article.attributes" :key="index">
          <dt>{{ attribute.name }}</dt>
          <dd>{{ attribute.value }}</dd>
        </div>
      </dl>
    </section>
  </main>
</template>

<script>
import { ref, useFetch, useRoute } from "@nuxtjs/composition-api"
import { useResource } from "~/composables/index.js"
import ImageReel from "~/components/image/ImageReel.vue";
export default {
  components: {
    ImageReel,
  },
  setup() {
    const $articles = useResource("/articles");
    const $route = useRoute();
    
    // Reactive data
    const loading = ref(true)
    const article = ref({})
    
    // Static data
    const id = $route.value.params.id;
    
    // // Computed
    // const name = computed(() => {
    //   return article.value.name || "Nombre del artículo";
    // });
    
    const formatValue = (value = 0) => {
      const sign = "$";
      return `${sign}${value.toFixed(2)}`;
    }
    
    // const description = computed(() => {
    //   return article.value.description;
    // });
    
    // const images = computed(() => {
    //   return article.value.images || [];
    // });

    const imageSelected = ref(0)
    
    // Hooks

    useFetch(async () => {
      article.value = await $articles.findOne(id);
      loading.value = false
    });

    return {
      article,
      imageSelected,
      formatValue,
      loading,
    };
  },
}
</script>

<style lang="scss" scoped>

.card {
  padding: var(--space-200);
}

.attribute-group {
  > h4 {
    font-size: var(--text-400);
  }
}

.definition-list {
  > * {
    display: flex;
    border-bottom: 1px solid var(--color-gray-500);
    padding-block: var(--space-200);
  }

  dt {
    font-weight: 500;
    flex: 1 0 0;
  }

  dd {
    flex: 1 0 0;
  }
}

.image-selected-container {
  position: relative;
  background-color: var(--color-gray-100);
  aspect-ratio: 1;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: var(--shadow-100);
  overflow: hidden;

  > * {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;

  }
}
.page-article-id {
  max-width: 600px;
  margin-inline: auto;
}

.subtitle-2 {
  font-size: var(--text-600);
}

.section-data {

  > * + * {
    margin-top: var(--space-400);
  }
  
  > .title {
    font-size: 40px;
    line-height: 1.1em;
  }

  > .subtitle {
    font-size: 55px;
    font-weight: 200;
  }

  > .link-detalles {
    color: var(--color-gray-700);
    font-size: var(--text-600);
    font-weight: 500;
  }
}

@media (min-width: 1000px) {
  
  .page-article-id {
    --stack-space: 0;
    
    display: grid;
    grid-template-columns: 100px 500px 1fr;
    gap: var(--space-500);

    max-width: 1000px;

    > * {
      margin-top: 0;
    }

    > .section-data {
      padding-top: var(--space-100);
      grid-column: 3 / 4;
      grid-row: 1 / -1;
    }

    > .image-selected-container {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }

    > .image-reel {
      grid-column: 1 / 2;
      grid-row: 1 / 5;
    }

    > .section-detalles {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }

    > .section-categorias {
      max-width: 60ch;
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    }
  }

  .section-data {
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: var(--space-300);
    padding-left: var(--space-400);

    > .title {
      font-size: 40px;
      line-height: 1.1em;
      grid-row: 1;
    }

    > .subtitle {
      font-size: 55px;
      font-weight: 200;
      grid-row: 3;
    }

    > .link-detalles {
      grid-row: 2;
      color: var(--color-gray-700);
      font-size: var(--text-600);
      font-weight: 500;
    }
  }
  
}

</style>