# vue-animate-shuffle

Play shuffle animation for given string 🎬

## Install

```bash
npm i vue-animate-shuffle
```

```js
import AnimateShuffle from "vue-animate-shuffle";

export default {
  name: "FooBar",
  components: {
    AnimateShuffle,
  },
};
```

## Usage

```html
<animate-shuffle
  animation-string="foobar"
  :chars-pool="'abcdefghijklmnopqrstuvwxyz'.split('')"
/>
```

## Props

| Prop                            | Type     | Required | Default | Description                                         |
| ------------------------------- | -------- | -------- | ------- | --------------------------------------------------- |
| `animation-string`              | `String` | `true`   | `""`    | String for being animated                           |
| `chars-pool`                    | `Array`  | `true`   | `[]`    | Pool of chars for animation tick                    |
| `char-update-delay`             | `Number` | `false`  | `50`    | Delay before animation tick for every char          |
| `char-animation-duration`       | `Number` | `false`  | `1000`  | Animation duration for every char                   |
| `starting-animation-delay`      | `Number` | `false`  | `0`     | Delay before initial render                         |
| `container-element-tag`         | `String` | `false`  | `div`   | Tag for the container element                       |
| `char-element-tag`              | `String` | `false`  | `span`  | Tag for char element                                |
| `char-animation-complete-class` | `String` | `false`  | `""`    | Class that being added upon char animation complete |
| `char-classs`                   | `String` | `false`  | `""`    | Class for every char element                        |
