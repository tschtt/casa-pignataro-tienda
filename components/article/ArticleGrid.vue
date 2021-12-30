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
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>

.article-grid {
  --grid-columns: 1;

  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--space-500);

  > * {
    display: block;
  }
}

@media (min-width: 500px) {
  .article-grid {
    --grid-columns: 2;
  }
}

@media (min-width: 800px) {
  .article-grid {
    --grid-columns: 4;
  }
}

</style>