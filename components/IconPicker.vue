<template>
  <div
    tabindex="-1"
    class="icon-picker bg-tertiary rounded-lg shadow-xl absolute p-4 outline-none"
  >
    <span
      v-for="(name, i) in $options.iconNames"
      :key="i"
      class="cursor-pointer text-base p-1"
      @click="$emit('icon-change', name)"
    >
      <icon-base :name="name" />
    </span>
  </div>
</template>

<script>
// TODO: icon names should be generated dynamially from sprite
import { iconNames } from '~/fixtures'
export default {
  name: 'IconPicker',
  iconNames,
}
</script>
<style lang="scss">
.icon-picker {
  width: 12rem;
  height: 10rem;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, -2rem);
  cursor: initial;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.2rem;
  justify-items: center;
  align-items: center;
  overflow: scroll;
}
</style>
