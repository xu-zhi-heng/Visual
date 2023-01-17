<template>
    <div class="mojito-row ComponentSide_componentBox__3hozc" style="row-gap: 0px" @dragstart="dragStart"  @dragend="dragEnd">
        <div v-for="(item,key,index) in ComponentSide_components[componentCategoryIcon]" :key="index" class="mojito-col mojito-col-24" style="padding: 0px 10px;" >
            <div class="ComponentSide_componentView__3zsgD" draggable="true" :data-type="key">
                <div class="ComponentSide_componentImg__2GroC">
                    <span role="img" class="anticon" style="font-size: 48px; color: rgb(227, 230, 255);">
                        <i class="iconfont" :class="item.img" style="font-size: 48px;margin-top: 22px"></i>
                    </span>
                </div>
                <div class="ComponentSide_componentTitle__3TWSi">{{item.text}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import TitleBox from "../charts/TitleBox";
    import PictureBox from "../charts/PictureBox";
    import {mapGetters} from 'vuex'
    import {dragEvent} from "../js/dragEvent";
    import TheLineChart from "../charts/TheLineChart";
    import TheHistogram from "../charts/TheHistogram";
    import ThePieChart from "../charts/ThePieChart";
    import TheAreaChart from "../charts/TheAreaChart";
    import TheScatterDiagram from "../charts/TheScatterDiagram";
    import DataTable from "../charts/DataTable";
    import ClusterChart from "../charts/ClusterChart";
    export default {
        name: "ComponentBox",
        mixins: [dragEvent],
        data() {
            return {
                ComponentSide_components: [                                              // 组件
                    {
                        line:{
                            img: 'iconzhexiantu',
                            text: '折线图',
                            com: TheLineChart,
                        },
                        histogram:{
                            img: 'iconzhuzhuangtutubiao',
                            text: '柱状图',
                            com: TheHistogram,
                        },
                        clusterChart:{
                            img: 'iconjulei',
                            text: '聚类图',
                            com: ClusterChart,
                        },
                        pie:{
                            img: 'iconbingtu',
                            text: '饼图',
                            com: ThePieChart,
                        },
                        area:{
                            img: 'iconduijimianjitu',
                            text: '面积图',
                            com: TheAreaChart,
                        },
                        scatter:{
                            img: 'iconsandiantu',
                            text: '散点图',
                            com: TheScatterDiagram,
                        },
                        table:{
                            img: 'iconbiaoge',
                            text: '表格',
                            com: DataTable,
                        },
                    },
                    {
                        text: {
                            img: 'iconwenzi',
                            text: '文本',
                            com: TitleBox
                        },
                    },
                    {
                        image:{
                            img: 'icontupian',
                            text: '图片',
                            com: PictureBox
                        }
                    },
                ],
            }
        },
        methods: {
        },
        computed: {
            ...mapGetters([
                'componentCategoryIcon',
                'componentArray',
                'componentType'
            ])
        },
    }
</script>

<style scoped>
    .ComponentSide_componentBox__3hozc {
        flex-grow: 1;
        flex-basis: 0;
        overflow: auto;
        align-content: flex-start;
    }
    .mojito-row {
        display: flex;
        flex-flow: row wrap;
    }
    .mojito-col {
        position: relative;
        min-height: 1px;
    }
    .mojito-col-24 {
        display: block;
        flex: 0 0 100%;
        max-width: 100%;
    }
    .ComponentSide_componentView__3zsgD {
        width: 100%;
        height: 102px;
        background: #191b23;
        display: inline-block;
        position: relative;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
    }
    .ComponentSide_componentView__3zsgD:hover {
        border: 1px solid #03a9f4;
    }
    .ComponentSide_componentImg__2GroC {
        text-align: center;
        pointer-events: none;
        margin-top: 12px;
    }
    .anticon {
        display: inline-block;
        color: inherit;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;
        vertical-align: -.125em;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    .anticon i {
        display: inline-block;
    }
    .ComponentSide_componentTitle__3TWSi {
        text-align: center;
        position: absolute;
        top: 68px;
        width: 100%;
    }
</style>