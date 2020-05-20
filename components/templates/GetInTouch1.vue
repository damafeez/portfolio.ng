<template>
  <section class="get-in-touch pad-y min-h-0">
    <h2 v-schema="'contact.intro'">{{ $schema.contact.intro }}</h2>
    <p v-schema="'contact.description'">
      {{ $schema.contact.description }}
    </p>
    <button class="mt-10 bg-tertiary text-on-tertiary">Say hello</button>
  </section>
</template>
<style lang="scss" scoped>
.get-in-touch {
  & > * {
    max-width: 35rem;
  }
  h2::before {
    @apply bg-tertiary block mb-2;
    content: '';
    height: 0.5rem;
    width: 4rem;
  }
}
</style>
