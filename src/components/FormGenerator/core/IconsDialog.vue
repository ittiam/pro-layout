<template>
  <div class="icon-dialog">
    <a-modal v-bind="$attrs" width="980px" v-on="$listeners" @cancel="onClose">
      <div slot="title">
        选择图标
        <a-input
          v-model="key"
          :style="{ width: '260px' }"
          placeholder="请输入图标名称"
          prefix-icon="el-icon-search"
          clearable
        />
      </div>
      <ul class="icon-ul">
        <li
          v-for="icon in iconList"
          :key="icon"
          :class="active === icon ? 'active-item' : ''"
          @click="onSelect(icon)"
        >
          <i :class="icon" />
          <div>{{ icon }}</div>
        </li>
      </ul>

      <ul class="icon-ul">
        <li
          v-for="icon in iconList"
          :key="icon"
          :class="active === icon ? 'active-item' : ''"
          @click="onSelect(icon)"
        >
          <i :class="icon" />
          <div>{{ icon }}</div>
        </li>
      </ul>
    </a-modal>
  </div>
</template>
<script>
import { wpg, ic } from '../utils/icon.json';

// const elementList = element.map(name => `el-icon-${name}`);
const wpgList = wpg.map(name => `icon-wpg_${name}`);
const icList = ic.map(name => `icon-ic_${name}`);
const originList = [...wpgList, ...icList];
export default {
  inheritAttrs: false,
  props: ['current'],
  data() {
    return {
      iconList: originList,
      active: null,
      key: ''
    };
  },
  watch: {
    key(val) {
      if (val) {
        this.iconList = originList.filter(name => name.indexOf(val) > -1);
      } else {
        this.iconList = originList;
      }
    }
  },
  methods: {
    onOpen() {
      this.active = this.current;
      this.key = '';
    },
    onClose() {
      this.active = this.current;
      this.key = '';
    },
    onSelect(icon) {
      this.active = icon;
      this.$emit('select', icon);
      this.$emit('update:visible', false);
    }
  }
};
</script>
<style lang="scss" scoped>
.icon-ul {
  margin: 0;
  padding: 0;
  font-size: 0;

  li {
    display: inline-block;
    box-sizing: border-box;
    width: 16.66%;
    height: 108px;
    padding: 15px 6px 6px 6px;
    overflow: hidden;
    font-size: 14px;
    text-align: center;
    list-style-type: none;
    cursor: pointer;

    &:hover {
      background: #f2f2f2;
    }

    &.active-item {
      color: #7a6df0;
      background: #e1f3fb;
    }

    > i {
      font-size: 30px;
      line-height: 50px;
    }
  }
}

.icon-dialog {
  ::v-deep .el-dialog {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    max-height: 92vh;
    margin-top: 4vh !important;
    margin-bottom: 0;
    overflow: hidden;
    border-radius: 8px;

    .el-dialog__header {
      padding-top: 14px;
    }

    .el-dialog__body {
      margin: 0 20px 20px 20px;
      padding: 0;
      overflow: auto;
    }
  }
}
</style>
