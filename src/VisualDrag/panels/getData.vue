<template>
    <div class="getData" id="getData">
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
                                            <el-select v-model="dimensionValues" placeholder="请选择" multiple @change="changeDimension">
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

                        <div class="mojito-row mojito-form-item" style="row-gap: 0px" v-if="isMoreDimension">
                            <div class="mojito-col mojito-col-4 mojito-form-item-label">
                                <label class="mojito-form-item-required" title="维度显示">
                                    维度显示
                                </label>
                            </div>
                            <div class="mojito-col mojito-col-20 mojito-form-item-control" style="border: 1px solid #434343;">
                                <div class="mojito-form-item-control-input" style="padding-left: 15px">
                                    <div class="mojito-form-item-control-input-content">
                                        <template v-for="(item,index) in dimensionValues">
                                            <el-radio v-model="showDimension" :label="item" @change="changShowDimension">{{item}}</el-radio>
                                        </template>
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
                                        <el-select v-model="measureValues" placeholder="请选择" multiple @change="changeMeasure">
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
                            <button type="button" class="mojito-btn mojito-btn-primary" @click="getData" id="determine" disabled="disabled" style="background-color:gray">
                                <span>确 定</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="error" style="text-align: center;color: red;padding-bottom: 10px" v-if="errorTitle != ''">{{errorTitle}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from "axios";
    import Cookies from 'js-cookie'
    import user from "../../api/user";
    import $ from "jquery";
    import datapre from "../../api/datapre";
    import {getToken} from "../../api/auth";
    export default {
        name: "getData",
        props: [''],
        data() {
            return {
                dimension: [],
                dimensionValues:[],     //选中的维度
                measure: [],            //度量列表
                measureValues: [],      //选中的度量
                count: 10,              //条数
                dataSetId: '',          //数据集id
                dataSetStructure: {},   //数据结构

                // 计算方式
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
                }],
                operation: '',          //选中的计算方式

                // 聚类
                isClustering: false,
                ClusteringNumber: 0,   // 聚类数量

                errorTitle: '',
                isMoreDimension: false,
                showDimension: '',
            }
        },
        computed: {
            ...mapGetters([
                'currentComponent',
            ])
        },
        methods: {
            // 关闭面板
            cancle() {
                $('#getData').css('display','none')
                $('#panels').css('zIndex','10')
                $('#root').removeClass('before')
                this.deleteData()
            },
            getData() {
                user.postCompute({
                    userId: Cookies.get('userId'),
                    computeType: this.operation
                }).then(res => {
                }).catch(err => {
                    console.log(err)
                })
                if(this.dimensionValues.length >= 2 && this.currentComponent.type != 'scatter') {
                    if(this.showDimension == '') {
                        this.$message({
                            showClose: true,
                            message: '请选择显示维度',
                            type: 'warning'
                        });
                        return
                    }
                }
                let obj = {}
                obj.datasetId = this.dataSetId
                obj.limit = this.count
                obj.type = this.currentComponent.type
                obj.row = []
                for(let i = 0; i < this.dimensionValues.length; i++) {
                    let item = {}
                    item.name = this.dimensionValues[i]
                    item.aggregator = ''
                    if(this.showDimension === this.dimensionValues[i]) {
                        item.is_show = 1
                    }else {
                        item.is_show = 0
                    }
                    obj.row.push(item)
                }
                if(this.dimensionValues.length == 1) {
                    obj.row[0].is_show = 1
                }
                if(this.measureValues.length == 0 && this.dimensionValues.length == 1) {
                    obj.row[0].aggregator = this.operation
                    obj.column = []
                }else {
                    obj.column = []
                    for(let i = 0; i < this.measureValues.length; i++) {
                        let item = {}
                        item.name = this.measureValues[i]
                        item.aggregator = this.operation
                        obj.column.push(item)
                    }
                }
                console.log(obj)
                axios.post(`http://47.100.107.173:8000/data/generateData`,JSON.stringify(obj),{headers: {'token': getToken()}}).then(res => {
                    let result = res.data
                    console.log(result)
                    this.setData(this.currentComponent.type,result.data)
                }).catch(err => {
                    console.log(err)
                })
            },
            // 设置数据
            setData(type,data) {
                if(type === 'line') {
                    let x = []
                    let y = []
                    if(this.dimensionValues.length == 1 && this.measureValues.length == 1) {
                        x = data.item[0].xAxis_data
                        let obj = {}
                        obj.type = 'line'
                        obj.data = []
                        for(let i = 0; i < data.item[1].series_data.length; i++) {
                            obj.data.push(data.item[1].series_data[i][1])
                        }
                        y.push(obj)
                    }else if(this.dimensionValues.length == 1 && this.measureValues.length == 0) {
                        x = data.item[0].xAxis_data
                        let obj = {}
                        obj.type = 'line'
                        obj.data = []
                        for(let i = 0; i < data.item[1].series_data.length; i++) {
                            obj.data.push(data.item[1].series_data[i][1])
                        }
                        y.push(obj)
                    }else if(this.dimensionValues.length == 2 && this.measureValues.length == 1){
                        x = data.item[0].xAxis_data
                        for(let i = 0; i < data.item[1].series.length; i++) {
                            let obj = {};
                            obj.name = data.item[1].series[i].name
                            obj.data = data.item[1].series[i].data
                            obj.type = 'line'
                            y.push(obj)
                        }
                     }
                    this.$set(this.currentComponent.options.xAxis,'data',x)
                    this.$set(this.currentComponent.options,'series',y)
                    this.currentComponent.echartInstance.setOption(this.currentComponent.options)
                    this.$set(this.currentComponent,'data',this.currentComponent.options.xAxis.data)
                    this.$set(this.currentComponent,'data',this.currentComponent.options.series)
                }else if(type === 'histogram') {
                    let x = []
                    let y = []
                    if(this.dimensionValues.length == 1 && this.measureValues.length == 1) {
                        x = data.item[0].xAxis_data
                        let obj = {}
                        obj.type = 'bar'
                        obj.data = []
                        for(let i = 0; i < data.item[1].series_data.length; i++) {
                            obj.data.push(data.item[1].series_data[i][1])
                        }
                        y.push(obj)
                    }else if(this.dimensionValues.length == 1 && this.measureValues.length == 0) {
                        x = data.item[0].xAxis_data
                        let obj = {}
                        obj.type = 'bar'
                        obj.data = []
                        for(let i = 0; i < data.item[1].series_data.length; i++) {
                            obj.data.push(data.item[1].series_data[i][1])
                        }
                        y.push(obj)
                    }else if(this.dimensionValues.length == 2 && this.measureValues.length == 1){
                        x = data.item[0].xAxis_data
                        for(let i = 0; i < data.item[1].series.length; i++) {
                            let obj = {};
                            obj.name = data.item[1].series[i].name
                            obj.data = data.item[1].series[i].data
                            obj.type = 'bar'
                            y.push(obj)
                        }
                    }
                    this.$set(this.currentComponent.options.xAxis[0],'data',x)
                    this.$set(this.currentComponent.options,'series',y)
                    this.currentComponent.echartInstance.setOption(this.currentComponent.options)
                    this.$set(this.currentComponent,'data',this.currentComponent.options.xAxis.data)
                    this.$set(this.currentComponent,'data',this.currentComponent.options.series)
                }else if(type === 'pie') {
                    if(this.dimensionValues.length == 1 && this.measureValues.length == 1) {
                        this.$set(this.currentComponent.options.series[0],'data',data.item)
                    }else if(this.dimensionValues.length == 1 && this.measureValues.length == 0) {
                        this.$set(this.currentComponent.options.series[0],'data',data.item)
                    }
                    this.currentComponent.echartInstance.setOption(this.currentComponent.options)
                    this.$set(this.currentComponent,'data',data.item)
                }else if(type === 'area') {
                    let x = []
                    let y = []
                    if(this.dimensionValues.length == 1 && this.measureValues.length == 1) {
                        x = data.item[0].xAxis_data
                        let obj = {}
                        obj.type = 'line'
                        obj.data = []
                        for(let i = 0; i < data.item[1].series_data.length; i++) {
                            obj.data.push(data.item[1].series_data[i][1])
                        }
                        y.push(obj)
                    }else if(this.dimensionValues.length == 1 && this.measureValues.length == 0) {
                        x = data.item[0].xAxis_data
                        let obj = {}
                        obj.type = 'line'
                        obj.data = []
                        for(let i = 0; i < data.item[1].series_data.length; i++) {
                            obj.data.push(data.item[1].series_data[i][1])
                        }
                        y.push(obj)
                    }else if(this.dimensionValues.length == 2 && this.measureValues.length == 1){
                        x = data.item[0].xAxis_data
                        for(let i = 0; i < data.item[1].series.length; i++) {
                            let obj = {};
                            obj.name = data.item[1].series[i].name
                            obj.data = data.item[1].series[i].data
                            obj.type = 'line'
                            y.push(obj)
                        }
                    }
                    this.$set(this.currentComponent.options.xAxis[0],'data',x)
                    this.$set(this.currentComponent.options,'series',y)
                    this.currentComponent.echartInstance.setOption(this.currentComponent.options)
                    this.$set(this.currentComponent,'data',this.currentComponent.options.xAxis.data)
                    this.$set(this.currentComponent,'data',this.currentComponent.options.series)
                }else if(type === 'scatter') {
                    let arr = []
                    for(let i = 0; i < data.item.length; i++) {
                        let arr1 = []
                        for(let j = 1; j < data.item[i].length; j++) {
                            arr1.push(data.item[i][j])
                        }
                        arr.push(arr1)
                    }
                    this.$set(this.currentComponent,'data',arr)
                    this.$set(this.currentComponent.options.series[0],'data',arr)
                    this.currentComponent.echartInstance.setOption(this.currentComponent.options)
                }
                $("#getData").css('display','none')
                $("#root").removeClass('before')
                $("#panels").css('zIndex',10)
                this.deleteData()
            },
            // 清空数据
            deleteData() {
                this.dimensionValues = []
                this.measureValues = []
                this.operation = ""
                this.count = 10
                this.errorTitle = ''
                this.isMoreDimension = false
            },
            // 改变计算方式
            changeCompute() {
                if(this.operation === '聚类') {
                    this.isClustering = true
                }else {
                    this.isClustering = false
                }
                let type = this.currentComponent.type
                switch (type) {
                    case 'line':
                        if(this.dimensionValues.length == 1 && this.measureValues.length == 0) {
                            if(this.operation == 'count') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else if(this.dimensionValues.length == 1 && this.measureValues.length == 1) {
                            if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else if(this.dimensionValues.length == 2 && this.measureValues.length == 1) {
                            if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else {
                            this.setDisabled(0)
                        }
                        break
                    case 'histogram':
                        if(this.dimensionValues.length == 1 && this.measureValues.length == 0) {
                            if(this.operation == 'count') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else if(this.dimensionValues.length == 1 && this.measureValues.length == 1) {
                            if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else if(this.dimensionValues.length == 2 && this.measureValues.length == 1) {
                            if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else {
                            this.setDisabled(0)
                        }
                        break
                    case 'pie':
                        if(this.dimensionValues.length == 1 && this.measureValues.length == 0) {
                            if(this.operation == 'count') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else if(this.dimensionValues.length == 1 && this.measureValues.length == 1) {
                            if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else {
                            this.setDisabled(0)
                        }
                        break
                    case 'area':
                        if(this.dimensionValues.length == 1 && this.measureValues.length == 0) {
                            if(this.operation == 'count') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else if(this.dimensionValues.length == 1 && this.measureValues.length == 1) {
                            if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else if(this.dimensionValues.length == 2 && this.measureValues.length == 1) {
                            if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else {
                            this.setDisabled(0)
                        }
                        break
                    case 'scatter':
                        if(this.dimensionValues.length == 1 && this.measureValues.length == 2) {
                            if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        } else if(this.dimensionValues.length != 1 && this.measureValues.length == 2) {
                            if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                this.setDisabled(1)
                            }else {
                                this.setDisabled(0)
                            }
                        }else {
                            this.setDisabled(0)
                        }
                        break
                }
            },
            changeDimension() {
                let type = this.currentComponent.type
                switch (type) {
                    case 'line':
                        if(this.dimensionValues.length >= 2) {
                            this.isMoreDimension = true
                        }else {
                            this.isMoreDimension = false
                        }
                        if(this.operation != "") {
                            if(this.operation == 'count') {
                                if((this.dimensionValues.length + this.measureValues.length) != 1 || this.dimensionValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                if(this.dimensionValues.length > 2 || this.measureValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else {
                                this.setDisabled(0)
                            }
                        }
                        break
                    case 'histogram':
                        if(this.dimensionValues.length >= 2) {
                            this.isMoreDimension = true
                        }else {
                            this.isMoreDimension = false
                        }
                        if(this.operation != "") {
                            if(this.operation == 'count') {
                                if((this.dimensionValues.length + this.measureValues.length) != 1 || this.dimensionValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                if(this.dimensionValues.length > 2 || this.measureValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else {
                                this.setDisabled(0)
                            }
                        }
                        break
                    case 'pie':
                        if(this.operation != "") {
                            if(this.operation == 'count') {
                                if((this.dimensionValues.length + this.measureValues.length) != 1 || this.dimensionValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                if(this.dimensionValues.length > 1 || this.measureValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else {
                                this.setDisabled(0)
                            }
                        }
                        break
                    case 'area':
                        if(this.dimensionValues.length >= 2) {
                            this.isMoreDimension = true
                        }else {
                            this.isMoreDimension = false
                        }
                        if(this.operation != "") {
                            if(this.operation == 'count') {
                                if((this.dimensionValues.length + this.measureValues.length) != 1 || this.dimensionValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                if(this.dimensionValues.length > 2 || this.measureValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else {
                                this.setDisabled(0)
                            }
                        }
                        break
                    case 'scatter':
                        if(this.operation != '') {
                            if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                if(this.dimensionValues.length == 0) {
                                    this.setDisabled(0)
                                }else if(this.dimensionValues.length != 0 && this.measureValues.length != 2) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else {
                                this.setDisabled(0)
                            }
                        }
                        break
                }
            },
            changeMeasure() {
                let type = this.currentComponent.type
                switch (type) {
                    case 'line':
                        if(this.operation != "") {
                            if(this.operation == 'count') {
                                if((this.dimensionValues.length + this.measureValues.length != 1) || this.dimensionValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                if(this.dimensionValues.length > 2 || this.measureValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else {
                                this.setDisabled(0)
                            }
                        }
                        break
                    case 'histogram':
                        if(this.operation != "") {
                            if(this.operation == 'count') {
                                if((this.dimensionValues.length + this.measureValues.length != 1) || this.dimensionValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                if(this.dimensionValues.length > 2 || this.measureValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else {
                                this.setDisabled(0)
                            }
                        }
                        break
                    case 'pie':
                        if(this.operation != "") {
                            if(this.operation == 'count') {
                                if((this.dimensionValues.length + this.measureValues.length != 1) || this.dimensionValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                if(this.dimensionValues.length > 2 || this.measureValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else {
                                this.setDisabled(0)
                            }
                        }
                        break
                    case 'area':
                        if(this.operation != "") {
                            if(this.operation == 'count') {
                                if((this.dimensionValues.length + this.measureValues.length != 1) || this.dimensionValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                if(this.dimensionValues.length > 2 || this.measureValues.length != 1) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else {
                                this.setDisabled(0)
                            }
                        }
                        break
                    case 'scatter':
                        if(this.operation != '') {
                            if(this.operation == 'sum' || this.operation == 'mean' || this.operation == 'min' || this.operation == 'max' || this.operation == 'stddev_pop' || this.operation == 'variance') {
                                if(this.dimensionValues.length == 0) {
                                    this.setDisabled(0)
                                }else if(this.dimensionValues.length != 0 && this.measureValues.length != 2) {
                                    this.setDisabled(0)
                                }else {
                                    this.setDisabled(1)
                                }
                            }else {
                                this.setDisabled(0)
                            }
                        }
                        break
                }
            },
            setDisabled(type) {
                if(type == 0) {
                    $("#determine").css({'background-color' : 'gray'});
                    $("#determine").attr("disabled", true);
                    this.errorTitle = '你所选择的图表和维度度量不支持此计算方式'
                }else {
                    $("#determine").css({'background-color' : '#177ddc'});
                    $("#determine").attr("disabled", false);
                    this.errorTitle = ''
                }
            },
            changShowDimension(label) {
                this.showDimension = label
            }
        },
        mounted() {
            this.dataSetId = this.$route.query.dataSetId;
            this.dimension = []
            this.measure = []
            datapre.PreviewStructure(this.dataSetId).then(res => {
                console.log(res)
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
    .getData {
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