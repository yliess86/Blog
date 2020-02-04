<template>
  <div class="content">
    <h1>Blog</h1>
    <article v-for="(post, key) in posts" :key="key">
      <nuxt-link class="post" :to="`/blog/${post.slug}`">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <p class="date">Published on {{ post.date }}</p>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  }
};
</script>

<style scoped>
.post {
  display: block;
  position: relative;
  transition: var(--transition);
}
.post:before {
  display: block;
  content: "";
  position: absolute;
  left: -2em;
  top: 0;

  width: 1em;
  height: 100%;
  transition: var(--transition);
  background-color: rgba(0, 0, 0, 0);
}
.post p {
  color: var(--on-dark-secondary);
  transition: var(--transition);
}
.post h2 {
  transition: var(--transition);
}
.post .date {
  transition: var(--transition);
}

.post:hover > p {
  color: var(--on-dark-primary);
}
.post:hover > h2 {
  color: var(--primary);
}
.post:hover:before {
  background-color: var(--secondary);
}
</style>