<template>
    <div class="rosePie" ref="rosePie">

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "RosePie",
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let rosePieDom = this.$refs.rosePie
                let rosePie = this.$echarts.init(rosePieDom)
                let option =  {
                    backgroundColor: '#010a37',
                    color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
                    title: {
                        text: '就业行业',
                        textStyle: {
                            color: 'white',
                            fontSize: 30
                        },
                        left: 'center',
                        top: '10px'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        left: 'center',
                        top: 'bottom',
                        data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8'],
                        textStyle: {
                            color: '#4c9bfd',
                            fontSize: 20
                        },
                    },

                    series: [{
                        name: "地区分布",
                        type: 'pie',
                        radius: ['10%', '70%'],
                        center: ['50%', '50%'],
                        roseType: 'radius',
                        label: {
                            show: true
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 10
                            }
                        },
                        labelLine: {
                            length: 10,
                            length2: 12
                        },
                        data: [
                            { value: 20, name: '云南' },
                            { value: 26, name: '北京' },
                            { value: 24, name: '山东' },
                            { value: 25, name: '河北' },
                            { value: 20, name: '江苏' },
                            { value: 25, name: '浙江' },
                            { value: 30, name: '四川' },
                            { value: 42, name: '湖北' }
                        ]
                    }

                    ]
                };
                rosePie.setOption(option)
                this.$set(this.view[this.viewLength - 1],'options',option)
                this.$set(this.view[this.viewLength - 1],'echartInstance',rosePie)
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
    .rosePie {
        width: 800px;
        height: 600px;
    }
</style>