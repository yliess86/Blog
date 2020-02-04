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
#nav-routes .route {
  margin-left: 1em;
}
a {
  color: var(--on-dark-secondary);
  font-weight: 400;
  height: 100%;
}
a:hover {
  color: var(--secondary);
  font-weight: 600;
}
.nuxt-link-exact-active {
  color: var(--on-dark-primary);
  font-weight: 600;
}
</style>