<template>
  <TemplateWrapper>
    <main class="somolu bg-background text-on-background leading-snug">
      <Hero />
      <About />
      <WIW />
      <Projects />
      <GetInTouch />
    </main>
  </TemplateWrapper>
</template>

<script>
import Hero from '@/components/templates/Hero1.vue'
import About from '@/components/templates/About1.vue'
import WIW from '@/components/templates/WIW1.vue'
import Projects from '@/components/templates/Projects1.vue'
import GetInTouch from '@/components/templates/GetInTouch1.vue'

export default {
  components: {
    Hero,
    About,
    WIW,
    Projects,
    GetInTouch,
  },
}
</script>
<style lang="scss" scoped>
.somolu {
  --background: #151515;
  --on-background: #929293;
  --primary: #ffffff;
  --on-primary: #0f040e;
  --secondary: #0f040e;
  --on-secondary: #ffffff;
  --on-secondary-2: #929293;
  --tertiary: #222;
  --on-tertiary: #929293;
}
</style>
