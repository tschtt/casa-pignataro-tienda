<template>
  <section class="section section-filters card">
    <h3 class="hide-visually">Filtros</h3>
    <div class="filter-actions">
      <button class="icon-before" icon="import_export" @click="toggle_sort">Ordenar</button>
      <button class="icon-before" icon="tune" @click="toggle_filters">Filtrar</button>
    </div>
    <article class="filter-item filter-order" :open="showSort">
      <header>
        <h4>Ordenar por</h4>
      </header>
      <ul>
        <li><nuxt-link :to="get_link({ orderBy: undefined, order: undefined })" :selected="current_order === 'none'">Mas relevantes</nuxt-link></li>
        <li><nuxt-link :to="get_link({ orderBy: 'value', order: 'asc' })"       :selected="current_order === 'asc'">Menor precio</nuxt-link></li>
        <li><nuxt-link :to="get_link({ orderBy: 'value', order: 'desc' })"      :selected="current_order === 'desc'">Mayor precio</nuxt-link></li>
      </ul>
    </article>
    <article class="filter-item filter-value" :open="showFilters">
      <header>
        <h4>Precio</h4>
      </header>
      <form class="filter-value-container" @submit.prevent="$router.push(link_value)">
        <label class="hide-visually" for="minValue">Mínimo</label>
        <input v-model="minValue" type="number" name="minValue" id="minValue" size="5" placeholder="Mínimo">
        <label class="hide-visually" for="maxValue">Máximo</label>
        <input v-model="maxValue" type="number" name="maxValue" id="maxValue" size="5" placeholder="Máximo">
        <button class="filter-button" :to="link_value">
          <span class="hide-visually">Filtrar</span>
          <span class="material-icons">arrow_forward</span>
        </button>
      </form>
    </article>
    <article class="filter-item filter-section" :open="showFilters" v-if="sections">
      <header>
        <h4>Secciones</h4>
      </header>
      <ul>
        <li v-for="section in sections" :key="section.id">
          <nuxt-link :to="get_link({ fkSection: section.id })" :selected="$route.query.fkSection == section.id">
            <span class="name">{{section.name}}</span>
            <span class="count">{{section.count}}</span>
          </nuxt-link>
        </li>
      </ul>
    </article>
    <article class="filter-item filter-category" :open="showFilters" v-if="categories">
      <header>
        <h4>Categorias</h4>
      </header>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <nuxt-link :to="get_link({ fkCategory: category.id })" :selected="$route.query.fkCategory == category.id">
            <span class="name">{{category.name}}</span>
            <span class="count">{{category.count}}</span>
          </nuxt-link>
        </li>
      </ul>
    </article>
    <article class="filter-item filter-attribute" :open="showFilters" v-for="attribute in attributes" :key="attribute.id">
      <header>
        <h4>{{ attribute.name }}</h4>
      </header>
      <ul>
        <li v-for="value in attribute.options" :key="value.id">
          <nuxt-link :to="get_link({ fkAttributeValue: value.id })" :selected="$route.query.fkAttributeValue == value.id">
            <span class="name">{{value.name}}</span>
            <span class="count">{{value.count}}</span>
          </nuxt-link>
        </li>            
      </ul>
    </article>
  </section>
</template>

<script>
export default {
  props: {
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
      minValue: '',
      maxValue: '',
      showFilters: false,
      showSort: false,
    }
  },
  mounted() {
    this.load_value()
  },
  computed: {
    
    current_order() {
      const { orderBy, order } = this.$route.query
      
      if(orderBy === 'value' && order === 'desc') {
        return 'desc'
      } else if(orderBy === 'value' && order === 'asc') {
        return 'asc'
      } else if(orderBy === undefined && order === undefined) {
        return 'none'
      }
      return undefined
    },

    link_order_none() {
      return this.get_link({ orderBy: undefined, order: undefined })
    },
    link_order_desc() {
      return this.get_link({ orderBy: 'value', order: 'desc' })
    },
    link_order_asc() {
      return this.get_link({ orderBy: 'value', order: 'asc' })
    },
    
    link_value() {
      const minValue = this.minValue || undefined
      const maxValue = this.maxValue || undefined
      return this.get_link({ minValue, maxValue })
    },
  },
  methods: {
    get_link(query) {
      return { page: '/articulos', query: { ...this.$route.query, ...query } }
    },
    load_value() {
      const { minValue, maxValue } = this.$route.query
      if(minValue) {
        this.minValue = minValue
      }
      if(maxValue) {
        this.maxValue = maxValue
      }
    },
    toggle_filters() {
      this.showSort = false
      this.showFilters = !this.showFilters
    },
    toggle_sort() {
      this.showFilters = false
      this.showSort = !this.showSort
    }
  }
}
</script>

<style lang="scss" scoped>

ul {
  padding: 0;
}

.section-filters {
  --border-color: var(--color-gray-400);
}

.filter-actions {
  display: flex;
  justify-content: space-around;
  padding: var(--space-200);
  
  > button + button {
    border-left: 1px solid var(--border-color);
  }
  
  > button {
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-100);
    padding: var(--space-200);
    background: transparent;
    cursor: pointer;
  }
}

.filter-item {

  &:not([open]) {
    display: none;
  }
  
  header {
    border-top: 1px solid var(--border-color);
    padding: var(--space-300) var(--space-500);
    font-size: 18px;
    letter-spacing: .1em;
    font-weight: bold;
  }
  
  a {
    display: block;
    
    color: var(--color-gray-600);
    text-decoration: none;
    
    border-left: 3px solid transparent;
    border-top: 1px solid var(--border-color);
    
    padding: var(--space-300) var(--space-500);

    transition: color 200ms ease border 200ms ease;

    &:hover {
      color: var(--color-gray-900);
      // border-left: 3px solid var(--color-gray-900);
    }

    &[selected] {
      color: var(--color-gray-900);
      border-left: 3px solid var(--color-main);
    }
  }

}

.filter-order {
  header {
    display: none;
  }
}

.filter-value {
  
  &-container {
    border-top: 1px solid var(--border-color);
    // padding: var(--space-100) var(--space-500);
    display: flex;
  }

  input {
    font-size: var(--text-200);
    letter-spacing: 0.1em;
    color: var(--color-gray-600);
    flex-basis: 0;
    flex-grow: 1;
    width: 15ch;
    background-color: transparent;
    border: none;
    border-left: 1px solid var(--border-color);
    -webkit-appearance: none;
    -moz-appearance: textfield;
    margin: 0;
    padding: var(--space-300) var(--space-500);

    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
  }

  button {
    display: flex;
    justify-content: center;
    cursor: pointer;
    background-color: transparent;
    align-items: center;
    text-decoration: none;
    padding: var(--space-300) var(--space-300);
    border-top: none;
    border-left: 1px solid var(--border-color);
    color: var(--color-gray-600);
  
    &:hover {
      color: var(--color-gray-900);
    }
  }

}

.filter-section,
.filter-category,
.filter-attribute {

  a {
    display: flex;
    gap: var(--space-200);
    justify-content: space-between;
    padding-right: var(--space-400);
  }

  // .count::before {
  //   content: '('
  // }
  // .count::after {
  //   content: ')'
  // }
}

@media (min-width: 900px) {

  .filter-actions {
    display: none;
  }

  .filter-item:not([open]) {
    display: block;
  }

  .filter-order header {
    display: block;
  }
  
}

</style>