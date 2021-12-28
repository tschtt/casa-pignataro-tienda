<template>
  <section class="article-categorie break-word">
    <h3 class="title color-main">
      {{ name }}
    </h3>
    <div class="grid">
      <nuxt-link 
        v-for="article in articles"
        :key="article.id"
        to="/"
      >
      
        <article
          class="article card"
        >
          <div class="image">
            <img 
              :src="article.images[0]"
              height="200"
              width="200"
            >
          </div>
          <h4 class="name">{{ article.name }}</h4>
          <p class="description">
            {{ article.shortDescription }}
          </p>
          <p class="value">
            $ {{ article.value.toFixed(2) }}
          </p>
        </article>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { useFetch, ref } from "@nuxtjs/composition-api"
import { useResource } from "~/composables/index.js"

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const $articles = useResource('/articles')

    const articles = ref([])

    useFetch(async () => {
      articles.value = await $articles.findMany({ fkCategorie: props.id, limit: 4 })
    })
    
    return {
      articles,
    }
  }
}
</script>

<style lang="scss" scoped>

a {
  text-decoration: none;
  color: inherit;
}

.article-categorie > * + * {
  margin-top: var(--space-400);
}

.grid {
  --grid-columns: 1;
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--space-500);

  > * {
    display: block;
  }
}

@media (min-width: 500px) {
  .grid {
    --grid-columns: 2;
  }
}

@media (min-width: 800px) {
  .grid {
    --grid-columns: 4;
  }
}

.break-word {
  word-break: break-word;
}

.card {
  background-color: var(--color-gray-100);
  border-radius:15px;

  overflow: hidden;
  
  // border: 1px solid var(--color-gray-500);
  box-shadow: var(--shadow-200);
  
  // padding: var(--space-200);

  transition: box-shadow 400ms ease;

  &:hover {
    box-shadow: var(--shadow-400);
  }
}

.article {

  > * + * {
    margin-top: var(--space-200);
  }

  > .image {
    // border-radius:10px;
    
    box-shadow: var(--shadow-100);  
    
    overflow: hidden;
    aspect-ratio: 1;
  }

  > .name {
    padding-inline: var(--space-200);
    font-size: var(--text-400);
    font-weight: 500;
  }

  > .description {
    font-size: var(--text-100);
    padding-inline: var(--space-200);

    // text-overflow: ellipsis;
    // white-space: nowrap;

    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  > .value {
    text-align: right;
    padding-inline: var(--space-200);
    padding-bottom: var(--space-200);
    font-size: var(--text-400);
    font-weight: 500;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

</style>