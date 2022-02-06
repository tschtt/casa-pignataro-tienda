<template>
  <details class="section-filters card" open>
    <summary class="summary">Filtros</summary>
    <nav class="content">
      <ul class="stack stack-400">
        <li class="stack stack-200">
          <p class="text-400 bold">Valor</p>
          <form class="flex" @submit.prevent="$router.push({ path: '/articulos', query: { ...$route.query, minValue: minValue_local || undefined, maxValue: maxValue_local || undefined } })">
            <div>
              <label class="hide-visually" for="minValue">Mínimo</label>
              <input v-model="minValue_local" type="number" name="minValue" id="minValue" size="5" placeholder="minimo">
            </div>
            <div>
              <label class="hide-visually" for="maxValue">Máximo</label>
              <input v-model="maxValue_local" type="number" name="maxValue" id="maxValue" size="5" placeholder="maximo">
            </div>
            <button>
              >
            </button>
          </form>
        </li>
        <li v-if="sections">
          <p class="text-400 bold">Secciones</p>
          <ul>
            <li v-for="section in sections" :key="section.id">
              <nuxt-link :to="{ path: '/articulos', query: { ...$route.query, fkSection: section.id } }">
                {{section.name}} ({{section.count}})
              </nuxt-link>
            </li>
          </ul>
        </li>
        <li v-if="categories">
          <p class="text-400 bold">Categorias</p>
          <ul>
            <li v-for="category in categories" :key="category.id">
              <nuxt-link :to="{ path: '/articulos', query: { ...$route.query, fkCategory: category.id } }">
                {{category.name}} ({{category.count}})
              </nuxt-link>
            </li>
          </ul>
        </li>
        <li v-for="attribute in attributes" :key="attribute.id">
          <p class="text-400 bold">{{ attribute.name }}</p>
          <ul>
            <li v-for="value in attribute.options" :key="value.id">
              <nuxt-link :to="{ path: '/articulos', query: { ...$route.query, fkAttributeValue: value.id } }">
                {{value.name}} ({{value.count}})
              </nuxt-link>
            </li>            
          </ul>
        </li>
      </ul>
    </nav>
  </details>
</template>

<script>
export default {
  props: {
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 0,
    },
    sections: {
      type: Array,
      default: null,
    },
    categories: {
      type: Array,
      default: null,
    },
    attributes: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      minValue_local: '',
      maxValue_local: '',
    }
  },
  computed: {
    sections_local: {
      get() {
        return this.sections
      },
      set(value) {
        this.$emit('update:sections', value)
      }
    },
    categories_local: {
      get() {
        return this.categories
      },
      set(value) {
        this.$emit('update:categories', value)
      }
    },
    attributes_local: {
      get() {
        return this.attributes
      },
      set(value) {
        this.$emit('update:attributes', value)
      }
    },
  }
}
</script>

<style lang="scss" scoped>

ul {
  padding: 0;
}

a {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

.flex {
  > * {
    // min-width: 0;
    flex-basis: 0;
  }

  > div {
    background-color: red;
    flex-grow: 1;
  }

  input {
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
  }
}

.section-filters {
  padding: var(--space-400) var(--space-500);

  > .summary {
    cursor: pointer;
  }

  > * + * {
    margin-top: var(--space-400);
  }
}

</style>