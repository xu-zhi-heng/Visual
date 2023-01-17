<template>
    <div id="pie" class="item-box">
        <div class="item-title">使用图表占比</div>
        <div class="item-con" ref="item">

        </div>
    </div>
</template>

<script>
    import user from "../../../api/user";
    import Cookies from 'js-cookie'
    export default {
        name: "Pie",
        data() {
            return {
                pieData: {
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            selectedMode: 'single',
                            radius: ['45%', '80%'],
                            color: ['#22ac38', '#ed7d31', '#d1c0a5', '#5b9bd5', '#f8b551'],
                            label: {
                                normal: {
                                    position: 'inner',
                                    formatter: '{d}%',
                                    textStyle: {
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: 10
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: []
                        },
                        {
                            type: 'pie',
                            radius: ['45%', '80%'],
                            label: {
                                normal: {
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    borderColor: '#d2d2d2',
                                    fontSize: 12,
                                    padding: 5,
                                    color:'white'
                                }
                            },
                            data: []
                        }
                    ]
                },
                pieDom: ''
            }
        },
        methods: {
            initChart() {
                this.pieDom = this.$echarts.init(this.$refs.item,'chalk')
                this.pieDom.setOption(this.pieData,true)
            },
            async getData() {
                await user.getEchart(Cookies.get('userId')).then(res => {
                    if(res.code == 1) {
                        let data = res.data.item
                        let pieData = []
                        for(let i = 0; i < data.length - 1; i++) {
                            let obj = {}
                            switch (data[i].type) {
                                case 'line': obj.name = '折线图';break
                                case 'histogram': obj.name = '柱状图';break
                                case 'pie': obj.name = '饼图';break
                                case 'area': obj.name = '面积图';break
                                case 'scatter': obj.name = '散点图';break
                            }
                            obj.value = data[i].times
                            pieData.push(obj)
                        }
                        this.$nextTick(() => {
                            this.pieData.series[0].data = pieData
                            this.pieData.series[1].data = pieData
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
            pieData: {
                handler(newVal,oldVal) {
                    if(this.pieDom) {
                        if(newVal) {
                            this.pieDom.setOption(newVal)
                        }else {
                            this.pieDom.setOption(oldVal)
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