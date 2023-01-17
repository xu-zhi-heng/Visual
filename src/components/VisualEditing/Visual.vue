<template>
    <div id="root">
        <div class="layout_layout__3Opi1">
            <!--头部信息-->
            <div class="ContentLayout_root__2XtMx">
                <VisualHeader/>
                <!--中间内容-->
                <div class="ContentLayout_content__1GR6P">
                    <!--侧边内容-->
                    <div class="ComponentSide_bar__3EiAU">
                        <!--组件图标-->
                        <div class="ComponentSide_category__1sNY8" style="z-index: 99999">
                            <div v-for="(item) in ComponentSide.ComponentSide_icon" :key="item.index" class="ComponentSide_icon__1vrU7" :class="item.index == ComponentSide.currentIcon ? 'ComponentSide_iconSelected__3UNGU' : '' " @click="ChooseComponentIcon(item.index)">
                                <span role="img" class="anticon">
                                    <i class="iconfont" :class="item.icon" @click="ChooseComponentIcon(item.index)"></i>
                                </span>
                            </div>
                        </div>

                        <!--组件详细内容,一开始是不显示的，点击对应的图标显示对应的内容-->
                        <div class="ComponentSide_components__2Wcic" ref="ComponentSide_components__2Wcic">
                            <!--图表类型头提示-->
                            <div class="ComponentSide_cateTitle__2dqZl">
                                {{ComponentSide.ComponentSide_type}}
                                <span class="ComponentSide_close__b-tZ0">
                                    <span role="img" aria-label="close" class="anticon anticon-close">
                                        <i class="iconfont iconchahao" @click="close"></i>
                                    </span>
                                </span>
                            </div>

                            <!--图表组件,当点击对应的图标时候才会出现-->
                            <div class="mojito-row ComponentSide_componentBox__3hozc" style="row-gap: 0px" @dragstart="dragStart"  @dragend="dragEnd">
                                <div v-for="(item,key,index) in ComponentSide.ComponentSide_components[ComponentSide.currentIcon]" :key="index" class="mojito-col mojito-col-24" style="padding: 0px 10px;" >
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
                        </div>
                    </div>

                    <!--头部操作栏-->
                    <div class="Playground_actionBar__1-h20">
                        <!--大小收缩菜单-->
                        <div class="Playground_zoomBox__z21We">
                            <div class="Playground_zoomBtn__2YF2V">
                                <span role="img" aria-label="minus" class="anticon" @click="scale('minus')">
                                    <i class="iconfont iconjianhao"></i>
                                </span>
                            </div>
                            <div class="Playground_zoomBtn__2YF2V" style="width: 50%">
                                {{scaleSize + '%'}}
                            </div>
                            <div class="Playground_zoomBtn__2YF2V" style="margin-bottom: 2px" @click="scale('plus')">
                                <span role="img" aria-label="minus" class="anticon">
                                    <i class="iconfont iconjiahao"></i>
                                </span>
                            </div>
                        </div>
                        <!--其他操作-->
                        <div class="Playground_toolbar__2AZ8M">
                            <span role="img" tabindex="-1" class="anticon IconFont_iconLink__V-Gb1" style="margin: 0 12px; cursor: pointer;">
                                <i class="iconfont iconbaocun" style="font-size: 22px" @click.stop.prevent="saveImage" id="saveImage"></i>
                            </span>
                            <span role="img" tabindex="-1" class="anticon IconFont_iconLink__V-Gb1" style="margin: 0 12px; cursor: pointer;">
                                <i class="iconfont iconyulan1" style="font-size: 22px" @click.stop.prevent="yulan"></i>
                            </span>
                        </div>
                    </div>

                    <!--大屏部分-->
                    <div class="Playground_root__3qvBq">
                        <div class="Playground_area__Fv-_L" ref="allScreen">
                            <div style="margin: auto; width: 768px; height: 432px;" ref="screen">
                                <div class="screenContainer" ref="screenContainer" @drag="drog" @dragover="dragOver" id="screenContainer">
                                    <template v-for="(item,index) in view">
<!--                                        @click.capture.stop-->
                                        <div v-if="index >= 0" :data-index="item.index" :key="index" class="item" @click.stop="selectType($event,index)" :style="getTransform(item.style,item.isOld,index)">
                                            <VueDraggableResizable :w="VueDraggableResizableWidth(item.type,item.style.width)" :h="VueDraggableResizableHeight(item.type,item.style.height)" :grid="[10,10]" @resizing="onResize"  @dragging="onDrag" parent=".screenContainer">
                                                <template v-if="item.status && item.status == 2">
                                                    <div class="wait">{{item.type}}</div>
                                                </template>
                                                <template v-else>
                                                    <component :is="ComponentSide.components[item.type]['com']"
                                                               :data="item" :style="getViewStyles(item.style,item.isOld,index)">
                                                    </component>
                                                </template>
                                            </VueDraggableResizable>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>


                    <!--属性控制项-->
                    <div style="position: relative; user-select: auto; width: 340px; height: 100%; max-width: 50%; min-width: 340px; box-sizing: border-box; flex-shrink: 0;" class="Attribute">
                        <div class="AttributeSide_attrRoot__51-Eo">
                            <!--修改内容-->
                            <div class="AttributeSide_content__3rm2n">
                                <component :is="edit" :options="options" :echartsOption="echartsOption"></component>
                            </div>
                            <!--操作选择-->
                            <div class="AttributeSide_tabBox__1hkCR">
                                <div class="AttributeSide_tab__20pFP" :class="item.index == AttributeSide.currentIcon ? 'AttributeSide_tabSelected__2qyTI' : '' " v-for="(item,index) in AttributeSide.AttributeSide_icon" :key="item.index" @click="ChooseAttributeIcon(item.index)" v-if="(item.icon != 'iconcss' || isIconcss)">
                                    <span role="img" class="anticon" @click="action(index)">
                                        <i class="iconfont" :class="item.icon"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <DataBinding style="position:absolute; top: 42%; left: 50%; transform: translate(-50%,-50%); z-index: 100"/>
        <Calculate/>
    </div>
</template>

<script>
    import html2canvas from 'html2canvas'
    import VisualHeader from "./VisualHeader";
    import WholePage from "./edit/WholePage";
    import LineChart from "./view/LineChart";
    import Pie from "./view/Pie";
    import Histogram from "./view/Histogram";
    import Scatter from "./view/Scatter";
    import TextBox from "./view/TextBox";
    import ImageBox from "./view/ImageBox";
    import Area from "./view/Area";
    import VueDraggableResizable from 'vue-draggable-resizable-gorkys'
    import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
    import LayerStyles from "./edit/LayerStyles";
    import ComponentsAttributes from "./edit/ComponentsAttributes";
    import Layers from "./edit/Layers";
    import {mapGetters} from 'vuex'
    import StackAreaChart from "./view/StackAreaChart";
    import SmoothedLineChart from "./view/SmoothedLineChart";
    import StackedColumnChart from "./view/StackedColumnChart";
    import Bar from "./view/Bar";
    import RosePie from "./view/RosePie";
    import LargeAreaChart from "./view/LargeAreaChart";
    import DataBinding from "./edit/DataBinding";
    import Calculate from "./edit/Calculate";
    import VueGridLayout from 'vue-grid-layout'
    import datapre from "../../api/datapre";
    import database from "../../api/database";
    import {getToken} from "../../api/auth";
    import user from "../../api/user";
    import Cookies from 'js-cookie'
    import table from "./view/table";
    import MultipleTable from "./edit/MultipleTable";
    import IndexCalculation from "./edit/IndexCalculation";
    export default {
        name: "Visual",
        data() {
            return {
                // 组件侧栏
                ComponentSide: {
                    ComponentSide_icon: [
                        {
                            type: '图表',
                            icon: 'icontubiao',
                            index: 0,
                        },
                        {
                            type: '文字',
                            icon: 'iconwenzi',
                            index: 1
                        },
                        {
                            type: '图片',
                            icon: 'icontupian',
                            index: 2
                        }
                    ],
                    ComponentSide_type: '',                                                  // 当前选择是哪个类型的组件库
                    ComponentSide_components: [                                              // 组件
                        {
                            line:{
                                img: 'iconzhexiantu',
                                text: '折线图',
                                com: LineChart,
                            },
                            histogram:{
                                img: 'iconzhuzhuangtutubiao',
                                text: '柱状图',
                                com: Histogram,
                            },
                            pie:{
                                img: 'iconbingtu',
                                text: '饼图',
                                com: Pie,
                            },
                            area:{
                                img: 'iconduijimianjitu',
                                text: '面积图',
                                com: Area,
                            },
                            scatter:{
                                img: 'iconsandiantu',
                                text: '散点图',
                                com: Scatter,
                            },
                            stackArea:{
                                img: 'iconduidiemianjitu',
                                text: '堆叠面积图',
                                com: StackAreaChart
                            },
                            smoothedLine: {
                                img: 'iconzhexiantu1',
                                text: '平滑折线图',
                                com: SmoothedLineChart
                            },
                            stackedColumnChart: {
                                img: 'iconduidiezhuzhuangtu',
                                text: '堆叠柱状图',
                                com: StackedColumnChart
                            },
                            bar: {
                                img: 'icontiaoxingtu',
                                text: '条形图',
                                com: Bar
                            },
                            rosePie: {
                                img: 'iconbingtu1',
                                text: '南丁格尔玫瑰图',
                                com: RosePie
                            },
                            table:{
                                img: 'iconbiaoge',
                                text: '表格',
                                com: table,
                            },
                            largeAreaChart: {
                                img: 'iconmianjitu',
                                text: '大数据量面积图',
                                com: LargeAreaChart
                            },
                        },
                        {
                            text: {
                                img: 'iconwenzi',
                                text: '文本',
                                com: TextBox
                            },
                        },
                        {
                            image:{
                                img: 'icontupian',
                                text: '图片',
                                com: ImageBox
                            }
                        },
                    ],
                    components: {
                        line:{
                            img: 'iconzhexiantu',
                            text: '折线图',
                            com: LineChart,
                        },
                        histogram:{
                            img: 'iconzhuzhuangtutubiao',
                            text: '柱状图',
                            com: Histogram,
                        },
                        pie:{
                            img: 'iconbingtu',
                            text: '饼图',
                            com: Pie,
                        },
                        area:{
                            img: 'iconduijimianjitu',
                            text: '面积图',
                            com: Area,
                        },
                        scatter:{
                            img: 'iconsandiantu',
                            text: '散点图',
                            com: Scatter,
                        },
                        stackArea: {
                            img: 'iconduidiemianjitu',
                            text: '堆叠面积图',
                            com: StackAreaChart
                        },
                        smoothedLine: {
                            img: 'iconzhexiantu1',
                            text: '平滑折线图',
                            com: SmoothedLineChart
                        },
                        stackedColumnChart: {
                            img: 'iconduidiezhuzhuangtu',
                            text: '堆叠柱状图',
                            com: StackedColumnChart
                        },
                        bar: {
                            img: 'icontiaoxingtu',
                            text: '条形图',
                            com: Bar
                        },
                        rosePie: {
                            img: 'iconbingtu1',
                            text: '南丁格尔玫瑰图',
                            com: RosePie
                        },
                        largeAreaChart: {
                            img: 'iconmianjitu',
                            text: '大数据量面积图',
                            com: LargeAreaChart
                        },
                        text: {
                            img: 'iconwenzi',
                            text: '文本',
                            com: TextBox
                        },
                        image:{
                            img: 'icontupian',
                            text: '图片',
                            com: ImageBox
                        },
                        table:{
                            img: 'iconbiaoge',
                            text: '表格',
                            com: table,
                        },
                    },
                    currentIcon: -1,                                                          // 当前选择的图标
                },
                // 属性侧栏
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
                // 头部操作
                Playground: ["iconbaocun","iconyulan1"],
                scaleSize: 40,


                type: '',                // 拖拽的是哪一个图表
                isPush: false,
                index: null,

                // VueDraggableResizable拖拽属性
                x: 0,
                y: 0,
                width: 0,
                height: 0,


                // 参数设置页面
                edit: WholePage,
                options: {},

                length: 0,
                isIconcss: false,

                echartsOption: null,
            }
        },
        methods: {
            yulan() {
                this.$store.commit('setScreen',this.$refs.screenContainer)
                this.$router.push('/yulan')
            },
            // 选择组件图标，对应的图标变亮
            ChooseComponentIcon(index) {
                this.ComponentSide.currentIcon = index
                this.$refs.ComponentSide_components__2Wcic.style.display= 'flex'
                for(let item of this.ComponentSide.ComponentSide_icon) {
                    if(index == item.index) {
                        this.ComponentSide.ComponentSide_type = item.type
                        return
                    }
                }
            },
            // 关闭组件侧边栏
            close() {
                this.$refs.ComponentSide_components__2Wcic.style.display= 'none'
                this.ComponentSide.currentIcon = -1
            },
            scale(option) {
                if(option == 'minus') {
                    if(this.scaleSize <= 0) {
                        return
                    }
                    this.scaleSize -= 10
                    this.$refs.screen.style.width = parseInt(this.$refs.screen.style.width) - 192 + 'px'
                    this.$refs.screen.style.height = parseInt(this.$refs.screen.style.height) - 108 + 'px'
                    this.$refs.screenContainer.style.transform = "scale(" + this.scaleSize / 100 + ")"
                }else {
                    if(this.scaleSize >= 100) {
                        return
                    }
                    this.scaleSize += 10
                    this.$refs.screen.style.width = parseInt(this.$refs.screen.style.width) + 192 + 'px'
                    this.$refs.screen.style.height = parseInt(this.$refs.screen.style.height) + 108 + 'px'
                    this.$refs.screenContainer.style.transform = "scale(" + this.scaleSize / 100 + ")"
                }
            },
            // 选择操作图标
            ChooseAttributeIcon(index) {
                if(index == this.AttributeSide.currentIcon) {
                    this.AttributeSide.currentIcon = -1
                    document.getElementsByClassName("Attribute")[0].style.width = ""
                    document.getElementsByClassName("Attribute")[0].style.minWidth = ""
                    document.getElementsByClassName("Attribute")[0].style.width = "40px"
                    document.getElementsByClassName("AttributeSide_content__3rm2n")[0].style.display = 'none'
                }else if(this.AttributeSide.currentIcon === -1) {
                    this.AttributeSide.currentIcon = index
                    document.getElementsByClassName("Attribute")[0].style.width = ""
                    document.getElementsByClassName("Attribute")[0].style.minWidth = "340px"
                    document.getElementsByClassName("Attribute")[0].style.width = "340px"
                    document.getElementsByClassName("AttributeSide_content__3rm2n")[0].style.display = 'block'
                }else {
                    this.AttributeSide.currentIcon = index
                }
            },
            // 选择对应的页面设置
            action(index) {
                if(index == 0) {
                    this.edit = WholePage
                }else if(index == 1){
                    this.edit = LayerStyles
                }else if(index == 2) {
                    this.edit = ComponentsAttributes
                }else {
                    this.edit = Layers
                }
            },
            // 拖拽
            dragStart(e) {
                this.type = e.target.dataset.type
            },
            dragEnd() {
                this.$delete(this.view[this.index], 'status')
                this.isPush = false
                user.postEchart({
                    type: this.type,
                    userId: Cookies.get('userId')
                }).then(res => {
                }).catch(err => {
                    console.log(err)
                })
                this.type = null
            },
            dragOver(e) {
                if(!this.type) {
                    return
                }
                e.preventDefault()
                e.stopPropagation()
                const defaultData = {
                    type: this.type,
                    status: 2,
                    data: {},
                    dataTitle: [],
                    options: {},            // echarts的option
                    style: {},              // 组件样式
                    echartInstance: null,   // echarts对象
                    index: this.viewLength == null ? 0 : this.viewLength,
                    typeText: this.ComponentSide.components[this.type].text
                }
                const layer = {
                    type: this.type,
                    index: this.viewLength == null ? 0 : this.viewLength,
                    typeText: this.ComponentSide.components[this.type].text
                }
                if(!this.isPush) {
                    this.index = this.view.length;
                    this.isPush = true
                    this.$store.commit("setView",defaultData)
                    this.$nextTick(() => this.$store.commit("setLayers",layer))
                    this.$nextTick(() => {
                        this.length = this.viewLength
                        this.$store.commit("setViewLength",this.length + 1)
                    })
                }
            },
            drog(e) {
                if (!this.type) {
                    return
                }
                e.preventDefault()
                e.stopPropagation()
                this.dragEnd()
            },
            // 选择图表
            selectType(event,index) {
                // event.stopPropagation()
                // console.log(event)
                // 拿到当前的view图层
                let view = this.view[index]
                this.$store.commit("setCurrentView",view)
                this.$store.commit("setCurrentElement",event.target)
                if(this.currentElement.tagName === 'CANVAS') {
                    this.echartsOption = view.options
                    this.$store.commit("setCurrentEchartInstance",view.echartInstance)
                }else {
                    this.$store.commit("setCurrentEchartInstance",null)
                }
                // 让css样式页面可以显示
                this.isIconcss = true
                if(JSON.stringify(view.style) === "{}") {
                    let x;
                    let y;
                    if(event.target.tagName === 'DIV') {
                        let transformStyle = event.target.parentNode.parentNode.style.transform
                        x = transformStyle.match(/\d+px/g)[0]
                        y = transformStyle.match(/\d+px/g)[1]
                    }else if(event.target.tagName === 'CANVAS') {
                        let transformStyle = event.target.parentNode.parentNode.parentNode.style.transform
                        x = transformStyle.match(/\d+px/g)[0]
                        y = transformStyle.match(/\d+px/g)[1]
                    }else {
                        let transformStyle = event.target.parentNode.parentNode.parentNode.style.transform
                        x = transformStyle.match(/\d+px/g)[0]
                        y = transformStyle.match(/\d+px/g)[1]
                    }
                    let width = event.target.style.width === "" ?  event.target.parentNode.style.width : event.target.style.width
                    let height = event.target.style.height === "" ? event.target.parentNode.style.height : event.target.style.height
                    let backgroundColor = event.target.style.backgroundColor
                    let borderWidth = event.target.parentNode.style.borderWidth
                    let borderStyle = event.target.parentNode.style.borderStyle
                    let borderColor = event.target.parentNode.style.borderColor
                    let borderRadius = event.target.parentNode.style.borderRadius
                    let fontFamily = event.target.parentNode.style.fontFamily
                    let fontSize = event.target.parentNode.style.fontSize
                    let textAlign = event.target.parentNode.style.textAlign
                    let fontWeight = event.target.parentNode.style.fontWeight
                    let color = event.target.style.color === "" ?  event.target.parentNode.style.color : event.target.style.color
                    let opacityValue = event.target.style.opacity === "" ?  event.target.parentNode.style.opacity : event.target.style.opacity
                    let overflow = event.target.style.overflow === "" ? event.target.parentNode.style.overflow : event.target.style.overflow
                    let transform = event.target.parentNode.style.transform
                    let zoomValue
                    let rotateValue
                    if(transform === "") {
                        zoomValue = 100
                        rotateValue = 0
                        event.target.parentNode.style.transform = "scale(1) rotate(0deg)"
                    }else {
                        let rotate = /rotate\(\S+\)/g.exec(transform)[0]
                        let scale = /scale\(\S+\)/g.exec(transform)[0]
                        rotateValue = parseInt(/\d{1,}deg/g.exec(rotate)[0])
                        if(scale.indexOf(".") != -1) {
                            zoomValue = parseFloat(/\d.\d/g.exec(scale)[0]) * 100
                        }else {
                            zoomValue = parseFloat(/\d/g.exec(scale)[0]) * 100
                        }
                    }
                    if(event.target.tagName == 'INPUT') {
                        width = width === "" ? '300px' : width;
                        height = height === "" ? '300px' : height;
                    }else {
                        width = width === "" ? '0px' : width;
                        height = height === "" ? '0px' : height;
                    }
                    backgroundColor = backgroundColor === "" ? 'white' : backgroundColor
                    borderWidth = borderWidth === "" ? '0px' : borderWidth
                    borderStyle = borderStyle === "" ? 'none' : borderStyle
                    borderColor = borderColor === "" ? 'white' : borderColor
                    borderRadius = borderRadius === "" ? '0px' : borderRadius
                    fontFamily = fontFamily === "" ? 'auto': fontFamily
                    fontSize = fontSize === "" ? '14px' : fontSize
                    textAlign = textAlign === "" ? 'left' : textAlign
                    fontWeight = fontWeight === "" ? 'normal' : fontWeight
                    color = color === "" ? 'white' : color
                    opacityValue = opacityValue === "" ? 100 : opacityValue
                    overflow = overflow === "" ? 'auto' : overflow

                    this.$set(this.options,'x',x)
                    this.$set(this.options,'y',y)
                    this.$set(this.options,'width',width)
                    this.$set(this.options,'height',height)
                    this.$set(this.options,'backgroundColor',backgroundColor)
                    this.$set(this.options,'borderWidth',borderWidth)
                    this.$set(this.options,'borderStyle',borderStyle)
                    this.$set(this.options,'borderColor',borderColor)
                    this.$set(this.options,'borderRadius',borderRadius)
                    this.$set(this.options,'fontFamily',fontFamily)
                    this.$set(this.options,'fontSize',fontSize)
                    this.$set(this.options,'textAlign',textAlign)
                    this.$set(this.options,'fontWeight',fontWeight)
                    this.$set(this.options,'opacityValue',opacityValue)
                    this.$set(this.options,'zoomValue',zoomValue)
                    this.$set(this.options,'rotateValue',rotateValue)
                    this.$set(this.options,'fontColor',color)
                    this.$set(this.options,'overflow',overflow)
                    for(let item in this.options) {
                        this.$set(view.style,item,this.options[item])
                    }
                }else {
                    for(let item in view.style) {
                        this.$set(this.options,item,view.style[item])
                    }
                }
            },
            onResize(x,y,width,height) {
                this.x = x;
                this.y = y;
                this.width = width
                this.height = height
                if(this.currentElement.tagName === 'CANVAS') {
                    this.currentElement.parentNode.parentNode.style.width = width + 'px'
                    this.currentElement.parentNode.parentNode.style.height = height + 'px'
                    this.currentView.echartInstance.resize()
                    this.$set(this.options,'width',width + 'px')
                    this.$set(this.options,'height',height + 'px')
                }else if(this.currentElement.tagName === 'IMG') {
                    this.currentElement.parentNode.parentNode.style.width = width + 'px'
                    this.currentElement.parentNode.parentNode.style.height = height + 'px'
                    this.$set(this.options,'width',width + 'px')
                    this.$set(this.options,'height',height + 'px')
                }
            },
            onDrag(x,y) {
                if(this.currentElement === null) {
                    this.$message({
                        showClose: true,
                        message: "未选择元素",
                        type: 'warning'
                    });
                    return
                }
                if(this.currentElement.tagName === 'CANVAS') {
                    this.currentElement.parentNode.parentNode.parentNode.parentNode.style.transform = ""
                }else if(this.currentElement.tagName === 'IMG') {

                }else {

                }
                this.x = x;
                this.y = y;
                this.$set(this.options,'x',x)
                this.$set(this.options,'y',y)
            },
            VueDraggableResizableHeight(type,height) {
                if(height === undefined || height === "" || height === null || parseInt(height) === 0) {
                    if(type == 'text') {
                        return 40
                    }else if(type == 'image'){
                        return 300
                    }else {
                        return 600
                    }
                }else {
                    return parseInt(height)
                }
            },
            VueDraggableResizableWidth(type,width) {
                if(width === undefined || width === "" || width === null || parseInt(width) === 0) {
                    if(type == 'text') {
                        return 200
                    }else if(type == 'image'){
                        return 300
                    }else {
                        return 800
                    }
                }else {
                    return parseInt(width)
                }
            },
            saveImage() {
                html2canvas(this.$refs.allScreen,{
                    backgroundColor: 'none'
                }).then((canvas) => {
                    let image = canvas.toDataURL('image/png')
                    this.downloadImage(image)
                    let formData = new window.FormData();
                    formData.append("cover", this.dataURLtoFile(image));
                    formData.append("id",this.projectId)
                    this.request({
                        url: '/mgr/project/uploadCover',
                        data: formData,
                    }).then(res => {
                        let data = JSON.parse(res.data)
                        if(data.code == 1) {
                            this.saveView()
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            downloadImage(imgUrl) {
                if (window.navigator.msSaveOrOpenBlob) {
                    let bstr = atob(imgUrl.split(',')[1])
                    let n = bstr.length
                    let u8arr = new Uint8Array(n)
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n)
                    }
                    let blob = new Blob([u8arr])
                    window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png')
                } else {
                    // 这里就按照chrome等新版浏览器来处理
                    const a = document.createElement('a')
                    a.href = imgUrl
                    a.setAttribute('download', 'chart-download')
                    a.click()
                }
            },
            saveView() {
                for(let i = 0; i < this.view.length; i++) {
                    delete this.view[i].echartInstance
                }
                let obj = {
                    id: this.projectId,
                    content: this.view
                }
                obj.content = JSON.stringify(obj.content)
                database.saveChartsData(obj).then(res => {
                    if(res.code == 1) {
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
            request({url, method = "post", data, headers = {}}) {
                return new Promise(resolve => {
                    const xhr = new XMLHttpRequest();
                    xhr.open(method, 'http://47.100.107.173:8000' + url);
                    Object.keys(headers).forEach(key =>
                        xhr.setRequestHeader(key, headers[key])
                    );
                    if(getToken()) {
                        xhr.setRequestHeader("token",getToken())
                    }
                    xhr.send(data);
                    xhr.onload = e => {
                        resolve({
                            data: e.target.response
                        });
                    };
                });
            },
            dataURLtoFile(dataurl) {
                let arr = dataurl.split(',');
                let mime = arr[0].match(/:(.*?);/)[1];
                let bstr = atob(arr[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                // return new Blob([u8arr], { type: mime });
                return new File([u8arr], this.projectId + '.png', {type:mime});
            }
        },
        components: {
            IndexCalculation,
            MultipleTable,
            Calculate,
            DataBinding,
            WholePage,
            VisualHeader,
            VueDraggableResizable,
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            html2canvas
        },
        computed: {
            ...mapGetters([
                'view',
                'layers',
                'CurrentIndex',
                'viewLength',
                'currentView',
                'currentElement',
                'projectId'
            ]),
            getTransform() {
                return (style,isOld,index) => {
                    if(isOld === 1) {
                        return `transform: translate(${style.x}px,${style.y}px)`
                    }
                }
            },
            getViewStyles() {
                return (style,isOld,index) => {
                    if(isOld === 1) {
                        return `width: ${style.width};height: ${style.height};
                                overflow: ${style.overflow};backgroundColor: ${style.backgroundColor};
                                color: ${style.fontColor};
                                fontSize: ${style.fontSize},fontFamily: ${style.fontFamily};textAlign: ${style.textAlign};fontWeight: ${style.fontWeight};
                                opacity: ${style.opacityValue / 100};
                                borderColor: ${style.borderColor};
                                borderStyle: ${style.borderStyle};
                                borderWidth: ${style.borderWidth};
                                borderRadius: ${style.borderRadius};
                                transform: scale(${style.zoomValue / 100}) rotate(${style.rotateValue / 100})`
                    }
                }
            },
        },
        watch: {
            CurrentIndex: {
                handler(val,oldValue) {
                    let value = val == null ? 0 : val
                    let elements = document.getElementsByClassName("item")
                    for(let i = 0; i < elements.length; i++) {
                        if(elements[i].dataset.index == value) {
                            let childrenNodes = elements[i].children[0].childNodes;
                            for(let j = 0; j < childrenNodes.length; j++) {
                                if(childrenNodes[j].classList.contains("handle")) {
                                    childrenNodes[j].style.display = 'block'
                                }
                            }
                        }
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.$store.commit("setScreenContainer",this.$refs.screenContainer)
            this.length = this.viewLength
        },
        created() {
            this.$store.commit('setProjectId',this.$route.query.projectId)
            database.getProjectContentById(this.projectId).then(res => {
                if(res.code == 1) {
                    if(res.data.item.content === "" || res.data.item.content === null) {

                    }else {
                        this.$store.commit('AssignmentView',[])
                        let view = JSON.parse(res.data.item.content)
                        for(let i = 0; i < view.length; i++) {
                            this.$set(view[i],'isOld',1)
                            this.$store.commit('setView',view[i])
                        }
                        let viewLength = view.length
                        let layers = []
                        for(let i = 0; i < viewLength; i++) {
                            let layer = {}
                            layer.type = view[i].type
                            layer.index = i;
                            layer.typeText = view[i].typeText
                            layers.push(layer)
                        }
                        this.$store.commit('setViewLength',viewLength)
                        this.$store.commit('AssignmentLayers',layers)
                    }
                }
             }).catch(err => {
                console.log(err)
            })
            this.$store.commit('AsetOptionsLength',0)
        }
    }
</script>

<style scoped>
    @import "index.css";
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
    /deep/ .vdr {
        border: none !important;
    }
    /deep/ div.active{
        border: 1px dashed #d6d6d6;
    }
</style>