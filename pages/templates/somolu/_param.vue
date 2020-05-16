<template>
  <main
    :contenteditable="editMode"
    class="somolu bg-background text-on-background leading-snug"
  >
    <Hero />
    <About />
    <WIW />
    <Projects />
  </main>
</template>

<script>
import Hero from '@/components/templates/Hero1.vue'
import About from '@/components/templates/About1.vue'
import WIW from '@/components/templates/WIW1.vue'
import Projects from '@/components/templates/Projects1.vue'

export default {
  components: {
    Hero,
    About,
    WIW,
    Projects,
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
  --background: #0f040e;
  --on-background: #ffffff;
  --on-background-2: #929293;
  --primary: #ffffff;
  --on-primary: #0f040e;
  --secondary: #151515;
  --on-secondary: #929293;
  --tertiary: #222;
  --on-tertiary: #ffffff;
}
</style>
