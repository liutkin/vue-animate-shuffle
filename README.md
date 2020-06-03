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
  chars-pool="abcdefghijklmnopqrstuvwxyz"
/>
```

## Props

| Prop                            | Type                  | Required | Default | Description                                       |
| ------------------------------- | --------------------- | -------- | ------- | ------------------------------------------------- |
| `animation-string`              | `String`              | `true`   | `""`    | String for being animated                         |
| `chars-pool`                    | [`Array` \| `String`] | `true`   | `[]`    | Pool of chars for animation tick                  |
| `char-update-delay`             | `Number`              | `false`  | `50`    | Delay before animation tick for every char        |
| `char-animation-duration`       | `Number`              | `false`  | `1000`  | Animation duration for every char                 |
| `starting-animation-delay`      | `Number`              | `false`  | `0`     | Delay before initial render                       |
| `container-element-tag`         | `String`              | `false`  | `div`   | Tag for the container element                     |
| `char-element-tag`              | `String`              | `false`  | `span`  | Tag for char element                              |
| `char-animation-complete-class` | `String`              | `false`  | `""`    | Class that being added on char animation complete |
| `char-class`                    | `String`              | `false`  | `""`    | Class for every char element                      |
| `disabled`                      | `Boolean`             | `false`  | `false` | Disable animation                                 |

## Events

| Event                       | Payload                                                            | Description                              |
| --------------------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| `char-animation-complete`   | `{ index: <completed char index>, char: <completed char symbol> }` | Called on char animation complete        |
| `string-animation-complete` | `{ renderedString: <complete rendered string> }`                   | Called on all strings have been animated |

## Slots

| Name           | Description                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| None (default) | Placeholder text for showing when `starting-animation-delay` is active and there is no initial render yet |
