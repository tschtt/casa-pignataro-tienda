<template>
  <footer class="layout-footer stack stack-300">
    <h3 class="subtitle color-main">
      Contacto
    </h3>
    <dl class="field-container stack">
      <div 
        v-for="item in items" :key="item.order"
        class="[ flex flex-center ]"
      >
        <dt>
          <div class="material-icons [ flex flex-center ]" aria-hidden>
            {{ item.icon }}
          </div>
          <div class="hide-visually">
            {{ item.name }}
          </div>
        </dt>
        <dd>
          <pre>{{ item.value }}</pre>
        </dd>
      </div>
    </dl>
  </footer>
</template>

<script>
import { onMounted, ref } from '@nuxtjs/composition-api'
import { useResource } from "~/composables"

export default {
  setup() {
    const $contact = useResource('/contact')

    const items = ref([])

    const loadItems = async () => {
      items.value = await $contact.findMany({ active: 1 })
    }

    onMounted(() => {
      loadItems()
    })

    return {
      items,
    }    
  },
}
</script>

<style lang="scss" scoped>

.layout-footer {
  h3 {
    line-height: 1em;
  }
}

</style>