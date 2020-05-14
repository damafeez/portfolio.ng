<template>
  <main :contenteditable="editMode" class="somolu">
    <Hero />
    <section class="flex-center"><h1>More content here</h1></section>
  </main>
</template>

<script>
import Hero from '@/components/templates/Hero1.vue'

export default {
  components: {
    Hero,
  },
  computed: {
    editMode() {
      return this.$route.query.edit === 'true'
    },
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
