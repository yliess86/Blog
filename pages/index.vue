<template>
  <div class="content">
    <h1>Home</h1>

    <h2>Who Am I?</h2>
    <p>
      I am a PhD Student at the
      <a href="http://dvic.devinci.fr/">De Vinci Innovation Center</a> in the Human Computer Interaction Group.
    </p>
    <p>In my research, I explore the use of Artificial Intelligence, and expecially its subfield Deep Learning, to develop new kinds of interactions, and/or experiences</p>
    <p>I am convinced that Open Source and Open Science is the way to go. As many projects tend to stay in a Proof of Concept stage, I always try to make them almost production-ready.</p>
    <p>I also have a strong interest in Computer Graphics, Video Games, and Drawing.</p>
    <div id="contacts">
      <a href="https://github.com/yliess86">
        <fa class="icon" :icon="faGithub" />
      </a>
      <a href="https://twitter.com/HatiYliess">
        <fa class="icon" :icon="faTwitter" />
      </a>
      <a href="https://www.linkedin.com/in/yliess-hati">
        <fa class="icon" :icon="faLinkedin" />
      </a>
    </div>

    <h2>Research</h2>
    <p>
      In the
      <nuxt-link to="/research">research section</nuxt-link>, you will find links to my academic research publications.
    </p>

    <h2>Blog</h2>
    <p>
      In my
      <nuxt-link to="/blog">blog</nuxt-link>, I share my thoughts on subjects related to my research topic, passions, as well as some experiments or notes.
    </p>
  </div>
</template>

<script>
import {
  faGithub,
  faLinkedin,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

export default {
  transition: "page",
  computed: {
    faGithub() {
      return faGithub;
    },
    faLinkedin() {
      return faLinkedin;
    },
    faTwitter() {
      return faTwitter;
    }
  }
};
</script>

<style scoped>
.icon {
  font-size: 1.5em;
  margin-right: 0.5em;
}

@media only screen and (max-width: 768px) {
  #contacts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 70%;
    margin: 2em auto;
    align-content: center;
    align-items: center;
    text-align: center;
  }
  .icon {
    margin-right: 0;
    font-size: 2em;
  }
}
</style>