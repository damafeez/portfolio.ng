<template>
  <main class="somolu">
    <Hero />
  </main>
</template>

<script>
import Hero from '@/components/templates/Hero1.vue'

export default {
  components: {
    Hero,
  },
}
</script>
<style lang="scss" scoped>
.somolu {
  --background: #0f040e;
  --on-background: #ffffff;
  --primary: #0f040e;
  --on-primary: #ffffff;
  --secondary: #f4f4f4;
  --on-secondary: #0f040e;
}
</style>
