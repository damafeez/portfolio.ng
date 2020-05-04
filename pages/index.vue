<template>
  <main>
    <Hero />
    <Editor />
  </main>
</template>

<script>
import Hero from '@/components/Hero.vue'
import Editor from '@/components/Editor.vue'

export default {
  components: {
    Hero,
    Editor,
  },
}
</script>
