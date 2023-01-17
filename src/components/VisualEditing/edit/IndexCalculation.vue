<template>
    <div class="popup" id="IndexCalculationPopup">
        <div class="popup-title">
            <a class="popup-close" @click.stop="closePanel('calculatePopup')"></a>
            <span class="title-text">自定义指标</span>
        </div>
        <div class="popup-body">
            <div class="popup-form">
                <div class="row">
                    <div class="key">指标名称</div>
                    <div class="val">
                        <input type="text" v-model="indexName"/>
                    </div>
                </div>
                <div class="row">
                    <div class="key">总计算</div>
                    <div class="val">
                        <el-select v-model="method1" placeholder="请选择">
                            <el-option
                                    v-for="item in methods"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row">
                    <div class="key">字段1</div>
                    <div class="val">
                        <el-select v-model="filed1" placeholder="请选择">
                            <el-option
                                    v-for="item in fileds"
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
                        <el-select v-model="method2" placeholder="请选择">
                            <el-option
                                    v-for="item in methods"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row">
                    <div class="key">字段2</div>
                    <div class="val">
                        <el-select v-model="filed2" placeholder="请选择">
                            <el-option
                                    v-for="item in fileds"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="row-popup-btn">
                    <button class="btn bd yellow btn-cancle" @click.stop.prevent="closePanel('calculatePopup')">
                        <span>取消</span>
                    </button>
                    <button class="btn bd green am am-scale btn-save" @click.stop.prevent="Index">
                        <span>确定</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndexCalculation",
        data() {
            return {
                fileds: [
                    {
                        label: 'fc_pax_qty',
                        value: 'fc_pax_qty'
                    },
                    {
                        label: 'dpt_cty_cd',
                        value: 'dpt_cty_cd'
                    },
                    {
                        label: 'flt_seg_dstnc',
                        value: 'flt_seg_dstnc'
                    },
                    {
                        label: 'cls_cd',
                        value: 'cls_cd'
                    },
                    {
                        label: 'sub_cls_cd',
                        value: 'sub_cls_cd'
                    },
                    {
                        label: 'flt_nbr',
                        value: 'flt_nbr'
                    },
                    {
                        label: 'flt_rte_cd',
                        value: 'flt_rte_cd'
                    },
                    {
                        label: 'ffp_pax_qty',
                        value: 'ffp_pax_qty'
                    },
                    {
                        label: 'flt_seg_arrv_hh',
                        value: 'flt_seg_arrv_hh'
                    },
                    {
                        label: 'net_amt',
                        value: 'net_amt'
                    },
                    {
                        label: 'day',
                        value: 'day'
                    },
                    {
                        label: 'y_fr_amt',
                        value: 'y_fr_amt'
                    },
                    {
                        label: 'dpt_airpt_cd',
                        value: 'dpt_airpt_cd'
                    },
                    {
                        label: 'arrv_cty_cd',
                        value: 'arrv_cty_cd'
                    },
                    {
                        label: 'carr_cd',
                        value: 'carr_cd'
                    },
                    {
                        label: 'leg_qty',
                        value: 'leg_qty'
                    },
                    {
                        label: 'flt_seg_dpt_mm',
                        value: 'flt_seg_dpt_mm'
                    },
                    {
                        label: 'aircrft_typ',
                        value: 'aircrft_typ'
                    },
                    {
                        label: 'cls_cpc_qty',
                        value: 'cls_cpc_qty'
                    },
                    {
                        label: 'month',
                        value: 'month'
                    },
                    {
                        label: 'arrv_airpt_cd',
                        value: 'arrv_airpt_cd'
                    },
                    {
                        label: 'flt_seg_arrv_dt',
                        value: 'flt_seg_arrv_dt'
                    },
                    {
                        label: 'year',
                        value: 'year'
                    },
                    {
                        label: 'flt_seg_arrv_mm',
                        value: 'flt_seg_arrv_mm'
                    },
                    {
                        label: 'grp_pax_qty',
                        value: 'grp_pax_qty'
                    },
                    {
                        label: 'pax_qty',
                        value: 'pax_qty'
                    },
                    {
                        label: 'flt_seg_dpt_hh',
                        value: 'flt_seg_dpt_hh'
                    },
                    {
                        label: 'day_id',
                        value: 'day_id'
                    },
                    {
                        label: 'flt_seg_seq_nbr',
                        value: 'flt_seg_seq_nbr'
                    },
                ],
                filed1: '',
                filed2: '',
                methods: [
                    {
                        label: '求和',
                        value: 'sum'
                    },
                    {
                        label: '平均',
                        value: 'avg'
                    },
                    {
                        label: '乘积',
                        value: '1'
                    },
                    {
                        label: '相除',
                        value: '2'
                    },
                ],
                method1: '',
                method2: '',
                indexName: ''
            }
        },
        methods: {
            closePanel() {

            },
            Index() {

            }
        }
    }
</script>

<style scoped>
    .popup.show {
        opacity: 1;
        display: block;
        transform: translate(-50%, -50%) scale(1);
    }
    .popup {
        position: absolute;
        left: 50%;
        top: 50%;
        background: #181f29;
        z-index: 101;
        border-radius: 5px;
        box-shadow: 0 0 3px 3px rgb(0 0 0 / 10%);
        display: none;
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
        height: 350px;
        /*overflow: hidden;*/
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
    .row-popup-btn .btn-save {
        margin-left: 25px;
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

</style>