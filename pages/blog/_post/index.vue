<template>
  <div class="content">
    <div class="description">
      <p class="date">
        Published on
        <time>{{ require('moment')(attributes.date).format('YYYY/MM/DD') }}</time>
        <span>
          <fa class="icon" :icon="faStopwatch" />
          {{attributes.read}}
        </span>
      </p>
      <h1>{{ attributes.title }}</h1>
      <blockquote>{{ attributes.description }}</blockquote>
    </div>
    <article v-html="content"></article>
  </div>
</template>

<script>
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

let hljs = require("markdown-it-highlightjs");
let kt = require("katex");
let tm = require("markdown-it-texmath").use(kt);

const fm = require("front-matter");
const md = require("markdown-it")({ html: true, typographer: true })
  .use(hljs, { auto: true })
  .use(tm, { delimiters: "dollars", macros: { "\\RR": "\\mathbb{R}" } });

export default {
  async asyncData({ params }) {
    const fileContent = await import(`~/posts/${params.post}.md`);
    let res = fm(fileContent.default);

    return { attributes: res.attributes, content: md.render(res.body) };
  },

  computed: {
    faStopwatch() {
      return faStopwatch;
    }
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
.date span {
  margin-left: 1em;
}
.date span .icon {
  margin-right: 0.2em;
}
</style>