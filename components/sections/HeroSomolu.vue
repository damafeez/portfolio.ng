<template>
  <header class="bg-secondary text-on-secondary pb-32 pt-5 relative">
    <p-img
      width="550px"
      class="hidden md:inline-block absolute h-full object-cover top-0 right-0"
      :overlay="currentThemeName === 'night' ? 0.5 : undefined"
      address="profile.images[1]"
    ></p-img>
    <div class="relative inline-block">
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
  </header>
</template>
<script>
export default {
  tags: ['somolu', 'dev', 'hero'],
}
</script>
