<template>
    <!--添加条件面板-->
    <div class="popup" id="conditionsPopup">
        <div class="popup-title">
            <a class="popup-close" @click.stop.prevent="closePanel"></a>
            <span class="title-text">添加条件</span>
        </div>
        <div class="filterPopup">
            <div class="popup-form">
                <div v-if="filedType === 'number'">
                    <div class="row">
                        <div class="key">选择条件</div>
                        <div class="val" style="display: flex;align-items: center;justify-content: flex-start">
                            <el-select v-model="numberCon1" placeholder="请选择" @change="chooseNumberCon">
                                <el-option
                                        v-for="item in numberCons"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option >
                            </el-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">输入数值</div>
                        <div class="val">
                            <input type="text" v-model="numberValue1" @change="chooseNumberValue"/>
                        </div>
                    </div>
                </div>

                <div v-else-if="filedType === 'text'">
                    <div class="row">
                        <div class="key">选择条件</div>
                        <div class="val" style="display: flex;align-items: center;justify-content: flex-start">
                            <el-select v-model="textCon" placeholder="请选择" @change="chooseText">
                                <el-option
                                        v-for="item in textCons"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="row" v-if="isIn && isNull">
                        <div class="key">选择字符</div>
                        <div class="val">
                            <el-select v-model="onlyText1" placeholder="请选择" multiple="multiple" @change="chooseOnlyText">
                                <el-option
                                        v-for="item in onlyTexts"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="row" v-else-if="!isNull">
                        <div class="key">输入字符</div>
                        <div class="val">
                            <input type="text" class="sc" v-model="textValue1" @change="chooseTextValue"/>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div class="row">
                        <div class="key">开始日期</div>
                        <div class="val">
                            <el-date-picker
                                    v-model="startDate1"
                                    type="datetime"
                                    placeholder="选择日期时间" @change="chooseStartDate">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">结束日期</div>
                        <div class="val">
                            <el-date-picker
                                    v-model="endDate1"
                                    type="datetime"
                                    placeholder="选择日期时间" @change="chooseEndDate">
                            </el-date-picker>
                        </div>
                    </div>
                </div>

                <div class="row-popup-btn">
                    <button class="btn bd yellow" @click.stop.prevent="closePanel">
                        <span>取消</span>
                    </button>
                    <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="closePanel">
                        <span>确定</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {processing} from "../js/processing";
    import {mapGetters} from 'vuex'
    import $ from "jquery";
    import datapre from "../../api/datapre";
    export default {
        name: "conditionsPopup",
        mixins: [processing],
        data() {
            return {
                startDate1: '',
                endDate1: '',

                numberCons: [{
                    label: '=',
                    value: '='
                },{
                    label: '<>',
                    value: '<>'
                },{
                    label: '<',
                    value: '<'
                },{
                    label: '>',
                    value: '>'
                },{
                    label: '<=',
                    value: '<='
                },{
                    label: '>=',
                    value: '>='
                }],
                numberCon1: '',
                numberValue1: '',

                textCons: [{
                    label: '枚举',
                    value: '枚举'
                },{
                    label: '为空',
                    value: '为空'
                },{
                    label: '不为空',
                    value: '不为空'
                },{
                    label: '包含',
                    value: '包含'
                },{
                    label: '不包含',
                    value: '不包含'
                },{
                    label: '开头是',
                    value: '开头是'
                },{
                    label: '开头不是',
                    value: '开头不是'
                },{
                    label: '结尾是',
                    value: '结尾是'
                },{
                    label: '结尾不是',
                    value: '结尾不是'
                },{
                    label: '等于',
                    value: '等于'
                },{
                    label: '不等于',
                    value: '不等于'
                }],
                textCon: '',
                textValue1: '',
                onlyText1: '',
                text: '',
                isNull: false,      // 为空还是不为空的不显示
            }
        },
        computed: {
            ...mapGetters([
                'filedType',
                'onlyTexts',
                'isIn'
            ])
        },
        methods: {
            closePanel() {
                $('#conditionsPopup').removeClass('conditionsPopupShow')
                $('#conditionsPopup').css('zIndex','1')
                this.text = ""
                this.textCon = ''
                this.textValue1 = ''
                this.onlyText1 = ''
                this.isNull = false
                this.numberValue1 = ''
                this.numberCon1 = ''
                this.startDate1 = ''
                this.endDate1 = ''
            },
            chooseStartDate() {
                this.$store.commit('setStartDate',this.startDate1)
            },
            chooseEndDate() {
                this.$store.commit('setEndDate',this.endDate1)
            },

            chooseNumberValue() {
                this.$store.commit('setNumberValue',this.numberValue1)
            },
            chooseNumberCon() {
                this.$store.commit('setNumberCon',this.numberCon1)
            },

            chooseOnlyText() {
                this.$store.commit('setOnlyText',this.onlyText1)
            },
            chooseTextValue() {
                this.$store.commit('setTextValue',this.textValue1)
            },
            chooseText() {
                switch (this.textCon) {
                    case '枚举':
                        this.text = 'in';
                        this.$store.commit('setIsIn',true)
                        this.isNull = true;
                        this.onlyTexts.splice(0,this.onlyTexts.length)
                        this.$store.commit('setOnlyText',"")
                        datapre.getDistinctValue(this.$route.query.dataSetId,this.currentFiledName).then(res => {
                            console.log(res)
                            if(res.code == 1) {
                                let arr = []
                                for(let i = 0; i < res.data.item.length; i++) {
                                    let obj = {
                                        value: res.data.item[i],
                                        label: res.data.item[i]
                                    }
                                    arr.push(obj)
                                }
                                this.$store.commit('setOnlyTexts',arr)
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                        break;
                    case '为空':  this.text = 'null';this.$store.commit('setIsIn',false);this.isNull = true;break;
                    case '不为空':  this.text = 'not_null';this.$store.commit('setIsIn',false);this.isNull = true;break;
                    case '包含':  this.text = 'contain';this.$store.commit('setIsIn',false);this.isNull = false;break;
                    case '不包含':  this.text = 'not_contain';this.$store.commit('setIsIn',false);this.isNull = false;break;
                    case '开头是':  this.text = 'start_with';this.$store.commit('setIsIn',false);this.isNull = false;break;
                    case '开头不是':  this.text = 'not_start_with';this.$store.commit('setIsIn',false);this.isNull = false;break;
                    case '结尾是':  this.text = 'tail_with';this.$store.commit('setIsIn',false);this.isNull = false;break;
                    case '结尾不是':  this.text = 'not_tail_with';this.$store.commit('setIsIn',false);this.isNull = false;break;
                    case '等于':  this.text = '=';this.$store.commit('setIsIn',false);this.isNull = false;break;
                    case '不等于':  this.text = '<>';this.$store.commit('setIsIn',false);this.isNull = false;break;
                }
                this.$store.commit('setTextModel',this.text)
            },
        }
    }
</script>

<style scoped>
    .popup.conditionsPopupShow {
        opacity: 1;
        transform: translate(-50%, -70%) scale(1);
    }
    .popup {
        position: absolute;
        left: 50%;
        top: 50%;
        background: #181f29;
        z-index: 200;
        border-radius: 5px;
        box-shadow: 0 0 3px 3px rgb(0 0 0 / 10%);
        display: block;
        opacity: 0;
        transform: translate(-50%, -60%) scale(0.5);
        transition: all 0.5s ease-in-out;
    }
    .popup-title {
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #000;
        padding-left: 14px;
    }
    .popup-close {
        width: 20px;
        height: 20px;
        display: block;
        float: right;
        margin: 15px;
        position: relative;
    }
    .popup-title > a {
        cursor: pointer;
        text-decoration: none;
        color: unset;
    }
    .popup-close:before, .popup-close:after {
        content: "";
        position: absolute;
        display: block;
        width: 0;
        height: 18px;
        border-left: solid 2px #ccc;
        top: 1px;
        left: 9px;
    }
    .popup-close:before {
        transform: rotate(45deg);
    }
    .popup-close:after {
        transform: rotate(-45deg)
    }
    .filterPopup {
        min-height: 200px;
        max-height: 500px;
        width: 750px;
        overflow: visible;
    }
    .popup-form {
        padding: 20px 20px 20px 40px;
    }
    .popup-form .row {
        line-height: 34px;
        margin-bottom: 12px;
    }
    .popup-form .row .key {
        width: 100px;
        float: left;
        padding-right: 18px;
        text-align: right;
    }
    .popup-form .row .val {
        margin-left: 100px;
        padding-right: 80px;
    }
    .popup-form .row input {
        height: 34px;
        width: 100%;
        color: rgb(221, 221, 221);
        font-family: Arial, 微软雅黑;
        font-size: 14px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(90, 104, 130);
        border-image: initial;
        background: transparent;
        padding: 0px 14px;
    }
    .popup-form .row:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
    }
    .row-popup-btn {
        text-align: center;
        padding-top: 20px;
    }
    .btn.bd.yellow {
        border-color: #ec971f;
    }
    .btn.bd {
        border: solid 1px #666;
        background: transparent;
    }
    .btn {
        display: inline-block;
        vertical-align: top;
        height: 32px;
        line-height: 32px;
        padding: 0 18px;
        letter-spacing: 1px;
        color: #ddd;
        transition: all 0.4s;
        position: relative;
        font-size: 14px;
    }
    .btn.bd.green {
        border-color: #449d44;
    }
    .btn.am {
        overflow: hidden;
    }
    .btn.am>span {
        position: relative;
        z-index: 2;
    }
    .btn.am-scale:before {
        background: #449d44;
        width: 0;
        height: 0;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 1000px;
        opacity: 0;
        transition: all 0.6s;
    }
    .btn.am:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
    }
    .btn.am-scale:hover::before {
        opacity: 1;
        width: 100%;
        height: 100%;
        border-radius: 0px;
    }
    /deep/ .el-select {
        width: 100%;
    }
    /deep/ .el-input__inner {
        background-color: transparent;
        border-color: rgb(90, 104, 130);
        border-radius: 0px;
        height: 34px;
        line-height: 34px;
        color: white;
    }
    /deep/ .el-input__icon {
        line-height: 34px;
    }
    /deep/ .el-select .el-input.is-focus .el-input__inner {
        border-color: rgb(90, 104, 130);
    }
    /deep/ .el-select .el-input__inner:focus {
        border-color: rgb(90, 104, 130);
    }
    /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 100%;
    }
</style>