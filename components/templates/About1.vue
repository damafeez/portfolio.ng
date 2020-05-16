<template>
  <section class="about py-40 flex flex-wrap justify-between relative">
    <div>
      <h4>
        I enjoy building fine interactive UIs that are both aesthetically
        pleasing and easy to use. I have created excellent solutions with
        frameworks such as VueJS, Flutter and React.
      </h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem enim ut
        esse quae ea mollitia minus. Sint at quaerat, nulla debitis ullam
        architecto aspernatur amet, nisi eligendi consectetur dicta distinctio?
      </p>
    </div>
    <div class="self-end">
      <p>
        My Github is exciting, checkout my recent cat repository. Don't miss
        house on my social esse qua ea mollitia minus. Sint at quaerat, nulla
        debitis ullam architecto aspernatur amet, nisi eligendi consectetur
        dicta distinctio?
      </p>
      <span class="icon-box btn-hover">g</span>
      <span class="icon-box btn-hover">t</span>
      <span class="icon-box btn-hover">w</span>
    </div>
  </section>
</template>
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
