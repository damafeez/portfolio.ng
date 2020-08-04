<template>
  <div class="icon-picker">
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
import feather from 'feather-icons'
export default {
  name: 'IconPicker',
  iconNames: Object.values(feather.icons).map(icon => icon.name),
}
</script>
<style lang="scss">
.icon-picker {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.2rem;
  justify-items: center;
  align-items: center;
  overflow: scroll;
}
</style>
