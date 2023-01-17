<template>
    <div class="lineChart" ref="lineChart">

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "LineChart",
        props: ['data'],
        data() {
            return {

            }
        },
        mounted() {
            if(JSON.stringify(this.data.options) != '{}') {
                this.init(1)
            }else {
                this.init(0)
            }
        },
        methods: {
            init(type) {
                let lineChartDom = this.$refs.lineChart
                let lineChart = this.$echarts.init(lineChartDom,this.theme)
                let options;
                if(type == 0) {
                    options = {
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
                        // legend: {
                        //     data: ['团队旅客', '旅客量'],
                        //     textStyle: {
                        //         color: '#4c9bfd',
                        //         fontSize: 20
                        //     },
                        //     right: '0%',
                        //     top: '10px'
                        // },
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
                                color: '#4c9bfd'
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
                                color: '#4c9bfd'
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
                    };
                    lineChart.setOption(options)
                    this.$set(this.view[this.viewLength - 1],'options',options)
                    this.$set(this.view[this.viewLength - 1],'echartInstance',lineChart)
                }else if (type == 1){
                    options = this.data.options
                    lineChart.setOption(options)
                    this.$set(this.view[this.setOptionsLength],'options',options)
                    this.$set(this.view[this.setOptionsLength],'echartInstance',lineChart)
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
                handler(newValue,oldValue) {
                    this.init()
                }
            },
            // item: {
            //     handler(newValue,oldValue) {
            //         console.log(newValue)
            //     },
            //     deep: true
            // }
        }
    }
</script>

<style scoped>
    .lineChart {
        width: 800px;
        height: 600px;
    }
</style>