<template>
  <main>
    <Hero />
    <Editor />
    <FeaturedTemplates />
  </main>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Editor from '@/components/Editor.vue'
import FeaturedTemplates from '@/components/FeaturedTemplates.vue'

export default {
  components: {
    Hero,
    Editor,
    FeaturedTemplates,
  },
}
</script>
