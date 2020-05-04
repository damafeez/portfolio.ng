<template>
  <section
    class="hero bg-black text-black-contrast bg-right-top min-h-screen bg-no-repeat"
  >
    <nav class="neg-margin paded py-6"><Logo /></nav>
    <h1 class="mt-48 mb-6 max-w-2xl">
      Make yourself a beautiful portfolio website now.
    </h1>
    <p class="max-w-xl">Portfolio is free, fast and easy</p>
    <button class="bg-white my-10 text-white-contrast">Show me</button>
  </section>
</template>
<script>
import Logo from '@/components/Logo.vue'

export default {
  components: {
    Logo,
  },
}
</script>
<style lang="scss">
.hero {
  background-image: url('~assets/images/portfolio.jpg');
  background-size: 38rem;
}
</style>
