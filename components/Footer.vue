<template>
  <footer class="flex bg-background text-on-background py-20 flex-wrap">
    <div>
      <Logo />
      <p class="max-w-xl">Portfolio now. Free, fast and easy</p>
      <p class="text-xs text-gray-400">&copy;2020</p>
    </div>
    <ul>
      <li><h4>Company</h4></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <ul>
      <li><h4>Product</h4></li>
      <li><nuxt-link to="templates">Templates</nuxt-link></li>
    </ul>
  </footer>
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
footer {
  @include flex-gap(2rem);
  & > * {
    @apply my-5;
    &:nth-child(1) {
      max-width: 100%;
      @screen md {
        width: 25rem;
      }
    }
  }
  li {
    @apply m-1;
    a {
      @apply py-1;
    }
  }
}
</style>
