<template>
  <section class="hero pb-32 pt-40">
    <p class="text-on-tertiary">Hi, my name is</p>
    <h1 class="mb-6 lg:text-3xl">
      <span is="p-text" class="text-on-secondary" address="profile.name" />.
      <br />
      <span>
        I build things for the web.
      </span>
    </h1>
    <p
      is="p-text"
      address="profile.description"
      class="max-w-lg text-on-secondary-2"
    ></p>
    <button
      is="p-text"
      address="cta[0].text"
      class="bg-primary my-10 text-on-primary"
    ></button>
  </section>
</template>
<script>
export default {
  tags: ['chiang', 'dev', 'hero'],
}
</script>
<style lang="scss" scoped>
.hero {
  background-size: 0;
  @screen sm {
    background-size: auto 100%;
  }
}
</style>
