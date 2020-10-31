<template>
  <div class="wbgc-card outwork-steps">
    <ul class="outwork-steps-list">
      <li
        v-for="(item, index) in list"
        :key="item.title"
        class="outwork-steps-item"
        :class="{ 'outwork-steps-active': current === index }"
        :style="{ width: itemWidth }"
      >
        <div class="outwork-steps-cell">
          <div class="outwork-steps-icon">
            <a-icon :component="item.icon" />
          </div>
          <span class="outwork-steps-name wfc-unusual wfs14">{{ item.title }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['list', 'current'],

  data() {
    return {
      value: 0
    };
  },

  computed: {
    itemWidth() {
      return (1 / this.list.length) * 100 + '%';
    }
  },

  watch: {
    current: {
      handler: function(val) {
        this.value = val;
      },
      immediate: true
    }
  }
};
</script>

<style lang="less">
.outwork-steps {
  padding: 12px 60px 12px 60px;
  border-radius: 4px;

  &-list {
    position: relative;
    display: flex;
    justify-content: center;

    &::before {
      position: absolute;
      top: 25px;
      right: 0;
      left: 0;
      box-sizing: border-box;
      height: 2px;
      border-top: 5px dotted #e8edf2;
      content: '';
    }
  }

  &-cell {
    position: relative;
    z-index: 1;
  }

  &-icon {
    display: block;
    width: 50px;
    height: 50px;
    margin: 0 auto;
    color: #6281a3;
    font-size: 50px;
    line-height: 50px;
    text-align: center;
    background: #f4f8fc;
    border-radius: 25px;
  }

  &-line {
  }

  &-lineR {
    right: 0;
    width: calc(50% - 35px);
  }

  &-lineL {
    left: 0;
    width: calc(50% - 35px);
  }

  &-name {
    display: block;
    margin-top: 8px;
    text-align: center;
  }

  &-active {
    .outwork-steps-icon {
      color: #fff;
      background: #4285f4;
    }

    .outwork-steps-name {
      color: #4285f4;
    }
  }
}
</style>
