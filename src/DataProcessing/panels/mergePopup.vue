<template>
    <!--数据合并-->
    <div class="popup" id="mergePopup">
        <div class="popup-title">
            <a class="popup-close" @click.stop.prevent="closePanel"></a>
            <span class="title-text">数据列合并</span>
        </div>
        <div class="popup-body mergePopup">
            <div class="popup-form">
                <div class="row">
                    <div class="key">当前列</div>
                    <div class="val">
                        <input type="text" readonly v-model="currentFiledName"/>
                    </div>
                </div>
                <div class="row">
                    <div class="key">合并列</div>
                    <div class="val">
                        <el-select v-model="chopperFiled" placeholder="请选择">
                            <el-option
                                    v-for="item in chopperFileds"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row">
                    <div class="key">合并字符</div>
                    <div class="val">
                        <el-select v-model="MergedCharacter" placeholder="请选择">
                            <el-option
                                    v-for="item in MergedCharacters"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row">
                    <div class="key">合并名称</div>
                    <div class="val">
                        <input type="text" v-model="mergeFiledName"/>
                    </div>
                </div>

                <div class="row-popup-btn">
                    <button class="btn bd yellow" @click.stop.prevent="closePanel">
                        <span>取消</span>
                    </button>
                    <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="merge">
                        <span>确定</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex'
    import {processing} from "../js/processing";
    import $ from "jquery";
    import axios from "axios";
    import {getToken} from "../../api/auth";
    import user from "../../api/user";
    import Cookies from 'js-cookie'
    export default {
        name: "mergePopup",
        mixins: [processing],
        data() {
            return {
                mergeFiledName: '',
                MergedCharacters: [{
                    value: '-',
                    label: '-'
                }, {
                    value: '*',
                    label: '*'
                },{
                    value: '',
                    label: ''
                },{
                    value: '/',
                    label: '/'
                },{
                    value: '@',
                    label: '@'
                }],
                MergedCharacter: '',
            }
        },
        methods: {
            closePanel() {
                $('#dataTreat').removeClass('before')
                $('#mergePopup').removeClass('mergePopupShow')
                $('#mergePopup').css('zIndex','1')
                $('#panels').css('top','0%')
                this.chopperFileds.splice(0,this.chopperFileds.length)
                this.chopperFiled = ''
                this.MergedCharacter = ""
                this.mergeFiledName = ""
            },
            merge() {
                let index1;
                let index2;
                let category2;
                for(let i = 0; i < this.dataSetStructure[this.category].length; i++) {
                    if(this.dataSetStructure[this.category][i].caption === this.currentFiledName) {
                        index1 = i;
                        continue
                    }else if(this.dataSetStructure[this.category][i].caption === this.chopperFiled) {
                        category2 = this.category
                        index2 = i;
                        continue
                    }
                }
                if(this.category === 'measure') {
                    for(let i = 0; i < this.dataSetStructure.measure.length; i++) {
                        if(this.dataSetStructure.measure[i].caption === this.chopperFiled) {
                            category2 = 'measure'
                            index2 = i
                            break
                        }
                    }
                }else {
                    for(let i = 0; i < this.dataSetStructure.dimension.length; i++) {
                        if(this.dataSetStructure.dimension[i].caption === this.chopperFiled) {
                            category2 = 'dimension'
                            index2 = i
                            break
                        }
                    }
                }
                if(this.MergedCharacter === "" || this.mergeFiledName === "" || this.chopperFiled === "") {
                    this.$message({
                        showClose: true,
                        message: "内容不能为空",
                        type: 'warning'
                    });
                }else {
                    let obj = {}
                    obj.id = ""
                    obj.caption = this.mergeFiledName
                    obj.label = ""
                    obj.type = "text"
                    obj.origin_type = 'text'
                    obj.isHidden = 0
                    obj.isDelete = 0
                    obj.isNew = 1
                    obj.format = ""
                    obj.dm = 0
                    obj.complexFilter = {}
                    obj.delimiter = this.MergedCharacter
                    obj.delimiterSort = 0
                    obj.level = []
                    obj.sort = null
                    obj.is_quota = 0

                    let obj1 = this.dataSetStructure[this.category][index1]
                    obj1.pid = ''

                    let obj2 = this.dataSetStructure[category2][index2]
                    obj2.pid = ''

                    obj.level.push(obj1)
                    obj.level.push(obj2)

                    this.dataSetStructure[this.category].splice(index1, 1)
                    this.dataSetStructure[category2].splice(index2 - 1, 1)
                    this.dataSetStructure[this.category].splice(index1, 0 ,obj)

                    console.log(this.dataSetStructure)
                    this.closePanel()
                    axios.post(`http://47.100.107.173:8000/data/updatePreview`,JSON.stringify(this.dataSetStructure),{headers: {'token': getToken()}}).then(res => {
                        if(res.data.code == 1) {
                            this.findList1(res.data.data.item)
                            this.$message({
                                showClose: true,
                                message: "合并成功",
                                type: 'success'
                            });
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                    user.postInput({userId: Cookies.get('userId'),input: this.mergeFiledName}).then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
        },
        computed: {
            ...mapGetters([
                'currentFiledName',
                'chopperFileds',
                'dataSetStructure'
            ])
        }
    }
</script>

<style scoped>
    .popup.mergePopupShow {
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
    .popup-body.sortPopup {
        min-height: 200px;
        max-height: 800px;
        width: 750px;
        overflow: visible;
    }
    .popup-body.mergePopup {
        height: 290px;
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