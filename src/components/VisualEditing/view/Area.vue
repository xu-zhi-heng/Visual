<template>
    <div class="area" ref="area">

    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Area",
        props: ['data'],
        mounted() {
            if(JSON.stringify(this.data.options) != '{}') {
                this.init(1)
            }else {
                this.init(0)
            }
        },
        methods: {
            init(type) {
                let areaDom = this.$refs.area
                let area = this.$echarts.init(areaDom,this.theme)
                let options
                if(type == 0) {
                    options = {
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

                            {
                                name: '转发量',
                                type: 'line',
                                lineStyle: {
                                    normal: {
                                        color: "#00d887",
                                        width: 2
                                    }
                                },
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1, [{
                                            offset: 0,
                                            color: "rgba(0, 216, 135, 0.4)"
                                        },
                                            {
                                                offset: 0.8,
                                                color: "rgba(0, 216, 135, 0.1)"
                                            }
                                        ],
                                        false
                                    ),
                                    shadowColor: "rgba(0, 0, 0, 0.1)"
                                },
                                // 拐点大小
                                symbolSize: 5,
                                // 设置拐点颜色以及边框
                                itemStyle: {
                                    color: "#00d887",
                                    borderColor: "rgba(221, 220, 107, .1)",
                                    borderWidth: 12
                                },
                                // 开始不显示拐点， 鼠标经过显示
                                showSymbol: false,
                                data: [220, 182, 191, 234, 290, 330, 310]
                            }
                        ]
                    };
                    area.setOption(options)
                    this.$set(this.view[this.viewLength - 1],'options',options)
                    this.$set(this.view[this.viewLength - 1],'echartInstance',area)
                }else if(type == 1) {
                    options = this.data.options
                    area.setOption(options)
                    this.$set(this.view[this.setOptionsLength],'options',options)
                    this.$set(this.view[this.setOptionsLength],'echartInstance',area)
                    this.$store.commit('AsetOptionsLength',this.setOptionsLength + 1)
                }

            }
        },
        computed: {
            ...mapGetters([
                'currentEchartInstance',
                'view',
                'viewLength',
                'theme',
                'setOptionsLength'
            ])
        },
        watch: {
            theme: {
                handler(value) {
                    this.init()
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    .area {
        width: 800px;
        height: 600px;
    }
</style>