<template>
  <div class="content">
    <h1>Research</h1>

    <h2>Conference</h2>
    <article v-for="(post, key) in posts" :key="key">
      <a class="post" :href="post.doi">
        <h3>{{ post.title }}</h3>
        <p>{{ post.abstract }}</p>
        <p class="date">Published in {{ post.conference }}</p>
      </a>
    </article>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return [
        {
          title:
            "PaintsTorch: a User-Guided Anime Line Art Colorization Tool with Double Generator Conditional Adversarial Network",
          abstract:
            "The lack of information provided by line arts makes user guided-colorization a challenging task for computer vision. Recent contributions from the deep learning community based on Generative Adversarial Network (GAN) have shown incredible results compared to previous techniques. These methods employ user input color hints as a way to condition the network. The current state of the art has shown the ability to generalize and generate realistic and precise colorization by introducing a custom dataset and a new model with its training pipeline. Nevertheless, their approach relies on randomly sampled pixels as color hints for training. Thus, in this contribution, we introduce a stroke simulation based approach for hint generation, making the model more robust to messy inputs. We also propose a new cleaner dataset, and explore the use of a double generator GAN to improve visual fidelity.",
          conference: "European Conference on Visual Media Production, 1-10",
          doi: "https://doi.org/10.1145/3359998.3369401"
        },
        {
          title:
            "Text-Driven Mouth Animation For Human Computer Interaction with Personal Assistant",
          abstract:
            "Personal assistants are becoming more pervasive in our environments but still do not provide natural interactions. Their lack of realism in term of expressiveness and their lack of visual feedback can create frustrating experiences and make users lose patience. In this sense, we propose an end-to-end trainable neural architecture for text-driven 3D mouth animations. Previous works showed such architectures provide better realism and could open the door for integrated affective Human Computer Interface (HCI). Our study shows that such visual feedback improves users' comfort for 78% of the candidates significantly while slightly improving their time perception.",
          conference:
            "ICAD 2019: The 25th International Conference on Auditory Display, 75-82",
          doi: "https://dx.doi.org/10.21785/icad2019.032"
        }
      ];
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
.post h3 {
  transition: var(--transition);
}
.post .date {
  transition: var(--transition);
}

.post:hover > p {
  color: var(--on-dark-primary);
}
.post:hover > h3 {
  color: var(--primary);
}
.post:hover:before {
  background-color: var(--secondary);
}
</style>