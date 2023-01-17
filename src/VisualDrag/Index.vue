<template>
    <div id="root" @click="getPoint($event)">
        <div class="layout_layout__3Opi1">
            <div class="ContentLayout_root__2XtMx">
                <VisualHeader/>
                <div class="ContentLayout_content__1GR6P">
                    <!--侧边内容-->
                    <div class="ComponentSide_bar__3EiAU">
                        <!--组件分类图标-->
                        <ComponentCategoryIcon/>
                        <!--组件详细内容,一开始是不显示的，点击对应的图标显示对应的内容-->
                        <div class="ComponentSide_components__2Wcic" id="ComponentSide_components__2Wcic">
                            <!--图表类型头提示-->
                            <ComponentCategoryTitle/>
                            <!--图表组件,当点击对应的图标时候才会出现-->
                            <ComponentBox/>
                        </div>
                    </div>

                    <!--头部操作栏-->
                    <HeaderActionBar/>

                    <!--大屏仪表板-->
                    <DashBoard @componentStyles="getStyles" @echartOptions="getEchartOptions"/>

                    <!--组件属性-->
                    <ComponentAttributes :ComponentStyles="ComponentStyles" :echartsOption="echartsOption"/>
                </div>
            </div>
        </div>

        <div id="panels">
            <get-data/>
            <AdvancedComputing/>
        </div>

    </div>
</template>

<script>
    import VisualHeader from "../components/VisualEditing/VisualHeader";
    import ComponentCategoryIcon from "./components/ComponentCategoryIcon";
    import ComponentCategoryTitle from "./components/ComponentCategoryTitle";
    import ComponentBox from "./components/ComponentBox";
    import HeaderActionBar from "./components/HeaderActionBar";
    import DashBoard from "./components/DashBoard";
    import ComponentAttributes from "./components/ComponentAttributes";
    import GetData from "./panels/getData";
    import AdvancedComputing from "./panels/AdvancedComputing";
    export default {
        name: "Index",
        data() {
            return {
                ComponentStyles: {},
                echartsOption: {}
            }
        },
        components: {
            AdvancedComputing,
            GetData,
            ComponentAttributes,
            DashBoard,
            HeaderActionBar,
            ComponentBox,
            ComponentCategoryTitle,
            ComponentCategoryIcon,
            VisualHeader
        },
        methods: {
            getStyles(styles) {
                this.ComponentStyles = styles
            },
            getEchartOptions(options) {
                this.echartsOption = options
            },
            // 获取用户的点击页面的坐标
            getPoint(event) {
                let flag = true
                let x = event.clientX
                let y = event.clientY
                let value = 1
                let points = JSON.parse(window.localStorage.getItem('points'))
                for(let i = 0; i < points.length; i++) {
                    let item = points[i]
                    if(item.x == x && item.y == y) {
                        item.value++
                        flag = false
                        break
                    }
                }
                if(flag) {
                    let point = {
                        x: x,
                        y: y,
                        value: value,
                    }
                    points.push(point)
                }
                window.localStorage.setItem('points',JSON.stringify(points))
            }
        },
        created() {
            if(window.localStorage.getItem('points') === null) {
                let obj = {
                    x: 0,
                    y: 0,
                    value: 1,
                }
                let points = []
                points.push(obj)
                window.localStorage.setItem('points',JSON.stringify(points))
            }
        }
    }
</script>

<style scoped>
    #root {
        height: 100%;
        width: 100%;
        background: #040609;
        clear: both;
        font-family: "Microsoft Yahei",serif;
        margin: 0;
        padding: 0;
        font-size: 14px;
        box-sizing: border-box;
    }
    #root:before{
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
    #root.before::before{
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
    .layout_layout__3Opi1 {
        height: 100%;
        color: #e3e6ff;
    }
    .ContentLayout_root__2XtMx {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .ContentLayout_content__1GR6P {
        flex-grow: 1;
        height: 100%;
        display: flex;
        overflow: hidden;
    }
    .ComponentSide_bar__3EiAU {
        display: flex;
        height: 100%;
    }
    .ComponentSide_components__2Wcic {
        height: 100%;
        width: 240px;
        background: #1d2636;
        border-left: 1px solid #303247;
        overflow: hidden;
        display: none;
        flex-direction: column;
    }
    .ComponentSide_components__2Wcic{
        animation-name: show;
        animation-duration: 0.3s;
        animation-fill-mode: backwards;
    }
    @keyframes show {
        from{
            margin-left: -240px;
        }
        to{
            margin-left: 0px;
        }
    }
    .ComponentSide_bar__3EiAU{
        animation-name: leftShow;
        animation-duration: 0.8s;
        animation-fill-mode: backwards;
    }
    @keyframes leftShow {
        from{
            margin-left: -40px;
        }
        to{
            margin-left: 0px;
        }
    }
    #panels {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        transform: translate(-50%,-50%);
    }
    /deep/ .heatmap-canvas {
        z-index: 100 !important;
    }
</style>