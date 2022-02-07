<template>
  <div class="article-grid">
    <ArticleCard 
      v-for="article in articles" :key="article.id"
      v-bind="article"
    />
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      default: () => [],
    }
  }
}
</script>

<style lang="scss" scoped>

.article-grid {
  --grid-columns: var(--grid-columns-100, 1);

  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--space-600);

  > * {
    display: block;
  }
}

@media (min-width: 600px) {
  .article-grid {
      --grid-columns: var(--grid-columns-200, 2);
  }
}

@media (min-width: 1100px) {
  .article-grid {
    --grid-columns: var(--grid-columns-300, 4);
  }
}

</style>