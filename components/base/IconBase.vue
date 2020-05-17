<template>
  <svg class="svg-icon" v-bind="$attrs" v-on="$listeners">
    <use :xlink:href="`${src}#${name}`" />
  </svg>
</template>

<script>
export default {
  name: 'IconBase',
  props: {
    name: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      default: require(`@/assets/icons.svg`),
    },
  },
}
</script>
<style lang="scss">
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
</style>
