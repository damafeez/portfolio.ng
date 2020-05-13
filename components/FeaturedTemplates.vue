<template>
  <section class="featured-templates text-center py-24">
    <h3 class="mb-32">Featured templates</h3>
    <div class="template-grid">
      <div class="template-btn btn"></div>
      <div class="template-btn btn"></div>
      <div class="template-btn btn"></div>
      <div class="template-btn btn"></div>
      <div class="template-btn btn"></div>
      <div class="template-btn btn"></div>
    </div>
    <button class="bg-primary text-on-primary mt-20">
      View all templates &#8594;
    </button>
  </section>
</template>
<style lang="scss" scoped>
.featured-templates {
  .template-grid {
    display: grid;
    gap: 3rem;
    grid-template-columns: repeat(3, 1fr);
    .template-btn {
      background-image: url('~assets/images/template-sample.png');
      background-size: cover;
      height: 15rem;
      &:nth-child(even) {
        background-image: url('~assets/images/template-sample2.png');
      }
    }
  }
}
</style>
