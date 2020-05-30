<template>
  <section class="wiw bg-secondary text-on-secondary-2 pad-y">
    <h3>Where I've Worked</h3>
    <div class="wiw-inner sm:flex mt-20">
      <item-list
        v-slot="{ list: companies }"
        address="wiw"
        class="companies float-left sm:float-none mb-10 mr-12"
      >
        <li
          v-for="(company, i) in companies"
          :key="company.name + i"
          v-schema="[`wiw[${i}].name`]"
          :class="{ active: activeIndex === i }"
          @click="activeIndex = i"
        >
          {{ company.name }}
        </li>
      </item-list>
      <div>
        <h5 class="text-primary mb-3">
          <span v-schema="[`wiw[${activeIndex}].role`]">{{ wiw.role }}</span
          >&nbsp;<span
            >@<span v-schema="[`wiw[${activeIndex}].name`]">{{
              wiw.name
            }}</span>
          </span>
        </h5>
        <p v-schema="[`wiw[${activeIndex}].duration`]" class="text-sm">
          {{ wiw.duration }}
        </p>
        <item-list
          v-slot="{ list: achievements }"
          :address="`wiw[${activeIndex}].achievements`"
          class="company-desc mt-10"
        >
          <li
            v-for="(achievement, i) in achievements"
            :key="i"
            v-schema="[`wiw[${activeIndex}].achievements[${i}]`]"
          >
            {{ achievement }}
          </li>
        </item-list>
      </div>
    </div>
  </section>
</template>
<script>
import { section } from '@/mixins'
export default {
  mixins: [section],
  data() {
    return {
      activeIndex: 0,
    }
  },
  computed: {
    wiw() {
      return this.schema.wiw[this.activeIndex]
    },
  },
}
</script>
<style lang="scss" scoped>
.wiw {
  .companies {
    li {
      @apply px-6 py-3 cursor-pointer relative;
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      &:hover,
      &.active {
        @apply bg-background;
      }
      &.active {
        @apply text-primary;
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
  .wiw-inner {
    min-height: 25rem;
  }
}
</style>
