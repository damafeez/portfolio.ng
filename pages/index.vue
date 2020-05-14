<template>
  <main class="overflow-x-hidden">
    <Hero />
    <Editor />
    <FeaturedTemplates />
    <Footer />
  </main>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Editor from '@/components/Editor.vue'
import FeaturedTemplates from '@/components/FeaturedTemplates.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Hero,
    Editor,
    FeaturedTemplates,
    Footer,
  },
}
</script>
