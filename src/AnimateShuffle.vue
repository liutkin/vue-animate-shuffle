<template>
  <component :is="containerElementTag">
    <slot v-if="isAnimationDelayActive && !disabled" />
    <component
      v-else
      :is="charElementTag"
      v-for="(char, index) in renderedString.split('')"
      :key="index"
      :class="
        index < charAnimationIndex
          ? [charAnimationCompleteClass, charClass]
          : charClass
      "
      v-text="char"
    />
  </component>
</template>

<script>
// Play shuffle animation for given string 🎬
export default {
  name: "AnimateShuffle",
  props: {
    // String for being animated
    animationString: {
      type: String,
      required: true,
      default: "",
    },

    // Pool of chars for animation tick
    charsPool: {
      type: Array,
      required: true,
      default: () => [],
      validator: chars => chars.every(char => typeof char === "string"),
    },

    // Delay before animation tick for every char
    charUpdateDelay: {
      type: Number,
      default: 50,
    },

    // Animation duration for every char
    charAnimationDuration: {
      type: Number,
      default: 1000,
    },

    // Delay before initial render
    startingAnimationDelay: {
      type: Number,
      default: 0,
    },

    // Tag for the container element
    containerElementTag: {
      type: String,
      default: "div",
    },

    // Tag for char element
    charElementTag: {
      type: String,
      default: "span",
    },

    // Class that being added upon char animation complete
    charAnimationCompleteClass: {
      type: String,
      default: "",
    },

    // Class for every char element
    charClass: {
      type: String,
      default: "",
    },

    // Disable animation
    disabled: Boolean,
  },
  data: () => ({
    renderedString: "",
    charAnimationIndex: null,
    charTimestamp: null,
    isAnimationDelayActive: null,
  }),
  watch: {
    disabled() {
      this.reset();
    },
  },
  mounted() {
    this.reset();
  },
  methods: {
    planToAnimateChar() {
      if (this.charAnimationIndex > this.animationString.length) {
        this.$emit("string-animation-complete", {
          renderedString: this.renderedString,
        });
        return;
      }
      const isFirstRender = !this.charTimestamp && !this.charAnimationIndex;

      this.charAnimationIndex = isFirstRender ? 0 : this.charAnimationIndex;
      this.charTimestamp = Date.now();

      this.animateChar();
    },
    animateChar() {
      setTimeout(() => {
        if (this.disabled) {
          this.reset();
          return;
        }
        const animationDurationNotExceeded =
          Date.now() - this.charTimestamp < this.charAnimationDuration &&
          this.charAnimationIndex < this.animationString.length;
        const randomString = [
          ...Array(this.animationString.length - this.charAnimationIndex),
        ].map(
          () =>
            this.charsPool[Math.floor(Math.random() * this.charsPool.length)]
        );
        this.renderedString =
          this.animationString.substring(0, this.charAnimationIndex) +
          randomString.join("");

        if (animationDurationNotExceeded) {
          this.animateChar();
        } else {
          if (this.charAnimationIndex < this.animationString.length) {
            this.$emit("char-animation-complete", {
              index: this.charAnimationIndex,
              char: this.animationString[this.charAnimationIndex],
            });
          }
          this.charAnimationIndex += 1;
          this.planToAnimateChar();
        }
      }, this.charUpdateDelay);
    },
    reset() {
      this.charAnimationIndex = null;
      this.charTimestamp = null;
      this.isAnimationDelayActive = !this.disabled;
      this.renderedString = this.disabled ? this.animationString : "";

      if (!this.disabled) {
        setTimeout(() => {
          this.isAnimationDelayActive = false;
          this.planToAnimateChar();
        }, this.startingAnimationDelay);
      }
    },
  },
};
</script>
