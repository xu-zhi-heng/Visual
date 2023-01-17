<template>
    <div class="pie" ref="pie">

    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Pie",
        props: ['data'],
        mounted() {
            if(JSON.stringify(this.data.options) != '{}') {
                this.init(1)
            }else {
                this.init(0)
            }
        },
        methods: {
            init(type) {
                let pieDom = this.$refs.pie
                let pie = this.$echarts.init(pieDom,this.theme)
                let options
                if(type == 0) {
                    options = {
                        backgroundColor: '#010a37',
                        color: [
                            "#065aab",
                            "#066eab",
                        ],
                        title: {
                            text: '旅客量和团队旅客量',
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
                            //   backgroundColor:'#333',
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
                    pie.setOption(options)
                    this.$set(this.view[this.viewLength - 1],'options',options)
                    this.$set(this.view[this.viewLength - 1],'echartInstance',pie)
                }else if(type == 1) {
                    options = this.data.options
                    pie.setOption(options)
                    this.$set(this.view[this.setOptionsLength],'options',options)
                    this.$set(this.view[this.setOptionsLength],'echartInstance',pie)
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
                handler(value) {
                    this.init()
                },
                deep: true
            }
        }
    }
</script>

<style scoped>
    .pie {
        width: 800px;
        height: 600px;
    }
</style>