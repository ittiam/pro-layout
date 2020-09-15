/** * @DATE: 2020/1/2 11:40 * @Version: 0.0.1 * @Author: liuchentong * @Description: * @Update: 添加一个测试页面 */

<template>
  <div>
    <div class="chart-block wbgc-card">
      <a-radio-group class="chart-block-but" @change="onChange" v-model="value">
        <a-radio-button value="a">合并</a-radio-button>
        <a-radio-button value="b">拆分</a-radio-button>
      </a-radio-group>
      <bar-chart chartId="barchart" :option="barOption" :darkTheme="'dark'" :key="currentTheme"> </bar-chart>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/Charts/BarChart'; //引入柱状图组件
import PieChart from '@/components/Charts/PieChart'; //引入饼图组件

export default {
  name: '',
  data() {
    return {
      value: 'b',
      value1: 'd',
      barOption: {
        title: {
          text: '测试'
        },
        grid: [
          {
            top: '20%'
          }
        ],
        toolbox: {
          show: true,
          feature: {
            magicType: {
              type: ['line', 'bar'],
              icon: {
                line:
                  'path://M652.009 415.947v-309.376l-79.839 51.576v296.482l199.598 154.688v38.682h-478.595v-38.682l199.598-154.688v-244.946l-79.839 51.576v154.688l-199.598 154.688v77.364c0.326 20.844 8.922 40.703 23.897 55.206s35.099 22.459 55.943 22.118h478.556c20.843 0.342 40.968-7.615 55.943-22.118s23.571-34.363 23.897-55.206v-77.364l-199.558-154.688z',
                bar:
                  'path://M213.333 256h128v-128h85.333v213.333h-213.333v-85.333zM341.333 597.334h-128v-85.333h213.333v213.333h-85.333v-128zM597.333 128h85.333v128h128v85.333h-213.333v-213.333zM682.667 597.334v128h-85.333v-213.333h213.333v85.333h-128z'
              }
            },
            saveAsImage: {
              icon:
                'path://M701.63 393.482h-189.63v-189.63h189.63v189.63zM663.704 810.667v-75.852h-303.407v75.852h-75.852v-75.852h-37.926c-42.098 0-75.473-34.133-75.473-75.852l-0.379-530.963c0-41.719 33.754-75.852 75.852-75.852h530.963c41.719 0 75.852 34.133 75.852 75.852v530.963c0 41.719-34.133 75.852-75.852 75.852h-37.926v75.852h-75.852zM777.481 128h-530.963v417.185h530.963v-417.185z'
            }
          }
        },
        xAxis: [
          {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        series: [
          {
            name: '供水总量',
            type: 'bar',
            barWidth: '10%',
            data: [40, 52, 300, 134, 390, 330, 220]
          },
          {
            name: '用水总量',
            type: 'bar',
            barWidth: '10%',
            data: [30, 42, 200, 104, 290, 300, 200]
          },
          {
            name: '剩余总量',
            type: 'bar',
            barWidth: '10%',
            data: [10, 10, 100, 24, 10, 30, 20]
          }
        ]
      }
    };
  },
  components: {
    BarChart,
    PieChart
  },
  methods: {
    onChange(e) {
      //修改数据
      let value = e.target.value;
      if (value === 'a') {
        //合并
        this.barOption.series = [
          {
            name: '合并数据',
            type: 'bar',
            data: [80, 12, 200, 134, 190, 130, 220]
          }
        ];
      } else {
        //拆分
        this.barOption.series = [
          {
            name: '供水总量',
            type: 'bar',
            barWidth: '10%',
            data: [40, 52, 300, 134, 390, 330, 220]
          },
          {
            name: '用水总量',
            type: 'bar',
            barWidth: '10%',
            data: [30, 42, 200, 104, 290, 300, 200]
          },
          {
            name: '剩余总量',
            type: 'bar',
            barWidth: '10%',
            data: [10, 10, 100, 24, 10, 30, 20]
          }
        ];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.chart-block {
  position: relative;
  display: inline-block;
  width: 48%;
  height: 55%;
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;

  &:nth-child(2n) {
    margin-left: 2%;
  }

  .chart-block-but {
    position: absolute;
    top: 35px;
    left: 10px;
    z-index: 9;
  }
}
</style>
