<template>
  <section class="wiw bg-secondary text-on-secondary-2 pad-y">
    <h3>Where I've Worked</h3>
    <div class="wiw-inner sm:flex mt-20">
      <item-list
        address="wiw"
        class="companies float-left sm:float-none mb-10 mr-12"
        li-class-list="z-10"
        @remove="$event.index === activeIndex && clampActiveIndex()"
      >
        <template #item="{ item: company, index, address }">
          <div
            is="p-text"
            :address="`${address}.name`"
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
          <span is="p-text" :address="`wiw[${activeIndex}].role`"></span
          >&nbsp;@<span
            is="p-text"
            :address="`wiw[${activeIndex}].name`"
          ></span>
        </h5>
        <p
          is="p-text"
          :address="`wiw[${activeIndex}].duration`"
          class="text-sm"
        ></p>
        <item-list
          :address="`wiw[${activeIndex}].achievements`"
          class="company-desc mt-10"
        >
          <template #item="{ item: achievement, address}">
            <span is="p-text" :address="address" class="company-desc-li"></span>
          </template>
        </item-list>
      </div>
    </div>
  </section>
</template>
<script>
import { clamp } from 'lodash'
export default {
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
      this.activeIndex = clamp(this.activeIndex, 0, this.schema.wiw.length - 1)
    },
  },
  tags: ['somolu', 'dev', 'wiw'],
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
