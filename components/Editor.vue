<template>
  <section class="editor flex-center bg-secondary text-on-secondary py-24">
    <div class="edit overflow-hidden shadow-lg w-full flex flex-col rounded-lg">
      <div class="top-bar bg-white flex items-center py-1 px-6">
        <span class="fake-control"></span>
        <span class="fake-control"></span>
        <span class="fake-control"></span>
      </div>
      <iframe
        src="templates/somolu/edit"
        frameborder="0"
        width="100%"
        height="100%"
        class="flex-1"
      ></iframe>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.editor {
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
