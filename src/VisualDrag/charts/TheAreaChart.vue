<template>
    <div class="datav-wrapper" :style="getWidthAndHeightAndOpacity()">
        <div class="areaChart" ref="areaChart">

        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "TheAreaChart",
        props: ['data'],
        data() {
            return {
                areaChartDom: '',
                areaChartData: {
                    backgroundColor: '#030724',
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        data: ['邮件营销','联盟广告'],
                        top: "10",
                        textStyle: {
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "12"
                        }
                    },
                    toolbox: {

                    },
                    grid: {
                        left: "10",
                        top: "30",
                        right: "10",
                        bottom: "10",
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        axisLabel: {
                            textStyle: {
                                color: "rgba(255,255,255,.6)",
                                fontSize: 12
                            }
                        },
                        // x轴线的颜色为   rgba(255,255,255,.2)
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.2)"
                            }
                        }


                    }],
                    yAxis: [{
                        type: 'value',
                        axisTick: { show: false },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: "rgba(255,255,255,.6)",
                                fontSize: 12
                            }
                        },
                        // 修改分割线的颜色
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)"
                            }
                        }

                    }],
                    series: [{
                        name: '邮件营销',
                        type: 'line',
                        smooth: true,
                        // 单独修改线的样式
                        lineStyle: {
                            color: "#0184d5",
                            width: 2
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1, [{
                                    offset: 0,
                                    color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
                                },
                                    {
                                        offset: 0.8,
                                        color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
                                    }
                                ],
                                false
                            ),
                            shadowColor: "rgba(0, 0, 0, 0.1)"
                        },
                        symbol: "circle",
                        symbolSize: 8,
                        itemStyle: {
                            color: "#0184d5",
                            borderColor: "rgba(221, 220, 107, .1)",
                            borderWidth: 12
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    ]
                }
            }
        },
        mounted() {
            if(JSON.stringify(this.data.options) === '{}') {
                this.init(0)
            }else {
                this.init(1)
            }
        },
        methods: {
            init(type) {
                this.areaChartDom = this.$echarts.init(this.$refs.areaChart,'chalk')
                if(type == 0) {
                    this.areaChartDom.setOption(this.areaChartData,true)
                    this.$set(this.data,'options',this.areaChartData)
                    this.$set(this.data,'echartInstance',this.areaChartDom)
                }else if (type == 1){
                    this.areaChartDom.setOption(this.data.options,true)
                    this.$set(this.data,'echartInstance',this.areaChartDom)
                }
            },
            getWidthAndHeightAndOpacity() {
                if(this.data.isOld === 1) {
                    return {
                        width: this.data.style.width,
                        height: this.data.style.height,
                        opacity: this.data.style.opacityValue === null ? 1 : this.data.style.opacityValue
                    }
                }
            },
        },
        computed: {
            ...mapGetters([
                'componentArray'
            ])
        },
    }
</script>

<style scoped>
    .datav-wrapper {
        pointer-events: none!important;
        width: 800px;height: 600px;transform: translateZ(0px);opacity: 1;
    }
    .areaChart {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>