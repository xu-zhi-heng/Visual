<template>
    <div style="position: relative; user-select: auto; width: 340px; height: 100%; max-width: 50%; min-width: 340px; box-sizing: border-box; flex-shrink: 0;" class="Attribute">
        <div class="AttributeSide_attrRoot__51-Eo">
            <!--修改内容-->
            <div class="AttributeSide_content__3rm2n">
                <component :is="edit" :ComponentStyles="ComponentStyles" :echartsOption="echartsOption"></component>
            </div>
            <!--操作选择-->
            <div class="AttributeSide_tabBox__1hkCR">
                <div class="AttributeSide_tab__20pFP" :class="item.index == AttributeSide.currentIcon ? 'AttributeSide_tabSelected__2qyTI' : '' " v-for="(item,index) in AttributeSide.AttributeSide_icon" :key="item.index" @click="ChooseAttributeIcon(item.index)" v-if="(item.icon != 'iconcss' || isIconcss)">
                    <span role="img" class="anticon" >
                        <i class="iconfont" :class="item.icon" :title="item.type" @click="action(index)"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import GlobalStyles from "../attributes/GlobalStyles";
    import ComponentStyles from "../attributes/ComponentStyles";
    import ComponentParameters from "../attributes/ComponentParameters";
    import CanvasLayers from "../attributes/CanvasLayers";
    import {mapGetters} from 'vuex'
    export default {
        name: "ComponentAttributes",
        props: ['ComponentStyles','echartsOption'],
        data() {
            return {
                AttributeSide: {
                    AttributeSide_icon: [
                        {
                            type: '页面设置',
                            icon: 'iconyemian',
                            index: 0
                        },
                        {
                            type: '样式设置',
                            icon: 'iconcss',
                            index: 1
                        },
                        {
                            type: '组件配置',
                            icon: 'iconzujian',
                            index: 2
                        },
                        {
                            type: '图层',
                            icon: 'icontuceng',
                            index: 3
                        }
                    ],
                    AttributeSide_type: '',
                    AttributeSide_components: [],
                    currentIcon: 0
                },
                edit: GlobalStyles,
            }
        },
        computed: {
            ...mapGetters([
                'isIconcss'
            ])
        },
        methods: {
            action(index) {
                if(index == 0) {
                    this.edit = GlobalStyles
                }else if(index == 1){
                    this.edit = ComponentStyles
                }else if(index == 2) {
                    this.edit = ComponentParameters
                }else {
                    this.edit = CanvasLayers
                }
            },
            ChooseAttributeIcon(index) {
                if(index == this.AttributeSide.currentIcon) {
                    this.AttributeSide.currentIcon = -1
                    $(".Attribute").css('width','')
                    $(".Attribute").css('minWidth','')
                    $(".Attribute").css('width','40px')
                    $(".AttributeSide_content__3rm2n").css('display','none')
                }else if(this.AttributeSide.currentIcon === -1) {
                    this.AttributeSide.currentIcon = index
                    $(".Attribute").css('width','')
                    $(".Attribute").css('minWidth','340px')
                    $(".Attribute").css('width','340px')
                    $(".AttributeSide_content__3rm2n").css('display','block')
                }else {
                    this.AttributeSide.currentIcon = index
                }
            }
        },
    }
</script>

<style scoped>
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background: #666;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        background: none;
        border-radius: 5px;
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
    .AttributeSide_attrRoot__51-Eo {
        height: 100%;
        background: #212c3d;
        display: flex;
    }
    .AttributeSide_content__3rm2n {
        width: 100%;
        height: 100%;
        background: #1d2636;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .AttributeSide_tabBox__1hkCR {
        width: 40px;
        flex-shrink: 0;
        border-left: 1px solid #303247;
    }
    .AttributeSide_tab__20pFP {
        height: 30px;
        font-size: 18px;
        text-align: center;
        color: #92abcf;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 0;
        margin: 10px 5px;
        cursor: pointer;
    }
    .AttributeSide_tabSelected__2qyTI {
        color: #1d2636;
        background-color: #11ece5;
        border-radius: 4px;
    }
</style>