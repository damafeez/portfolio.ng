<template>
  <section class="editor bg-secondary text-on-secondary py-24">
    <div
      class="edit overflow-scroll shadow-lg overflow-hidden w-full flex flex-col rounded-lg"
    >
      <div class="top-bar bg-white flex items-center py-1 px-6">
        <span class="fake-control"></span>
        <span class="fake-control"></span>
        <span class="fake-control"></span>
      </div>
      <div class="flex-1 outline-none overflow-scroll" contenteditable>
        <Somolu />
      </div>
    </div>
  </section>
</template>
<script>
import Somolu from '@/pages/templates/somolu'

export default {
  components: {
    Somolu,
  },
}
</script>
<style lang="scss" scoped>
.editor {
  @include flex-center;
  .edit {
    height: 40rem;
    .top-bar {
      min-height: 2rem;
      border-bottom: 0.5px solid;
      color: #e2e8f0;
    }
  }
}
.fake-control {
  @apply rounded-full m-2;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  border: 0.5px solid;
}
</style>
