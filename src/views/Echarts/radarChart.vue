/** * @DATE: 2019/12/18 9:26 * @Version: 0.0.1 * @Author: lmz * @Description: 显示不同样式雷达图及示例代码 * @Update:
添加页面 by hyq 2020/1/2 9:55 */
<template>
  <div>
    <div v-for="(item, idx) in radarNum" :key="idx" class="outer-wrapper wbgc-card">
      <a-button class="code-btn" size="small" @click="showDrawer(idx)">
        <i class="icon-ic_code"></i>
      </a-button>

      <radar-chart
        :chartId="`radar-${idx + 1}`"
        :option="options[idx]"
        :darkTheme="'blueFour1'"
        :key="currentTheme"
      ></radar-chart>
    </div>

    <!-------- 弹出抽屉显示 Option 配置 -------->
    <a-drawer
      title="Option配置"
      :placement="placement"
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
  </div>
</template>

<script>
import RadarChart from '@/components/Charts/RadarChart'; // 引入雷达图组件
export default {
  data() {
    return {
      radarNum: 1, // 所有图例个数
      options: [
        {
          title: {
            text: '',
            textStyle: {
              color: 'rgba(221,221,221,1)', //标题颜色
              fontSize: 14,
              lineHeight: 20
            },
            // 标题的位置，此时放在图的底边
            left: 'center',
            top: 'bottom'
          },

          tooltip: {
            formatter: function(param) {
              return `<span style="margin-left: 10px">${param.name}</span>
                                <br> ${param.marker} <span style="color: #ffffff"> >10年 ${param.value[0]}</span>
                                <br> ${param.marker} <span style="color: #ffffff"> 未知管龄 ${param.value[1]}</span>
                                <br> ${param.marker} <span style="color: #ffffff"> <1年 ${param.value[2]}</span>
                                <br> ${param.marker} <span style="color: #ffffff"> 1-3年 ${param.value[3]}</span>
                                <br> ${param.marker} <span style="color: #ffffff"> 3-5年 ${param.value[3]}</span>
                                <br> ${param.marker} <span style="color: #ffffff"> 5-10年 ${param.value[4]}</span>
                                `;
            }
          },
          radar: [
            {
              shape: 'polygon',
              splitNumber: 3, // 雷达图圈数设置
              name: {
                textStyle: {
                  color: '#838D9E'
                }
              },
              // 设置雷达图中间射线的颜色
              axisLine: {
                lineStyle: {
                  color: '#282E34'
                }
              },
              indicator: [
                {
                  name: '>10年',
                  max: 1
                  //若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
                },
                { name: '未知管龄', max: 1 },
                { name: '<1年', max: 1 },
                { name: '1-3年', max: 1 },
                { name: '3-5年', max: 1 },
                { name: '5-10年', max: 1 }
              ],
              //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
              splitArea: {
                show: true,
                areaStyle: {
                  color: 'rgba(255,0,0,0)' // 图表背景的颜色
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  width: 1,
                  color: '#24292F' // 设置网格的颜色
                }
              }
            }
          ],
          series: [
            {
              name: '雷达图', // tooltip中的标题
              type: 'radar', //表示是雷达图
              symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
              symbolSize: 6, // 拐点的大小
              areaStyle: {
                normal: {
                  width: 1,
                  opacity: 0.2
                }
              },
              data: [
                {
                  value: [0.33, 0.24, 0.07, 0.29, 0.26, 0.16],
                  name: 'pe',
                  // 设置区域边框和区域的颜色
                  itemStyle: {
                    normal: {
                      color: '#3366FF',
                      lineStyle: {
                        color: '#3366FF'
                      }
                    }
                  }
                },
                {
                  value: [0.5, 0.2, 0.19, 0.11, 0.22, 0.17],
                  name: 'pvc',
                  itemStyle: {
                    normal: {
                      color: '#71A3F8',
                      lineStyle: {
                        width: 1,
                        color: '#71A3F8'
                      }
                    }
                  }
                },
                {
                  value: [0.7, 0.18, 0.19, 0.13, 0.22, 0.17],
                  name: '铁',
                  itemStyle: {
                    normal: {
                      color: '#08CBE2',
                      lineStyle: {
                        width: 1,
                        color: '#08CBE2'
                      }
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          radar: [
            {
              indicator: [
                {
                  text: '曹车红',
                  max: 40,
                  axisLabel: {
                    show: true,
                    fontSize: 12,
                    color: '#838D9E'
                  }
                },
                {
                  text: '曹车红'
                },
                {
                  text: '曹车红'
                },
                {
                  text: '曹车红'
                },
                {
                  text: '叶莉'
                },
                {
                  text: '叶莉'
                },
                {
                  text: '叶莉'
                },
                {
                  text: '叶莉'
                }
              ],
              splitNumber: 4,
              shape: 'circle',
              name: {
                formatter: '{value}',
                textStyle: {
                  color: '#838D9E' // 文字颜色
                }
              },
              splitArea: {
                areaStyle: {
                  color: 'rgba(0,0,0,0)' //圆背景颜色
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#262C32' // 分割线
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#262C32' //圆线
                }
              }
            }
          ],
          series: [
            {
              name: '雷达图',
              type: 'radar',
              itemStyle: {
                emphasis: {
                  // color: 各异,
                  lineStyle: {
                    width: 4
                  }
                }
              },
              data: [
                {
                  value: [10, 30, 40, 40, 30, 30, 20, 30],
                  areaStyle: {
                    normal: {
                      color: '#3d7df0' // 选择区域颜色
                    }
                  }
                }
              ]
            }
          ]
        }
      ], // 图例相关配置
      visible: false, // 抽屉是否显示
      placement: 'right', // 显示位置
      clipboard: null, // 复制实例
      currentOption: {} // 当前点击图表的 option
    };
  },
  components: {
    RadarChart
  },
  mounted() {
    this.radarNum = this.options.length;
  },
  destroyed() {
    this.clipboard.destroy();
  },
  methods: {
    /* 展示代码抽屉 */
    showDrawer(num) {
      console.log('num:', num);
      this.currentOption = this.options[num];
      console.log(this.currentOption);
      this.visible = true;
    },

    /* 复制代码 */
    copyCode(_id) {
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
    },

    /* 关闭代码抽屉 */
    onClose() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.outer-wrapper {
  position: relative;
  display: inline-block;
  width: 400px;
  height: 300px;
  margin-right: 20px;
  padding: 15px 0 0 10px;
  border-radius: 4px;

  .chart-wrapper {
    width: 100%;
    height: 100%;
  }

  .code-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    z-index: 9;
  }
}

pre {
  white-space: pre-wrap !important;
}
</style>
