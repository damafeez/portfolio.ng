<template>
  <section class="get-in-touch pad-y min-h-0" watermark="Hello :)">
    <h2 is="p-text" address="contact.intro"></h2>
    <p is="p-text" address="contact.description"></p>
    <button class="mt-10 bg-tertiary text-on-tertiary">Say hello</button>
  </section>
</template>
<script>
export default {
  tags: ['somolu', 'dev', 'get-in-touch'],
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
