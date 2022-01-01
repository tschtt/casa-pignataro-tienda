<template>
  <main class="[ page-article-id ][ stack ]">
    <section class="section-data">
      <h2 class="title">
        {{ name }}
      </h2>
      <p class="subtitle">
        {{ value }}
      </p>
      <a class="link-detalles color-gray-900" href="#detalles">
        Ver detalles
      </a>
    </section>
    <img 
      class="image-selected"
      :src="images[imageSelected]" 
      @click="imageSelected++"
    >
    <ImageReel
      class="image-reel"
      :images="images"
      @click="imageSelected=$event"
    />
    <section id="detalles" class="section-categorias stack stack-200">
      <h3 class="subtitle">
        Categorias
      </h3>
      <article
        class="attribute-group"
        v-for="group in attributes" :key="group.order"
      >
        <h4>{{ group.name }}</h4>
        <dl class="definition-list">
          <div v-for="attribute in group.attributes" :key="attribute.order">
            <dt>{{ attribute.name }}</dt>
            <dd>{{ attribute.value }}</dd>
          </div>
        </dl>
      </article>
    </section>
    <section class="section-detalles stack stack-200">
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
import ImageReel from "~/components/image/ImageReel.vue";
export default {
  components: {
    ImageReel,
  },
  setup() {
    const $articles = useResource("/articles");
    const $route = useRoute();
    
    // Reactive data
    const article = ref({});
    
    // Static data
    const id = $route.value.params.id;
    const attributes = [
      {
        name: "Medidas",
        order: 1,
        attributes: [
          { order: 0, name: "Alto (cm)", value: "85,0" },
          { order: 1, name: "Ancho (cm)", value: "56,0" },
          { order: 2, name: "Profundidad (cm)", value: "59,0" },
        ],
      },
      {
        name: "Otros datos",
        order: 2,
        attributes: [
          { order: 0, name: "Tipo", value: "Multigas" },
          { order: 1, name: "Color", value: "Gris" },
          { order: 2, name: "Material", value: "Acero Inoxidable" },
        ]
      },
    ];
    
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

    const imageSelected = ref(0)
    
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
      attributes,
      imageSelected,
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
    border-bottom: 1px solid var(--color-gray-900);
    padding-block: var(--space-100);
  }

  dt {
    flex: 1 0 0;
  }

  dd {
    flex: 1 0 0;
  }
}

.image-selected {
  background-color: var(--color-gray-100);
  aspect-ratio: 1;
  width: 100%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: var(--shadow-100);
}
.page-article-id {
  max-width: 600px;
  margin-inline: auto;
}

.subtitle-2 {
  font-size: var(--text-600);
}

@media (min-width: 1000px) {
  
  .page-article-id {
    --stack-space: 0;
    
    display: grid;
    grid-template-columns: 100px 500px 1fr;
    gap: var(--space-500);

    max-width: 1000px;

    > .section-data {
      padding-top: 1em;
      top: var(--space-500);
      position: -webkit-sticky;
      position: sticky;
      height: max-content;
      grid-column: 3 / 4;
      grid-row: 1 / -1;
    }

    > .image-selected {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }

    > .image-reel {
      grid-column: 1 / 2;
      grid-row: 1 / 5;
    }

    > .section-categorias {
      max-width: 60ch;
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }

    > .section-detalles {
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    }
  }
  
}

</style>