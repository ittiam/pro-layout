/**
* @DATE: 2019-12-19 15:07
* @Version: 0.0.1
* @Author: liuct
* @Description: 显示不同样式柱状图及示例代码
* @Update: 增加模块名称 by yunchangJia 2019-12-30 16:42
*/

<template>
    <div>
        <div v-for="(item, index) in barCharOption" :key="index" class="chart-block wbgc-card">
            <a-button class="code-btn" size="small" @click="showDrawer(index)">
                <i class="icon-ic_code"></i>
            </a-button>
            <bar-chart :chartId="`barchart-${index}`" :option="item" :darkTheme="'dark'"
                       :key="currentTheme"></bar-chart>
        </div>

        <!-------- 弹出抽屉显示 Option 配置start -------->
        <a-drawer
                title="Option配置"
                :placement="'right'"
                :closable="false"
                @close="onClose"
                :visible="visible"
                width="500px"
                :destroyOnClose='true'
        >
            <a-button size="small" style="margin-bottom: 20px"
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
    import BarChart from "@/components/Charts/BarChart"; //引入柱状图组件

    let echarts = require('echarts/lib/echarts');   // 引入基本模板

    export default {
        name: 'histogramPage',
        data() {
            return {
                visible: false,              //抽屉是否可见
                barCharOption: [             //所有图表的option数组
                    /* 两个柱状图 */
                    {
                        title: {
                            text: "两个柱状图"
                        },
                        xAxis: [{
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        }],
                        series: [
                            {
                                name: '供水总量',
                                type: 'bar',
                                barWidth: '20%',
                                data: [40, 52, 300, 134, 390, 330, 220]
                            },
                            {
                                name: '用水总量',
                                type: 'bar',
                                barWidth: '20%',
                                data: [30, 42, 200, 104, 290, 300, 200]
                            }
                        ]
                    },
                    /* 折线柱状图组合 */
                    {
                        title: {
                            text: "折线柱状图组合"
                        },
                        tooltip: {
                            axisPointer: {          //坐标轴指示器配置
                                type: 'none'
                            }
                        },
                        xAxis: [{
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        }],
                        series: [
                            {
                                name: '供水总量',
                                type: 'bar',
                                barWidth: '20%',
                                data: [40, 52, 300, 134, 390, 330, 220]
                            },
                            {
                                name: '用水总量',
                                type: 'bar',
                                barWidth: '20%',
                                data: [30, 42, 200, 104, 290, 300, 200]
                            },
                            {
                                name: '总量',
                                type: 'line',
                                emphasis: {
                                    itemStyle: {
                                        color: '#21D3F0',
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        shadowColor: '#21D3F0',
                                        shadowBlur: 10
                                    }
                                },
                                data: [200, 122, 400, 204, 400, 320, 230]
                            }
                        ]
                    },
                    /* 折线柱状图渐变组合 */
                    {
                        title: {
                            text: "折线柱状图渐变组合"
                        },
                        legend: {
                            top: 10,
                            right: '15%'
                        },
                        tooltip: {
                            axisPointer: {          //坐标轴指示器配置
                                type: 'none'
                            }
                        },
                        xAxis: [{
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        }],
                        series: [
                            {
                                name: '供水总量',
                                type: 'bar',
                                barWidth: '20%',
                                itemStyle: {
                                    barBorderRadius: [8, 8, 0, 0],
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#5E85F0'},
                                            {offset: 0.5, color: '#6B7EB4'},
                                            {offset: 1, color: '#575C70'}
                                        ]
                                    )
                                },
                                data: [40, 52, 300, 134, 390, 300, 220]
                            },
                            {
                                name: '总量',
                                type: 'line',
                                barWidth: '20%',
                                emphasis: {
                                    itemStyle: {
                                        color: '#21D3F0',
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        shadowColor: '#21D3F0',
                                        shadowBlur: 10
                                    }
                                },
                                data: [200, 122, 400, 204, 400, 320, 230]
                            }
                        ]
                    },
                    /* 折线堆叠柱状图组合 */
                    {
                        title: {
                            text: "折线堆叠柱状图组合"
                        },
                        tooltip: {
                            axisPointer: {          //坐标轴指示器配置
                                type: 'none'
                            }
                        },
                        xAxis: [{
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }],
                        series: [
                            {
                                name: '百度',
                                type: 'bar',
                                barWidth: '20%',
                                stack: '搜索引擎',
                                data: [620, 732, 701, 734, 1090, 1130, 1120]
                            },
                            {
                                name: '谷歌',
                                type: 'bar',
                                stack: '搜索引擎',
                                data: [120, 132, 101, 134, 290, 230, 220]
                            },
                            {
                                name: '必应',
                                type: 'bar',
                                stack: '搜索引擎',
                                data: [60, 72, 71, 74, 190, 130, 110]
                            },
                            {
                                name: '其他',
                                type: 'bar',
                                stack: '搜索引擎',
                                data: [62, 82, 91, 84, 109, 110, 120]
                            },
                            {
                                name: '总量',
                                type: 'line',
                                emphasis: {
                                    itemStyle: {
                                        color: '#21D3F0',
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        shadowColor: '#21D3F0',
                                        shadowBlur: 10
                                    }
                                },
                                data: [820, 632, 501, 734, 900, 1030, 820]
                            }
                        ]
                    },
                    /* 堆叠柱状图 */
                    {
                        title: {
                            text: "堆叠柱状图"
                        },
                        xAxis: [{
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }],
                        series: [
                            {
                                name: '百度',
                                type: 'bar',
                                barWidth: '20%',
                                stack: '搜索引擎',
                                data: [620, 732, 701, 734, 1090, 1130, 1120]
                            },
                            {
                                name: '谷歌',
                                type: 'bar',
                                stack: '搜索引擎',
                                data: [120, 132, 101, 134, 290, 230, 220]
                            },
                            {
                                name: '必应',
                                type: 'bar',
                                stack: '搜索引擎',
                                data: [60, 72, 71, 74, 190, 130, 110]
                            },
                            {
                                name: '其他',
                                type: 'bar',
                                stack: '搜索引擎',
                                data: [62, 82, 91, 84, 109, 110, 120]
                            }
                        ]
                    },
                    /* 阶梯瀑布图 */
                    {
                        title: {
                            text: "阶梯瀑布图"
                        },
                        legend: {
                            top: 10,
                            right: '15%'
                        },
                        tooltip: {
                            formatter: function (params) {
                                let tar;
                                if (params[1] && params[1].value !== '-') {
                                    tar = params[1];
                                } else {
                                    tar = params[0];
                                }
                                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                            },
                            axisPointer: {          //坐标轴指示器配置
                                type: 'none'
                            }
                        },
                        xAxis: [{
                            data: (function () {
                                var list = [];
                                for (var i = 1; i <= 11; i++) {
                                    list.push('11月' + i + '日');
                                }
                                return list;
                            })()
                        }],
                        series: [
                            {
                                type: 'bar',
                                stack: '总量',
                                itemStyle: {
                                    normal: {
                                        barBorderColor: 'rgba(0,0,0,0)',
                                        color: 'rgba(0,0,0,0)'
                                    },
                                    emphasis: {
                                        barBorderColor: 'rgba(0,0,0,0)',
                                        color: 'rgba(0,0,0,0)'
                                    }
                                },
                                data: [0, 900, 100, 100, 300, 500, 200, 400, 500, 300, 200]
                            },
                            {
                                name: '收入',
                                type: 'bar',
                                barWidth: '25%',
                                stack: '总量',
                                data: [900, 345, 393, '50', '55', 135, 178, 286, '120', '53', '200']
                            },
                            {
                                type: 'scatter',
                                emphasis: {
                                    itemStyle: {
                                        color: '#21D3F0',
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        shadowColor: '#21D3F0',
                                        shadowBlur: 10
                                    }
                                },
                                itemStyle: {
                                    color: '#45C2F9',
                                    borderWidth: 0
                                },
                                data: [800, 1000, 200, '120', '305', 600, 300, 550, '600', '320', '300']
                            }
                        ]
                    },
                    /*
                     * 双向柱状图
                     * @todo
                     */
                    {
                        title: {
                            text: "双向柱状图 （待开发）"
                        }
                        // grid: [
                        //     {x: '1%', y: '7%', width: '38%'},
                        //     {x2: '11%', y: '7%', width: '38%'}
                        // ],
                        // xAxis: [
                        //     {gridIndex: 0, type:'value', show:false, inverse: true},
                        //     {gridIndex: 1, type:'value', show:false}
                        // ],
                        // yAxis: [
                        //     {
                        //         gridIndex: 0,
                        //         position:'right',
                        //         type: 'category',
                        //         axisLabel:{
                        //             margin:'28',
                        //             align:'center'
                        //         },
                        //         axisTick: {
                        //             show:false
                        //         },
                        //         data: ['西南温','双井','前大磨','沙口集','野湖拐','泊口']},
                        //     {
                        //         gridIndex: 1,
                        //         type: 'category',
                        //         axisLabel:{
                        //             show: false
                        //         },
                        //         axisTick: {
                        //             show:false
                        //         },
                        //         data: ['西南温','双井','前大磨','沙口集','野湖拐','泊口']
                        //     }
                        // ],
                        // series: [
                        //     {
                        //         type: 'bar',
                        //         xAxisIndex: 0,
                        //         yAxisIndex: 0,
                        //         data: [18203, 23489, 29034, 104970, 131744, 630230]
                        //     },
                        //     {
                        //         type: 'bar',
                        //         xAxisIndex: 1,
                        //         yAxisIndex: 1,
                        //         data: [18203, 23489, 29034, 104970, 131744, 630230]
                        //     }
                        // ]
                    },
                    /* 横向柱状图 */
                    {
                        title: {
                            text: "横向柱状图"
                        },
                        xAxis: [{
                            type: 'value',
                            splitLine: {        //坐标轴在grid区域的分割线
                                show: true
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {         //x轴的刻度
                                show: false
                            },
                            axisLabel: {
                                color: '#868e96',
                                fontSize: '10'
                            }
                        }],
                        yAxis: [{
                            type: 'category',
                            splitLine: {        //坐标轴在grid区域的分割线
                                show: false
                            },
                            data: ['西南温', '双井', '前大磨', '沙口集', '野湖拐', '泊口']
                        }],
                        series: [
                            {
                                type: 'bar',
                                data: [18203, 23489, 29034, 104970, 131744, 630230]
                            }
                        ]
                    },
                    /* 横向堆叠柱状图 */
                    {
                        title: {
                            text: "横向堆叠柱状图"
                        },
                        xAxis: [
                            {
                                type: 'value',
                                splitLine: {        //坐标轴在grid区域的分割线
                                    show: true
                                },
                                axisLine: {
                                    show: false
                                },
                                axisTick: {         //x轴的刻度
                                    show: false
                                },
                                axisLabel: {
                                    color: '#868e96',
                                    fontSize: '10'
                                }
                            }
                        ],
                        yAxis: [{
                            type: 'category',
                            splitLine: {        //坐标轴在grid区域的分割线
                                show: false
                            },
                            data: ['西南温', '双井', '前大磨', '沙口集', '野湖拐', '泊口']
                        }],
                        series: [
                            {
                                type: 'bar',
                                stack: '搜索引擎',
                                data: [183, 248, 234, 470, 744, 230]
                            },
                            {
                                type: 'bar',
                                stack: '搜索引擎',
                                data: [120, 489, 34, 140, 117, 23]
                            }, {
                                type: 'bar',
                                stack: '搜索引擎',
                                data: [203, 349, 934, 40, 144, 620]
                            }
                        ]
                    }
                ],
                currentOption: {},           //当前点击option
                clipboard: null            //复制实例
            };
        },
        components: {
            BarChart
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
                this.clipboard.on('success', e => { // 成功复制
                    _this.$message.destroy();
                    _this.$message.success('成功复制代码', 2);
                    e.clearSelection(); // 取消选中块状态
                });
            }
        },
        mounted() {
        },
        destroyed() {
            if (this.clipboard) this.clipboard.destroy();
        },
        beforeUpdate() {
        }
    };
</script>

<style lang="less" scoped>
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
