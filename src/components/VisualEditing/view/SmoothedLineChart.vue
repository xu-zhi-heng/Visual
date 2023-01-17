<template>
    <div class="smoothedLineChart" ref="smoothedLineChart">

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "SmoothedLineChart",
        mounted() {
            let smoothedLineChartDom = this.$refs.smoothedLineChart
            let smoothedLineChart = this.$echarts.init(smoothedLineChartDom,this.theme)
            let option;
            setTimeout(function () {
                option = {
                    backgroundColor: '#030724',
                    legend: {
                        textStyle:{
                            color: 'white'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        showContent: false
                    },
                    dataset: {
                        source: [
                            ['product', '05', '06', '07', '08', '09', '10'],
                            ['AGD', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
                            ['BFA', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
                            ['GCC', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
                            ['AFA', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
                        ]
                    },
                    xAxis: {type: 'category'},
                    yAxis: {gridIndex: 0},
                    grid: {top: '55%'},
                    series: [
                        {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
                        {
                            type: 'pie',
                            id: 'pie',
                            radius: '30%',
                            center: ['50%', '25%'],
                            emphasis: {focus: 'data'},
                            label: {
                                formatter: '{b}: {@2012} ({d}%)'
                            },
                            encode: {
                                itemName: 'product',
                                value: '2012',
                                tooltip: '2012'
                            }
                        }
                    ]
                };

                smoothedLineChart.on('updateAxisPointer', function (event) {
                    var xAxisInfo = event.axesInfo[0];
                    if (xAxisInfo) {
                        var dimension = xAxisInfo.value + 1;
                        smoothedLineChart.setOption({
                            series: {
                                id: 'pie',
                                label: {
                                    formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                                },
                                encode: {
                                    value: dimension,
                                    tooltip: dimension
                                }
                            }
                        });
                    }
                });

                smoothedLineChart.setOption(option);

            });
            smoothedLineChart.setOption(option)
            this.$set(this.view[this.viewLength - 1],'options',option)
            this.$set(this.view[this.viewLength - 1],'echartInstance',smoothedLineChart)
        },
        computed:{
            ...mapGetters([
                'currentEchartInstance',
                'view',
                'viewLength',
                'theme'
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
    .smoothedLineChart {
        width: 800px;
        height: 600px;
    }
</style>