/** * @Date: 2019/11/5 17:04 * @Version: 0.0.1 * @Author: passerby * @Description: 饼图组件 * @Update:调整组件 by
yunchangJia 2019-12-30 16:44 */

<template>
  <div class="chart" :id="chartId"></div>
</template>

<script>
import merge from 'lodash.merge';
let echarts = require('echarts/lib/echarts'); // 引入基本模板
require('echarts/lib/chart/pie'); // 引入饼图组件
require('echarts/lib/component/tooltip'); // 引入提示框
require('echarts/lib/component/title'); // title组件
require('echarts/lib/component/legend'); // 图例组件

export default {
  name: 'PieChart',
  data() {
    return {
      baseOption: {
        title: {
          textStyle: {
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: param => {
            return `${param.marker}${param.name} ${param.value} ${param.percent}%`;
          }
        },
        grid: [
          {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          }
        ],
        legend: {
          itemWidth: 6,
          itemHeight: 6,
          itemGap: 20,
          icon: 'circle',
          bottom: 15,
          padding: 0,
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '40%'],
            roseType: 'radius',
            center: ['50%', '50%'],
            label: {
              normal: {
                show: true,
                position: 'outside',
                formatter: '{d}%'
              }
            },
            labelLine: {
              length2: 0
            },
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0)'
              }
            },
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
