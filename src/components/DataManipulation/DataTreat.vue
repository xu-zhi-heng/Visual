<template>
    <div id="dataTreat" class="page" @click.stop.prevent="closeOptions">
        <div class="nav-left" ref="navLeft">
            <div class="LogoName" @click="goHome">首页</div>
            <div class="navDiv">
                <div class="dimension">
                    <div class="navName">维度</div>
                    <div class="nav-list">
                        <ul>
                            <li class="nav-tab" @click.stop.prevent="switchItem('dimension',index,$event)" v-for="(item,index) in dataSetStructure.dimension" :key="index" :class="currentDimensionIndex === index ? 'a_active nav-show' : '' ">
                                <a class="li-a" :class="currentDimensionIndex === index ? 'active' : ''" :style="{color: item.isHidden === 1 ? '#dddbdb' : '',textDecoration: item.isDelete === 1 ? 'line-through': ''}">
                                    <i class="iconfont" :class="getIconByType(item.type)"></i>
                                    {{item.label === '' ? item.caption : item.label}}
                                    <i class="iconfont iconyoujiantou" style="float: right" @click.stop.prevent="showOptions($event)"></i>
                                </a>
                                <ul v-if="item.level.length != 0" class="level">
                                    <li v-for="(item1,index) in item.level" :key="index">
                                        <i class="iconfont" :class="getIconByType(item1.type)"></i>
                                        {{item1.caption}}
                                        <i class="iconfont iconyoujiantou" style="float: right;margin-right: 20px"></i>
                                    </li>
                                </ul>
                                <ul class="options">
                                    <li @click.stop.prevent="beforeRename('dimension',item.caption,index)">重命名</li>
                                    <li @click.stop.prevent="beforeFilter('dimension',item.caption,item.type)">过滤</li>
                                    <li @click.stop.prevent="hidden('dimension',item.caption,item.isHidden,index)">{{item.isHidden === 0 ? '隐藏' : '显示'}}</li>
                                    <li @click.stop.prevent="Delete('dimension',item.caption,item.isDelete,index)">{{item.isDelete === 0 ? '删除' : '复原'}}</li>
                                    <li @click.stop.prevent="beforeBreak('dimension',item.caption,index)">拆分</li>
                                    <li @click.stop.prevent="beforeMerge('dimension',item.caption)">合并</li>
                                    <li @click.stop.prevent="beforeAssociated('dimension',item.caption,index)">关联</li>
                                    <li @click.stop.prevent="beforeNumberFormat('measure',item.caption,index)" v-show="item.type === 'number'">数值格式</li>
                                    <li @click.stop.prevent="beforeDataFormat('measure',item.caption,index)" v-show="item.type === 'date'">日期格式</li>
                                    <li @click.stop.prevent="beMeasure('dimension',index)">设置为度量</li>
                                    <li @click.stop.prevent="beforeChangeType('dimension',index,item.caption)">类型转换</li>
                                    <li @click.stop.prevent="beforeSort('dimension',index,item.caption)">排序</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <div class="measure">
                    <div class="navName">度量</div>
                    <div class="nav-list">
                        <ul>
                            <li class="nav-tab" @click.stop="switchItem('measure',index)" :class="currentMeasureIndex === index ? 'a_active nav-show' : '' " v-for="(item,index) in dataSetStructure.measure" :key="index">
                                <a class="li-a" :class="currentMeasureIndex === index ? 'active' : ''" :style="{color: item.isHidden === 1 ? '#dddbdb' : '',textDecoration: item.isDelete === 1 ? 'line-through': ''}">
                                    <i class="iconfont" :class="getIconByType(item.type)"></i>
                                    {{item.label === '' ? item.caption : item.label}}
                                    <i class="iconfont iconyoujiantou" style="float: right" @click.stop.prevent="showOptions($event)"></i>
                                </a>
                                <ul v-if="item.level.length != 0" class="level">
                                    <li v-for="(item1,index) in item.level" :key="index">
                                        <i class="iconfont" :class="getIconByType(item1.type)"></i>
                                        {{item1.caption}}
                                        <i class="iconfont iconyoujiantou" style="float: right;margin-right: 20px"></i>
                                    </li>
                                </ul>
                                <ul class="options">
                                    <li @click.stop.prevent="beforeRename('measure',item.caption,index)">重命名</li>
                                    <li @click.stop.prevent="beforeFilter('measure',item.caption,item.type)">过滤</li>
                                    <li @click.stop.prevent="hidden('measure',item.caption,item.isHidden,index)">{{item.isHidden === 0 ? '隐藏' : '显示'}}</li>
                                    <li @click.stop.prevent="Delete('measure',item.caption,1,index)">{{item.isDelete === 0 ? '删除' : '复原'}}</li>
                                    <li @click.stop.prevent="beforeBreak('measure',item.caption,index)">拆分</li>
                                    <li @click.stop.prevent="beforeMerge('measure',item.caption)">合并</li>
                                    <li @click.stop.prevent="beforeAssociated('measure',item.caption,index)">关联</li>
                                    <li @click.stop.prevent="beforeNumberFormat('measure',item.caption,index)" v-show="item.type === 'number'">数值格式</li>
                                    <li @click.stop.prevent="beforeDataFormat('measure',item.caption,index)" v-show="item.type === 'date'">日期格式</li>
                                    <li @click.stop.prevent="beDimension('measure',index)">设置为维度</li>
                                    <li @click.stop.prevent="beforeChangeType('measure',index,item.caption)">类型转换</li>
                                    <li @click.stop.prevent="beforeSort('measure',index,item.caption)">排序</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-right" style="padding-left: 240px" ref="navRight">
            <div class="nav-top">
                <el-button type="danger" size="mini" @click.stop.prevent="PackUp" v-show="isOpen">收起</el-button>
                <el-button type="success" size="mini" @click.stop.prevent="Open" v-show="!isOpen">展开</el-button>
                <div style="float: right">
                    <el-button plain size="mini">清空过滤条件</el-button>
                    <el-button type="warning" size="mini" @click.stop.prevent="flash">刷新</el-button>
                    <el-button type="primary" size="mini" @click.stop.prevent="save">保存</el-button>
                </div>
            </div>
            <div class="content-page" style="left: 240px" ref="contentPage">
                <table class="border">
                    <thead>
                        <tr>
                            <th v-for="(item,index) in thList" :key="index">
                                {{item}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index1) in x" :key="index1">
                            <td v-for="(item,index2) in y" :key="index2">
                                {{trList[index2][index1]}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!--重命名框-->
        <div class="popup" id="renamePopup" style="z-index: 1">
            <div class="popup-title">
                <a class="popup-close" @click.stop.prevent="closePanel('renamePopup')"></a>
                <span class="title-text">字段重命名</span>
            </div>
            <div class="popup-body">
                <div class="popup-form">
                    <div class="row">
                        <div class="key">字段名</div>
                        <div class="val">
                            <input type="text" readonly v-model="currentFiledName"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">改为</div>
                        <div class="val">
                            <input type="text" v-model="modifiedName"/>
                        </div>
                    </div>
                    <div class="row-popup-btn">
                        <button class="btn bd yellow" @click.stop.prevent="closePanel('renamePopup')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="rename">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--关联其他表-->
        <div class="popup" id="associatedPopup" style="z-index: 1">
            <div class="popup-title">
                <a class="popup-close" @click.stop.prevent="closePanel('associatedPopup')"></a>
                <span class="title-text">多表关联</span>
            </div>
            <div class="popup-body associatedPopup">
                <div class="popup-form">
                    <div class="row">
                        <div class="key">当前字段</div>
                        <div class="val">
                            <input type="text" readonly v-model="currentFiledName"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">关联方式</div>
                        <div class="val">
                            <el-select v-model="ConnectionWay" placeholder="请选择">
                                <el-option
                                        v-for="item in ConnectionWays"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">关联数据集</div>
                        <div class="val">
                            <el-select v-model="AssociatedDataSet" placeholder="请选择" @change="chooseAssociatedDataSet">
                                <el-option
                                        v-for="item in AssociatedDataSets"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">关联字段</div>
                        <div class="val">
                            <el-select v-model="AssociatedField" placeholder="请选择">
                                <el-option
                                        v-for="item in AssociatedFields"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="row-popup-btn">
                        <button class="btn bd yellow" @click.stop.prevent="closePanel('associatedPopup')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="associated">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--数据合并-->
        <div class="popup" id="mergePopup" style="z-index: 1">
            <div class="popup-title">
                <a class="popup-close" @click.stop.prevent="closePanel('mergePopup')"></a>
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
                        <button class="btn bd yellow" @click.stop.prevent="closePanel('mergePopup')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="merge">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--数据拆分-->
        <div class="popup" id="breakPopup" style="z-index: 1">
            <div class="popup-title">
                <a class="popup-close" @click.stop.prevent="closePanel('breakPopup')"></a>
                <span class="title-text">数据拆分</span>
            </div>
            <div class="breakPopup">
                <div class="popup-form">
                    <div class="row">
                        <div class="key">当前列</div>
                        <div class="val">
                            <input type="text" readonly v-model="currentFiledName"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">拆分字符</div>
                        <div class="val">
                            <input type="text" v-model="BreakCharacter" @change="getBreakNumber"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">拆分个数</div>
                        <div class="val">
                            <input type="text" v-model="BreakNumber" readonly/>
                        </div>
                    </div>
                    <div v-for="(item,index) in breakFiledName" :key="index" style="display: flex;align-items: center">
                        <div class="row">
                            <div class="key">拆分字段</div>
                            <div class="val">
                                <input type="text" v-model="item.filed" readonly/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="key">拆分名称</div>
                            <div class="val">
                                <input type="text" v-model="item.breakFiled"/>
                            </div>
                        </div>
                    </div>
                    <div class="row-popup-btn">
                        <button class="btn bd yellow" @click.stop.prevent="closePanel('breakPopup')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="Break">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--日期格式转换-->
        <div class="popup" id="dateFormatPopup" style="z-index: 1">
            <div class="popup-title">
                <a class="popup-close" @click.stop.prevent="closePanel('dateFormatPopup')"></a>
                <span class="title-text">日期格式转换</span>
            </div>
            <div class="popup-body">
                <div class="popup-form">
                    <div class="row">
                        <div class="key">当前列</div>
                        <div class="val">
                            <input type="text" readonly v-model="currentFiledName"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">格式类型</div>
                        <div class="val">
                            <el-select v-model="DataFormat" placeholder="请选择">
                                <el-option
                                        v-for="item in DataFormats"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="row-popup-btn">
                        <button class="btn bd yellow" @click.stop.prevent="closePanel('dateFormatPopup')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="dataFormat">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--数值格式转换-->
        <div class="popup" id="numberFormatPopup" style="z-index: 1">
            <div class="popup-title">
                <a class="popup-close" @click.stop.prevent="closePanel('numberFormatPopup')"></a>
                <span class="title-text">数值格式转换</span>
            </div>
            <div class="popup-body">
                <div class="popup-form">
                    <div class="row">
                        <div class="key">当前列</div>
                        <div class="val">
                            <input type="text" readonly v-model="currentFiledName"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">保留小数</div>
                        <div class="val">
                            <el-select v-model="NumberFormat" placeholder="请选择">
                                <el-option
                                        v-for="item in NumberFormats"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="row-popup-btn">
                        <button class="btn bd yellow" @click.stop.prevent="closePanel('numberFormatPopup')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="numberFormat">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--过滤-->
        <div class="popup" id="filterPopup" style="z-index: 1">
            <div class="popup-title">
                <a class="popup-close" @click.stop.prevent="closePanel('filterPopup')"></a>
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
                        <button class="btn bd yellow" @click.stop.prevent="closePanel('filterPopup')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="filter">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--添加条件面板-->
        <div class="popup" id="conditionsPopup" style="z-index: 1">
            <div class="popup-title">
                <a class="popup-close" @click.stop.prevent="closePanel('conditionsPopup')"></a>
                <span class="title-text">添加条件</span>
            </div>
            <div class="filterPopup">
                <div class="popup-form">
                    <div v-if="filedType === 'number'">
                        <div class="row">
                            <div class="key">选择条件</div>
                            <div class="val" style="display: flex;align-items: center;justify-content: flex-start">
                                <el-select v-model="numberCon" placeholder="请选择">
                                    <el-option
                                            v-for="item in numberCons"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="key">输入数值</div>
                            <div class="val">
                                <input type="text" v-model="numberValue"/>
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
                                <el-select v-model="onlyText" placeholder="请选择" multiple="multiple">
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
                                <input type="text" class="sc" v-model="textValue"/>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <div class="row">
                            <div class="key">开始日期</div>
                            <div class="val">
                                <el-date-picker
                                        v-model="startDate"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="row">
                            <div class="key">结束日期</div>
                            <div class="val">
                                <el-date-picker
                                        v-model="endDate"
                                        type="datetime"
                                        placeholder="选择日期时间">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>

                    <div class="row-popup-btn">
                        <button class="btn bd yellow" @click.stop.prevent="closePanel('conditionsPopup')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="filter">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--改变类型面板-->
        <div class="popup" id="changeTypePopup" style="z-index: 1">
            <div class="popup-title">
                <a class="popup-close" @click.stop.prevent="closePanel('changeTypePopup')"></a>
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
                        <button class="btn bd yellow" @click.stop.prevent="closePanel('changeTypePopup')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="changeType">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--排序面板-->
        <div class="popup" id="sortPopup" style="z-index: 1">
            <div class="popup-title">
                <a class="popup-close" @click.stop.prevent="closePanel('sortPopup')"></a>
                <span class="title-text">排序</span>
            </div>
            <div class="popup-body sortPopup">
                <div class="popup-form">
                    <div class="row">
                        <div class="key">当前字段</div>
                        <div class="val">
                            <input type="text" readonly v-model="currentFiledName"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">排序方式</div>
                        <div class="val">
                            <el-select v-model="sort" placeholder="请选择">
                                <el-option
                                        v-for="item in sorts"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="row-popup-btn">
                        <button class="btn bd yellow" @click.stop.prevent="closePanel('sortPopup')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" style="margin-left: 25px" @click.stop.prevent="changeSort">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import datapre from "../../api/datapre";
    import axios from "axios";
    import {getToken} from "../../api/auth";
    import database from "../../api/database";
    import Cookies from 'js-cookie'
    import {mixin} from "../../mixins";
    export default {
        name: "DataTreat",
        data() {
            return {
                currentDimensionIndex: -1,
                currentMeasureIndex: -1,
                isOpen: true,

                dataSetId: '',
                dataSetStructure: {},       // 表结构
                Data: {},                   // 表数据
                x: 0,
                y: 0,
                thList: [],
                trList: [],

                // 重命名
                currentFiledName: '',        // 当前选择的字段名
                modifiedName: '',            // 修改的名称

                // 关联
                ConnectionWays: [{
                    value: 'left',
                    label: '左连接'
                }, {
                    value: 'inner',
                    label: '内连接'
                }, {
                    value: 'right',
                    label: '右关联'
                }],
                ConnectionWay: '',
                AssociatedDataSets: [],
                AssociatedDataSet: '',
                AssociatedFields: [],
                AssociatedField: '',

                // 合并
                chopperFileds:[],
                chopperFiled: '',
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

                // 拆分
                BreakCharacter: '',
                BreakNumber: '',
                breakFiledName: [],

                // 日期格式类型
                DataFormats: [
                    {
                        label: 'yyyy/MM/dd',
                        value: 'yyyy/MM/dd'
                    },
                    {
                        label: 'yyyyMMdd',
                        value: 'yyyyMMdd'
                    },
                    {
                        label: 'yyyy-MM-dd',
                        value: 'yyyy-MM-dd'
                    },
                    {
                        label: 'yyyy/MM/dd hh:mi:ss',
                        value: 'yyyy/MM/dd hh:mi:ss'
                    },
                    {
                        label: 'yyyyMMdd hh:mi:ss',
                        value: 'yyyyMMdd hh:mi:ss'
                    },
                    {
                        label: 'yyyy-MM-dd hh:mi:ss',
                        value: 'yyyy-MM-dd hh:mi:ss'
                    },
                ],
                DataFormat: '',

                // 数值格式
                NumberFormats: [
                    {
                        label: '#,##0',
                        value: '#,##0'
                    },
                    {
                        label: '#,##0.0',
                        value: '#,##0.0'
                    },
                    {
                        label: '#,##0.00',
                        value: '#,##0.00'
                    },
                    {
                        label: '#,##0.000',
                        value: '#,##0.000'
                    },
                    {
                        label: '#,##0.0000',
                        value: '#,##0.0000'
                    },
                ],
                NumberFormat: '',

                // 当前字段属于哪个类别
                category: '',


                // 过滤
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
                numberCon: '',
                numberValue: '',

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
                text: '',
                textValue: '',
                onlyTexts: [],
                onlyText: '',

                isIn: false,
                isNull: false,      // 为空还是不为空的不显示

                startDate: '',
                endDate: '',
                filedType: '',   // 字段类型


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

                index: '',


                // 排序
                sorts: [
                    {
                        label: '升序',
                        value: 'ASC'
                    },
                    {
                        label: '降序',
                        value: 'DESC'
                    },
                    {
                        label: '不排序',
                        value: ''
                    },
                ],
                sort: ''

            }
        },
        mixins: [mixin],
        methods: {
            switchItem(type,index,event) {
                if(JSON.stringify(event.target.nextSibling) != '{}') {
                    if(this.currentDimensionIndex === index) {
                        event.target.nextSibling.classList.remove('active')
                    }else {
                        event.target.nextSibling.classList.add('active')
                    }
                }
                if(type === 'measure') {
                    this.currentMeasureIndex = index
                }else {
                    this.currentDimensionIndex = index
                }
            },
            goHome() {
                this.$router.push("/sweetfun")
            },
            getIconByType(type) {
                if(type === 'date') {
                    return 'iconriqi'
                }else if(type === 'text') {
                    return 'iconzifuchuanshujuji'
                }else {
                    return 'iconshuzhi'
                }
            },
            flash() {
                this.dataSetStructure = {}
                datapre.PreviewStructure(this.dataSetId).then(res => {
                    if(res.code == 1) {
                        this.dataSetStructure = res.data.item
                        this.dataSetStructure.datasetId = this.dataSetId
                    }
                }).catch(err => {
                    console.log(err)
                })
                datapre.PreviewData(this.dataSetId,1).then(res => {
                    this.Data = {}
                    this.thList = []
                    this.trList= []
                    this.Data = res.data.item
                    console.log(this.Data)
                    for(let item in this.Data) {
                        this.thList.push(item)
                        this.trList.push(this.Data[item])
                    }
                    this.x = this.trList[0].length
                    this.y = this.trList.length
                }).catch(err => {
                    console.log(err)
                })
            },
            save() {
                axios.post(`http://47.100.107.173:8000/data/saveDataset`,JSON.stringify(this.dataSetStructure),{headers: {'token': getToken()}}).then(res => {
                    if(res.data.code == 1) {
                        this.$message({
                            showClose: true,
                            message: "保存成功",
                            type: 'success'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            PackUp() {
                this.$refs.navLeft.style.display = 'none'
                this.$refs.navRight.style.paddingLeft = '0px'
                this.$refs.contentPage.style.left = '0px'
                this.isOpen = !this.isOpen
            },
            Open() {
                this.$refs.navLeft.style.display = 'block'
                this.$refs.navRight.style.paddingLeft = '240px'
                this.$refs.contentPage.style.left = '240px'
                this.isOpen = !this.isOpen
            },

            showOptions(event) {
                let li = document.getElementsByClassName('nav-tab')
                for(let i = 0; i < li.length; i++) {
                    if(li[i].classList.contains("current")) {
                        li[i].classList.remove('current')
                    }
                }
                event.target.parentNode.parentNode.classList.add('current')
            },
            closeOptions() {
                let li = document.getElementsByClassName('nav-tab')
                for(let i = 0; i < li.length; i++) {
                    if(li[i].classList.contains("current")) {
                        li[i].classList.remove('current')
                    }
                }
            },

            // 隐藏
            hidden(category,name,type,index) {
                this.closeOptions();
                this.dataSetStructure[category][index].isHidden = (type === 0 ? 1 : 0)
            },
            // 删除
            Delete(category,name,type,index) {
                this.closeOptions();
                if(type == 0) {
                    this.dataSetStructure[category][index].isDelete = 1
                }else {
                    this.dataSetStructure[category][index].isDelete = 0
                }

            },

            // 重命名
            beforeRename(category,name,index) {
                this.currentFiledName = name
                this.category = category
                this.index = index
                this.closeOptions();
                document.getElementById("dataTreat").classList.add('before')
                document.getElementById('renamePopup').classList.add('show')
                document.getElementById('renamePopup').style.zIndex = '9999'
                this.closeOptions()
            },
            rename() {
                if(this.modifiedName === "") {
                    this.$message({
                        showClose: true,
                        message: "重命名不能为空",
                        type: 'warning'
                    });
                }else {
                    this.dataSetStructure[this.category][this.index].label = this.modifiedName
                    for(let i = 0; i < this.thList.length; i++) {
                        if(this.thList[i] === this.currentFiledName) {
                            this.$set(this.thList,i,this.modifiedName)
                            break
                        }
                    }
                    this.closePanel('renamePopup')
                }
            },

            // 关联
            beforeAssociated(category,name,index) {
                this.category = category
                this.currentFiledName = name;
                this.index = index
                document.getElementById("dataTreat").classList.add('before')
                document.getElementById('associatedPopup').classList.add('associatedPopupShow')
                document.getElementById('associatedPopup').style.zIndex = '9999'
                this.closeOptions()
                if(this.AssociatedDataSets.length == 0) {
                    database.getDataSetByUserId(Cookies.get('userId')).then(res => {
                        if(res.code == 1) {
                            for(let i = 0; i < res.data.item.length; i++) {
                                if(res.data.item[i].id === this.dataSetId) {
                                    continue
                                }else {
                                    let obj = {
                                        value: res.data.item[i].id,
                                        label: res.data.item[i].title
                                    }
                                    this.AssociatedDataSets.push(obj)
                                }
                            }
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            chooseAssociatedDataSet() {
                this.AssociatedFields.splice(0,this.AssociatedFields.length)
                datapre.getAllFieldsById(this.AssociatedDataSet).then(res => {
                    if(res.code == 1) {
                        for(let i = 0; i < res.data.item.length; i++) {
                            let obj = {
                                value: res.data.item[i].id,
                                label: res.data.item[i].name
                            }
                            this.AssociatedFields.push(obj)
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            associated() {
                if(this.ConnectionWay === "" || this.AssociatedDataSet === "" || this.AssociatedField === "") {
                    this.$message({
                        showClose: true,
                        message: "内容不能为空",
                        type: 'warning'
                    });
                }else {
                    let obj = {}
                    obj.id = ""
                    obj.fromTable = this.AssociatedDataSet
                    obj.foreignKey = this.currentFiledName
                    obj.joinType = this.ConnectionWay
                    obj.factCol = this.AssociatedField
                    obj.isDelete = 0
                    obj.child = []
                    // obj.isDelete = 0
                    this.dataSetStructure.join.push(obj)
                    this.closePanel("associatedPopup")
                }
            },

            // 合并
            beforeMerge(category,name) {
                this.getChoppers(1)
                this.currentFiledName = name
                this.category = category
                document.getElementById("dataTreat").classList.add('before')
                document.getElementById('mergePopup').classList.add('mergePopupShow')
                document.getElementById('mergePopup').style.zIndex = '9999'
                this.closeOptions()
            },
            getChoppers(type) {
                for(let i = 0; i < this.dataSetStructure.dimension.length; i++) {
                    if(this.dataSetStructure.dimension[i].level.length != 0) {
                        for(let j = 0; j < this.dataSetStructure.dimension[i].level.length; j++) {
                            let obj = {
                                label: this.dataSetStructure.dimension[i].level[j].caption,
                                value: this.dataSetStructure.dimension[i].level[j].caption
                            }
                            this.chopperFileds.push(obj)
                        }
                    }else {
                        let name = (this.dataSetStructure.dimension[i].label === '' ? this.dataSetStructure.dimension[i].caption : this.dataSetStructure.dimension[i].label)
                        let obj = {
                            label: name,
                            value: name
                        }
                        this.chopperFileds.push(obj)
                    }
                }
                for(let i = 0; i < this.dataSetStructure.measure.length; i++) {
                    if(this.dataSetStructure.measure[i].level.length != 0) {
                        for(let j = 0; j < this.dataSetStructure.measure[i].level.length; j++) {
                            this.chopperFileds.push({
                                label: this.dataSetStructure.measure[i].level[j].caption,
                                value: this.dataSetStructure.measure[i].level[j].caption
                            })
                        }
                    }else {
                        let name = (this.dataSetStructure.measure[i].label === '' ? this.dataSetStructure.measure[i].caption : this.dataSetStructure.measure[i].label)
                        this.chopperFileds.push({
                            label: name,
                            value: name
                        })
                    }
                }
                if(type === 1) {

                }
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

                    this.closePanel('mergePopup')
                }
            },

            // 拆分
            beforeBreak(category,name,index) {
                this.category = category
                this.currentFiledName = name
                this.index = index
                document.getElementById("dataTreat").classList.add('before')
                document.getElementById('breakPopup').classList.add('breakPopupShow')
                document.getElementById('breakPopup').style.zIndex = '9999'
                this.closeOptions()
            },
            getBreakNumber() {
                let index = this.thList.indexOf(this.currentFiledName)
                let arr = this.trList[index]
                let data = arr[0]
                let breakData = data.split(this.BreakCharacter)
                this.BreakNumber = breakData.length
                for(let i = 0; i < breakData.length; i++) {
                    let obj = {}
                    obj.filed = breakData[i]
                    obj.breakFiled = ''
                    this.breakFiledName.push(obj)
                }
            },
            Break() {
                if(this.BreakCharacter === "") {
                    this.$message({
                        showClose: true,
                        message: "内容不能为空",
                        type: 'warning'
                    });
                } else {
                    let flag = true
                    for(let i = 0; i < this.breakFiledName.length; i++) {
                        if(this.breakFiledName[i].breakFiled === "") {
                            flag = false
                            break
                        }
                    }
                    if(flag) {
                        this.dataSetStructure[this.category][this.index].delimiter = this.BreakCharacter
                        for(let i = 0; i < this.BreakNumber; i++) {
                            let obj = {}
                            obj.id = ''
                            obj.isNew = 1
                            obj.caption = this.breakFiledName[i].breakFiled
                            obj.type = this.dataSetStructure[this.category][this.index].type
                            obj.origin_type = this.dataSetStructure[this.category][this.index].origin_type
                            obj.pid = this.dataSetStructure[this.category][this.index].id
                            obj.delimiterSort = i + 1
                            this.dataSetStructure[this.category][this.index].level.push(obj)
                        }
                        this.closePanel('breakPopup')
                    }else {
                        this.$message({
                            showClose: true,
                            message: "名称不能为空",
                            type: 'warning'
                        });
                    }
                }
            },

            // 过滤
            beforeFilter(category,name,type) {
                this.closeOptions();
                this.category = category
                this.currentFiledName = name
                this.filedType = type
                document.getElementById("dataTreat").classList.add('before')
                document.getElementById('filterPopup').classList.add('filterPopupShow')
                document.getElementById('filterPopup').style.zIndex = '9999'
            },
            filter() {
                let index;
                for(let i = 0; i < this.dataSetStructure[this.category].length; i++) {
                    if(this.dataSetStructure[this.category][i].caption === this.currentFiledName) {
                        index = i;
                    }
                }
                if(this.filedType === 'text') {
                    let obj = {}
                    obj.operator = 'and'
                    let filters = []
                    let filter = {}
                    filter.oper = this.text
                    filter.values = []
                    if(this.isIn) {
                        for(let i = 0; i < this.onlyText.length; i++) {
                            filter.values.push(this.onlyText[i])
                        }
                    }else {
                        filter.values.push(this.textValue)
                    }
                    filters.push(filter)
                    obj.filters = filters
                    this.dataSetStructure[this.category][index].complexFilter = obj
                }else if(this.filedType === 'number') {
                    let obj = {}
                    obj.operator = 'and'
                    let filters = []
                    let filter = {}
                    filter.oper = this.numberCon
                    filter.values = []
                    filter.values.push(this.numberValue)
                    filters.push(filter)
                    obj.filters = filters
                    this.dataSetStructure[this.category][index].complexFilter = obj
                }else {
                    let obj = {}
                    obj.operator = 'and'
                    let filters = []
                    let filter = {}
                    filter.oper = 'between'
                    filter.values = []
                    filter.values.push(new Date(this.startDate))
                    filter.values.push(new Date(this.endDate))
                    filters.push(filter)
                    obj.filters = filters
                    this.dataSetStructure[this.category][index].complexFilter = obj
                }
                this.closePanel('conditionsPopup')
                this.closePanel('filterPopup')

                this.chopperFiled = ''
                this.chopperFileds.splice(0,this.chopperFileds.length)
            },
            // 添加条件
            addConditions() {
                document.getElementById("conditionsPopup").style.zIndex = '10000'
                document.getElementById("conditionsPopup").classList.add('conditionsPopupShow')
                this.getChoppers(0)
            },
            chooseText() {
                switch (this.textCon) {
                    case '枚举':
                        this.text = 'in';
                        this.isIn = true;
                        this.isNull = true;
                        this.onlyTexts.splice(0,this.onlyTexts.length)
                        this.onlyText = ""
                        datapre.getDistinctValue(this.dataSetId,this.currentFiledName).then(res => {
                            if(res.code == 1) {
                                for(let i = 0; i < res.data.item.length; i++) {
                                    let obj = {
                                        value: res.data.item[i],
                                        label: res.data.item[i]
                                    }
                                    this.onlyTexts.push(obj)
                                }
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                        break;
                    case '为空':  this.text = 'null';this.isIn = false;this.isNull = true;break;
                    case '不为空':  this.text = 'not_null';this.isIn = false;this.isNull = true;break;
                    case '包含':  this.text = 'contain';this.isIn = false;this.isNull = false;break;
                    case '不包含':  this.text = 'not_contain';this.isIn = false;this.isNull = false;break;
                    case '开头是':  this.text = 'start_with';this.isIn = false;this.isNull = false;break;
                    case '开头不是':  this.text = 'not_start_with';this.isIn = false;this.isNull = false;break;
                    case '结尾是':  this.text = 'tail_with';this.isIn = false;this.isNull = false;break;
                    case '结尾不是':  this.text = 'not_tail_with';this.isIn = false;this.isNull = false;break;
                    case '等于':  this.text = '=';this.isIn = false;this.isNull = false;break;
                    case '不等于':  this.text = '<>';this.isIn = false;this.isNull = false;break;
                }
            },

            // 日期格式转换
            beforeDataFormat(category,name,index) {
                this.category = category
                this.currentFiledName = name
                this.index = index
                document.getElementById("dataTreat").classList.add('before')
                document.getElementById('dateFormatPopup').classList.add('show')
                document.getElementById('dateFormatPopup').style.zIndex = '9999'
                this.closeOptions()
            },
            dataFormat() {
                console.log(1)
            },

            // 数值格式转换
            beforeNumberFormat(category,name,index) {
                this.category = category
                this.currentFiledName = name
                this.index = index
                document.getElementById("dataTreat").classList.add('before')
                document.getElementById('numberFormatPopup').classList.add('show')
                document.getElementById('numberFormatPopup').style.zIndex = '9999'
                this.closeOptions()
            },
            numberFormat() {

            },

            beDimension(category,index) {
                let element = this.dataSetStructure['measure'][index]
                this.dataSetStructure['measure'].splice(index,1)
                this.dataSetStructure['dimension'].push(element)
            },
            beMeasure(category,index) {
                let element = this.dataSetStructure['dimension'][index]
                this.dataSetStructure['dimension'].splice(index,1)
                this.dataSetStructure['measure'].push(element)
            },

            beforeChangeType(category,index,name) {
                this.index = index
                this.currentFiledName = name
                this.category = category
                this.closeOptions();
                document.getElementById("changeTypePopup").classList.add('show')
                document.getElementById("changeTypePopup").style.zIndex = '10000'
                document.getElementById("dataTreat").classList.add('before')
            },
            changeType() {
                if(this.type === "") {
                    this.$message({
                        showClose: true,
                        message: "类型不能为空",
                        type: 'warning'
                    });
                }else {
                    this.dataSetStructure[this.category][this.index].type = this.type
                    this.closePanel('changeTypePopup')
                }
            },

            // 排序
            beforeSort(category,index,name) {
                this.index = index
                this.category = category
                this.currentFiledName = name
                this.closeOptions();
                document.getElementById("sortPopup").classList.add('conditionsPopupShow')
                document.getElementById("sortPopup").style.zIndex = '10000'
                document.getElementById("dataTreat").classList.add('before')
            },
            changeSort() {
                this.dataSetStructure[this.category][this.index].sort = this.sort
                this.closePanel('sortPopup')
            },
            closePanel(name) {
                switch (name) {
                    case 'renamePopup':
                        document.getElementById("renamePopup").classList.remove('show')
                        document.getElementById("renamePopup").style.zIndex = '1'
                        document.getElementById("dataTreat").classList.remove('before')
                        this.modifiedName = ''
                        break;
                    case 'associatedPopup':
                        document.getElementById("associatedPopup").classList.remove('associatedPopupShow')
                        document.getElementById("associatedPopup").style.zIndex = '1'
                        document.getElementById("dataTreat").classList.remove('before')
                        this.AssociatedDataSet = ""
                        this.AssociatedFields.splice(0,this.AssociatedFields.length)
                        this.AssociatedField = ""
                        this.ConnectionWay = ""
                        break;
                    case 'mergePopup':
                        document.getElementById("mergePopup").classList.remove('mergePopupShow')
                        document.getElementById("mergePopup").style.zIndex = '1'
                        document.getElementById("dataTreat").classList.remove('before')
                        this.chopperFileds.splice(0,this.chopperFileds.length)
                        this.chopperFiled = ''
                        this.MergedCharacter = ""
                        this.mergeFiledName = ""
                        break;
                    case 'breakPopup':
                        document.getElementById("breakPopup").classList.remove('breakPopupShow')
                        document.getElementById("breakPopup").style.zIndex = '1'
                        document.getElementById("dataTreat").classList.remove('before')
                        this.breakFiledName.splice(0,this.breakFiledName.length)
                        this.BreakCharacter === ""
                        break;
                    case 'dateFormatPopup':
                        document.getElementById("dateFormatPopup").classList.remove('show')
                        document.getElementById("dateFormatPopup").style.zIndex = '1'
                        document.getElementById("dataTreat").classList.remove('before')
                        break;
                    case 'numberFormatPopup':
                        document.getElementById("numberFormatPopup").classList.remove('show')
                        document.getElementById("numberFormatPopup").style.zIndex = '1'
                        document.getElementById("dataTreat").classList.remove('before')
                        break;
                    case 'filterPopup':
                        document.getElementById("filterPopup").classList.remove('filterPopupShow')
                        document.getElementById("filterPopup").style.zIndex = '1'
                        document.getElementById("dataTreat").classList.remove('before')
                        this.numberCon = ''
                        this.numberValue = ''
                        this.textCon = ''
                        this.text = ''
                        this.textValue = ''
                        this.onlyText = ''
                        this.startDate = ''
                        this.endDate = ''
                        break;
                    case 'conditionsPopup':
                        document.getElementById("conditionsPopup").classList.remove('conditionsPopupShow')
                        document.getElementById("conditionsPopup").style.zIndex = '1'
                        document.getElementById("dataTreat").classList.remove('before')
                        this.chopperFileds.splice(0,this.chopperFileds.length)
                        this.chopperFiled = ''
                        break;
                    case 'changeTypePopup':
                        document.getElementById("changeTypePopup").classList.remove('conditionsPopupShow')
                        document.getElementById("changeTypePopup").style.zIndex = '1'
                        document.getElementById("dataTreat").classList.remove('before')
                        this.type = ""
                        break
                    case 'sortPopup':
                        document.getElementById("sortPopup").classList.remove('conditionsPopupShow')
                        document.getElementById("sortPopup").style.zIndex = '1'
                        document.getElementById("dataTreat").classList.remove('before')
                        this.sort = ""
                        break
                }
            },
        },
        computed: {
            isHiddenStyle() {
                return (type) => {
                    if(type == 1) {
                        return 'color: #dddbdb'
                    }
                }
            },
            isDeleteStyle() {
                return (type) => {
                    if(type == 1) {
                        return 'text-decoration: line-through'
                    }
                }
            }
        },
        created() {
            this.dataSetId = this.$route.query.dataSetId
        },
        mounted() {
            datapre.PreviewStructure(this.dataSetId).then(res => {
                if(res.code == 1) {
                    this.dataSetStructure = res.data.item
                    this.dataSetStructure.datasetId = this.dataSetId
                }
            }).catch(err => {
                console.log(err)
            })
            datapre.PreviewData(this.dataSetId,1).then(res => {
                this.Data = res.data.item
                for(let item in this.Data) {
                    this.thList.push(item)
                    this.trList.push(this.Data[item])
                }
                this.x = this.trList[0].length
                this.y = this.trList.length
            }).catch(err => {
                console.log(err)
            })
        },
    }
</script>

<style scoped>
    #dataTreat {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
    }
    #dataTreat:before{
        content: '';
        position: absolute;
        top: -1000px;
        left: 0;
        width: 100%;
        height: 100%;
        line-height: 100%;
        text-align: center;
        font-size: 30px;
        color: #fff;
        background-color: rgba(0,0,0,0.2);
        z-index: 1000;
    }

    #dataTreat.before::before{
        top: 0;
        animation: dropdown 2s;
    }
    @keyframes dropdown {
        0%{
            top: -375px;
        }

        5%{
            top: 0;
        }

        10%{
            top:-30px
        }
        20%{
            top: 0;
        }
        30%{
            top: -20px;
        }
        40%{
            top: 0;
        }
        50%{
            top: -15px;
        }
        60%{
            top: 0;
        }
        70%{
            top: -10px;
        }
        80%{
            top: 0;
        }
        90%{
            top: -5px;
        }
        100%{
            top: 0;
        }
    }
    .page .nav-left {
        position: absolute;
        top: 0;
        height: 100%;
        width: 240px;
        background-color: #FFFFFF;
        box-shadow: 10px 0px 17px rgb(72 72 72 / 10%);
        transition: all .5s;
        z-index: 100;
        -overflow: hidden;
    }
    .page .nav-left .LogoName {
        margin-left: 20px;
        line-height: 70px;
        font-size: 20px;
        font-weight: 700;
        color: #6d61ea;
        letter-spacing: 0.05em;
    }
    .page .nav-left .navDiv {
        height: calc(100% - 70px);
    }
    .page .nav-left .navDiv .measure,.page .nav-left .navDiv .dimension {
        width: 100%;
        height: 50%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .navName {
        padding: 12px 20px !important;
        letter-spacing: 0.05em;
        font-size: 11px;
        color: #5a5454;
        font-weight: 700;
    }
    dl, ol, ul {
        margin-top: 0;
        margin-bottom: 1rem;
    }
    .nav-list ul .nav-tab {
        list-style: none;
        position: relative;
    }
    .page .nav-left .navDiv .nav-list ul .nav-tab .li-a {
        padding: 12px 15px 12px 25px !important;
        text-decoration: none;
        display: block;
        padding: 0.65rem 1.5rem;
        font-size: 14px;
        /*color: #5a5454;*/
        color: black;
    }
    .page .nav-left .navDiv .nav-list ul .nav-tab .li-a .iconfont {
        font-size: 17px;
        vertical-align: text-top;
        margin-right: 6px;
    }
    .page .nav-left .navDiv .nav-list ul .a_active {
        background-color: #f2f0f8;
    }
    .page .nav-left .navDiv .nav-list ul .a_active .active {
        color: #6d61ea !important;
        font-weight: 700;
    }
    .page .nav-left .navDiv .nav-list .li-a {
        transition: all 0.8s;
        margin-left: 0px;
    }
    a {
        color: #007bff;
        text-decoration: none;
        background-color: transparent;
    }
    .page .nav-right {
        display: flex;
        flex-direction: column;
        padding-left: 240px;
        transition: all .5s;
        z-index: 200;
    }
    .page .nav-top {
        flex: 1;
        height: 60px;
        width: 100%;
        padding: 20px;
        background-color: #FFFFFF;
        box-shadow: 10px 0px 17px rgb(72 72 72 / 20%);
        z-index: 200;
    }
    .page .content-page {
        z-index: 300;
        flex: 1;
        position: absolute;
        top: 60px;
        left: 240px;
        right: 0;
        bottom: 0;
        transition: all .5s;
        background-color: #FFFFFF;
        margin: 15px;
        overflow: scroll;
        padding: 5px;
    }
    table {
        border-collapse: collapse;
        font-size: 14px;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        color: black;
        display: block;
    }
    table tr {
        height: 40px;
        line-height: 40px;
    }
    table.border td, table.border th {
        /*border: solid 1px #555;*/
        border: 1px solid #b9bcbe;
        background: #eee;
    }
    table td, table th {
        padding: 0;
    }
    table tr {
        height: 40px;
        line-height: 40px;
    }
    table.border td, table.border th {
        /*border: solid 1px #555;*/
        border: 1px solid #b9bcbe;
    }
    table td {
        padding: 0 14px;
        text-align: center;
    }
    table td,table th {
        padding: 0px 5px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .options {
        display: none;
        position: absolute;
        left: 90px;
        z-index: 300;
        top: 45px;
        width: 120px;
        height: 200px;
        overflow: scroll;
        padding: 10px 0px;
        margin-bottom: 0;
        border-top-right-radius: 0px;
        border-top-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        background-color: #E6A23C;
        opacity: 0.9;
    }
    .options::before {
        content: '';
        display: block;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 10px solid #03a9f4;
        position: absolute;
        right: 0px;
        top: -10px;
    }
    .options li {
        list-style: none;
        height: 26px;
        line-height: 26px;
        margin-left: 20px;
        margin-bottom: 4px;
    }
    .options li:hover {
        background-color: #00aa88;
    }
    .options li a {
        text-decoration: none;
        color: white;
    }
    .nav-tab.current .options {
        display: block;
    }

    .popup.show {
        opacity: 1;
        transform: translate(-50%, -100%) scale(1);
    }
    .popup.associatedPopupShow {
        opacity: 1;
        transform: translate(-50%, -70%) scale(1);
    }
    .popup.mergePopupShow {
        opacity: 1;
        transform: translate(-50%, -70%) scale(1);
    }
    .popup.breakPopupShow {
        opacity: 1;
        transform: translate(-50%, -70%) scale(1);
    }
    .popup.filterPopupShow {
        opacity: 1;
        transform: translate(-50%, -70%) scale(1);
    }
    .popup.conditionsPopupShow {
        opacity: 1;
        transform: translate(-50%, -70%) scale(1);
    }
    .popup {
        position: absolute;
        left: 50%;
        top: 50%;
        background: #181f29;
        z-index: 300;
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
    .popup-body.associatedPopup {
        height: 290px;
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
    .breakPopup {
        min-height: 290px;
        max-height: 800px;
        width: 750px;
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
    .condFields {
        list-style: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .condFields li {
        padding: 0px 5px;
    }
    .level {
        margin-bottom: 0 !important;
        color: black;
        margin: 0 20px;
        list-style: none;
        padding: 0;
        padding-left: 5px;
        display: none;
    }
    .level.active {
        display: block;
    }
    .level li {
        margin: 0;
        padding: 5px 5px 5px 15px;
        display: block;
        font-size: 14px;
        color: #8aa4af;
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

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(49 52 52 / 0.5);
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        background: none;
        border-radius: 5px;
    }
</style>