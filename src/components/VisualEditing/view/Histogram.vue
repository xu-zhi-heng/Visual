<template>
    <div class="histogram" ref="histogram">

    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Histogram",
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
                let histogramDom = this.$refs.histogram
                let histogram = this.$echarts.init(histogramDom,this.theme)
                let options;
                if(type == 0) {
                    options = {
                        backgroundColor: '#010a37',
                        title: {
                            text: '柱状图',
                            textStyle: {
                                fontSize: 30,
                                color: 'white'
                            },
                            top: '5px'
                        },
                        color: ["#2f89cf"],
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                // 坐标轴指示器，坐标轴触发有效
                                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        // 修改图表的大小
                        grid: {
                            left: "10px",
                            top: "10%",
                            right: "0%",
                            bottom: "2%",
                            containLabel: true
                        },
                        xAxis: [{
                            type: "category",
                            data: [
                                "FCD",
                                "GEG",
                                "GGD",
                                "ABA",
                                "FGE",
                                "BEC",
                                "ACD",
                                "CAA",
                                "FDD",
                                "DDF",
                                "FGD",
                                "CGA",
                                "CCC",
                                "GBE",
                                "BEE",
                                "AEF",
                                "FCE",
                                "DDC",
                                "FAE",
                                "CCA",
                                "GDB",
                                "ABD",
                                "DDA",
                                "EGD",
                                "CED",
                                "GEA",
                                "BBB",
                                "DCG",
                                "CGC",
                                "EBE",
                                "FCG",
                                "DFC",
                                "CDG",
                                "DEA",
                                "CDB",
                                "ACC",
                                "AGD",
                                "FEB",
                                "EFG",
                                "CEC",
                                "EAC",
                                "AEC",
                                "EDC",
                                "GCB",
                                "EAB",
                                "EFC",
                                "ECE",
                                "BBG",
                                "GBG",
                                "ABF",
                                "CDC",
                                "BDA",
                                "CFA",
                                "GCC",
                                "BGF",
                                "CAD",
                                "GAD",
                                "DCD",
                                "FAD",
                                "BGD",
                                "GCA",
                                "EED",
                                "DBB",
                                "BGC",
                                "FBB",
                                "DGD",
                                "DAD",
                                "DDG",
                                "GGE",
                                "BDG",
                                "BFC",
                                "GFG",
                                "DDB",
                                "CGG",
                                "FBE",
                                "EGB",
                                "GBC",
                                "ABG",
                                "BFA",
                                "DED",
                                "CAG",
                                "DBF",
                                "BBE",
                                "BFE",
                                "GAG",
                                "BCD",
                                "DGB",
                                "FBD",
                                "DCE",
                                "FCB",
                                "FEC",
                                "ADG",
                                "CEF",
                                "DEB",
                                "GFE",
                                "GGA",
                                "AGG",
                                "ADB",
                                "GFC",
                                "DAE",
                                "BFD",
                                "BBD",
                                "DGA",
                                "CBA",
                                "FGC",
                                "GEE",
                                "BFF",
                                "EDB",
                                "EEA",
                                "CCD",
                                "ABE",
                                "FEF",
                                "AEA",
                                "DAG",
                                "CCE",
                                "GAC",
                                "BDD",
                                "AAE",
                                "ECD",
                                "CCG",
                                "DBD",
                                "GDF",
                                "ECF",
                                "GGF",
                                "BCA",
                                "CAC",
                                "AFF",
                                "EGG",
                                "FFB",
                                "ABB",
                                "GCD",
                                "ECC",
                                "DEE",
                                "BEF",
                                "DCF",
                                "FFE",
                                "EAD",
                                "FDA",
                                "CBD",
                                "DFB",
                                "FFF",
                                "FAC",
                                "FGG",
                                "FBF",
                                "CFF",
                                "AAG",
                                "EEC",
                                "FFD",
                                "ADD",
                                "ADE",
                                "AEG",
                                "ACB",
                                "DCC",
                                "CEA",
                                "GGG",
                                "BBC",
                                "BEB",
                                "CFB",
                                "CBG",
                                "AAC",
                                "DFF"
                            ],
                            axisTick: {
                                alignWithLabel: true
                            },
                            // 修改刻度标签 相关样式
                            axisLabel: {
                                color: "white",
                                fontSize: 12
                            },
                            // 不显示x坐标轴的样式
                            axisLine: {
                                show: false
                            }
                        }],
                        yAxis: [{
                            type: "value",
                            // 修改刻度标签 相关样式
                            axisLabel: {
                                color: "white",
                                fontSize: 14
                            },
                            // y轴的线条改为了 2像素
                            axisLine: {
                                lineStyle: {
                                    color: "rgba(255,255,255,.1)",
                                    width: 2
                                }
                            },
                            // y轴分割线的颜色
                            splitLine: {
                                lineStyle: {
                                    color: "rgba(255,255,255,.1)"
                                }
                            },
                        }],
                        series: [{
                            name: "直接访问",
                            type: "bar",
                            barWidth: "35%",
                            data: [1282.0,
                                1497.0,
                                0.0,
                                354.0,
                                298.0,
                                482.0,
                                6289.0,
                                267.0,
                                121.0,
                                32.0,
                                0.0,
                                35.0,
                                7338.0,
                                70.0,
                                2.0,
                                6053.0,
                                3158.0,
                                0.0,
                                218.0,
                                524.0,
                                158.0,
                                525.0,
                                148.0,
                                2.0,
                                2561.0,
                                796.0,
                                2.0,
                                335.0,
                                91.0,
                                1166.0,
                                54.0,
                                151.0,
                                1164.0,
                                3940.0,
                                113.0,
                                1581.0,
                                58.0,
                                126.0,
                                22.0,
                                138.0,
                                56.0,
                                3.0,
                                369.0,
                                1879.0,
                                103.0,
                                78.0,
                                3497.0,
                                7.0,
                                122.0,
                                8029.0,
                                104.0,
                                0.0,
                                665.0,
                                0.0,
                                162.0,
                                0.0,
                                4095.0,
                                165.0,
                                279.0,
                                91.0,
                                0.0,
                                240.0,
                                89.0,
                                321.0,
                                3364.0,
                                277.0,
                                89.0,
                                24.0,
                                0.0,
                                1500.0,
                                148.0,
                                0.0,
                                13.0,
                                157.0,
                                484.0,
                                0.0,
                                186.0,
                                79.0,
                                106.0,
                                76.0,
                                2579.0,
                                139.0,
                                0.0,
                                1626.0,
                                828.0,
                                2329.0,
                                112.0,
                                101.0,
                                141.0,
                                212.0,
                                11313.0,
                                46.0,
                                304.0,
                                43.0,
                                121.0,
                                17.0,
                                164.0,
                                91.0,
                                21.0,
                                142.0,
                                116.0,
                                553.0,
                                664.0,
                                573.0,
                                294.0,
                                48.0,
                                950.0,
                                622.0,
                                28.0,
                                383.0,
                                22.0,
                                1.0,
                                1250.0,
                                262.0,
                                1031.0,
                                50.0,
                                1812.0,
                                729.0,
                                3517.0,
                                4395.0,
                                257.0,
                                4368.0,
                                188.0,
                                9.0,
                                246.0,
                                81.0,
                                3836.0,
                                5382.0,
                                7.0,
                                3423.0,
                                83.0,
                                5.0,
                                86.0,
                                4775.0,
                                63.0,
                                15715.0,
                                7806.0,
                                69.0,
                                317.0,
                                2033.0,
                                65.0,
                                7430.0,
                                15.0,
                                3586.0,
                                57.0,
                                2.0,
                                1940.0,
                                11.0,
                                286.0,
                                0.0,
                                0.0,
                                3.0,
                                26.0,
                                0.0,
                                15.0,
                                183.0,
                                1128.0,
                                759.0,
                                2688.0,
                                695.0,
                                591.0],
                            itemStyle: {
                                // 修改柱子圆角
                                barBorderRadius: 5
                            }
                        }]
                    };
                    histogram.setOption(options)
                    this.$set(this.view[this.viewLength - 1],'options',options)
                    this.$set(this.view[this.viewLength - 1],'echartInstance',histogram)
                }else if(type == 1) {
                    options = this.data.options
                    histogram.setOption(options)
                    this.$set(this.view[this.setOptionsLength],'options',options)
                    this.$set(this.view[this.setOptionsLength],'echartInstance',histogram)
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
    .histogram {
        width: 800px;
        height: 600px;
    }
</style>