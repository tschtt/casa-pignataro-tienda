<template>
  <footer class="layout-footer stack stack-300">
    <h3 class="subtitle color-main">
      Contacto
    </h3>
    <dl class="stack">
      <div 
        v-for="item in items" :key="item.order"
        class="flex align-center"
      >
        <dt class="flex align-center">
          <div class="material-icons" aria-hidden>
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
import { useFetch, ref } from '@nuxtjs/composition-api'
import { useResource } from "~/composables"

export default {
  setup() {
    const $contact = useResource('/contact')

    const items = ref([])

    const loadItems = async () => {
      items.value = await $contact.findMany({ active: 1 })
    }

    useFetch(async () => {
      await loadItems()
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
    font-size: var(--text-500);
    line-height: 1em;
  }

  dl {
    --flex-gap: var(--space-900);
  }

  dd {
    font-size: var(--text-100);
  }
}

</style>