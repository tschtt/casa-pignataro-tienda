<template>
  <main>
    {{ article }}
  </main>
</template>

<script>
import { ref, useFetch, useRoute } from "@nuxtjs/composition-api"
import { useResource } from "~/composables/index.js"
export default {
  setup() {
    const $articles = useResource('/articles')
    const $route = useRoute()

    // Static data
    
    const id = $route.value.params.id

    // Reactive data
    
    const article = ref({})

    // Hooks

    useFetch(async () => {
      article.value = await $articles.findOne(id)
    })
    
    return {
      article,
    }
  }
}
</script>

<style>

</style>