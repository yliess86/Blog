<template>
  <nav>
    <div id="nav-wrapper">
      <div id="nav-logo">
        <span id="nav-logo-firstname">Yliess</span>
        <span id="nav-logo-lastname">HATI</span>
      </div>
      <div id="nav-routes">
        <nuxt-link class="route" to="/">Home</nuxt-link>
        <nuxt-link class="route" to="/research">Research</nuxt-link>
        <nuxt-link class="route" to="/blog">Blog</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: relative;
  width: 100%;

  background-color: var(--background-secondary);
  overflow: hidden;
}
#nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 1.5em 0;

  width: 80%;
  margin: 0 auto;
}
#nav-logo {
  color: var(--on-dark-primary);
}
#nav-logo-firstname {
  font-size: 2em;
  font-weight: 400;
}
#nav-logo-lastname {
  font-size: 2em;
  font-weight: 800;
  color: var(--primary);
}
#nav-routes {
  font-size: 1em;
}
a {
  color: var(--on-dark-third);
  font-weight: 400;
  height: 100%;
}
a:hover {
  color: var(--secondary);
}
.nuxt-link-exact-active {
  color: var(--on-dark-primary);
}
.route {
  display: inline-block;
  margin-left: 1em;
}

@media only screen and (max-width: 768px) {
  #nav-wrapper {
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }
  #nav-logo {
    text-align: center;
  }
  #nav-routes {
    font-size: 1.5em;
    text-align: center;
  }
  .route {
    display: block;
    margin-top: 1.5em;
    margin-left: 0;
  }
}
</style>