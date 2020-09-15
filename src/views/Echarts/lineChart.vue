/** * @DATE: 2019/12/18 9:26 * @Version: 0.0.1 * @Author: lmz * @Description: 显示不同样式折线图及示例代码 * @Update:
增加模块名称 by yunchangJia 2019-12-30 16:42 * @Update: 添加折线图 by lmz 2020-01-05 */
<template>
  <div>
    <div v-for="(item, index) in option" :key="index" class="chart-block wbgc-card">
      <a-button class="code-btn" size="small" @click="showDrawer(index)">
        <i class="icon-ic_code"></i>
      </a-button>
      <line-chart :chartId="`linechart-${index}`" :option="item" :darkTheme="'dark'" :key="currentTheme"></line-chart>
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
/* 引入 LineChart 组件 */
import LineChart from '@/components/Charts/LineChart'; // 引入折线图组件
export default {
  name: 'linechartPage',
  data() {
    return {
      visible: false, // 抽屉是否可见
      option: [
        // 图例相关配置
        {
          title: {
            text: '当月设备告警趋势分析',
            textStyle: {
              fontSize: 12
            }
          },
          tooltip: {
            axisPointer: {
              // 坐标轴指示器配置项
              type: 'none'
            },
            formatter: function(param) {
              let str = '&nbsp;&nbsp;&nbsp;2019-12-';
              param.forEach(item => {
                str += item.name + '<br>' + item.marker + item.seriesName + ': ' + item.data + '<br>';
              });
              return str;
            }
          },
          legend: {
            show: false
          },
          xAxis: [
            {
              boundaryGap: false,
              data: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
                31
              ],
              splitLine: {
                interval: 1
                // lineStyle: {
                //     type: 'dashed' // 分割线样式 -- 虚线
                // }
              }
            }
          ],
          yAxis: [
            {
              axisLine: {
                show: false
              },
              minInterval: 30
            }
          ],
          series: [
            {
              name: '设备告警数',
              smooth: false, // 是否平滑曲线
              symbol: 'circle', //拐点设置为实心
              symbolSize: 1, //拐点大小
              animation: true, //false: hover圆点不缩放 .true:hover圆点默认缩放
              itemStyle: {
                normal: {},
                emphasis: {
                  color: '#4285F4', //hover拐点颜色定义
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              areaStyle: {
                // 区域填充样式
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(66, 133, 244, .2)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(18, 22, 29, 0)' // 100% 处的颜色
                    }
                  ]
                }
              },
              data: [
                0,
                27,
                11,
                59,
                34,
                2,
                61,
                32,
                45,
                21,
                12,
                33,
                46,
                42,
                54,
                39,
                9,
                50,
                24,
                36,
                10,
                52,
                27,
                34,
                15,
                18,
                27,
                6,
                44,
                28
              ]
            }
          ]
        },
        {
          title: {
            text: '当月设备告警趋势分析',
            textStyle: {
              fontSize: 12
            }
          },
          tooltip: {
            axisPointer: {
              //坐标轴指示器配置项
              type: 'none'
            },
            formatter: function(param) {
              let str = '&nbsp;&nbsp;&nbsp;2019-12-';
              param.forEach(item => {
                str += item.name + '<br>' + item.marker + item.seriesName + ': ' + item.value + '%<br>';
              });
              return str;
            }
          },
          legend: {
            show: false
          },
          xAxis: [
            {
              // boundaryGap : false,
              data: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
                31
              ],
              // splitLine: {
              //     interval: 1
              // },
              show: false
            }
          ],
          yAxis: [
            {
              axisLine: {
                show: false
              },
              // minInterval: 30,
              show: false
            }
          ],
          series: [
            {
              name: '回收率',
              smooth: true, // 是否平滑曲线
              symbol: 'circle', //拐点设置为实心
              symbolSize: 1, //拐点大小
              showSymbol: true, // 显示拐点
              animation: true, //false: hover圆点不缩放 .true:hover圆点默认缩放
              itemStyle: {
                normal: {
                  color: 'rgba(0, 0, 0, 0)'
                },
                emphasis: {
                  color: '#4285F4', //hover拐点颜色定义
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              lineStyle: {
                color: 'rgba(0, 0, 0, 0)'
              },
              areaStyle: {
                // 区域填充样式
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 1,
                      color: 'rgba(66, 133, 244, .1)'
                    },
                    {
                      offset: 0,
                      color: '#4285F4'
                    }
                  ]
                }
              },
              data: [
                0,
                27,
                11,
                59,
                34,
                2,
                61,
                32,
                45,
                21,
                12,
                33,
                46,
                42,
                54,
                39,
                9,
                50,
                24,
                36,
                10,
                52,
                27,
                34,
                15,
                18,
                27,
                6,
                44,
                28
              ]
            }
          ]
        },
        {
          tooltip: {
            axisPointer: {
              // 坐标轴指示器配置项
              type: 'none'
            }
          },
          legend: {
            bottom: '2%', // 图例与底部距离
            data: ['周一', '周二', '周三', '周四', '周五'],
            icon: 'rect',
            itemWidth: 15, // 图例宽度
            itemHeight: 4, // 图例高度
            itemGap: 20 // 图例间距
          },
          toolbox: {
            left: 20,
            itemSize: 20, // 工具栏 icon 的大小
            // itemGap: 10,        // 工具栏 icon 每项之间的间隔
            showTitle: true, // 是否在鼠标 hover 的时候显示每个工具 icon 的标题
            feature: {
              saveAsImage: {
                icon:
                  'path://M734.592 454.784A320 320 0 1 1 296.064 448M776.576 504.832a320 320 0 0 1-580.352 232.064 320 320 0 1 0 580.352-232.064zM512 237.696m-217.6 0a217.6 217.6 0 1 0 435.2 0 217.6 217.6 0 1 0-435.2 0ZM690.048 112.896a220.032 220.032 0 0 1 1.152 22.528 217.6 217.6 0 0 1-395.648 124.8A217.6 217.6 0 1 0 690.048 112.896zM321.664 361.6a497.408 497.408 0 0 0 201.6 46.08A317.312 317.312 0 0 0 704 353.664a227.072 227.072 0 0 1 27.264 51.2 149.12 149.12 0 0 1 8.064 52.864s-81.536 57.6-228.736 57.6-217.6-76.8-217.6-76.8a62.592 62.592 0 0 1 4.864-43.136 92.672 92.672 0 0 1 23.808-33.792zM331.264 478.464v235.136s12.8 20.864 49.664 19.2A75.136 75.136 0 0 0 435.2 708.864l3.2-204.8zM385.664 493.568l40.704-91.904-53.504-20.096-57.6 72.832 70.4 39.168zM424.32 518.912S420.352 686.336 409.6 702.464c-7.424 10.624-34.304 19.968-61.568 13.568 0 0 36.864 20.864 67.968 10.368S435.2 704 435.2 704zM333.568 639.232a108.416 108.416 0 0 0 50.432 12.8 121.216 121.216 0 0 0 49.664-10.368v67.2a69.504 69.504 0 0 1-52.736 24.064 61.44 61.44 0 0 1-50.432-24.832zM431.744 642.432a108.288 108.288 0 0 1-13.696 4.736 190.976 190.976 0 0 1-8.96 55.168c-7.424 10.624-34.304 19.968-61.568 13.568a107.904 107.904 0 0 0 56.448 12.8 68.48 68.48 0 0 0 29.696-20.096v-36.352zM711.168 432.768c-10.368 17.664-69.248 44.544-128.768 56.064a719.744 719.744 0 0 1-161.536 8.064A404.352 404.352 0 0 0 563.2 512.64c13.824-1.408 26.752-3.2 39.04-5.376 88.448-17.664 128-47.488 131.456-64s-24.832-66.432-24.832-66.432 12.8 38.4 2.304 55.936zM592.768 504.064l-14.208-96.896-76.8 1.664-20.096 101.632 111.104-6.4zM334.464 561.664a193.92 193.92 0 0 0 99.2 3.968V518.4s-39.936-15.232-67.2-23.936a167.808 167.808 0 0 1-34.432-13.568zM639.104 390.4l61.824-31.232a226.432 226.432 0 0 1 30.464 45.568 194.816 194.816 0 0 1 7.168 41.6l-54.4 31.232s-13.568-32.768-23.168-51.968a251.904 251.904 0 0 0-21.888-35.2zM336 470.4a114.432 114.432 0 0 1-10.368-51.2c3.2-21.376 13.568-24.832 13.568-24.832s131.2 42.368 227.2 23.168l-127.232-21.632L316.8 358.4A70.912 70.912 0 0 0 294.4 400c-6.4 33.024 0 45.824 0 45.824zM367.488 490.368l-25.6 225.664-12.032-233.6 37.632 7.936zM484.096 498.048l-2.304 11.776h2.816l108.288-6.272-2.432-16.896-7.936 1.664a600.32 600.32 0 0 1-98.432 9.728zM675.712 458.24c4.736 10.88 8.32 19.456 8.32 19.456l45.568-25.6a21.888 21.888 0 0 0 3.968-8.192c3.2-16.768-24.832-66.432-24.832-66.432s12.8 38.4 2.432 56.064a91.392 91.392 0 0 1-35.456 24.704zM498.944 283.648m-24.192 0a24.192 24.192 0 1 0 48.384 0 24.192 24.192 0 1 0-48.384 0ZM626.944 283.648m-24.192 0a24.192 24.192 0 1 0 48.384 0 24.192 24.192 0 1 0-48.384 0ZM901.504 438.4l-48 3.456 10.112-40.448a12.8 12.8 0 1 0-24.832-6.272l-12.8 53.248-42.496 32.128a344.576 344.576 0 0 0-29.44-33.92v-0.64a166.4 166.4 0 0 0-34.688-94.72 236.672 236.672 0 1 0-444.16-114.432 234.24 234.24 0 0 0 29.952 114.56 105.984 105.984 0 0 0-24.832 85.888 338.048 338.048 0 0 0-47.104 54.656l-70.272-51.2-18.816-75.264a12.8 12.8 0 1 0-24.832 5.76l15.616 62.592-73.216-5.376a12.8 12.8 0 0 0-1.92 25.6l87.168 6.4 72.32 52.608A339.2 339.2 0 1 0 851.2 684.8a336.384 336.384 0 0 0-53.632-183.04l43.904-33.28 61.824-4.48a12.8 12.8 0 0 0 11.776-13.696 12.8 12.8 0 0 0-13.568-11.904zM512 38.4a198.656 198.656 0 0 1 198.4 198.4 195.968 195.968 0 0 1-39.936 119.168 288 288 0 0 1-147.2 38.4 407.04 407.04 0 0 1-171.648-40.96A198.4 198.4 0 0 1 512 38.4zM323.968 368.64a430.08 430.08 0 0 0 199.168 51.84 304.64 304.64 0 0 0 176.128-52.48 144 144 0 0 1 28.544 73.216c-12.8 12.8-69.12 58.624-198.656 62.592-144.64 4.48-211.328-54.784-223.104-66.688a81.536 81.536 0 0 1 17.92-68.48z m18.432 124.416a325.12 325.12 0 0 0 81.664 27.648v186.88a66.816 66.816 0 0 1-81.536 0zM512 985.6a300.672 300.672 0 0 1-261.504-449.408l13.952 10.112a12.8 12.8 0 1 0 15.104-20.736l-15.36-11.136a300.032 300.032 0 0 1 38.4-46.08c3.968 3.072 8.32 6.4 13.696 9.856v235.392a12.8 12.8 0 0 0 4.224 9.472 91.776 91.776 0 0 0 61.952 23.936 94.08 94.08 0 0 0 62.336-23.808 12.8 12.8 0 0 0 4.352-9.6V524.8a463.744 463.744 0 0 0 64 4.352h16.384c106.752-3.2 167.424-33.408 197.12-54.528A298.112 298.112 0 0 1 812.8 684.8 301.184 301.184 0 0 1 512 985.6z'
              }
            }
          },
          xAxis: [
            {
              splitLine: false,
              type: 'category',
              boundaryGap: false,
              data: ['1', '3', '5', '7', '9', '11', '13']
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '周一',
              type: 'line',
              smooth: false,
              symbolSize: 8,
              animation: false,
              itemStyle: {
                normal: {},
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [164, 2081, 953, 629, 222, 1917, 1365]
            },
            {
              name: '周二',
              type: 'line',
              smooth: false,
              symbolSize: 8,
              animation: false,
              itemStyle: {
                normal: {},
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [223, 178, 1514, 1841, 361, 592, 753]
            },
            {
              name: '周三',
              type: 'line',
              smooth: false,
              symbolSize: 8,
              animation: false,
              itemStyle: {
                normal: {},
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [583, 699, 450, 885, 451, 357, 948]
            },
            {
              name: '周四',
              type: 'line',
              smooth: false,
              symbolSize: 8,
              animation: false,
              itemStyle: {
                normal: {},
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [1565, 1562, 958, 1027, 1591, 1514, 1426]
            },
            {
              name: '周五',
              type: 'line',
              smooth: false,
              symbolSize: 8,
              animation: false,
              itemStyle: {
                normal: {},
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [1151, 1732, 518, 259, 1810, 1511, 489]
            }
          ]
        },
        {
          tooltip: {
            axisPointer: {
              // 坐标轴指示器配置项
              type: 'none'
            }
          },
          legend: {
            bottom: '1%', // 图例与底部距离
            data: ['进厂瞬时流量', '出厂瞬时流量'],
            icon: 'rect',
            itemWidth: 15, // 图例宽度
            itemHeight: 4, // 图例高度
            itemGap: 20 // 图例间距
          },
          xAxis: [
            {
              splitLine: false,
              type: 'category',
              boundaryGap: false,
              data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00'],
              axisLabel: {
                rotate: -30
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            }
          ],
          series: [
            {
              name: '进厂瞬时流量',
              type: 'line',
              smooth: false,
              symbolSize: 8,
              animation: false,
              itemStyle: {
                normal: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)' // 阴影
                },
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [164, 2081, 953, 629, 222, 1917, 1365]
            },
            {
              name: '出厂瞬时流量',
              type: 'line',
              smooth: false,
              symbolSize: 8,
              animation: false,
              itemStyle: {
                normal: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)' // 阴影
                },
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [223, 178, 1514, 1841, 361, 592, 753]
            }
          ]
        },
        {
          tooltip: {
            axisPointer: {
              // 坐标轴指示器配置项
              type: 'line',
              lineStyle: {
                width: 1
              }
            }
          },
          legend: {
            bottom: '1%', // 图例与底部距离
            data: ['1#泵', '2#泵', '3#泵'],
            icon: 'rect',
            itemWidth: 15, // 图例宽度
            itemHeight: 10, // 图例高度
            itemGap: 20 // 图例间距
          },
          xAxis: [
            {
              splitLine: false,
              type: 'category',
              boundaryGap: true, // 坐标轴两边留白策略
              data: ['Jan', 'Feb', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              axisTick: {
                alignWithLabel: true // 刻度线和标签对齐
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                show: false // 隐藏刻度
              },
              axisLine: {
                show: false // 隐藏坐标轴
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed' // 分割线样式
                }
              }
            }
          ],
          series: [
            {
              name: '1#泵',
              type: 'line',
              animation: true,
              stack: '总量',
              areaStyle: {
                opacity: '.1'
              },
              lineStyle: {
                width: 1
              },
              itemStyle: {
                normal: {
                  borderColor: 'grba(0, 0, 0, 0)', //拐点边框颜色
                  borderWidth: 0, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)' // 阴影
                },
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [164, 2081, 953, 629, 222, 1917, 1365]
            },
            {
              name: '2#泵',
              type: 'line',
              animation: true,
              stack: '总量',
              areaStyle: {
                opacity: '.1'
              },
              itemStyle: {
                normal: {
                  borderWidth: 0, //拐点边框大小
                  borderColor: 'grba(0, 0, 0, 0)', //拐点边框颜色
                  shadowColor: 'rgba(66, 133, 244, .3)' // 阴影
                },
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [583, 699, 450, 885, 451, 357, 948]
            },
            {
              name: '3#泵',
              type: 'line',
              animation: true,
              stack: '总量',
              areaStyle: {
                opacity: '.1'
              },
              itemStyle: {
                normal: {
                  borderWidth: 0, //拐点边框大小
                  borderColor: 'grba(0, 0, 0, 0)', //拐点边框颜色
                  shadowColor: 'rgba(66, 133, 244, .3)' // 阴影
                },
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8,
                  symbolSize: 8
                }
              },
              data: [223, 178, 1514, 1841, 361, 592, 753]
            }
          ]
        },
        {
          tooltip: {
            axisPointer: {
              // 坐标轴指示器配置项
              type: 'line',
              lineStyle: {
                width: 1
              }
            }
          },
          toolbox: {
            left: 20,
            feature: {
              magicType: {
                type: ['line', 'bar']
              },
              saveAsImage: {},
              restore: {}
            }
          },
          legend: {
            bottom: '1%', // 图例与底部距离
            data: ['大浪淀市区', '大浪淀城乡', '大浪淀进水', '大浪淀引大入港'],
            icon: 'rect',
            itemWidth: 10, // 图例宽度
            itemHeight: 2, // 图例高度
            itemGap: 20 // 图例间距
          },
          xAxis: [
            {
              splitLine: false,
              type: 'category',
              boundaryGap: true, // 坐标轴两边留白策略
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisTick: {
                alignWithLabel: true // 刻度线和标签对齐
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                show: false // 隐藏刻度
              },
              axisLine: {
                show: false // 隐藏坐标轴
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed' // 分割线样式
                }
              }
            }
          ],
          series: [
            {
              name: '大浪淀市区',
              type: 'line',
              animation: false,
              smooth: false,
              symbolSize: 8,
              itemStyle: {
                normal: {},
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              lineStyle: {
                width: 1
              },
              data: [20, 14, 7, 8, 18, 6, 20, 13, 21, 12, 23, 26]
            },
            {
              name: '大浪淀城乡',
              type: 'line',
              animation: false,
              smooth: false,
              symbolSize: 8,
              itemStyle: {
                normal: {},
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [17, 8, 17, 12, 24, 16, 5, 29, 21, 29, 12, 28]
            },
            {
              name: '大浪淀进水',
              type: 'line',
              animation: false,
              smooth: false,
              symbolSize: 8,
              itemStyle: {
                normal: {},
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [9, 25, 9, 7, 15, 3, 3, 14, 16, 2, 22, 21]
            },
            {
              name: '大浪淀引大入港',
              type: 'line',
              animation: false,
              smooth: false,
              symbolSize: 8,
              itemStyle: {
                normal: {},
                emphasis: {
                  borderColor: '#fff', //拐点边框颜色
                  borderWidth: 1, //拐点边框大小
                  shadowColor: 'rgba(66, 133, 244, .3)', // 阴影
                  shadowBlur: 8
                }
              },
              data: [17, 9, 27, 3, 25, 3, 15, 18, 12, 4, 25, 6]
            }
          ]
        }
      ],
      currentOption: {}, //当前点击option
      clipboard: null //复制实例
    };
  },
  components: {
    LineChart
  },
  methods: {
    /**
     * 显示抽屉
     * @param index
     */
    showDrawer(index) {
      this.currentOption = JSON.stringify(this.option[index], null, 4);
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
  margin-top: 20px;
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
