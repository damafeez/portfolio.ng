<template>
  <main
    :contenteditable="editMode"
    class="somolu bg-background text-on-background leading-snug"
  >
    <Hero />
    <About />
    <WIW />
  </main>
</template>

<script>
import Hero from '@/components/templates/Hero1.vue'
import About from '@/components/templates/About1.vue'
import WIW from '@/components/templates/WIW1.vue'

export default {
  components: {
    Hero,
    About,
    WIW,
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
  --on-primary-2: #929293;
  --secondary: #222;
  --on-secondary: #ffffff;
  --tertiary: #929293;
  --on-tertiary: #ffffff;
}
</style>
