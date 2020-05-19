<template>
  <section class="about py-40 flex flex-wrap justify-between relative">
    <div>
      <h4 v-schema="'about.intro'">{{ $schema.about.intro }}</h4>
      <p v-schema="'about.description'">{{ $schema.about.description }}</p>
    </div>
    <div class="self-end">
      <p v-schema="'social.description'">{{ $schema.social.description }}</p>
      <ul>
        <li
          v-for="social in $schema.social.links"
          :key="social.name"
          class="inline-block"
        >
          <a
            class="icon-box btn-hover"
            target="_blan"
            rel="noopener noreferrer"
            :href="social.link"
            ><icon-base :name="social.icon"
          /></a>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { section } from '@/mixins'
export default {
  mixins: [section],
}
</script>
<style lang="scss" scoped>
.about {
  &::before {
    @apply absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-20%, -40%) rotate(30deg);
    font-size: 10vw;
    width: 4em;
    height: 4em;
    border-radius: 50%;
    box-shadow: inset 0.7em 0 var(--tertiary);
  }
  & > div {
    @screen md {
      max-width: 45%;
    }
    @screen lg {
      max-width: 35%;
    }
    position: relative;
  }
  .icon-box {
    @apply bg-tertiary rounded-full my-2 mr-5 inline-flex justify-center items-center;
    width: 2.3rem;
    height: 2.3rem;
  }
}
</style>
