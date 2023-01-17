<template>
    <div class="datav-wrapper" :style="getWidthAndHeightAndOpacity()">
        <div class="pieChart" ref="pieChart">

        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "ThePieChart",
        props: ['data'],
        data() {
            return {
                pieChartDom: '',
                pieChartData: {
                    backgroundColor: '#010a37',
                    color: [
                        "#065aab",
                        "#066eab",
                    ],
                    title: {
                        text: '平图',
                        left: 'center',
                        top: '10px',
                        textStyle: {
                            color: 'white',
                            fontSize: '30px'
                        },
                        subtextStyle: {
                            color: 'white',
                            fontSize: '20px'
                        },
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        itemWidth: 20,
                        itemHeight: 20,
                        bottom: "8%",
                        data: ['grp_pax_qty', 'pax_qty'],
                        textStyle: {
                            color: "rgba(255,255,255,.5)",
                            fontSize: "12"
                        }
                    },
                    series: [{
                        name: '旅客量对比',
                        type: 'pie',
                        center: ["50%", "50%"],
                        radius: ["40%", "60%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 2423802.0, name: 'grp_pax_qty' },
                            { value: 19634216.0, name: 'pax_qty' },
                        ]
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
                this.pieChartDom = this.$echarts.init(this.$refs.pieChart,'chalk')
                if(type == 0) {
                    this.pieChartDom.setOption(this.pieChartData,true)
                    this.$set(this.data,'options',this.pieChartData)
                    this.$set(this.data,'echartInstance',this.pieChartDom)
                }else if (type == 1){
                    this.pieChartDom.setOption(this.data.options,true)
                    this.$set(this.data,'echartInstance',this.pieChartDom)
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
    .pieChart {
        width: 100%;
        height: 100%;
        display: block;
    }
</style>