<template>
  <section
    is="p-img"
    overlay="0.5"
    address="profile.images[1]"
    class="hero bg-secondary text-on-secondary bg-cover bg-no-repeat pb-32 text-center flex flex-col items-center"
  >
    <h1 class="mt-56 mb-6 max-w-2xl">
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
