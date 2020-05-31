<template>
  <section class="wiw bg-secondary text-on-secondary-2 pad-y">
    <h3>Where I've Worked</h3>
    <div class="wiw-inner sm:flex mt-20">
      <item-list
        address="wiw"
        class="companies float-left sm:float-none mb-10 mr-12"
        @remove="$event.index === activeIndex && clampActiveIndex()"
      >
        <template #item="{ item: company, index, address }">
          <div
            v-schema="[`${address}.name`]"
            class="companies-li px-6 py-3 cursor-pointer relative"
            :class="{ active: activeIndex === index }"
            @click="activeIndex = index"
          >
            {{ company.name }}
          </div>
        </template>
      </item-list>
      <div v-if="wiw">
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
          :address="`wiw[${activeIndex}].achievements`"
          class="company-desc mt-10"
        >
          <template #item="{ item: achievement, address}">
            <div v-schema="[address]" class="company-desc-li">
              {{ achievement }}
            </div>
          </template>
        </item-list>
      </div>
    </div>
  </section>
</template>
<script>
import { clamp } from 'lodash'
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
  methods: {
    clampActiveIndex() {
      this.activeIndex = clamp(this.activeIndex, -1, this.schema.wiw.length - 1)
    },
  },
}
</script>
<style lang="scss" scoped>
.wiw {
  .companies {
    &-li {
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
    &-li {
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
