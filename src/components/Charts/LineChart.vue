/** * @Date: 2019/11/5 17:04 * @Version: 0.0.1 * @Author: passerby * @Description: 折线图组件 * @Update: 调整组件 by
yunchangJia 2019-12-30 16:44 */

<template>
  <div class="chart" :id="chartId"></div>
</template>

<script>
import merge from 'lodash.merge';
let echarts = require('echarts/lib/echarts'); // 引入基本模板
require('echarts/lib/chart/line'); // 引入折线图组件
require('echarts/lib/chart/bar'); // 引入柱状图组件
require('echarts/lib/component/tooltip'); // 引入提示框
require('echarts/lib/component/title'); // title组件
require('echarts/lib/component/legend'); // 图例组件
require('echarts/lib/component/dataZoom'); // 区域缩放组件

export default {
  name: 'LineChart',
  data() {
    return {
      baseOption: {
        title: {
          textStyle: {
            fontSize: 12
          }
        },
        tooltip: {
          //提示框组件
          trigger: 'axis' //触发类型，axis表示坐标轴触发
        },
        legend: {
          normal: {
            itemWidth: 6,
            itemHeight: 6
          }
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            type: 'category'
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            type: 'line'
          }
        ]
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
    }
  },
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
  watch: {
    option: {
      handler: function() {
        this.drawLine();
      },
      deep: true
    }
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
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  beforeDestroy() {
    /* 销毁组件 */
    if (this.myChart) this.myChart.dispose();
  }
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
