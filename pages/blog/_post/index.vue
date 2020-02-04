<template>
  <div class="content">
    <div class="description">
      <p class="date">
        Published on
        <time>{{ require('moment')(attributes.date).format('YYYY/MM/DD') }}</time>
      </p>
      <h1>{{ attributes.title }}</h1>
      <blockquote>{{ attributes.description }}</blockquote>
    </div>
    <article v-html="content"></article>
  </div>
</template>

<script>
const fm = require("front-matter");
const md = require("markdown-it")({
  html: true,
  typographer: true
}).use(require("markdown-it-highlightjs"), { auto: true });

export default {
  async asyncData({ params }) {
    const fileContent = await import(`~/posts/${params.post}.md`);
    let res = fm(fileContent.default);

    return { attributes: res.attributes, content: md.render(res.body) };
  },

  head() {
    return {
      title: this.attributes.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.attributes.description
        }
      ]
    };
  }
};
</script>

<style scoped>
.date {
  font-size: 1em;
  font-weight: 200;
}
h1 {
  margin-top: 0;
  margin-bottom: 0;
}
.description {
  margin-bottom: 4em;
}
</style>