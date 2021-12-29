<template>
  <header class="layout-header">
    <h1 class="layout-title">
      <nuxt-link to="/">
        <picture>
          <source 
            media="(min-width: 700px)" 
            srcset="logo-transparent.png"
          >
          <img
            src="logo-small-transparent.png"
            alt="Casa Pignataro Electrodomésticos"
            width="45"
            height="45"
          >
        </picture>
      </nuxt-link>
    </h1>
    <form class="search-form" role="search">
      <input type="text" placeholder="¡Buscá tu producto!">
      <button class="material-icons">
        search
      </button>
    </form>
    <nav class="header-nav">
      <nuxt-link to="/" class="nav-link icon-after" icon="place">
        <span class="hide-visually">
          Contacto
        </span>
      </nuxt-link>
      <button class="nav-link-menu nav-link icon-after" icon="menu" @click="toggleNav">
        <span class="hide-visually">
          Categorias
        </span>
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    showNav: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {

    const toggleNav = () => {
      emit('update:show-nav', !props.showNav)
    }

    return {
      toggleNav
    }    
  }
}
</script>

<style lang="scss" scoped>

.layout-header {
  // Layout
  display: grid;
  grid-template-columns: minmax(min-content, 1fr) minmax(auto, 60ch) minmax(auto, 1fr);
  align-items: center;
  gap: var(--space-300);
  padding: var(--space-400);

  
  > h1 {
    min-width: 45px;
  }
}

.search-form {
  display: flex;
  
  // Color
  background-color: var(--color-gray-100);
  box-shadow: var(--shadow-inner-100);
  
  // Border
  border-width: 3px;
  border-style: solid;
  border-color: var(--color-accent);
  border-radius: var(--border-100);

  overflow: hidden;

  > * {
    background-color: transparent;
    border: none;
  }

  > input {
    font-size: var(--text-300);
    padding: var(--space-100);
    padding-left: var(--space-400);
    flex-grow: 1;
  }

  > button {
    
    padding-inline: var(--space-200);
    border-radius: var(--border-100);

    cursor: pointer;
    
    
    transition: background-color 200ms ease;

    &:hover {
      background-color: var(--color-gray-300);
    }
  }
}

.header-nav {
  display: flex;
  justify-content: flex-end;

  > .nav-link {
    background-color: transparent;
    border: none;
    padding: var(--space-100);
    color: var(--color-gray-100);
    text-decoration: none;
    display: flex;
    
    border-bottom: 1px solid transparent; 

    transition: border-color 200ms ease;

    &:hover {
      border-color: white;
    }
  }
}

@media (min-width: 700px) {

  .layout-header {
    display: grid;
    grid-template-columns: 1fr minmax(40ch, auto);
    grid-template-rows: auto auto;
    
    padding-block: var(--space-400);
    padding-inline: var(--space-400);

    > h1 {
      grid-column: 1 / 2;
      grid-row: 1 / -1;
      justify-self: start;
    }

    > form {
      grid-column: 2 / -1;
      grid-row: 1;
    }
    
  }

  .header-nav {
    > .nav-link-menu {
      display: none;
    }

  }


  .layout-title img {
    width: auto;
    height: 85px;
  }

  .search-form {

    > input {
      padding-left: var(--space-300);
      order: 0;
    }

    > button {
      order: 1;
    }
    
  }
  
  .nav-link {
    font-weight: bold;
    font-size: var(--text-300);

    &:after {
      padding-left: var(--space-100);
    }
    
    > span {
      position: static;
    }
  }
  
}

</style>