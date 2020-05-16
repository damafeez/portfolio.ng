<template>
  <section class="wiw bg-secondary text-on-secondary-2 pad-y">
    <h3>Where I've Worked</h3>
    <div class="sm:flex mt-20">
      <ul class="companies float-left sm:float-none mb-10 mr-12">
        <li class="active">Apple</li>
        <li>Google</li>
        <li>Dribbble</li>
        <li>Twitter</li>
      </ul>
      <div>
        <h5 class="text-primary mb-3">Engineer <span>@Apple</span></h5>
        <p class="text-sm">May 2018 - present</p>
        <ul class="company-desc mt-10">
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla porro
            enim nesciunt debitis placeat neque sint ullam
          </li>
          <li>
            Exercitationem, optio omnis veniam tempora accusantium iure
            obcaecati at doloribus, modi quae maxime.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla porro
            enim nesciunt debitis placeat neque sint ullam, optio omnis veniam
            tempora accusantium iure obcaecati at doloribus, modi quae maxime.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.wiw {
  .companies {
    li {
      @apply px-6 py-3 cursor-pointer relative;
      &:hover,
      &.active {
        @apply bg-background text-on-secondary;
      }
      &::before {
        @apply bg-current absolute h-full left-0 top-0;
        content: '';
        width: 1.5px;
      }
    }
  }
  .company-desc {
    max-width: 30rem;
    li {
      @apply mb-5 flex;
      &::before {
        @apply text-on-secondary mr-5 text-lg;
        content: '▹';
      }
    }
  }
}
</style>
