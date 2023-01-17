<template>
    <div class="popup" id="indicatorsPopup">
        <div class="popup-title">
            <a class="popup-close" @click.stop.prevent="closePanel"></a>
            <span class="title-text">新建指标</span>
        </div>
        <div class="popup-body indicatorsPopup">
            <div class="popup-form" id="indicatorsForm">
                <div class="row">
                    <div class="key">指标名称</div>
                    <div class="val">
                        <input type="text" v-model="indexName"/>
                    </div>
                </div>
                <div class="row">
                    <div class="key">字段</div>
                    <div class="val">
                        <el-select v-model="expression[0]" placeholder="请选择">
                            <el-option
                                    v-for="item in IndexParameters"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row">
                    <div class="key">计算方式</div>
                    <div class="val">
                        <el-select v-model="expression[1]" placeholder="请选择">
                            <el-option
                                    v-for="item in operators"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row">
                    <div class="key">字段</div>
                    <div class="val">
                        <el-select v-model="expression[2]" placeholder="请选择">
                            <el-option
                                    v-for="item in IndexParameters"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row">
                    <div class="key">聚合函数</div>
                    <div class="val">
                        <el-select v-model="expression[3]" placeholder="请选择">
                            <el-option
                                    v-for="item in Aggregations"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row-popup-btn">
                    <button class="btn bd yellow" @click.stop.prevent="closePanel">
                        <span>取消</span>
                    </button>
                    <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="indicators">
                        <span>确定</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import $ from "jquery";
    import axios from "axios";
    import {getToken} from "../../api/auth";
    import datapre from "../../api/datapre";
    import {processing} from "../js/processing";
    import user from "../../api/user";
    import Cookies from 'js-cookie'
    export default {
        name: "IndicatorsPopup",
        mixins: [processing],
        data() {
            return {
                indexName: '',      // 指标名称
                operators: [
                    {
                        label: '+',
                        value: '+'
                    },{
                        label: '-',
                        value: '-'
                    },{
                        label: '*',
                        value: '*'
                    },{
                        label: '/',
                        value: '/'
                    },
                ],
                Aggregations: [
                    {
                        label: '求和',
                        value: 'sum'
                    },{
                        label: '平均',
                        value: 'avg'
                    }
                ],
                expression: []
            }
        },
        methods: {
            closePanel() {
                $('#indicatorsPopup').removeClass('indicatorsShow')
                $('#indicatorsPopup').css('zIndex','1')
                $('#dataTreat').removeClass('before')
                $('#panels').css('top','0%')
                this.expression = []
                this.indexName = ""
            },
            indicators() {
                if(this.expression[0] === undefined || this.expression[1] === undefined || this.expression[2] === undefined) {
                    this.$message({
                        showClose: true,
                        message: '选择方式不正确',
                        type: 'error'
                    });
                }
                let expression
                if(this.expression[3] !== undefined) {
                    expression =  this.expression[0] + " " + this.expression[2] + " " + this.expression[1] + " " + this.expression[3]
                }else {
                    expression = this.expression[0] + " " + this.expression[2] + " " + this.expression[1]
                }
                let obj = {}
                obj.datasetId = this.$route.query.dataSetId
                obj.name = this.indexName
                obj.value = expression
                datapre.addQuota(obj).then(res => {
                    console.log(res)
                    if(res.code == 1) {
                        this.$message({
                            showClose: true,
                            message: "创建成功",
                            type: 'success'
                        });
                        user.postQuota({userId: Cookies.get('userId'),datasetId: this.$route.query.dataSetId,quota: res.data.id}).then(res => {
                            console.log(res)
                        }).catch(err => {
                            console.log(err)
                        })
                        this.findList1(null)
                        this.$store.commit('setDataSetStructure',[])
                        datapre.PreviewStructure(this.$route.query.dataSetId).then(res => {
                            if(res.code == 1) {
                                this.$store.commit('setDataSetStructure',res.data.item)
                                this.dataSetStructure.datasetId = this.$route.query.dataSetId
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                    this.closePanel()
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        computed: {
            ...mapGetters([
                'IndexParameters',
                'dataSetStructure'
            ])
        }
    }
</script>

<style scoped>
    .popup.indicatorsShow {
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
    .popup-body {
        width: 750px;
        height: 200px;
        /*overflow: hidden;*/
        overflow: visible;
    }
    .popup-body.indicatorsPopup {
        height: 350px;
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