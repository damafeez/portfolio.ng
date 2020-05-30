<template>
  <section class="about py-40 flex flex-wrap justify-between relative">
    <div>
      <h4 v-schema="['about.intro']">{{ schema.about.intro }}</h4>
      <p v-schema="['about.description']">
        {{ schema.about.description }}
      </p>
    </div>
    <div class="self-end">
      <p v-schema="['social.description']">
        {{ schema.social.description }}
      </p>
      <item-list
        v-slot="{ list: socialLinks }"
        class="flex flex-wrap items-center"
        address="social.links"
        add-button-class-list="no-bg text-xl"
      >
        <li v-for="(social, i) in socialLinks" :key="i" class="inline-block">
          <a
            class="icon-box btn-hover"
            target="_blank"
            rel="noopener noreferrer"
            :href="social.link"
            ><icon-base :name="social.icon"
          /></a>
        </li>
      </item-list>
    </div>
  </section>
</template>
<script>
import { section } from '@/mixins'
export default {
  // TODO: use random ids for all keys
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
    font-size: 10vw;
    width: 2em;
    height: 2em;
    background-image: radial-gradient(
      var(--suplement-1) 0.02em,
      transparent 0.02em
    );
    background-size: calc(10 * 0.02em) calc(10 * 0.02em);
    animation: hover 70s ease-out infinite;
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
    @apply bg-tertiary text-on-tertiary rounded-full my-2 mr-5 flex justify-center items-center;
    width: 2.3rem;
    height: 2.3rem;
  }
}
</style>
<style lang="scss">
[mode='night'] .about::before {
  background: none;
  width: 4em;
  height: 4em;
  border-radius: 50%;
  transform: translate(-20%, -40%) rotate(30deg);
  box-shadow: inset 0.7em 0 var(--tertiary);
}
</style>
