<!--
 * @Author: lfl
 * @Date: 2019-12-04 17:42:09
 * @LastEditors: chenky
 * @LastEditTime: 2019-12-11 17:13:21
 * @Description:徽标、卡片样式重置模板
 -->
<template>
  <div>
    <p>Badge徽标数</p>
    <br />
    <div>
      <span>
        <a-badge :count="9"></a-badge>
      </span>
      <span>
        <a-badge :count="99"></a-badge>
      </span>
      <span>
        <a-badge :count="999"></a-badge>
      </span>
      <span>
        <a-badge :count="1000" :overflowCount="999"></a-badge>
      </span>
    </div>
    <br />
    <p>用于表示状态的小圆点</p>
    <br />
    <div>
      <a-badge status="success" />
      <a-badge status="error" />
      <a-badge status="default" />
      <a-badge status="processing" />
      <a-badge status="warning" />
      <br />
      <a-badge status="success" text="成功" />
      <br />
      <a-badge status="error" text="异常" />
      <br />
      <a-badge status="default" text="未开始" />
      <br />
      <a-badge status="processing" text="进行中" />
      <br />
      <a-badge status="warning" text="警告" />
    </div>
    <br />
    <p>卡片</p>
    <br />
    <div>
      <a-card title="Card title">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </a-card>
    </div>
    <br />
    <div>
      <a-card
        style="width:100%"
        title="Card title"
        :tabList="tabList"
        :activeTabKey="key"
        @tabChange="key => onTabChange(key, 'key')"
      >
        <span slot="customRender" slot-scope="item">
          <a-icon type="home" />
          {{ item.key }}
        </span>
        <a href="#" slot="extra">More</a>
        {{ contentList[key] }}
      </a-card>
      <br />
      <br />
      <a-card
        style="width:100%"
        :tabList="tabListNoTitle"
        :activeTabKey="noTitleKey"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
      >
        <p v-if="noTitleKey === 'article'">article content</p>
        <p v-else="noTitleKey === 'app'">app content</p>
        <p v-else="noTitleKey === 'project'">project content</p>
      </a-card>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      tabList: [
        {
          key: 'tab1',
          // tab: 'tab1',
          scopedSlots: { tab: 'customRender' }
        },
        {
          key: 'tab2',
          tab: 'tab2'
        }
      ],
      contentList: {
        tab1: 'content1',
        tab2: 'content2'
      },
      tabListNoTitle: [
        {
          key: 'article',
          tab: 'article'
        },
        {
          key: 'app',
          tab: 'app'
        },
        {
          key: 'project',
          tab: 'project'
        }
      ],
      key: 'tab1',
      noTitleKey: 'app'
    };
  },
  methods: {
    onTabChange(key, type, a, b, c, d) {
      console.log(key, type);
      this[type] = key;
    }
  },
  components: {}
};
</script>

<style lang="less" scoped></style>
