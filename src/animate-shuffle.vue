<template>
<component :is="tag">
  <span
    v-for="(symbol, index) in renderedSymbols.split('')"
    :key="index"
    :class="index < symbolAnimationIndex ? [symbolAnimationCompleteClass, symbolClass] : symbolClass"
    v-text="symbol"
  />
</component>
</template>

<script>
// Play shuffle animation for given string 🎬
export default {
  name: "AnimateShuffle",
  props: {
    // String for being animated
    stringToAnimate: {
      type: String,
      required: true,
      default: "",
    },

    // Pool of symbols for animation tick
    symbolsPool: {
      type: Array,
      required: true,
      default: () => [],
      validator: symbols => symbols.every(symbol => typeof symbol === "string"),
    },

    // Delay before animation tick for every symbol
    symbolUpdateDelay: {
      type: Number,
      default: 50,
    },

    // Animation duration for every symbol
    symbolAnimationDuration: {
      type: Number,
      default: 1000,
    },

    // Tag for the root element
    tag: {
      type: String,
      default: "div",
    },

    // Class that being added upon symbol animation complete
    symbolAnimationCompleteClass: {
      type: String,
      default: "",
    },

    // Class for every symbol element
    symbolClass: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    renderedSymbols: "",
    symbolAnimationIndex: null,
    symbolTimestamp: null,
  }),
  mounted() {
    this.planToAnimateSymbol();
  },
  methods: {
    planToAnimateSymbol() {
      this.symbolAnimationIndex =
        !this.symbolTimestamp && !this.symbolAnimationIndex ? 0 : this.symbolAnimationIndex + 1;
      if (this.symbolAnimationIndex > this.stringToAnimate.length) {
        this.$emit("string-animation-complete");
        return;
      }
      this.symbolTimestamp = Date.now();
      this.animateSymbol();
    },
    animateSymbol() {
      setTimeout(() => {
        const randomString = [...Array(this.stringToAnimate.length - this.symbolAnimationIndex)].map(
          () => this.symbolsPool[Math.floor(Math.random() * this.symbolsPool.length)]
        );
        this.renderedSymbols = this.stringToAnimate.substring(0, this.symbolAnimationIndex) + randomString.join("");

        Date.now() - this.symbolTimestamp < this.symbolAnimationDuration
          ? this.animateSymbol()
          : (this.planToAnimateSymbol(), this.$emit("symbol-animation-complete", this.symbolAnimationIndex));
      }, this.symbolUpdateDelay);
    },
  },
};
</script>