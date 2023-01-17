<template>
    <div id="dottedBar" class="item-box">
        <div class="item-title">数据量大小</div>
        <div class="item-con" ref="item">

        </div>
    </div>
</template>

<script>
    import user from "../../../api/user";
    import Cookies from "js-cookie";
    import {mixin} from "../../../mixins";
    export default {
        name: "DottedBar",
        mixins: [mixin],
        data() {
            return {
                lineData: {
                    color : [ '#6a7985' ],
                    //菜单
                    legend : {
                        show : false
                    },
                    //提示框
                    tooltip : {
                        trigger : 'axis',
                        position : 'top',
                        axisPointer : {
                            type : 'cross',
                            label : {
                                backgroundColor : '#6a7985'
                            }
                        }
                    },
                    //图形位置
                    grid : {
                        left : '4%',
                        right : '6%',
                        bottom : '4%',
                        top : 80,
                        containLabel : true
                    },
                    //x轴
                    xAxis : [ {
                        type : 'category',
                        //坐标轴两边留白策略，即x轴坐标点开始与结束点位置都不在最边缘
                        boundaryGap : true,
                        axisLine : {
                            show : true,
                            //x轴线样式
                            lineStyle : {
                                color : '#17273B',
                                width : 1,
                                type : 'solid'
                            }
                        },
                        //x轴字体设置
                        axisLabel : {
                            show : true,
                            fontSize : 12,
                            color : 'white'
                        },
                        data : []
                    } ],
                    //y轴
                    yAxis : [ {
                        type : 'value',
                        //y轴字体设置
                        axisLabel : {
                            show : true,
                            color : 'white',
                            fontSize : 12,
                            formatter: function (value) {
                                return value / 10000 + '万'
                            }
                        },
                        //y轴线设置不显示
                        axisLine : {
                            show : false
                        },
                        //与x轴平行的线样式
                        splitLine : {
                            show : true,
                            lineStyle : {
                                color : '#17273B',
                                width : 1,
                                type : 'solid',
                            }
                        }
                    } ],
                    series : [ {
                        name : '数据量',
                        type : 'line',
                        //折线平滑
                        smooth : true,
                        symbol : 'circle',
                        symbolSize : 6,
                        //线条样式
                        lineStyle : {
                            color : {
                                type : 'linear',
                                x : 0,
                                y : 0,
                                x2 : 0,
                                y2 : 1,
                                colorStops : [ {
                                    offset : 0,
                                    // 0% 处的颜色
                                    color : '#6ae6dd'
                                }, {
                                    offset : 1,
                                    // 100% 处的颜色
                                    color : 'red'
                                } ],
                                globalCoord : false
                            },
                            width : 2,
                            type : 'solid',
                        },
                        //折线连接点样式
                        itemStyle : {
                            color : '#00E5DE'
                        },
                        //折线堆积区域样式
                        areaStyle : {
                            color : '#004c5E'
                        },
                        data : []
                    } ]
                },
                lineDom: ''
            }
        },
        methods: {
            initChart() {
                this.lineDom = this.$echarts.init(this.$refs.item,'chalk')
                this.lineDom.setOption(this.lineData)
            },
            async getData() {
                await user.getDataSize(Cookies.get('userId')).then(res => {
                    if(res.code == 1) {
                        let data = res.data.item
                        let x_data = []
                        let y_data = []
                        for(let i = 0; i < data.length; i++) {
                            x_data.push(this.formatTimegang(data[i].record_time))
                            y_data.push(data[i].amount)
                        }
                        this.$nextTick(() => {
                            this.lineData.series[0].data = y_data
                            this.lineData.xAxis[0].data = x_data
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        watch: {
            lineData: {
                handler(newVal,oldVal) {
                    if(this.lineDom) {
                        if(newVal) {
                            this.lineDom.setOption(newVal)
                        }else {
                            this.lineDom.setOption(oldVal)
                        }
                    }else {
                        this.initChart()
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        created() {
            this.getData()
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