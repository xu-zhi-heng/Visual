<template>
    <div class="datav-wrapper" :style="getWidthAndHeightAndOpacity()">
        <div class="lineChart" ref="lineChart">

        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "TheLineChart",
        props: ['data'],
        data() {
            return {
                lineChartDom: '',
                lineChartData: {
                    backgroundColor: '#030724',
                    title: {
                        text: '折线图',
                        textStyle: {
                            color: 'white',
                            fontSize: 30
                        },
                        top: '10px',
                        left: '10px'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        top: '20%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        show: true,
                        borderColor: '#012f4a',
                        containLabel: true
                    },

                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        textStyle: {
                            fontSize: 30
                        },
                        data: ["1月",
                            "2月",
                            "3月",
                            "4月",
                            "5月",
                            "6月",
                            "7月",
                            "8月",
                            "9月",
                            "10月",
                            "11月",
                            "12月"
                        ],
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#4c9bfd',
                            textStyle: {
                                fontSize : 25
                            },
                        },
                        axisLine: {
                            show: false,
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#4c9bfd',
                            textStyle: {
                                fontSize : 25
                            },
                        },
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#012f4a'
                            }
                        }
                    },
                    series: [
                        {
                            name: '团队旅客',
                            type: 'line',
                            smooth: true,
                            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120]
                        }
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
                this.lineChartDom = this.$echarts.init(this.$refs.lineChart,'chalk')
                if(type == 0) {
                    this.lineChartDom.setOption(this.lineChartData,true)
                    this.$set(this.data,'options',this.lineChartData)
                    this.$set(this.data,'echartInstance',this.lineChartDom)
                }else if (type == 1){
                    this.lineChartDom.setOption(this.data.options,true)
                    this.$set(this.data,'echartInstance',this.lineChartDom)
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
        width: 800px;
        height: 600px;
        transform: translateZ(0px);
        opacity: 1;
    }
    .lineChart {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>