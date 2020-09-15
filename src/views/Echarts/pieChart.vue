/** * @DATE: 2019/12/18 9:27 * @Version: 0.0.1 * @Author: lmz * @Description: 显示不同样式饼状图及示例代码 * @Update:
增加圆饼图样式 by hqy 2019-1-2 10：15 */
<template>
  <div class="chart-box">
    <div v-for="(item, index) in barCharOption" :key="index" class="chart-block wbgc-card">
      <a-button class="code-btn" size="small" @click="showDrawer(index)">
        <i class="icon-ic_code"></i>
      </a-button>
      <pie-chart :chartId="`barchart-${index + 40}`" :option="item" :darkTheme="'dark'" :key="currentTheme"></pie-chart>
    </div>

    <!-------- 弹出抽屉显示 Option 配置start -------->
    <a-drawer
      title="Option配置"
      :placement="'right'"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="500px"
      :destroyOnClose="true"
    >
      <a-button
        size="small"
        style="margin-bottom: 20px"
        id="copyBtn"
        data-clipboard-target="#codeShow"
        @click="copyCode"
      >
        <i class="icon-ic_content_copy"></i>
      </a-button>
      <pre v-highlight>
                <code id="codeShow">{{currentOption}}</code>
            </pre>
    </a-drawer>
    <!-------- 弹出抽屉显示 Option 配置end -------->
  </div>
</template>

<script>
/* 引入 PieChart 组件 */
import PieChart from '@/components/Charts/PieChart'; // 引入饼图组件

export default {
  name: 'piechartPage',
  data() {
    return {
      pieChartNum: 1, // 所有饼图个数
      visible: false, //抽屉是否可见
      barCharOption: [
        // 图例相关配置
        {
          legend: {
            // 图例组件
            data: ['表井跑水', '管线漏水', '无水状态', '水压低', '阀门损坏', '水表故障', '水质问题', '其他保修'],
            orient: 'vertical',
            left: '75%',
            y: 'center'
          },
          series: [
            // 系列列表
            {
              name: '故障报修',
              radius: [30, 110], // 饼图的半径
              center: ['40%', '50%'], // 饼图的中心（圆心）坐标
              label: {
                // 饼图图形上的文本标签
                normal: {
                  show: false,
                  position: 'center',
                  formatter: '{d}% \n {b}'
                },
                emphasis: {
                  // 高亮的扇区和标签样式
                  show: true,
                  textStyle: {
                    fontSize: '12'
                  }
                }
              },
              data: [
                // 系列中的数据内容数组
                { value: 135, name: '表井跑水' },
                { value: 310, name: '管线漏水' },
                { value: 274, name: '无水状态' },
                { value: 235, name: '水压低' },
                { value: 211, name: '阀门损坏' },
                { value: 111, name: '水表故障' },
                { value: 287, name: '水质问题' },
                { value: 187, name: '其他保修' }
              ]
            }
          ]
        },
        {
          legend: {
            data: ['浊度', '余氯', 'PH', '溶解氧', '电导率', '温度']
          },
          series: [
            {
              name: '水质问题',
              radius: '55%',
              center: ['50%', '40%'],
              data: [
                { value: 335, name: '浊度' },
                { value: 310, name: '余氯' },
                { value: 274, name: 'PH' },
                { value: 235, name: '溶解氧' },
                { value: 400, name: '电导率' },
                { value: 400, name: '温度' }
              ].sort(function(a, b) {
                return a.value - b.value;
              }),
              label: {
                normal: {
                  formatter: '{c}'
                }
              },
              labelLine: {
                show: false
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function(idx) {
                return Math.random() * 200;
              }
            }
          ]
        },
        {
          legend: {
            data: ['农村', '流量计1', '流量计2', '流量计3', '散户']
          },
          series: [
            {
              name: '访问来源',
              radius: '55%',
              center: ['50%', '40%'],
              roseType: false,
              data: [
                { value: 335, name: '农村' },
                { value: 310, name: '流量计1' },
                { value: 234, name: '流量计2' },
                { value: 135, name: '流量计3' },
                { value: 548, name: '散户' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0
                }
              }
            }
          ]
        },
        {
          title: {
            show: true,
            text: '9999',
            textStyle: {
              color: 'lightpink',
              fontSize: 20
            },
            subtext: ['总长度'],
            x: 'center',
            y: '30%',
            subtextStyle: {
              fonSize: 15,
              color: '#003366'
            }
          },
          tooltip: {
            formatter: param => {
              return `${param.marker}${param.name} ${param.value}`;
            }
          },
          legend: {
            data: ['DN100以下', 'DN100-200', 'DN200-300', 'DN300-400', 'DN400以上']
          },
          series: [
            {
              radius: ['40%', '60%'],
              center: ['50%', '40%'],
              roseType: false,
              labelLine: {
                show: false
              },
              data: [
                { value: 333, name: 'DN100以下' },
                { value: 200, name: 'DN100-200' },
                { value: 234, name: 'DN200-300' },
                { value: 135, name: 'DN300-400' },
                { value: 1548, name: 'DN400以上' }
              ]
            }
          ]
        },
        {
          title: {
            show: true,
            text: '99.99%',
            textStyle: {
              color: 'lightpink',
              fontSize: 20
            },
            subtext: ['回收率'],
            x: 'center',
            y: '30%',
            subtextStyle: {
              color: '#003366'
            }
          },
          legend: {
            data: ['漏损水量', '城市供水', '农村供水']
          },
          series: [
            {
              radius: ['40%', '55%'],
              center: ['50%', '40%'],
              roseType: false,
              label: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 333, name: '漏损水量' },
                { value: 200, name: '城市供水' },
                { value: 234, name: '农村供水' }
              ]
            }
          ]
        },
        {
          tooltip: {
            formatter: `<span style="font-size: 20px; line-height: 28px">{d}%</span> <br> <p style="font-size: 10px; text-align: center">{b}</p>`,
            position: ['33%', '42%'],
            backgroundColor: 'unset',
            borderColor: 'unset'
          },
          legend: {
            data: ['居民', '其他', '特殊', '减免'],
            orient: 'vertical',
            left: '75%',
            y: 'center'
          },
          series: [
            {
              radius: ['40%', '55%'],
              center: ['40%', '50%'],
              roseType: false,
              label: {
                normal: {
                  formatter: '{b}'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 333, name: '居民' },
                { value: 200, name: '其他' },
                { value: 234, name: '特殊' },
                { value: 422, name: '减免' }
              ]
            }
          ]
        },
        {
          legend: {
            orient: 'vertical',
            left: '70%',
            y: 'center',
            data: ['产销差', '售水量', '减免', '漏损', '城区售水', '农村供水']
          },
          series: [
            {
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              center: ['40%', '50%'],
              roseType: false,
              label: {
                normal: {
                  show: false
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 335, name: '城区售水' },
                { value: 679, name: '农村供水' }
              ]
            },
            {
              type: 'pie',
              radius: ['50%', '65%'],
              center: ['40%', '50%'],
              label: {
                show: false
              },
              itemStyle: {
                calculable: true
              },
              data: [
                { value: 335, name: '产销差' },
                { value: 310, name: '售水量' },
                { value: 234, name: '减免' },
                { value: 135, name: '漏损' }
              ]
            },
            {
              name: '外边框',
              type: 'pie',
              clockWise: false, //顺时加载
              hoverAnimation: false, //鼠标移入变大
              center: ['40%', '50%'],
              radius: ['45%', '45%'],
              label: {
                normal: {
                  show: false
                }
              },
              tooltip: {
                show: false
              },
              data: [
                {
                  value: 9,
                  name: '',
                  itemStyle: {
                    normal: {
                      borderWidth: 2,
                      borderColor: '#61bad3'
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          tooltip: {
            formatter: function(param) {
              return `<span style="margin-left: 10px">${param.seriesName}</span><br> ${param.marker}${param.name} <span style="color: #ffffff">${param.value}</span>`;
            }
          },
          legend: {
            data: ['表井跑水', '阀门损坏', '管线漏水', '水表故障', '无水状态', '水质问题', '水压低', '其他保修'],
            selectedMode: true
          },
          series: [
            {
              name: '故障报修工单',
              type: 'pie',
              radius: ['40%', '55%'],
              center: ['50%', '40%'],
              roseType: false,
              label: {
                normal: {
                  show: false,
                  position: 'center',
                  formatter: ['{a|{d}%}', '{b|{b}}'].join('\n'),
                  rich: {
                    a: {
                      fontFamily: 'PingFangSC-Regular',
                      fontSize: 18,
                      color: '#FFFFFF',
                      textAlign: 'center',
                      lineHeight: 26
                    },
                    b: {
                      fontFamily: 'PingFangSC-Regular',
                      fontSize: 10,
                      color: '#868E96',
                      textAlign: 'center'
                    }
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '18'
                  }
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 333, name: '表井跑水' },
                { value: 200, name: '阀门损坏' },
                { value: 234, name: '管线漏水' },
                { value: 422, name: '水表故障' },
                { value: 422, name: '无水状态' },
                { value: 422, name: '水质问题' },
                { value: 422, name: '水压低' },
                { value: 422, name: '其他保修' }
              ]
            }
          ]
        },
        {
          tooltip: {
            formatter: param => {
              return `${param.marker}${param.name} ${param.value}万`;
            }
          },
          legend: {
            show: false,
            data: ['曹车鸿', '叶丽', '孟渊', '叶超超', '万斯斯', '唐观珠', '薛逸逸', '刘亘驰']
          },
          backgroundColor: 'rgba(51,106,231,0)',
          polar: {},
          // 刻度
          angleAxis: {
            min: 0,
            max: 360,
            interval: 45,
            startAngle: 90,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          // 圆圈线
          radiusAxis: {
            inverse: false,
            min: 0,
            max: 40,
            interval: 10,
            // 文字
            axisLabel: {
              color: '#687077',
              inside: true,
              formatter: '{value} 万',
              margin: -38,
              showMinLabel: false
            },
            // 刻度
            axisTick: {
              show: false
            },
            // 线
            axisLine: {
              lineStyle: {
                color: '3270BF'
              }
            }
          },
          calculable: false,
          series: [
            {
              type: 'pie',
              radius: ['0%', '80%'],
              roseType: 'area',
              label: {
                normal: {
                  show: true,
                  formatter: '{b}'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                {
                  value: 40,
                  name: '曹车鸿',
                  itemStyle: {
                    color: 'rgba(51,106,231,0.5)'
                  },
                  label: {
                    color: '#687077'
                  }
                },
                {
                  value: 10,
                  name: '叶丽',
                  itemStyle: {
                    color: 'rgba(51,104,231,0.5)'
                  },
                  label: {
                    color: '#687077'
                  }
                },
                {
                  value: 40,
                  name: '孟渊',
                  itemStyle: {
                    color: 'rgba(180,194,242,0.5)'
                  },
                  label: {
                    color: '#687077'
                  }
                },
                {
                  value: 20,
                  name: '叶超超',
                  itemStyle: {
                    color: 'rgba(51,104,231,0.5)'
                  },
                  label: {
                    color: '#687077'
                  }
                },
                {
                  value: 30,
                  name: '万斯斯',
                  itemStyle: {
                    color: 'rgba(180,194,242,0.5)'
                  },
                  label: {
                    color: '#687077'
                  }
                },
                {
                  value: 10,
                  name: '唐观珠',
                  itemStyle: {
                    color: 'rgba(51,104,231,0.5)'
                  },
                  label: {
                    color: '#687077'
                  }
                },
                {
                  value: 20,
                  name: '薛逸逸',
                  itemStyle: {
                    color: 'rgba(180,194,242,0.5)'
                  },
                  label: {
                    color: '#687077'
                  }
                },
                {
                  value: 40,
                  name: '刘亘驰',
                  itemStyle: {
                    color: 'rgba(51,106,231,0.5)'
                  },
                  label: {
                    color: '#687077'
                  }
                }
              ]
            }
          ]
        }
      ],
      currentOption: {}, //当前点击option
      clipboard: null //复制实例
    };
  },
  components: {
    PieChart
  },
  methods: {
    /**
     * 显示抽屉
     * @param index
     */
    showDrawer(index) {
      this.currentOption = JSON.stringify(this.barCharOption[index], null, 4);
      this.visible = true;
    },
    /**
     * 关闭抽屉
     */
    onClose() {
      this.visible = false;
    },
    /**
     * 复制代码
     */
    copyCode() {
      /* 销毁复制实例和message */
      this.clipboard = null;

      /* 实例化复制对象 */
      this.clipboard = new this.Clipboard('#copyBtn');
      let _this = this;
      this.clipboard.on('success', e => {
        // 成功复制
        _this.$message.destroy();
        _this.$message.success('成功复制代码', 2);
        e.clearSelection(); // 取消选中块状态
      });
    }
  },
  mounted() {},
  destroyed() {
    if (this.clipboard) this.clipboard.destroy();
  },
  beforeUpdate() {}
};
</script>

<style lang="less" scoped>
.seatBox {
  margin-bottom: 20px;
}

.chart-block {
  position: relative;
  display: inline-block;
  width: 30%;
  height: 45%;
  margin: 20px 0;
  margin-right: 3%;
  padding: 10px;
  border-radius: 4px;

  .code-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    z-index: 9;
  }
}
</style>
