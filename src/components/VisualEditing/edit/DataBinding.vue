<template>
    <div class="DataBinding" ref="DataBinding">
        <div role="document" class="mojito-modal" style="width: 520px;transform-origin: 754px 61px">
            <div tabindex="0" aria-hidden="true" style="width: 0;height: 0px;overflow: hidden;outline: none"></div>
            <div class="mojito-modal-content">
                <button type="button" aria-label="Close" class="mojito-modal-close" @click="cancle">
                    <span class="mojito-modal-close-x">
                        <span role="img" aria-label="close" class="anticon anticon-close mojito-modal-close-icon">
                            <i class="iconfont iconchahao"></i>
                        </span>
                    </span>
                </button>
                <div class="mojito-modal-header">
                    <div class="mojito-modal-title" id="rcDialogTitle2">数据源设置</div>
                </div>
                <div class="mojito-modal-body">
                    <div id="addDataSourceForm" class="mojito-form mojito-form-horizontal">
                        <div class="mojito-row mojito-form-item" style="row-gap: 0px">
                            <div class="mojito-col mojito-col-4 mojito-form-item-label">
                                <label class="mojito-form-item-required" title="维度">
                                    维度
                                </label>
                            </div>
                            <div class="mojito-col mojito-col-20 mojito-form-item-control">
                                <div class="mojito-form-item-control-input">
                                    <div class="mojito-form-item-control-input-content">
                                        <div class="mojito-select mojito-select-single mojito-select-show-arrow" style="display: flex; justify-content: space-between">
                                            <el-select v-model="dimensionValues" placeholder="请选择" multiple>
                                                <el-option
                                                        v-for="item in dimension"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="mojito-row mojito-form-item" style="row-gap: 0px">
                            <div class="mojito-col mojito-col-4 mojito-form-item-label">
                                <label class="mojito-form-item-required" title="度量">
                                    度量
                                </label>
                            </div>
                            <div class="mojito-col mojito-col-20 mojito-form-item-control">
                                <div class="mojito-form-item-control-input">
                                    <div class="mojito-form-item-control-input-content">
                                        <el-select v-model="measureValues" placeholder="请选择" multiple>
                                            <el-option
                                                    v-for="item in measure"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mojito-row mojito-form-item mojito-form-item-has-success" style="row-gap: 0px">
                            <div class="mojito-col mojito-col-4 mojito-form-item-label">
                                <label class title="每次显示数量">
                                    条数
                                </label>
                            </div>
                            <div class="mojito-col mojito-col-20 mojito-form-item-control">
                                <div class="mojito-form-item-control-input">
                                    <div class="mojito-form-item-control-input-content">
                                        <div class="mojito-input-number" style="width: 150px">
                                            <div class="mojito-input-number-input-wrap">
                                                <input aria-autocomplete="off" role="spinbutton" aria-valuemin="0" step="1" id="interval" class="mojito-input-number-input" v-model="count"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mojito-row mojito-form-item" style="row-gap: 0px">
                            <div class="mojito-col mojito-col-4 mojito-form-item-label">
                                <label class="mojito-form-item-required" title="计算">
                                    计算
                                </label>
                            </div>
                            <div class="mojito-col mojito-col-20 mojito-form-item-control">
                                <div class="mojito-form-item-control-input">
                                    <div class="mojito-form-item-control-input-content">
                                        <el-select v-model="operation" placeholder="请选择" @change="changeCompute">
                                            <el-option
                                                    v-for="item in operations"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mojito-row mojito-form-item" style="row-gap: 0px" v-if="isClustering">
                            <div class="mojito-col mojito-col-4 mojito-form-item-label">
                                <label class="mojito-form-item-required" title="聚类数量">
                                    聚类数量
                                </label>
                            </div>
                            <div class="mojito-col mojito-col-20 mojito-form-item-control" style="border: 1px solid #434343;">
                                <div class="mojito-form-item-control-input">
                                    <div class="mojito-form-item-control-input-content">
                                        <input aria-autocomplete="off" role="spinbutton" aria-valuemin="0" step="1" class="mojito-input-number-input" v-model="ClusteringNumber"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mojito-modal-footer">
                    <div class="mojito-space mojito-space-horizontal mojito-space-align-center">
                        <div class="mojito-space-item" style="margin-right: 8px">
                            <button type="button" class="mojito-btn" @click="cancle">
                                <span>取 消</span>
                            </button>
                        </div>
                        <div class="mojito-space-item" style="margin-right: 8px">
                            <button type="button" class="mojito-btn">
                                <span>测 试</span>
                            </button>
                        </div>
                        <div class="mojito-space-item">
                            <button type="button" class="mojito-btn mojito-btn-primary" @click="getData">
                                <span>确 定</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import datapre from "../../../api/datapre";
    import database from "../../../api/database";
    import axios from "axios";
    import {getToken} from "../../../api/auth";
    import user from "../../../api/user";
    import Cookies from 'js-cookie'
    export default {
        name: "DataBinding",
        props: [
            '',
        ],
        data() {
            return {
                dimension: [],
                dimensionValues:[],

                measure: [],
                measureValues: [],
                count: 10,
                dataSetId: '',
                dataSetStructure: {},

                operations: [{
                    label: '求和',
                    value: 'sum'
                },{
                    label: '平均值',
                    value: 'mean'
                },{
                    label: '最大',
                    value: 'max'
                },{
                    label: '最小',
                    value: 'min'
                },{
                    label: '计数',
                    value: 'count'
                },{
                    label: '唯一计数',
                    value: 'distinct_count'
                },{
                    label: '标准差',
                    value: 'stddev_pop'
                },{
                    label: '方差',
                    value: 'variance'
                },{
                    label: '样本标准偏差',
                    value: 'stddev'
                },{
                    label: '拟合',
                    value: '拟合'
                },{
                    label: '预测',
                    value: '预测'
                },{
                    label: '聚类',
                    value: '聚类'
                }],
                operation: '',

                dimensionArr: [],
                measureArr: [],

                isClustering: false,
                ClusteringNumber: 0   // 聚类数量
            }
        },
        computed: {
            ...mapGetters([
                'DataBindingComponent',
                'currentEchartInstance',
                'currentView'
            ])
        },
        methods: {
            cancle() {
                this.DataBindingComponent.style.display = 'none'
                this.DataBindingComponent.style.zIndex = '1'
                document.getElementById("root").classList.remove('before')
            },
            getData() {
                user.postCompute({
                    userId: Cookies.get('userId'),
                    type: this.operation
                }).then(res => {
                }).catch(err => {
                    console.log(err)
                })

                let obj = {}
                obj.datasetId = this.dataSetId
                obj.limit = this.count
                obj.row = []
                if(this.dimensionValues.length == 1) {
                    let dimensionValue = {}
                    dimensionValue.name = this.dimensionValues[0]
                    obj.row.push(dimensionValue)
                }else {
                    for(let i = 0; i < this.dimensionValues.length; i++) {
                        let dimensionValue = {}
                        dimensionValue.name = this.dimensionValues[i]
                        obj.row.push(dimensionValue)
                    }
                }

                obj.column = []
                if(this.measureValues.length == 1) {
                    let measureValue = {}
                    measureValue.name = this.measureValues[0]
                    measureValue.aggregator = this.operation
                    obj.column.push(measureValue)
                }else {
                    for(let i = 0; i < this.measureValues.length; i++) {
                        let measureValue = {}
                        measureValue.name = this.measureValues[i]
                        measureValue.aggregator = this.operation
                        obj.column.push(measureValue)
                    }
                }
                axios.post(`http://47.100.107.173:8000/data/generateData`,JSON.stringify(obj),{headers: {'token': getToken()}}).then(res => {
                    let result = res.data
                    console.log(result)
                    if(result.code == 1) {
                        let data = result.data.item
                        let measureArr = []
                        let dimensionArr = []
                        for(let item in data) {
                            if(item === this.dimensionValues[0]) {
                                dimensionArr = data[item]
                            }else if(item === this.measureValues[0]){
                                measureArr = data[item]
                            }
                        }
                        this.setData(measureArr,dimensionArr)
                        this.deleteData()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 清空数据
            deleteData() {
                this.measureArr.splice(0,this.measureArr.length)
                this.dimensionArr.splice(0,this.dimensionArr.length)
                this.operation = ""
                this.count = 10
            },
            setData(measureArr,dimensionArr) {
                // let options = {
                //     backgroundColor: '#030724',
                //     tooltip: {
                //         trigger: 'axis'
                //     },
                //     legend: {
                //         data: ['AC','AD','AE','AF','BA','BB','BC','BE','CA','CD','CE','CF','CG','DD','DF','EA','EB','ED','EF','EG','FB','FE','FG','GE','GG'],
                //         textStyle: {
                //             color: '#4c9bfd',
                //             fontSize: 20
                //         },
                //         right: '0%',
                //         top: '10px'
                //     },
                //     grid: {
                //         top: '20%',
                //         left: '3%',
                //         right: '4%',
                //         bottom: '3%',
                //         show: true,
                //         borderColor: '#012f4a',
                //         containLabel: true
                //     },
                //
                //     xAxis: {
                //         type: 'category',
                //         boundaryGap: false,
                //         data: ["05","06","07","08","09","10"],
                //         axisTick: {
                //             show: false
                //         },
                //         axisLabel: {
                //             color: '#4c9bfd'
                //         },
                //         axisLine: {
                //             show: false,
                //         }
                //     },
                //     yAxis: {
                //         type: 'value',
                //         axisTick: {
                //             show: false
                //         },
                //         axisLabel: {
                //             color: '#4c9bfd'
                //         },
                //         axisLine: {
                //             show: false,
                //         },
                //         splitLine: {
                //             lineStyle: {
                //                 color: '#012f4a'
                //             }
                //         }
                //     },
                //     series: [
                //         {
                //             name: 'AC',
                //             type: 'line',
                //             smooth: true,
                //             data: [54826.0, 40223.0, 58367.0, 64565.0, 43499.0, 55085.0]
                //         },
                //         {
                //             name: 'AD',
                //             type: 'line',
                //             smooth: true,
                //             data: [31440.0, 29067.0, 31977.0, 35958.0, 25773.0, 31032.0]
                //         },
                //         {
                //             name: 'AE',
                //             type: 'line',
                //             smooth: true,
                //             data: [0.0, 342.0, 845.0, 432.0, 794.0, 1404.0]
                //         },
                //         {
                //             name: 'AF',
                //             type: 'line',
                //             smooth: true,
                //             data: [12858.0, 9758.0, 13689.0, 17270.0, 11582.0, 14460.0]
                //         },
                //         {
                //             name: 'BA',
                //             type: 'line',
                //             smooth: true,
                //             data: [8858.0, 7466.0, 10360.0, 11718.0, 7407.0, 9796.0]
                //         },
                //         {
                //             name: 'BB',
                //             type: 'line',
                //             smooth: true,
                //             data: [13430.0, 10901.0, 10668.0, 13274.0, 7019.0, 7578.0]
                //         },
                //         {
                //             name: 'BC',
                //             type: 'line',
                //             smooth: true,
                //             data: [286.0, 237.0,  809.0,  817.0, 954.0, 835.0]
                //         },
                //         {
                //             name: 'BE',
                //             type: 'line',
                //             smooth: true,
                //             data: [8481.0, 6987.0,  11770.0,  13572.0, 9428.0, 11895.0]
                //         },
                //         {
                //             name: 'CA',
                //             type: 'line',
                //             smooth: true,
                //             data: [17719.0, 13040.0,  15415.0,  18490.0, 15825.0, 14307.0]
                //         },
                //         {
                //             name: 'CD',
                //             type: 'line',
                //             smooth: true,
                //             data: [1366.0, 1880.0,  1333.0,  1231.0, 1625.0, 580.0]
                //         },
                //         {
                //             name: 'CE',
                //             type: 'line',
                //             smooth: true,
                //             data: [0.0, 0.0,  137.0,  902.0, 0.0, 137.0]
                //         },
                //         {
                //             name: 'CF',
                //             type: 'line',
                //             smooth: true,
                //             data: [37454.0, 34886.0,  41897.0,  46552.0, 33146.0, 37556.0]
                //         },
                //         {
                //             name: 'CG',
                //             type: 'line',
                //             smooth: true,
                //             data: [129348.0, 108028.0,  132611.0,  145463.0, 110898.0, 129386.0]
                //         },
                //         {
                //             name: 'DD',
                //             type: 'line',
                //             smooth: true,
                //             data: [1761.0, 1921.0,  1666.0,  2475.0, 1873.0, 2798.0]
                //         },
                //         {
                //             name: 'DF',
                //             type: 'line',
                //             smooth: true,
                //             data: [46430.0, 41916.0,  47104.0,  58823.0, 42740.0,  54717.0]
                //         },
                //         {
                //             name: 'EA',
                //             type: 'line',
                //             smooth: true,
                //             data: [8144.0, 6004.0,  4292.0,  7187.0,  4928.0,  6415.0]
                //         },
                //         {
                //             name: 'EB',
                //             type: 'line',
                //             smooth: true,
                //             data: [2460.0, 1805.0,  3045.0,  4894.0,  2668.0,  4337.0]
                //         },
                //         {
                //             name: 'ED',
                //             type: 'line',
                //             smooth: true,
                //             data: [162833.0, 134856.0,  157303.0,  189722.0,  130833.0,  163799.0]
                //         },
                //         {
                //             name: 'EF',
                //             type: 'line',
                //             smooth: true,
                //             data: [4.0, 0.0,  0.0,  1.0,  0.0,  1.0]
                //         },
                //         {
                //             name: 'EG',
                //             type: 'line',
                //             smooth: true,
                //             data: [107858.0, 95827.0,  116590.0,  128760.0,  100024.0,  109874.0]
                //         },
                //         {
                //             name: 'FB',
                //             type: 'line',
                //             smooth: true,
                //             data: [31944.0, 29446.0,  34069.0,  40562.0,  32921.0,  35016.0]
                //         },
                //         {
                //             name: 'FE',
                //             type: 'line',
                //             smooth: true,
                //             data: [4248.0, 3518.0,  4691.0,  5215.0,  3820.0,   5503.0]
                //         },
                //         {
                //             name: 'FG',
                //             type: 'line',
                //             smooth: true,
                //             data: [19144.0, 14057.0,  18073.0,  22427.0,  15885.0,   19487.0]
                //         },
                //         {
                //             name: 'GE',
                //             type: 'line',
                //             smooth: true,
                //             data: [471.0, 1230.0,  1473.0,  1792.0,  1694.0,   2440.0]
                //         },
                //         {
                //             name: 'GG',
                //             type: 'line',
                //             smooth: true,
                //             data: [19756.0, 20343.0,  22275.0,  21445.0,  15365.0,  21459.0]
                //         }
                //     ]
                // };
                // this.currentEchartInstance.setOption(options)
                switch (this.currentView.type) {
                    case 'line':
                        this.$set(this.currentView.options.xAxis,'data',[])
                        this.$set(this.currentView.options.series[0],'data',[])
                        this.$set(this.currentView.options.xAxis,'data',dimensionArr)
                        this.$set(this.currentView.options.series[0],'data',measureArr)
                        this.currentEchartInstance.setOption(this.currentView.options)
                        break
                    case 'histogram':
                        this.$set(this.currentView.options.xAxis[0],'data',[])
                        this.$set(this.currentView.options.series[0],'data',[])
                        this.$set(this.currentView.options.xAxis[0],'data',dimensionArr)
                        this.$set(this.currentView.options.series[0],'data',measureArr)
                        this.currentEchartInstance.setOption(this.currentView.options)
                        break
                    case 'pie':
                        this.$set(this.currentView.options.series[0],'data',[])
                        let arr = []
                        for(let i = 0; i < measureArr.length; i++) {
                            let obj = {
                                value: measureArr[i],
                                name: dimensionArr[i]
                            }
                            arr.push(obj)
                        }
                        this.$set(this.currentView.options.series[0],'data',arr)
                        this.currentEchartInstance.setOption(this.currentView.options)
                        break
                    case 'area':
                        this.$set(this.currentView.options.xAxis,'data',[])
                        this.$set(this.currentView.options.series[0],'data',[])
                        this.$set(this.currentView.options.xAxis,'data',dimensionArr)
                        this.$set(this.currentView.options.series[0],'data',measureArr)
                        this.currentEchartInstance.setOption(this.currentView.options)
                        break
                    case 'scatter':
                        if(typeof measureArr[0] != "number" || typeof dimensionArr[i] != "number") {
                            alert("数据不全为数值")
                            return
                        }else {
                            this.$set(this.currentView.options.series[0],'data',[])
                            let arr = []
                            for(let i = 0; i < measureArr.length; i++) {
                                let obj = {
                                    value: measureArr[i],
                                    name: dimensionArr[i]
                                }
                                arr.push(obj)
                            }
                            this.$set(this.currentView.options.series[0],'data',arr)
                        }
                        break
                    case 'bar':
                        this.$set(this.currentView.options.yAxis[0],'data',[])
                        this.$set(this.currentView.options.series[0],'data',[])
                        this.$set(this.currentView.options.series[1],'data',[])
                        this.$set(this.currentView.options.yAxis[0],'data',dimensionArr)
                        this.$set(this.currentView.options.series[0],'data',measureArr)
                        this.currentEchartInstance.setOption(this.currentView.options)
                        break
                }
                this.$set(this.currentView.data,'dimension',dimensionArr)
                this.$set(this.currentView.data,'measure',measureArr)
                this.DataBindingComponent.style.display = 'none'
                document.getElementById("root").classList.remove('before')
            },
            changeCompute() {
                if(this.operation === '聚类') {
                    this.isClustering = true
                }else {
                    this.isClustering = false
                }
            }
        },
        mounted() {
            this.$store.commit("setDataBindingComponent",this.$refs.DataBinding)
            this.dataSetId = this.$route.query.dataSetId;
            datapre.PreviewStructure(this.dataSetId).then(res => {
                if(res.code == 1) {
                    this.dataSetStructure = res.data.item
                    for(let i = 0; i < this.dataSetStructure.dimension.length; i++) {
                        if(this.dataSetStructure.dimension[i].isNew === 1 && this.dataSetStructure.dimension[i].level.length != 0) {
                            if(this.dataSetStructure.dimension[i].label != '') {
                                this.dimension.push({value: this.dataSetStructure.dimension[i].caption,label: this.dataSetStructure.dimension[i].label})
                            }else {
                                this.dimension.push({value: this.dataSetStructure.dimension[i].caption,label: this.dataSetStructure.dimension[i].caption})
                            }
                        }else if(this.dataSetStructure.dimension[i].isNew === 0 && this.dataSetStructure.dimension[i].level.length != 0) {
                            for(let j = 0; j < this.dataSetStructure.dimension[i].level.length; j++) {
                                if(this.dataSetStructure.dimension[i].level[j].label != '') {
                                    this.dimension.push({value: this.dataSetStructure.dimension[i].level[j].caption,label: this.dataSetStructure.dimension[i].level[j].label})
                                }else {
                                    this.dimension.push({value: this.dataSetStructure.dimension[i].level[j].caption,label: this.dataSetStructure.dimension[i].level[j].caption})
                                }
                            }
                        }else {
                            if(this.dataSetStructure.dimension[i].label != '') {
                                this.dimension.push({value: this.dataSetStructure.dimension[i].caption,label: this.dataSetStructure.dimension[i].label})
                            }else {
                                this.dimension.push({value: this.dataSetStructure.dimension[i].caption,label: this.dataSetStructure.dimension[i].caption})
                            }
                        }
                    }
                    for(let i = 0; i < this.dataSetStructure.measure.length; i++) {
                        if(this.dataSetStructure.measure[i].isNew === 1 && this.dataSetStructure.measure[i].level.length != 0) {
                            if(this.dataSetStructure.measure[i].label != '') {
                                this.measure.push({value: this.dataSetStructure.measure[i].caption,label: this.dataSetStructure.measure[i].label})
                            }else {
                                this.measure.push({value: this.dataSetStructure.measure[i].caption,label: this.dataSetStructure.measure[i].caption})
                            }
                        }else if(this.dataSetStructure.measure[i].isNew === 0 && this.dataSetStructure.measure[i].level.length != 0) {
                            for(let j = 0; j < this.dataSetStructure.measure[i].level.length; j++) {
                                if(this.dataSetStructure.measure[i].level[j].label != '') {
                                    this.measure.push({value: this.dataSetStructure.measure[i].level[j].caption,label: this.dataSetStructure.measure[i].level[j].label})
                                }else {
                                    this.measure.push({value: this.dataSetStructure.measure[i].level[j].caption,label: this.dataSetStructure.measure[i].level[j].caption})
                                }
                            }
                        }else {
                            if(this.dataSetStructure.measure[i].label != '') {
                                this.measure.push({value: this.dataSetStructure.measure[i].caption,label: this.dataSetStructure.measure[i].label})
                            }else {
                                this.measure.push({value: this.dataSetStructure.measure[i].caption,label: this.dataSetStructure.measure[i].caption})
                            }
                        }

                    }
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    .DataBinding {
        box-sizing: border-box;
        display: none;
    }
    .mojito-modal-content {
        position: relative;
        background-color: #1f1f1f;
        background-clip: padding-box;
        border: 0;
        border-radius: 2px;
        box-shadow: 0 3px 6px -4px rgb(0 0 0 / 48%), 0 6px 16px 0 rgb(0 0 0 / 32%), 0 9px 28px 8px rgb(0 0 0 / 20%);
        pointer-events: auto;
    }
    .mojito-modal-close {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
        padding: 0;
        color: hsla(0,0%,100%,.45);
        font-weight: 700;
        line-height: 1;
        text-decoration: none;
        background: transparent;
        border: 0;
        outline: 0;
        cursor: pointer;
        transition: color .3s;
    }
    .mojito-modal-close-x {
        display: block;
        width: 56px;
        height: 56px;
        font-size: 16px;
        font-style: normal;
        line-height: 56px;
        text-align: center;
        text-transform: none;
        text-rendering: auto;
    }
    .anticon {
        display: inline-block;
        color: inherit;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;
        vertical-align: -.125em;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .mojito-modal-header {
        padding: 16px 24px;
        color: hsla(0,0%,100%,.85);
        background: #1f1f1f;
        border-bottom: 1px solid #303030;
        border-radius: 2px 2px 0 0;
    }
    .mojito-modal-title {
        margin: 0;
        color: hsla(0,0%,100%,.85);
        font-weight: 500;
        font-size: 16px;
        line-height: 22px;
        word-wrap: break-word;
    }
    .mojito-modal-body {
        padding: 24px;
        font-size: 14px;
        line-height: 1.5715;
        word-wrap: break-word;
    }
    .mojito-form {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: hsla(0,0%,100%,.85);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        font-feature-settings: "tnum","tnum";
    }
    .mojito-row, .mojito-row:after, .mojito-row:before {
        display: flex;
    }
    .mojito-row {
        flex-flow: row wrap;
    }
    .mojito-form-item {
        box-sizing: border-box;
        padding: 0;
        color: hsla(0,0%,100%,.85);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        font-feature-settings: "tnum","tnum";
        margin: 0 0 24px;
        vertical-align: top;
    }
    .mojito-form-horizontal .mojito-form-item-label {
        flex-grow: 0;
    }
    .mojito-col-4 {
        display: block;
        flex: 0 0 16.66666667%;
        max-width: 16.66666667%;
    }
    .mojito-col {
        position: relative;
        min-height: 1px;
    }
    .mojito-form-item-label {
        overflow: hidden;
        white-space: nowrap;
        text-align: right;
        vertical-align: middle;
    }
    .mojito-form-item-label>label {
        position: relative;
        display: -webkit-inline-flex;
        display: inline-flex;
        -webkit-align-items: center;
        align-items: center;
        height: 32px;
        color: hsla(0,0%,100%,.85);
        font-size: 14px;
    }
    .mojito-form-horizontal .mojito-form-item-control {
        flex: 1 1;
    }
    .mojito-col-20 {
        display: block;
        -webkit-flex: 0 0 83.33333333%;
        flex: 0 0 83.33333333%;
        max-width: 83.33333333%;
    }
    .mojito-form-item-control {
        display: -webkit-flex;
        display: flex;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-flex-grow: 1;
        flex-grow: 1;
    }
    .mojito-form-item-control-input {
        position: relative;
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        min-height: 32px;
    }
    .mojito-form-item-control-input-content {
        -webkit-flex: auto;
        flex: auto;
        max-width: 100%;
    }
    .mojito-form-item .mojito-cascader-picker, .mojito-form-item .mojito-select {
        width: 100%;
    }
    .mojito-select {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: hsla(0,0%,100%,.85);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        font-feature-settings: "tnum","tnum";
        position: relative;
        display: inline-block;
        cursor: pointer;
    }
    /deep/ .el-input__inner {
        height: 32px;
        min-height: 32px;
        line-height: 32px;
        background: transparent;
        border-radius: 2px;
        border: 1px solid #434343;
    }
    /deep/ .el-input__icon {
        line-height: 32px;
    }
    /deep/ .el-select {
        width: 100%;
    }
    /deep/ .el-select.index {
        width: 30%;
    }
    /deep/ .el-scrollbar  {
        background-color: #1f1f1f;
        border-radius: 2px;
    }
    /deep/ .el-scrollbar {
        background-color: #1f1f1f;
    }
    /deep/ .el-select-dropdown__item {
        color: white;
    }

    .mojito-input-number {
        box-sizing: border-box;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: "tnum","tnum";
        position: relative;
        width: 100%;
        min-width: 0;
        color: hsla(0,0%,100%,.85);
        font-size: 14px;
        line-height: 1.5715;
        background-color: transparent;
        background-image: none;
        transition: all .3s;
        display: inline-block;
        width: 90px;
        margin: 0;
        padding: 0;
        border: 1px solid #434343;
        border-radius: 2px;
    }

    .mojito-input-number-input {
        width: 100%;
        height: 30px;
        padding: 0 11px;
        text-align: left;
        background-color: transparent;
        border: 0;
        border-radius: 2px;
        outline: 0;
        transition: all .3s linear;
    }

    button, input, optgroup, select, textarea {
        margin: 0;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
    }


    .mojito-modal-footer {
        padding: 10px 16px;
        text-align: right;
        background: transparent;
        border-top: 1px solid #303030;
        border-radius: 0 0 2px 2px;
    }
    .mojito-space-align-center {
        -webkit-align-items: center;
        align-items: center;
    }
    .mojito-space {
        display: -webkit-inline-flex;
        display: inline-flex;
    }
    .mojito-btn, .mojito-btn:active, .mojito-btn:focus {
        outline: 0;
    }
    .mojito-btn {
        line-height: 1.5715;
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        background-image: none;
        box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
        cursor: pointer;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        touch-action: manipulation;
        height: 32px;
        padding: 4px 15px;
        font-size: 14px;
        border-radius: 2px;
        color: hsla(0,0%,100%,.85);
        background: transparent;
        border: 1px solid #434343;
    }
    .mojito-btn>span {
        display: inline-block;
    }
    .mojito-btn-primary {
        color: #fff;
        background: #177ddc;
        border-color: #177ddc;
        text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
        box-shadow: 0 2px 0 rgb(0 0 0 / 5%)
    }
    button,select {
        text-transform: none;
    }
    button,input {
        overflow: visible;
    }


    .mojito-form-item-label>label.mojito-form-item-required:not(.mojito-form-item-required-mark-optional):before {
        display: inline-block;
        margin-right: 4px;
        color: #a61d24;
        font-size: 14px;
        font-family: SimSun,sans-serif;
        line-height: 1;
        content: "*";
    }
    .mojito-form-item-label>label:after {
        content: ":";
        position: relative;
        top: -.5px;
        margin: 0 8px 0 2px;
    }
</style>