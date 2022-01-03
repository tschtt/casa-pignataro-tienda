<template>
  <main class="page-contacto">
    <h2 class="title color-main">
      Encontranos en
    </h2>
    <iframe 
      class="maps card"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.3354041669345!2d-58.53282568474371!3d-34.67148346859396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc944e672608b%3A0x622c9097384c7211!2sCasa%20Pignataro!5e0!3m2!1sen!2sar!4v1641131130226!5m2!1sen!2sar" 
      width="600" height="450" 
      style="border:0;" 
      allowfullscreen="" 
      loading="lazy"
    />
    <dl class="info stack stack-600">
      <div 
        v-for="item in items" :key="item.order"
        class="flex align-center"
      >
        <dt class="flex align-center">
          <div class="info-icon material-icons text-800" aria-hidden>
            {{ item.icon }}
          </div>
          <div class="hide-visually">
            {{ item.name }}
          </div>
        </dt>
        <dd class="info-text text-600">
          <pre>{{ item.value }}</pre>
        </dd>
      </div>
    </dl>
  </main>
</template>

<script>
import { useFetch, ref } from '@nuxtjs/composition-api'
import { useResource } from "~/composables"

export default {
  setup() {
    const $contact = useResource('/contact')

    const loading = ref(true)

    const items = ref([])

    const loadItems = async () => {
      items.value = await $contact.findMany({ active: 1 })
    }

    // onMounted(() => {
    //   loadItems()
    // })

    useFetch(async () => {
      await loadItems()
      loading.value = false
    })

    return {
      items,
    }    
  },
}
</script>

<style lang="scss" scoped>

.page-contacto {
  display: grid;
  gap: var(--space-400);

  > .maps {
    width: 100%;
  }

  > .info {
    display: none;
  }
}

@media (min-width: 900px) {

  .page-contacto {
    display: grid;
    gap: var(--space-500) var(--space-600);
    grid-template-columns: 1.5fr 1fr;
    grid-template-rows: auto auto;

    > h2 {
      grid-column: 1 / -1;
      grid-row: 1;
    }

    > .maps {
      grid-column: 1 / 2;
      grid-row: 2;
    }

    > .info {
      display: block;
      grid-column: 2 / 3;
      grid-row: 2;

      > * {
        gap: var(--space-500);
      }

      .info-icon {
        color: var(--color-accent);
        background-color: var();
        
        padding: var(--space-200);
        border: 3px solid var(--color-accent);
        border-radius: 100%;
      }
    }
  }
  
}

</style>