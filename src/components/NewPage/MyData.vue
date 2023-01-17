<template>
    <!--数据集-->
    <div id="myData">
        <div class="form-row3">
            <div class="col5">
                <div class="item-box">
                    <div class="item-title">数据集</div>
                    <div class="item-con">
                        <table class="border-bottom" id="dataSetTable">
                            <thead>
                                <tr>
                                    <th>名称</th>
                                    <th>描述</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in DataSet" :key="item.id">
                                    <td>{{item.title}}</td>
                                    <td>{{item.describe}}</td>
                                    <td class="border-btn">
                                        <button @click.stop.prevent="goIndex(item.id)">
                                            <span>预处理</span>
                                        </button>
                                        <button @click.stop.prevent="getDataSetInfo(item.id)">
                                            <span>预览</span>
                                        </button>
                                        <button @click="clean(item.id)" title="去掉空值和重复值">
                                            <span>清洗</span>
                                        </button>
                                        <button @click.stop.prevent="deleteDataSet(item.id)">
                                            <span>删除</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col7">
                <div class="item-box">
                    <div class="item-title">数据集信息</div>
                    <div class="item-con">
                        <div id="dataSet">
                            <dv-border-box-8 :reverse="true">
                                <div class="bar">
                                    <div class="capsule">
                                        <dv-capsule-chart :config="capsule" style="width:400px;height:200px"/>
                                    </div>
                                    <div class="scroll">
                                        <dv-scroll-ranking-board :config="scroll" style="width:400px;height:300px"/>
                                    </div>
                                </div>
                                <div class="water">
                                    <dv-water-level-pond :config="water" style="width:150px;height:200px"/>
                                </div>
                            </dv-border-box-8>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import database from "../../api/database";
    import Cookies from 'js-cookie'
    import {mapGetters} from 'vuex'
    import {mixin} from "../../mixins";
    import csv from "../../api/csv";

    export default {
        name: "MyData",
        mixins: [mixin],
        data() {
            return {
                capsule: {},
                water: {},
                scroll: {}
            }
        },
        methods: {
            clean(id) {
                csv.cleanCsv(id).then(res => {
                    if(res.code == 1) {
                        this.$message({
                            showClose: true,
                            message: "清洗成功",
                            type: 'success'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            getDataSet() {
                let userId = Cookies.get('userId')
                database.getDataSetByUserId(userId).then(res => {
                    if(res.code == 1) {
                        this.$store.commit('setDataSet',res.data.item)
                        this.getDataSetInfo(res.data.item[0].id)
                    }else {
                        this.$store.commit('setDataSet',null)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            getDataSetInfo(id) {
                database.getDataSetInfoById(id).then(res => {
                    if(res.code == 1) {
                        let item = res.data.item
                        this.capsule = {
                            data: [
                                {
                                    name: '总行数',
                                    value: item.rows_count
                                },
                                {
                                    name: '空值行数',
                                    value: item.na_count
                                },
                                {
                                    name: '重复行数',
                                    value: item.duplicate_count
                                }
                            ],
                            unit: '行',
                            showValue: true,
                            colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff']
                        }
                        this.water = {
                            data: [item.duplicated_rate * 100]
                        }
                        let scroll = []
                        for(let index in item.na_rate_df) {
                            scroll.push({
                                name: index,
                                value: item.na_rate_df[index][0].toFixed(2) * 100
                            })
                        }
                        this.scroll = {
                            data: scroll,
                            unit: '%',
                            waitTime: 1000
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            deleteDataSet(id) {
                database.deleteDataSetById(id).then(res => {
                    if(res.code == 1) {
                        this.$message({
                            showClose: true,
                            message: "删除成功",
                            type: 'success'
                        });
                        this.getDataSet()
                    }else {
                        this.$message({
                            showClose: true,
                            message: "删除成功",
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            goIndex(id) {
                this.$router.push({path: '/dataProcessing',query: {dataSetId: id}})
            }
        },
        mounted() {
            this.getDataSet()
        },
        computed: {
            ...mapGetters([
                'DataSet'
            ])
        }
    }
</script>

<style scoped>
    #myData {
        height: 100%;
        width: 100%;
    }
    #myData .form-row3 {
        display: flex;
    }
    #myData .form-row3 > .col5 {
        padding-right: 20px;
        height: 600px;
        width: 41.66%;
        overflow-y: scroll;
    }
    #myData .form-row3 > .col7 {
        padding-left: 10px;
        height: 600px;
        width: 58.33%;
    }
    .col1, .col2, .col3, .col4, .col5, .col6, .col7, .col8, .col9, .col10, .col11, .col12 {
        float: left;
    }
    .item-box>.item-title {
        height: 60px;
        padding-top: 10px;
        margin-top: -60px;
        line-height: 50px;
        padding-left: 14px;
        color: #aaa;
        font-weight: 600;
    }
    #myData .form-row3 .item-con {
        padding: 20px 25px;
    }
    .item-con {
        height: 100%;
        position: relative;
    }
    table {
        color: #cccccc;
    }
    table {
        border-collapse: collapse;
        font-size: 14px;
        padding: 0;
        margin: 0;
        width: 100%;
    }
    table td, table th {
        padding: 0;
    }
    table td {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    table tr {
        height: 40px;
        line-height: 40px;
    }
    table td {
        padding: 0 14px;
        text-align: center;
    }
    table.border-bottom thead tr {
        background: rgba(255, 255, 255, 0.1);
    }
    table.border-bottom tbody tr {
        border-bottom: solid 1px #555;
    }
    #dataSet {
        height: 100%;
        width: 100%;
    }
    /deep/ .dv-border-box-8 .border-box-content {
        display: flex;
    }
    #dataSet .bar {
        flex: 2;
    }
    #dataSet .water {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #235fa7;
    }
    .scroll {
        padding-left: 80px;
        padding-top: 15px;
    }
    /deep/ .scroll {
        height: 0% !important;
    }
    .capsule {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #235fa7;
    }
    /*变化按钮*/
    .border-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
    }
    .border-btn button {
        border: 0;
        border-radius: 1px;
        background: #2ec4b6;
        color: white;
        font-size: 12px;
        font-weight: bold;
        padding: 5px 7px;
        outline: none;
        position: relative;
        transition: border-radius 0.5s;
        -webkit-transition: border-radius 0.5s;
        box-sizing: border-box;
        line-height: 1;
    }
    .border-btn button:first-child {
        background-color: #21a6df;
        margin-right: 4px;
    }
    .border-btn button:nth-child(2) {
        background-color: #67c23a;
        margin-right: 4px;
    }
    .border-btn button:nth-child(3) {
        background-color: #3a9bc2;
        margin-right: 4px;
    }
    .border-btn button:last-child {
        background-color: #e6a23c;
    }
    .border-btn button:hover{
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 1px;
        border-top-right-radius: 1px;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.1);
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        background: none;
        border-radius: 5px;
    }
</style>