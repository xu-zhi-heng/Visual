<template>
    <div class="nav-left" id="navLeft">
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
</template>

<script>
    import datapre from "../../api/datapre";
    import {processing} from "../js/processing";
    import {mapGetters} from 'vuex'
    export default {
        name: "NavLeft",
        mixins: [processing],
        data() {
            return {
                dataSetId: '',              // 数据集id
                currentMeasureIndex: -1,    // 当前点击的度量（用来css显示）
                currentDimensionIndex: -1,  // 当前点击的维度（用来css显示）
            }
        },
        methods: {
            goHome() {
                this.$router.push("/sweetfun")
            },
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
            getIconByType(type) {
                if(type === 'date') {
                    return 'iconriqi'
                }else if(type === 'text') {
                    return 'iconzifuchuanshujuji'
                }else {
                    return 'iconshuzhi'
                }
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
        },
        mounted() {
            datapre.PreviewStructure(this.dataSetId).then(res => {
                console.log(res)
                if(res.code == 1) {
                    this.$store.commit('setDataSetStructure',res.data.item)
                    this.dataSetStructure.datasetId = this.dataSetId
                }
            }).catch(err => {
                console.log(err)
            })
        },
        computed: {
            ...mapGetters([
                'dataSetStructure',
                'dataSetStructure1'
            ])
        },
        created() {
            this.dataSetId = this.$route.query.dataSetId
        },
    }
</script>

<style scoped>
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