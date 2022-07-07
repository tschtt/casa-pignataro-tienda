<template>
  <nuxt-link class="article-card card" interactive :to="to">
    <article class="article-categorie article">
      <div class="image">
        <img 
          :src="images[0]"
          height="200"
          width="200"
        >
      </div>
      <h4 class="name">
        {{ name }}
      </h4>
      <p class="description">
        {{ shortDescription }}
      </p>
      <p class="value">
        {{ valueFormatted }}
      </p>
    </article>
  </nuxt-link>
</template>

<script>
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
    value: {
      type: Number,
      required: true,
    },
    shortDescription: {
      type: String,
      default: null,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  computed: {

    to() {
      return `/articulos/${this.id}`
    },

    valueFormatted() {
      return this.value.toLocaleString('es-AR', { 
        maximumFractionDigits: 2, 
        currency: 'ARS',
        style: 'currency'
      })
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
  // margin-top: var(--space-400);
}

.article {

  display: grid;
  gap: var(--space-200);
  grid-template-rows: auto auto 1fr auto;
  height: 100%;

  // > * + * {
  //   margin-top: var(--space-200);
  // }

  > .image {
    box-shadow: var(--shadow-100);  
    overflow: hidden;
    aspect-ratio: 1;
  }

  > .name {
    padding-inline: var(--space-200);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
    font-size: var(--text-400);
    font-weight: 500;
  }

  > .description {
    font-size: var(--text-100);
    padding-inline: var(--space-200);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  > .value {
    text-align: right;
    padding-inline: var(--space-200);
    padding-bottom: var(--space-200);
    font-size: var(--text-500);
    font-weight: 500;
    font-weight: 400;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}




</style>