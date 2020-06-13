<template>
  <Portfolio :modes="['night', 'default']" class="somolu leading-snug">
  </Portfolio>
</template>
<style lang="scss" scoped>
.somolu {
  --background: #f1f0f4;
  --on-background: #322a72;
  --primary: #d8817a;
  --on-primary: #f4f4f4;
  --secondary: #ffffff;
  --on-secondary: #322a72;
  --tertiary: #ffffff;
  --on-tertiary: #322a72;
  --suplement-1: #d8807a5b;
  &[mode='night'] {
    --background: #151515;
    --on-background: #929293;
    --primary: #ffffff;
    --on-primary: #0f040e;
    --secondary: #0f040e;
    --on-secondary: #ffffff;
    --on-secondary-2: #929293;
    --tertiary: #222;
    --on-tertiary: #929293;
    --suplement-1: #222;
  }
}
</style>
