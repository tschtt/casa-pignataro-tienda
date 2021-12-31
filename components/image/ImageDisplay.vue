<template>
  <div class="image-display stack">
    <transition name="fade">
      <img 
        class="image-selected card"
        :src="images[selected]" 
      >
    </transition>
    <ImageReel 
      class="image-reel"
      :images="images"
      @click="selected = $event"
    />
  </div>
</template>

<script>import { ref } from "@nuxtjs/composition-api"

export default {
  props: {
    images: {
      type: Array,
      required: true,
    }
  },
  setup() {
    const selected = ref(0)

    return {
      selected,
    }
  }
}
</script>

<style lang="scss" scoped>

.image-display {

  > .image-selected {
    width: 100%;
    height: auto;
    object-fit: contain;
    aspect-ratio: 1;
  }

}

@media (min-width: 1000px) {

  .image-display {
    --stack-space: 0;
    
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: var(--space-200);

    > .image-selected {
      grid-column: 2 / -1;
      grid-row: 1;
    }

    > .image-reel {
      grid-column: 1 / 2;
      grid-row: 1;
    }
    
  }
  
}

</style>