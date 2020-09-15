<template>
  <div :id="chartId" class="chart"></div>
</template>

<script>
import merge from 'lodash.merge';
let echarts = require('echarts/lib/echarts'); // 引入基本模板
require('echarts/lib/chart/bar'); // 引入柱状图组件
require('echarts/lib/chart/line'); // 引入折线图组件
require('echarts/lib/component/tooltip'); // 引入提示框
require('echarts/lib/component/title'); // title组件
require('echarts/lib/component/legend'); // 图例组件
require('echarts/lib/component/dataZoom'); // 区域缩放组件

export default {
  name: 'BarChart',
  props: {
    chartId: {
      // 图表id
      type: String,
      require: true,
      default: () => {
        return '';
      }
    },
    option: {
      // 图表配置项
      type: Object,
      require: true,
      default: () => {
        return {};
      }
    },
    darkTheme: {
      // 深色主题颜色配置
      type: String,
      require: true,
      default: () => {
        return 'dark';
      }
    },
    lightTheme: {
      // 浅色主题颜色配置
      type: String,
      require: true,
      default: () => {
        return 'light';
      }
    }
  },
  data() {
    return {
      baseOption: {
        title: {
          textStyle: {
            fontSize: 12
          }
        },
        tooltip: {
          // 提示框组件
          trigger: 'axis', // 触发类型axis为坐标轴触发
          axisPointer: {
            // 坐标轴指示器配置
            type: 'shadow'
          },
          textStyle: {
            // 提示框文本样式
            fontSize: 10
          }
        },
        legend: {
          itemWidth: 6,
          itemHeight: 6,
          itemGap: 20,
          icon: 'circle',
          bottom: 5,
          padding: 0
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          }
        ],
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        xAxis: [
          {
            type: 'category',
            splitLine: {
              // 坐标轴在grid区域的分割线
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#868e96',
              fontSize: '10'
            }
          }
        ],
        series: []
      }
    };
  },
  computed: {
    /**
     * 图表初始化
     * @returns {*}
     */
    myChart() {
      if (document.getElementById(this.chartId) && Object.keys(this.option).length > 0) {
        if (this.baseTheme === 'dark') {
          return echarts.init(document.getElementById(this.chartId), this.darkTheme);
        }
        if (this.baseTheme === 'light') {
          return echarts.init(document.getElementById(this.chartId), this.lightTheme);
        }
      }

      return null;
    }
  },
  watch: {
    option: {
      handler: function() {
        this.drawLine();
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  beforeDestroy() {
    /* 销毁组件 */
    if (this.myChart) this.myChart.dispose();
  },
  methods: {
    /**
     * 渲染图表
     */
    drawLine() {
      if (this.myChart) {
        this.myChart.clear();
        if (Object.keys(this.option).length > 0) {
          this.myChart.setOption(merge(this.baseOption, this.option));
        }
        this.$nextTick(() => {
          this.myChart.resize();
        });
        this.listenerWindow();
      }
    },

    /**
     * 监听窗体变化重置图表大小
     */
    listenerWindow() {
      window.addEventListener('resize', () => {
        this.myChart.resize();
      });
    }
  }
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
