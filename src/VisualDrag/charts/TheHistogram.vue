<template>
    <div class="datav-wrapper" :style="getWidthAndHeightAndOpacity()">
        <div class="histogram" ref="histogram">

        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "TheHistogram",
        props: ['data'],
        data() {
            return {
                histogramDom: '',
                histogramData: {
                    backgroundColor: '#010a37',
                    title: {
                        text: '柱状图',
                        textStyle: {
                            fontSize: 35,
                            color: 'white'
                        },
                        top: '5px'
                    },
                    color: ["#2f89cf"],
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    // 修改图表的大小
                    grid: {
                        left: "10px",
                        top: "10%",
                        right: "0%",
                        bottom: "2%",
                        containLabel: true
                    },
                    xAxis: [{
                        type: "category",
                        data: [
                            "FCD",
                            "GEG",
                            "GGD",
                            "ABA",
                            "FGE",
                            "BEC",
                            "ACD",
                            "CAA",
                            "FDD",
                            "DDF",
                            "FGD",
                            "CGA",
                        ],
                        axisTick: {
                            alignWithLabel: true
                        },
                        // 修改刻度标签 相关样式
                        axisLabel: {
                            color: "white",
                            textStyle: {
                                fontSize : 25
                            },
                        },
                        // 不显示x坐标轴的样式
                        axisLine: {
                            show: false
                        }
                    }],
                    yAxis: [{
                        type: "value",
                        // 修改刻度标签 相关样式
                        axisLabel: {
                            color: "white",
                            fontSize: 25
                        },
                        // y轴的线条改为了 2像素
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)",
                                width: 2
                            }
                        },
                        // y轴分割线的颜色
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)"
                            }
                        },
                    }],
                    series: [{
                        name: "直接访问",
                        type: "bar",
                        barWidth: "35%",
                        data: [1282.0,
                            1497.0,
                            0.0,
                            354.0,
                            298.0,
                            482.0,
                            6289.0,
                            267.0,
                            121.0,
                            32.0,
                            0.0,
                            35.0,
                            7338.0,],
                        itemStyle: {
                            // 修改柱子圆角
                            barBorderRadius: 5
                        }
                    }]
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
                this.histogramDom = this.$echarts.init(this.$refs.histogram,'chalk')
                if(type == 0) {
                    this.histogramDom.setOption(this.histogramData,true)
                    this.$set(this.data,'options',this.histogramData)
                    this.$set(this.data,'echartInstance',this.histogramDom)
                }else if (type == 1){
                    this.histogramDom.setOption(this.data.options,true)
                    this.$set(this.data,'echartInstance',this.histogramDom)
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
    .histogram {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>