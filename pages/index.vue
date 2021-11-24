<template>
    <div class="main-container">
    <header>
      <h1>
        <img class="logo" src="/logo-transparent.svg" alt="Casa Pignataro" width="350">
      </h1>
    </header>
    <main>
      <h2>
        <b>Sitio</b> en <br/> construcción
      </h2>
      <p>
        Desde Casa Pignataro estamos trabajando
        para que tengas la mejor experiencia. 
        Proximamente encontrarás nuestro catálogo
        virtual
      </p>
    </main>
    <footer>
      <h3>Contacto</h3>
      <dl class="flex flex-column">
        <div class="[ icon icon-place ][ flex flex-align-center ]">
          <dt class="hidden">Ubicación</dt>
          <dd>Avenida Gral. San Martín 3704. Lomas del Mirador</dd>
        </div>
        <div class="[ icon icon-schedule ][ flex flex-align-center ]">
          <dt class="hidden">Horario</dt>
          <div>
            <dd class="flex-grow-1">Lunes a Viernes de 08:30 a 13:33 - 15:00 a 18:00</dd>
            <dd class="flex-grow-1">Sabados de 08:30 a 13:00</dd>
          </div>
        </div>
        <div class="[ icon icon-phone ][ flex flex-align-center ]">
          <dt class="hidden">Teléfono</dt>
          <dd>4454-5871</dd>
        </div>
      </dl>
    </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

.main-container {
  background-image: url('/construccion-fondo.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left;
  background-color: black;
  color: white;

  display: grid;
  grid-template-rows: auto 1fr auto;
  
  height: 100%;

  > header {
    margin-bottom: 1em;
  }

  > main {
    font-size: 18px;
    align-self: center;
    padding: 1em 1.5em;
  }

  > footer {
    padding: 1em 1.5em;
  }

  .logo {
    margin: 0 auto;
  }

  img {
    // margin: auto;
  }

  h2 {
    font-size: 45px;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 30px;
    margin-bottom: 1rem;
  }

  b, h3 {
    color: #f57733;
  }
}

@media (min-width: 600px) {
  
  .main-container {
    background-image: url('/construccion-fondo.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right;
    
    background-color: black;
    color: white;
    font-size: 20px;
    
    .logo {
      margin: 0;
      width: 450px;
    }
  
    h1 {
      margin-bottom: -1em;
    }
  
    h2 {
      border-left: 1rem solid #0546ec;
      padding: 0 1rem;
    }
  
    p {
      margin-top: 1em;
      font-size: 25px;
      max-width: 40ch;
    }
  
    b, h3 {
      color: #f57733;
    }
  
    b {
      font-size: 75px;
    }

    h2 {
      font-size: 60px;
    }

    h3 {
      font-size: 40px;
    }
  
    > header {
      margin-top: 1em;
      margin-inline: 1em;
      padding-inline: 1.5em;
    }
  
    > main {
      margin-inline: 2em;
      padding-inline: 2em;
    }
  
    > footer {
      max-width: 80ch;
      // border-top: 3px solid #0546ec;
      border-top: 10px solid;
      border-image-slice: 1;
      border-width: 3px;;
      border-image-source: linear-gradient(to right, hsla(223, 96%, 47%, 0.1), #0546ec 5%, hsla(223, 96%, 47%, 0.1) 95%);
      margin-inline: 2em;
      padding-block: 1em;
    }
  }
  
}


</style>
