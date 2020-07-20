<template>
  <section
    class="about-chiang py-10 flex justify-between items-center flex-wrap"
  >
    <div class="desc max-w-lg">
      <h3 :section-index="`0${index}.`" class="text-on-secondary">About Me</h3>
      <p is="p-text" address="about.intro"></p>
      <p is="p-text" address="about.description"></p>
      <p>Here are a few technologies I've been working with recently:</p>
      <item-list
        class="about-chiang__technologies grid grid-cols-2 text-sm"
        address="technologies"
      >
        <template #item="{ address }">
          <span is="p-text" :address="address"></span>
        </template>
      </item-list>
    </div>
    <img
      is="p-img"
      :overlay="currentThemeName === 'night' ? 0.4 : undefined"
      class="about-chiang__img rounded object-cover my-10 btn-hover"
      address="profile.images[1]"
      alt="user image"
    />
  </section>
</template>
<script>
export default {
  tags: ['chiang', 'dev', 'about'],
}
</script>
<style lang="scss" scoped>
.about-chiang {
  &__img {
    width: 20rem;
    height: 20rem;
  }
  &__technologies span::before {
    @apply mr-4 text-lg;
    content: '▹';
  }
}
</style>
