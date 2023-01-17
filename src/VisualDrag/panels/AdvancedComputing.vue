<template>
    <div id="advancedComputing" class="advancedComputing">
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
                    <div class="mojito-modal-title" id="rcDialogTitle2">高级计算分析</div>
                </div>
                <div class="mojito-modal-body">
                    <div id="addDataSourceForm" class="mojito-form mojito-form-horizontal">
                        <div class="mojito-row mojito-form-item" style="row-gap: 0px">
                            <div class="mojito-col mojito-col-4 mojito-form-item-label">
                                <label class="mojito-form-item-required" title="计算方式">
                                    计算方式
                                </label>
                            </div>
                            <div class="mojito-col mojito-col-20 mojito-form-item-control">
                                <div class="mojito-form-item-control-input">
                                    <div class="mojito-form-item-control-input-content">
                                        <div class="mojito-select mojito-select-single mojito-select-show-arrow" style="display: flex; justify-content: space-between">
                                            <el-select v-model="operation" placeholder="请选择" @change="chooseOperation(operation)">
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
                        </div>

                        <div class="mojito-row mojito-form-item" style="row-gap: 0px" v-if="isJuLei">
                            <div class="mojito-col mojito-col-4 mojito-form-item-label">
                                <label class="mojito-form-item-required" title="聚类个数">
                                    聚类个数
                                </label>
                            </div>
                            <div class="mojito-col mojito-col-20 mojito-form-item-control">
                                <div class="mojito-form-item-control-input">
                                    <div class="mojito-form-item-control-input-content">
                                        <div class="mojito-select mojito-select-single mojito-select-show-arrow" style="display: flex; justify-content: space-between">
                                            <input type="text" v-model="KMeansLength" aria-placeholder="输入个数" style="width:100%;height: 32px;min-height: 32px;line-height: 32px;background: transparent;border-radius: 2px;border: 1px solid #434343;"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mojito-row mojito-form-item" style="row-gap: 0px" v-if="isWeiDu">
                            <div class="mojito-col mojito-col-4 mojito-form-item-label">
                                <label class="mojito-form-item-required" title="维度">
                                    维度
                                </label>
                            </div>
                            <div class="mojito-col mojito-col-20 mojito-form-item-control">
                                <div class="mojito-form-item-control-input">
                                    <div class="mojito-form-item-control-input-content">
                                        <div class="mojito-select mojito-select-single mojito-select-show-arrow" style="display: flex; justify-content: space-between">
                                            <el-select v-model="dimensionValues" placeholder="请选择"multiple>
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


                        <div class="mojito-row mojito-form-item" style="row-gap: 0px" v-if="isDuLiang">
                            <div class="mojito-col mojito-col-4 mojito-form-item-label">
                                <label class="mojito-form-item-required" title="度量">
                                    度量
                                </label>
                            </div>
                            <div class="mojito-col mojito-col-20 mojito-form-item-control">
                                <div class="mojito-form-item-control-input">
                                    <div class="mojito-form-item-control-input-content">
                                        <div class="mojito-select mojito-select-single mojito-select-show-arrow" style="display: flex; justify-content: space-between">
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
                        <div class="mojito-space-item">
                            <button type="button" class="mojito-btn mojito-btn-primary" @click="calculate" id="determine">
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
    import $ from "jquery";
    import datapre from "../../api/datapre";
    import {mapGetters} from 'vuex'
    import gaojijisuan from "../../api/gaojijisuan";
    import axios from 'axios'
    import {getToken} from "../../api/auth";
    export default {
        name: "AdvancedComputing",
        data() {
            return {
                // 计算方式
                operations: [{
                    label: '拟合',
                    value: '拟合'
                },{
                    label: '预测',
                    value: '预测'
                },{
                    label: '聚类',
                    value: '聚类'
                }],
                operation: '',          //选中的计算方式,

                isNiHe: false,
                isYuCe: false,
                isJuLei: false,
                isDuLiang: false,
                isWeiDu: false,


                dimension: [],
                dimensionValues:[],     //选中的维度
                measure: [],            //度量列表
                measureValues: [],      //选中的度量
                dataSetId: '',          //数据集id
                dataSetStructure: {},   //数据结构
                KMeansLength: "",

                nihefangcheng: ''
            }
        },
        methods: {
            cancle() {
                $('#advancedComputing').css('display','none')
                $('#panels').css('zIndex','10')
                $('#root').removeClass('before')
            },
            chooseOperation(operation) {
                switch (operation) {
                    case '预测':
                        this.isWeiDu = true
                        this.isDuLiang = true
                        this.isJuLei = false
                        break;
                    case '拟合':
                        this.isWeiDu = false
                        this.isDuLiang = true
                        this.isJuLei = false
                        break;
                    case '聚类':
                        this.isJuLei = true
                        this.isWeiDu = false
                        this.isDuLiang = true
                        break;
                }
            },
            calculate() {
                switch (this.operation) {
                    case '拟合':
                        this.getnihefangcheng()
                        break
                    case '预测': this.yuce();break
                    case '聚类': this.julei();break
                }
                this.cancle()
            },
            yuce() {
                let obj = {}
                obj.datasetId = this.$route.query.dataSetId
                obj.arrayX = this.dimensionValues[0]
                obj.arrayY = this.measureValues[0]
                gaojijisuan.forecast(obj).then(res => {
                    if(res.code == 1) {
                        this.setData(res.data.row,res.data.column)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            julei() {
                let obj = {}
                obj.datasetId = this.$route.query.dataSetId
                obj.k = this.KMeansLength
                obj.cols = this.measureValues
                obj.cols = JSON.stringify(obj.cols)
                axios.post("http://47.100.107.173:8000/data/clustering",obj,{headers: {'token': getToken()}}).then(res => {
                    console.log(res)
                    if(res.data.code == 1) {
                        this.setJuLeiData(res.data.data.item)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },


            nihejisuan(x) {
                let Arithmetic
                let str = this.nihefangcheng
                let k = 0
                let operand = []
                let symbol = []
                for(let i = 0; i < str.length; i++) {
                    if(i != 0) {
                        if((str[i] === "-" || str[i] === '+' || str[i] === '*' || str[i] === '/') && str[i - 1] != 'e') {
                            let item = str.substring(k,i)
                            if(item.indexOf("x") != -1) {
                                let arr = item.split("x")
                                operand.push(arr[0])
                                operand.push("x" + arr[1])
                                symbol.push("*")
                                symbol.push(str[i])
                            }else {
                                operand.push(item)
                            }
                            k = i + 1
                        }
                    }
                }
                let LastItem
                if(str.length > k) {
                    LastItem = str.substring(k,str.length)
                }
                for(let i = 0; i < operand.length; i++) {
                    if(operand[i].indexOf("e") != -1) {
                        operand[i] = this.transferToNumber(operand[i])
                    }
                }
                let result = []
                let newOperand = []
                let newSymbol = []
                for(let k = 0; k < symbol.length; k++) {
                    if(symbol[k] === "*") {
                        if(operand[k + 1].indexOf("x") != -1) {
                            let arr = operand[k + 1].split('^')
                            let num
                            if(arr.length === 1) {
                                num = Math.pow(x,1)
                            }else {
                                num = Math.pow(x,parseFloat(arr[1]))
                            }
                            result.push(operand[k] * num)
                        }
                        let item = operand[k] + "*" + operand[k + 1]
                        newOperand.push(item)
                    }
                }
                for(let i = 0; i < symbol.length; i++) {
                    if(symbol[i] !== "*") {
                        newSymbol.push(symbol[i])
                    }
                }
                result.push(parseFloat(LastItem))
                Arithmetic = result[0]
                for(let i = 0; i < newSymbol.length; i++) {
                    if(newSymbol[i] === "-") {
                        Arithmetic = Arithmetic - result[i + 1]
                    }else if(newSymbol[i] === "+") {
                        Arithmetic = Arithmetic + result[i + 1]
                    }
                }
                return Arithmetic
            },
            getnihefangcheng() {
                let obj = {}
                obj.datasetId = this.$route.query.dataSetId
                obj.arrayX = this.measureValues[0]
                obj.arrayY = this.measureValues[1]
                gaojijisuan.fit(obj).then(res => {
                    if(res.code == 1) {
                        this.nihefangcheng = res.data.item
                        let x = []
                        for(let i = 0; i < 10; i++)
                            x[i] = Math.floor(Math.random() * 100);
                        let y = []
                        for(let i = 0; i < 10; i++)
                            y[i] = this.nihejisuan(x[i])
                        console.log(y)
                        this.setData(x,y)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            transferToNumber(inputNumber) {
                if (isNaN(inputNumber)) {
                    return inputNumber
                }
                inputNumber = '' + inputNumber
                inputNumber = parseFloat(inputNumber)
                let eformat = inputNumber.toExponential() // 转换为标准的科学计数法形式（字符串）
                let pos = eformat.indexOf('e')
                let baseValue = eformat.substr(0, pos)
                let power = eformat.substr(pos + 1)
                let bitNumber = 0
                pos = baseValue.indexOf('.')
                if (pos === -1) {
                    bitNumber = 0 - power
                } else {
                    let float = baseValue.substr(pos + 1)
                    bitNumber = float.length - power
                }
                let number = inputNumber.toFixed(Math.max(0, bitNumber))
                return number
            },
            setJuLeiData(data) {
                let COLOR_ALL = [
                    '#37A2DA', '#e06343', '#37a354', '#b55dba', '#b5bd48', '#8378EA', '#96BFFF'
                ];
                let pieces = [];
                for (let i = 0; i < 6; i++) {
                    pieces.push({
                        value: i,
                        label: 'cluster ' + i,
                        color: COLOR_ALL[i]
                    });
                }
                this.$set(this.currentComponent.options.dataset[0],'source',data)
                this.$set(this.currentComponent.options.dataset[1].transform.config,'clusterCount',6)
                this.$set(this.currentComponent.options.visualMap,'max',6)
                this.$set(this.currentComponent.options.visualMap,'splitNumber',6)
                this.$set(this.currentComponent.options.visualMap,'pieces',6)
                this.currentComponent.echartInstance.setOption(this.currentComponent.options)
            },
            setData(x,y) {
                this.$set(this.currentComponent.options.xAxis,'data',x)
                this.$set(this.currentComponent.options.series[0],'data',y)
                this.currentComponent.echartInstance.setOption(this.currentComponent.options)
                this.$set(this.currentComponent,'data',this.currentComponent.options.xAxis.data)
                this.$set(this.currentComponent,'data',this.currentComponent.options.series)
            },
        },
        computed: {
            ...mapGetters([
                'currentComponent'
            ])
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
    .advancedComputing {
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