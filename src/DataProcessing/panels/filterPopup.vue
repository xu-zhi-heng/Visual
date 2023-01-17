<template>
    <!--过滤-->
    <div class="popup" id="filterPopup">
        <div class="popup-title">
            <a class="popup-close" @click.stop.prevent="closePanel"></a>
            <span class="title-text">数据过滤</span>
        </div>
        <div class="popup-body filterPopup">
            <div class="popup-form">
                <div class="row">
                    <div class="key">当前字段</div>
                    <div class="val">
                        <input type="text" readonly v-model="currentFiledName"/>
                    </div>
                </div>
                <div class="row">
                    <div class="key">添加条件</div>
                    <div class="val" style="display: flex;align-items: center;justify-content: flex-start" @click.stop.prevent="addConditions">
                        <div class="addConditions">
                            <i class="iconfont iconjiahao"></i>
                        </div>
                        <div style="margin-left: 20px;color: #e6a23c">可添加多个条件</div>
                    </div>
                </div>

                <div class="row-popup-btn">
                    <button class="btn bd yellow" @click.stop.prevent="closePanel">
                        <span>取消</span>
                    </button>
                    <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="filter">
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
    import {processing} from "../js/processing";
    export default {
        name: "filterPopup",
        mixins: [processing],
        methods: {
            closePanel() {
                $('#dataTreat').removeClass('before')
                $('#filterPopup').removeClass('filterPopupShow')
                $('#filterPopup').css('zIndex','1')
                $('#panels').css('top','0%')
                this.$store.commit('setNumberCon','')
                this.$store.commit('setNumberValue','')

                this.$store.commit('setTextModel',"")
                this.$store.commit('setOnlyText','')
                this.$store.commit('setOnlyTexts',[])
                this.$store.commit('setTextValue','')

                this.$store.commit('setStartDate','')
                this.$store.commit('setEndDate','')
                this.$store.commit('setFiledType','')
            },
            addConditions() {
                $('#conditionsPopup').addClass('conditionsPopupShow')
                $('#conditionsPopup').css('zIndex','1600')
                this.getChoppers(0)
            }
        },
        computed: {
            ...mapGetters([
                'currentFiledName'
            ])
        }
    }
</script>

<style scoped>
    .popup.filterPopupShow {
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
    .row .val .addConditions {
        height: 34px;
        border: solid 1px #5a6882;
        width: 50%;
        background: transparent;
        color: #ddd;
        padding: 0 14px;
        font-family: "Arial","微软雅黑";
        font-size: 14px;
        position: relative;
        text-align: center;
        transition: all 0.5s;
    }
    .row .val .addConditions:hover {
        border: solid 1px white;
    }
    .row .val .addConditions:hover > i {
        font-size: 25px;
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