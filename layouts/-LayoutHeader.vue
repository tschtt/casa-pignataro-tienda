<template>
  <header class="layout-header">
    <h1>
      <nuxt-link to="/">
        <picture>
          <source 
            media="(min-width: 1000px)" 
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
      <nuxt-link to="/contacto" class="icon-after" icon="place">
        <span class="hide-visually">
          Contacto
        </span>
      </nuxt-link>
    </nav>
  </header>
</template>

<style lang="scss" scoped>

.layout-header {
  // Layout
  display: grid;
  grid-template-columns: minmax(15%, 1fr) minmax(auto, 60ch) minmax(15%, 1fr);
  align-items: center;
  gap: var(--space-300);
  // Spacing
  padding: var(--space-400);
  // Colors
  // background-color: var(--color-main);
  background-image: linear-gradient(#f23b3b, #d71111);
  box-shadow: var(--shadow-200);
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

  > * {
    background-color: transparent;
    border: none;
  }

  > input {
    font-size: var(--text-300);
    padding: var(--space-100);
    flex-grow: 1;
    order: 1;
  }

  > button {
    order: 0;
    padding-inline: var(--space-200);
    cursor: pointer;
  }
}

.header-nav {
  display: flex;
  justify-content: flex-end;

  > a {
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

</style>