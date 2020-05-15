<template>
  <main
    :contenteditable="editMode"
    class="somolu bg-background text-on-background"
  >
    <Hero />
    <About />
  </main>
</template>

<script>
import Hero from '@/components/templates/Hero1.vue'
import About from '@/components/templates/About1.vue'

export default {
  components: {
    Hero,
    About,
  },
  computed: {
    editMode() {
      return this.$route.params.param === 'edit'
    },
  },
}
</script>
<style lang="scss" scoped>
.somolu {
  --background: #151515;
  --on-background: #929293;
  --primary: #0f040e;
  --on-primary: #ffffff;
  --secondary: #222;
  --on-secondary: #ffffff;
}
</style>
