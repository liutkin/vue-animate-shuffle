<template>
  <div id="app" class="color-gray">
    <animate-shuffle
      container-element-tag="h1"
      char-element-tag="div"
      animation-string="foobar"
      class="flex"
      :chars-pool="'abcdefghijklmnopqrstuvwxyz'.split('')"
      char-animation-complete-class="color-turquoise animate-rubber-band"
      :starting-animation-delay="1000"
      @char-animation-complete="item => animationCompleteItems.push(item)"
      @string-animation-complete="() => (isAnimationComplete = true)"
      >Delay placeholder</animate-shuffle
    >
    <ul>
      <li
        v-for="(item, index) in animationCompleteItems"
        :key="index"
        v-text="`${item.index} ${item.char}`"
      />
    </ul>
    <h3 v-if="isAnimationComplete" class="flex">
      <div class="flex items-center">
        <span class="animate-rubber-band">🎉</span>Animation complete
      </div>
    </h3>
  </div>
</template>

<script>
import Vue from "vue";
import AnimateShuffle from "@/AnimateShuffle.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    AnimateShuffle,
  },
  data: () => ({
    animationCompleteItems: [],
    isAnimationComplete: false,
  }),
});
</script>

<style>
@keyframes rubber-band {
  from {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.color-gray {
  color: gray;
}

.color-turquoise {
  color: turquoise;
}

.animate-rubber-band {
  animation-name: rubber-band;
  animation-duration: 0.75s;
  animation-fill-mode: forwards;
}
</style>
