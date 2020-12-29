<template>
  <div
    class="vc-steps"
    :class="[!simple && 'vc-steps--' + direction, simple && 'vc-steps--simple']"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VcSteps',
  props: {
    space: [Number, String],
    active: Number,
    direction: {
      type: String,
      default: 'horizontal'
    },
    alignCenter: Boolean,
    simple: Boolean,
    finishStatus: {
      type: String,
      default: 'finish'
    },
    processStatus: {
      type: String,
      default: 'process'
    }
  },
  data() {
    return {
      steps: [],
      stepOffset: 0
    };
  },
  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal);
    },
    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  }
};
</script>
