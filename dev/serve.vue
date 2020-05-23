<script>
import Vue from 'vue';
import AnimateShuffle from '@/animate-shuffle.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    AnimateShuffle
  }
});
</script>

<template>
  <div id="app">
    <animate-shuffle />
  </div>
</template>
