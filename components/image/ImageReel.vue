<template>
  <div class="image-reel">
    <button
      class="card"
      v-for="(image, index) in images"
      :key="index"
      @click="click(index)"
    >
      <img 
        class="image" 
        :src="image"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  methods: {
    click(index) {
      this.$emit('click', index)
    }
  }
}
</script>

<style lang="scss" scoped>

.image-reel {
  display: flex;

  overflow-x: auto;
  
  gap: var(--space-200);
  padding-bottom: var(--space-200);
  scrollbar-width: thin;

  > * {
    flex: 0 0 100px;
    aspect-ratio: 1;
    
  }

  .image {
    width: 100%;
    object-fit: contain;
  }

}

@media (min-width: 1000px) {

  .image-reel {
    flex-direction: column;
  }
  
}

</style>