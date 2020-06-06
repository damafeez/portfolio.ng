<template>
  <section class="get-in-touch pad-y min-h-0" watermark="Hello :)">
    <p-text tag="h2" address="contact.intro"></p-text>
    <p-text tag="p" address="contact.description"></p-text>
    <button class="mt-10 bg-tertiary text-on-tertiary">Say hello</button>
  </section>
</template>
<script>
import { section } from '@/mixins'
export default {
  mixins: [section],
}
</script>
<style lang="scss" scoped>
.get-in-touch {
  &[watermark]::before {
    right: 10%;
    left: initial;
  }
  & > * {
    max-width: 35rem;
  }
  h2::before {
    @apply bg-suplement-1 block mb-2;
    content: '';
    height: 0.5rem;
    width: 4rem;
  }
}
</style>
