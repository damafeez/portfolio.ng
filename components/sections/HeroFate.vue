<template>
  <section class="hero bg-secondary text-on-secondary pb-32">
    <div class="img-zoom absolute rounded-full hero__img">
      <img is="p-img" address="profile.images[0]" alt="user image" />
    </div>
    <nav class="neg-margin pad-x py-6"></nav>
    <h1 class="mt-48 mb-6 max-w-2xl">
      Hi, <br />
      I'm
      <span is="p-text" address="profile.name"></span>.
    </h1>
    <p is="p-text" address="profile.description" class="max-w-xl"></p>
    <button
      is="p-text"
      address="cta[0].text"
      class="bg-primary my-10 text-on-primary"
    ></button>
  </section>
</template>
<script>
export default {
  tags: ['somolu', 'dev', 'hero'],
}
</script>
<style lang="scss" scoped>
.hero {
  &__img {
    width: 60rem;
    height: 55rem;
    top: -20%;
    right: -20%;
  }
}
</style>
