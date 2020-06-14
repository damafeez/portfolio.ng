<template>
  <section
    is="p-img"
    address="profile.images[0]"
    class="hero bg-secondary text-on-secondary bg-right-top bg-no-repeat pb-32"
  >
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
<style lang="scss" scoped>
.hero {
  background-size: 0;
  @screen sm {
    background-size: auto 100%;
  }
}
</style>
