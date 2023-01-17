<template>
    <!--改变类型面板-->
    <div class="popup" id="changeTypePopup">
        <div class="popup-title">
            <a class="popup-close" @click.stop.prevent="closePanel"></a>
            <span class="title-text">改变类型</span>
        </div>
        <div class="filterPopup">
            <div class="popup-form">
                <div class="row">
                    <div class="key">当前字段</div>
                    <div class="val">
                        <input type="text" readonly v-model="currentFiledName"/>
                    </div>
                </div>
                <div class="row">
                    <div class="key">选择类型</div>
                    <div class="val">
                        <el-select v-model="type" placeholder="请选择">
                            <el-option
                                    v-for="item in types"
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
                    <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="changeType">
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
    export default {
        name: "changTypePopup",
        data() {
            return {
                types: [
                    {
                        label: "数值",
                        value: 'number'
                    },
                    {
                        label: "文本",
                        value: 'text'
                    },
                    {
                        label: "日期",
                        value: 'date'
                    },
                ],
                type: '',
            }
        },
        methods: {
            closePanel() {
                $('#changeTypePopup').removeClass('show')
                $('#dataTreat').removeClass('before')
                $('#changeTypePopup').css('zIndex','1')
                $('#panels').css('top','0%')
                this.type = ""
            },
            changeType() {
                if(this.type === "") {
                    this.$message({
                        showClose: true,
                        message: "类型不能为空",
                        type: 'warning'
                    });
                }else {
                    this.dataSetStructure[this.category][this.dataSetStructureIndex].type = this.type
                    this.closePanel()
                }
            },
        },
        computed: {
            ...mapGetters([
                'currentFiledName',
                'dataSetStructure',
                'category',
                'dataSetStructureIndex'
            ])
        }
    }
</script>

<style scoped>
    .popup.show {
        opacity: 1;
        transform: translate(-50%, -100%) scale(1);
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