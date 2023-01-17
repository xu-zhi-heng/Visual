<template>
    <div class="nav-right" style="padding-left: 240px" id="navRight">
        <div class="nav-top">
            <el-button type="danger" size="mini" @click.stop.prevent="PackUp" v-show="isOpen">收起</el-button>
            <el-button type="success" size="mini" @click.stop.prevent="Open" v-show="!isOpen">展开</el-button>
            <div style="float: right">
                <el-button plain size="mini">清空过滤条件</el-button>
                <el-button type="warning" size="mini" @click.stop.prevent="flash">刷新</el-button>
                <el-button type="primary" size="mini" @click.stop.prevent="save">保存</el-button>
                <el-button type="success" size="mini" @click.stop.prevent="NewIndicators">新建指标</el-button>
            </div>
        </div>
        <div class="content-page" style="height: calc(100% - 70px)" id="contentPage">
            <vxe-toolbar>
                <template #buttons>
                    <vxe-button @click="allAlign = 'left'">居左</vxe-button>
                    <vxe-button @click="allAlign = 'center'">居中</vxe-button>
                    <vxe-button @click="allAlign = 'right'">居右</vxe-button>
                    <vxe-button @click="showHeader = !showHeader">显示/隐藏表头</vxe-button>
                    <vxe-button @click="getSelectEvent">获取选中</vxe-button>
                    <vxe-button @click="importDataEvent">导入数据</vxe-button>
                    <vxe-button @click="exportDataEvent">导出数据</vxe-button>
<!--                    <vxe-button @click="clearDataEvent">清空数据</vxe-button>-->
                    <vxe-button @click="exportSelectEvent">导出选中</vxe-button>
                    <vxe-button @click="openExportEvent">高级导出</vxe-button>
                </template>
            </vxe-toolbar>
            <vxe-table
                    ref="xTable1"
                    resizable
                    border
                    round
                    show-header-overflow
                    show-overflow
                    stripe
                    highlight-hover-row
                    highlight-current-row
                    highlight-hover-column
                    highlight-current-column
                    max-height="auto"
                    :show-header="showHeader"
                    class="mytable-style"
                    :cell-class-name="cellClassName"
                    @cell-click="cellClickEvent"
                    @checkbox-all="selectAllEvent"
                    @checkbox-change="selectChangeEvent"
                    :loading="loading"
                    empty-text="没有更多数据了！"
                    :export-config="{}"
                    :sort-config="{trigger: 'cell', defaultSort: {field: 'age', order: 'desc'}, orders: ['desc', 'asc', null], multiple: true}"
                    :align="allAlign"
                    :data="DataStore"
                    :edit-config="{trigger: 'dblclick', mode: 'cell'}">
                <vxe-table-column type="checkbox" width="60"></vxe-table-column>
                <template v-for="(item,index) in DataHeadStore">
                    <vxe-table-column :field="item"
                                      :title="item"
                                      show-header-overflow="ellipsis"
                                      width="20%"
                                      show-overflow
                                      sortable
                                      :filters="[]"
                                      :edit-render="{name: 'input', attrs: {type: 'text'}, placeholder: '数据为空'}"></vxe-table-column>
                </template>
            </vxe-table>
            <vxe-pager
                    :loading="loading1"
                    :current-page="tablePage1.currentPage"
                    :page-size="tablePage1.pageSize"
                    :total="tablePage1.totalResult"
                    :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                    @page-change="handlePageChange1">
            </vxe-pager>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import axios from "axios";
    import {getToken} from "../../api/auth";
    import {mapGetters} from 'vuex'
    import {processing} from "../js/processing";
    export default {
        name: "NavRight",
        mixins: [processing],
        data() {
            return {
                dataSetId: '',
                isOpen: true,
                // 表格
                allAlign: "",
                showHeader: true,
                selectRow: null,
                selectColumn: null,
            }
        },
        methods: {
            // 新建指标
            NewIndicators() {
                $('#dataTreat').addClass('before')
                $('#indicatorsPopup').addClass('indicatorsShow')
                $('#panels').css('top','50%')
                $('#indicatorsPopup').css('zIndex','1500')
                this.$store.commit('setIndexParameters',[])
                for(let item in this.dataSetStructure) {
                    if(item === 'dimension' || item === 'measure') {
                        for(let item1 of this.dataSetStructure[item]) {
                            if(item1.level.length === 0) {
                                if(item1.type === 'number') {
                                    let obj = {}
                                    if(item1.label !== '') {
                                        obj.value = item1.label
                                        obj.label = item1.label
                                        this.$store.commit('pushIndexParameters',obj)
                                    }else {
                                        obj.value = item1.caption
                                        obj.label = item1.caption
                                        this.$store.commit('pushIndexParameters',obj)
                                    }
                                }
                            }else {
                                if(item1.type === 'number') {
                                    let obj = {}
                                    if(item1.isNew === 1) {
                                        if(item1.label !== '') {
                                            obj.value = item1.label
                                            obj.label = item1.label
                                            this.$store.commit('pushIndexParameters',obj)
                                        }else {
                                            obj.value = item1.caption
                                            obj.label = item1.caption
                                            this.$store.commit('pushIndexParameters',obj)
                                        }
                                    }else {
                                        for(let item2 of item1.level) {
                                            if(item2.type === 'number') {
                                                if(item2.label !== '') {
                                                    obj.value = item2.label
                                                    obj.label = item2.label
                                                    this.$store.commit('pushIndexParameters',obj)
                                                }else {
                                                    obj.value = item2.caption
                                                    obj.label = item2.caption
                                                    this.$store.commit('pushIndexParameters',obj)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                console.log(this.IndexParameters)
            },
            PackUp() {
                $('#navLeft').css('display','none')
                $('#navRight').css('paddingLeft','0px')
                $('#contentPage').css('left','0px')
                this.isOpen = !this.isOpen
            },
            Open() {
                $('#navLeft').css('display','block')
                $('#navRight').css('paddingLeft','240px')
                $('#contentPage').css('left','240px')
                this.isOpen = !this.isOpen
            },
            flash() {
                // this.clearDataEvent()
                this.findList1()
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

            // 表格
            cellClassName ({ row, column }) {
                if (row === this.selectRow & column === this.selectColumn) {
                    return 'col-orange'
                }
            },
            cellClickEvent ({ row, column }) {
                this.selectRow = row
                this.selectColumn = column
            },
            selectAllEvent ({ checked, records }) {
                console.log(checked ? '所有勾选事件' : '所有取消事件', records)
            },
            selectChangeEvent ({ checked, records }) {
                console.log(checked ? '勾选事件' : '取消事件', records)
            },
            getSelectEvent () {
                let selectRecords = this.$refs.xTable1.getCheckboxRecords()
                alert(selectRecords.length)
            },
            // clearDataEvent () {
            //     this.Data = []
            // },
            exportDataEvent () {
                this.$refs.xTable1.openExport({
                    // 默认勾选源
                    original: true
                })
            },
            importDataEvent () {
                this.$refs.xTable1.importData()
            },
            exportSelectEvent () {
                this.$refs.xTable1.exportData({
                    data: this.$refs.xTable1.getCheckboxRecords()
                })
            },
            openExportEvent () {
                this.$refs.xTable1.openExport()
            },
            handlePageChange1 ({ currentPage, pageSize }) {
                this.tablePage1.currentPage = currentPage
                this.tablePage1.pageSize = pageSize
                this.findList1()
            },

        },
        created() {
            this.dataSetId = this.$route.query.dataSetId
        },
        computed: {
            ...mapGetters([
                'dataSetStructure',
                'IndexParameters'
            ])
        },
        mounted() {
            this.findList1(null)
        }
    }
</script>

<style scoped>
    .nav-right {
        display: flex;
        flex-direction: column;
        padding-left: 240px;
        transition: all .5s;
        z-index: 200;
    }
    .nav-top {
        flex: 1;
        height: 60px;
        width: 100%;
        padding: 20px;
        background-color: #FFFFFF;
        box-shadow: 10px 0px 17px rgb(72 72 72 / 20%);
        z-index: 200;
    }
    .content-page {
        z-index: 400;
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
    .content-page::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    .content-page::-webkit-scrollbar-thumb {
        background: rgba(49 52 52 / 0.5);
        border-radius: 5px;
    }
    .content-page::-webkit-scrollbar-track {
        background: none;
        border-radius: 5px;
    }

    /*表格*/
    /deep/ .mytable-style.vxe-table .vxe-body--column.col-orange {
        background-color: #f60;
        color: #fff;
    }
    /*滚动条整体部分*/
    /deep/ .mytable-scrollbar ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    /*滚动条的轨道*/
    /deep/ .mytable-scrollbar ::-webkit-scrollbar-track {
        background-color: #FFFFFF;
    }
    /*滚动条里面的小方块，能向上向下移动*/
    /deep/ .mytable-scrollbar ::-webkit-scrollbar-thumb {
        background-color: #bfbfbf;
        border-radius: 5px;
        border: 1px solid #F1F1F1;
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
    /deep/ .mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
        background-color: #A8A8A8;
    }
    /deep/ .mytable-scrollbar ::-webkit-scrollbar-thumb:active {
        background-color: #787878;
    }
    /*边角，即两个滚动条的交汇处*/
    /deep/ .mytable-scrollbar ::-webkit-scrollbar-corner {
        background-color: #FFFFFF;
    }
</style>