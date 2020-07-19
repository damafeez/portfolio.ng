<template>
  <section
    class="hero bg-secondary text-on-secondary pb-32 overflow-hidden relative"
  >
    <img
      is="p-img"
      :overlay="currentThemeName === 'night' ? 0.4 : undefined"
      class="hero__img absolute rounded-full hidden md:inline-block"
      address="profile.images[1]"
      alt="user image"
    />
    <div class="relative">
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
    </div>
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
    width: 55rem;
    height: 55rem;
    top: -15%;
    right: -15%;
    object-fit: cover;
  }
}
</style>
