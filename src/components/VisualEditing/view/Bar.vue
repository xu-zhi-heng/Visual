<template>
    <div class="bar" ref="bar">

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "Bar",
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let barDom = this.$refs.bar
                let bar = this.$echarts.init(barDom,this.theme)
                let option = {
                    backgroundColor: '#030724',
                    title: {
                        text: '城市出入城市对比',
                        textStyle: {
                            color: 'white',
                            fontSize: 20
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        axisLine: {
                            show: false
                        },
                        show: false
                    },
                    yAxis: [
                        {
                            type: 'category',
                            data: ['DBF',
                                'AGD',
                                'BFA',
                                'GCC',
                                'AFA',
                                'GFG',
                                'EFF',
                                'BBE',
                                'DCF',
                                'AEF',
                                'FCE',
                                'ADB',
                                'ACG',
                                'CAG',
                                'ABF',
                                'CFC',
                                'DEF',
                                'FGB',
                                'CEG',
                                'GAD',
                                'FED',
                                'BDC',
                                'AFB',
                                'AEC',
                                'EGF',
                                'DFG',
                                'GDF',
                                'CDE',
                                'BCE',
                                'GCC',
                                'GAD',
                                'EEA',
                                'GFG',
                                'CDE',
                                'AEC'],
                            axisLabel: {
                                color: "white",
                                fontSize: 12
                            },
                            // 不显示y轴的线
                            axisLine: {
                                show: false
                            },
                            // 不显示刻度
                            axisTick: {
                                show: false
                            },
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            data: [0,
                                0,
                                0,
                                2,
                                4,
                                17,
                                0,
                                0,
                                3,
                                0,
                                0,
                                0,
                                0,
                                9,
                                2,
                                0,
                                0,
                                0,
                                0,
                                18,
                                1,
                                0,
                                0,
                                3,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                1,
                                2,
                                18,
                                0]
                        },
                        {
                            type: 'bar',
                            data: [0,
                                0,
                                0,
                                40,
                                0,
                                13,
                                0,
                                0,
                                0,
                                81,
                                0,
                                0,
                                0,
                                4,
                                3,
                                0,
                                2,
                                17,
                                0,
                                0,
                                0,
                                1,
                                0,
                                24,
                                0,
                                86,
                                2,
                                0,
                                17,
                                0,
                                40,
                                86,
                                1],
                        },
                    ]
                };
                bar.setOption(option)
                this.$set(this.view[this.viewLength - 1],'options',option)
                this.$set(this.view[this.viewLength - 1],'echartInstance',bar)
            }
        },
        computed: {
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
    .bar {
        width: 800px;
        height: 600px;
    }
</style>