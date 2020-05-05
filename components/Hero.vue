<template>
  <section
    class="hero bg-background text-on-background bg-right-top min-h-screen bg-no-repeat"
  >
    <nav class="neg-margin paded py-6"><Logo /></nav>
    <h1 class="mt-48 mb-6 max-w-2xl">
      Make yourself a beautiful portfolio website now.
    </h1>
    <p class="max-w-xl">Portfolio is free, fast and easy</p>
    <button class="bg-on-background my-10 text-primary">Show me</button>
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
<style lang="scss" scoped>
.hero {
  --background: #0f040e;
  --on-background: #ffffff;
  --primary: #0f040e;
  --on-primary: #ffffff;
  --secondary: #f4f4f4;
  --on-secondary: #0f040e;
  background-image: url('~assets/images/portfolio.jpg');
  background-size: 38rem;
}
</style>
