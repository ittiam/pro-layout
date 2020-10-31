<template>
  <a-card :loading="loading" :body-style="{ padding: '20px 24px 8px' }" :bordered="false">
    <div class="chart-card-header">
      <div class="meta">
        <span class="chart-card-title">{{ title }}</span>
        <span class="chart-card-action">
          <slot name="action"></slot>
        </span>
      </div>
      <div class="total">
        <span>{{ total }}</span>
      </div>
    </div>
    <div class="chart-card-content">
      <div class="content-fix">
        <slot></slot>
      </div>
    </div>
    <div class="chart-card-footer">
      <slot name="footer"></slot>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'ChartCard',
  props: ['title', 'total', 'loading']
};
</script>

<style scoped lang="less">
.chart-card-header {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.chart-card-header .meta {
  position: relative;
  width: 100%;
  overflow: hidden;
  color: @text-color-second;
  font-size: 14px;
  line-height: 22px;
}

.chart-card-action {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

.total {
  height: 38px;
  margin-top: 4px;
  margin-bottom: 0;
  overflow: hidden;
  font-size: 30px;
  line-height: 38px;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
}

.chart-card-footer {
  margin-top: 8px;
  padding-top: 9px;
  border-top: 1px solid @border-color-base;
}

.chart-card-content {
  position: relative;
  width: 100%;
  height: 46px;
  margin-bottom: 12px;
}

.chart-card-content .content-fix {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
