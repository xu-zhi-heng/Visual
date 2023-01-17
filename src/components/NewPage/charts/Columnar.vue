<template>
    <div id="columnar" class="item-box">
        <div class="item-title">计算方式</div>
        <div class="item-con" ref="item">

        </div>
    </div>
</template>

<script>
    import user from "../../../api/user";
    import Cookies from "js-cookie";
    export default {
        name: "Columnar",
        data() {
            return {
                columnarDom: '',
                columnarData: {
                    tooltip: {
                        trigger: "axis"
                    },
                    xAxis: [
                        {
                            type: "category",
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: true
                            }
                        }
                    ],
                    series: [
                        {
                            name: "计算方式",
                            type: "bar",
                            barWidth: "13",
                            data: [],
                            itemStyle: {
                                normal: {
                                    barBorderRadius: [12, 12, 12, 12],
                                    color: new this.$echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1,
                                        [
                                            {
                                                offset: 0,
                                                color: "#f75d5d"
                                            },
                                            {
                                                offset: 1,
                                                color: "#f0caca"
                                            }
                                        ]
                                    )
                                }
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            initChart() {
                this.columnarDom = this.$echarts.init(this.$refs.item,'chalk')
                this.columnarDom.setOption(this.columnarData)
            },
            async getData() {
                await user.getCompute(Cookies.get('userId')).then(res => {
                    if(res.code == 1) {
                        let data = res.data.item
                        let x_data = []
                        let y_data = []
                        for(let i = 0; i < data.length; i++) {
                            switch (data[i].type) {
                                case 'sum': x_data.push("求和");break
                                case 'max': x_data.push("最大值");break
                                case 'min': x_data.push("最小值");break
                                case 'count': x_data.push("计数");break
                                case 'distinct_count': x_data.push("唯一计数");break
                                case 'mean': x_data.push("平均值");break
                                case 'variance': x_data.push("方差");break
                                case 'stddev_pop': x_data.push("标准差");break
                            }
                            y_data.push(data[i].times)
                        }
                        this.$nextTick(() => {
                            this.columnarData.xAxis[0].data = x_data
                            this.columnarData.series[0].data = y_data
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        created() {
            this.getData()
        },
        watch: {
            columnarData: {
                handler(newVal,oldVal) {
                    if(this.columnarDom) {
                        if(newVal) {
                            this.columnarDom.setOption(newVal)
                        }else {
                            this.columnarDom.setOption(oldVal)
                        }
                    }else {
                        this.initChart()
                    }
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    .item-box {
        background: #191f28;
        border-radius: 5px;
        height: 100%;
        padding-top: 60px;
    }
    .item-box>.item-title {
        height: 60px;
        padding-top: 10px;
        margin-top: -60px;
        line-height: 50px;
        padding-left: 14px;
        color: #aaa;
        font-weight: 600;
    }
    .item-con {
        height: 100%;
        position: relative;
    }
</style>