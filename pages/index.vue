<template>
  <div class="main-container background-image stack">
    <header>
      <h1>
        <img class="logo" src="/logo-transparent.svg" alt="Casa Pignataro" width="300" height="100">
      </h1>
    </header>
    <main class="stack">
      <h2 class="border-left-blue">
        <b>Sitio</b> en <br/> construcción
      </h2>
      <p>
        Desde Casa Pignataro estamos trabajando
        para que tengas la mejor experiencia. 
        Proximamente encontrarás nuestro catálogo
        virtual
      </p>
    </main>
    <footer class="stack">
      <h3 class="color-main">
        Contacto
      </h3>
      <dl class="text-100">
        <div class="[ icon icon-place ][ flex flex-center ]">
          <dt class="hidden">Ubicación</dt>
          <dd>Avenida Gral. San Martín 3704. Lomas del Mirador</dd>
        </div>
        <div class="[ icon icon-schedule ][ flex flex-center ]">
          <dt class="hidden">Horario</dt>
            <dd>
              Lunes a Viernes de 08:30 a 13:00 - 15:00 a 18:00 <br/> 
              Sabados de 08:30 a 13:00
            </dd>
        </div>
        <div class="[ icon icon-phone ][ flex flex-center ]">
          <dt class="hidden">Teléfono</dt>
          <dd>4454-5871</dd>
        </div>
      </dl>
    </footer>
  </div>
</template>

<style lang="scss">

.main-container {
  display: grid;
  padding: 5vh var(--space-600);
  min-height: 100%;
  color: white;  
  gap: var(--space-400);

  dl > * + * {
    margin-top: var(--space-200);
  }

  > footer {
    align-self: center;
    border-top: 10px solid;
    border-image-slice: 1;
    border-width: 3px;;
    border-image-source: linear-gradient(to right, transparent, var(--color-secondary) 10% 90%, transparent);
    padding-top: var(--space-400);
  }

  .border-left-blue {
    border-left: var(--space-300) solid var(--color-secondary);
    padding-left: var(--space-300);
    margin-bottom: 1rem;
  }

}

.background-image {
  background-image: url('/construccion-fondo.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
}

@media (min-width: 600px) {

  .main-container {
    gap: var(--space-400);
  }

  .main-container > footer {
    align-self: initial;
    border-image-source: linear-gradient(to right, transparent, var(--color-secondary) 5%, transparent 80%);
  }
  
  .main-container .logo {
    width: 350px;
    height: auto;
  }
}

</style>