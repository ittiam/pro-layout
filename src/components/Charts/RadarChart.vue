/** * @Date: 2019/11/5 17:04 * @Version: 0.0.1 * @Author: passerby * @Description: 折线图组件 * @Update: 调整组件 by hyq
2020/1/2 9:55 */

<template>
  <div class="chart" :id="chartId"></div>
</template>

<script>
import merge from 'lodash.merge';
let echarts = require('echarts/lib/echarts'); // 引入基本模板
require('echarts/lib/chart/radar'); // 引入雷达图组件
require('echarts/lib/component/tooltip'); // 引入提示框
require('echarts/lib/component/title'); // title组件
require('echarts/lib/component/legend'); // 图例组件

export default {
  name: 'RadarChart',
  data() {
    return {
      baseOption: {
        tooltip: {
          //提示框组件
          trigger: 'item', //触发类型
          axisPointer: {
            //坐标轴指示器配置项
            type: 'cross'
          }
        },
        legend: {
          itemWidth: 6,
          itemHeight: 6,
          itemGap: 20,
          icon: 'circle',
          bottom: 15,
          padding: 0,
          left: 'center'
        },
        radar: [
          {
            indicator: [],
            radius: '70%', //雷达图半径
            center: ['50%', '45%'] //雷达图圆心位置
          }
        ],
        series: [
          {
            name: '',
            type: 'radar',
            data: []
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
      if (this.baseTheme === 'dark') {
        return echarts.init(document.getElementById(this.chartId), this.darkTheme);
      }
      if (this.baseTheme === 'light') {
        return echarts.init(document.getElementById(this.chartId), this.lightTheme);
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
        this.myChart.setOption(merge(this.baseOption, this.option));
        this.listenerWindow();
      }
    },

    /**
     * 监听窗体变化重置图表大小
     */
    listenerWindow() {
      window.addEventListener('resize', this.myChart.resize());
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
