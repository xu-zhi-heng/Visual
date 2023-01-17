<template>
    <div id="largeArea" class="item-box">
        <div class="item-title">每日使用时间</div>
        <div class="item-con" ref="item">

        </div>
    </div>
</template>

<script>
    import user from "../../../api/user";
    import Cookies from 'js-cookie'
    export default {
        name: "LargeArea",
        data() {
            return {
                largeAreaDom: '',
                largeAreaData:  {
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '100%']
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 10
                    }, {
                        start: 0,
                        end: 10
                    }],
                    series: [
                        {
                            name: '在线时长（分钟）',
                            type: 'line',
                            symbol: 'none',
                            sampling: 'lttb',
                            itemStyle: {
                                color: 'rgb(255, 70, 131)'
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(255, 158, 68)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(255, 70, 131)'
                                }])
                            },
                            data: []
                        }
                    ]
                }
            }
        },
        methods: {
            initChart() {
                this.largeAreaDom = this.$echarts.init(this.$refs.item,'chalk')
                this.largeAreaDom.setOption(this.largeAreaData)
            },
            getData() {
                user.getOnlineTime(Cookies.get('userId')).then(res => {
                    if(res.code == 1) {
                        let data = res.data.item
                        let x_data = []
                        let y_data = []
                        for(let i = 0; i < data.length; i++) {
                            x_data.push(data[i].date)
                            y_data.push(data[i].online_time)
                        }
                        this.$nextTick(() => {
                            this.largeAreaData.xAxis.data = x_data
                            this.largeAreaData.series[0].data = y_data
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
            largeAreaData: {
                handler(newVal,oldVal) {
                    if(this.largeAreaDom) {
                        if(newVal) {
                            this.largeAreaDom.setOption(newVal)
                        }else {
                            this.largeAreaDom.setOption(oldVal)
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