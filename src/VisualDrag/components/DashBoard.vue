<template>
    <div class="Playground_root__3qvBq">
        <div class="Playground_area__Fv-_L" id="allScreen">
            <div style="margin: auto; width: 768px; height: 432px;" id="screen">
                <div class="screenContainer" @drag="drag" @dragover="dragOver" >
                    <template v-for="(item,index) in componentArray">
                        <div v-if="index >= 0" :data-index="item.index" :key="index" class="item"  @click.capture.stop="selectType($event,index)">
                            <VueDraggableResizable :w="VueDraggableResizableWidth(item.type,item.style.width)"
                                                   :h="VueDraggableResizableHeight(item.type,item.style.height)"
                                                   :grid="[10,10]" @resizing="onResize" @dragging="onDrag" parent=".screenContainer"
                                                   class="datav-transform"
                                                   style="top: 0;left: 0"
                                                    :x="getX(item)"
                                                    :y="getY(item)">
                                <template v-if="item.status && item.status == 2">
                                    <div class="wait">{{item.type}}</div>
                                </template>
                                <template v-else>
                                    <div class="datav-scale" style="display: block">
                                        <div class="transform-handler" style="cursor: move;transform: rotate(0deg)" :style="getTransform(item)">
                                            <div class="datav-com" style="display: block; transform: scaleX(1) scaleY(1) rotateZ(360deg);" :data-index="item.index">
                                                <component :is="components[item.type]['com']"
                                                           :data="item">
                                                </component>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </VueDraggableResizable>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueDraggableResizable from 'vue-draggable-resizable-gorkys'
    import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
    import {mapGetters} from 'vuex'
    import {dragEvent} from "../js/dragEvent";
    import $ from "jquery";
    import database from "../../api/database";
    export default {
        name: "DashBoard",
        mixins: [dragEvent],
        data() {
            return {
                componentStyles: {},
                echartOptions: ''
            }
        },
        components: {
            VueDraggableResizable
        },
        methods: {
            selectType(event,index) {
                let component = this.componentArray[index]      // 拿到当前的组件参数
                console.log(event.target)
                if(component.type != 'text' && component.type != 'image' && component.type !='table') {
                    this.$emit('echartOptions',component.options)
                }
                this.$store.commit('setCurrentComponent',component)
                this.$store.commit('setIsIconcss',true)
                this.$store.commit('setCurrentComponentElement',event.target)
                // 获取样式
                this.getStyles(event,component)
                this.$emit('componentStyles',this.componentStyles)
            },
            getStyles(event,component) {
                if(JSON.stringify(component.style) === "{}") {
                    let x;
                    let y;
                    let width;
                    let height
                    let backgroundColor
                    let borderWidth
                    let borderStyle
                    let borderColor
                    let borderRadius
                    let fontFamily
                    let fontSize
                    let textAlign
                    let fontWeight
                    let color
                    let opacityValue
                    let overflow
                    let transform
                    let rotateValue
                    if(event.target.className === 'datav-com') {
                        let transformStyle = event.target.parentNode.parentNode.parentNode.style.transform
                        x = transformStyle.match(/\d+px/g)[0]
                        y = transformStyle.match(/\d+px/g)[1]
                        width = event.target.parentNode.parentNode.parentNode.style.width
                        height = event.target.parentNode.parentNode.parentNode.style.height
                        backgroundColor = 'white'
                        borderWidth = '0px'
                        borderStyle = 'none'
                        borderRadius = '0px'
                        borderColor = 'white'
                        fontFamily = 'auto'
                        fontSize = '14px'
                        textAlign = 'left'
                        fontWeight = 'normal'
                        color = 'white'
                        opacityValue = parseInt(event.target.childNodes[0].style.opacity)
                        if(isNaN(opacityValue)) {
                            opacityValue = 1
                        }
                        overflow = 'auto'
                        transform = event.target.parentNode.style.transform
                        if(transform === "") {
                            // zoomValue = 100
                            rotateValue = 0
                            event.target.style.transform = "scale(1) rotate(0deg)"
                        }else {
                            let rotate = /rotate\(\S+\)/g.exec(transform)[0]
                            rotateValue = parseInt(/\d{1,}deg/g.exec(rotate)[0])
                        }
                    }
                    this.$set(this.componentStyles,'x',x)
                    this.$set(this.componentStyles,'y',y)
                    this.$set(this.componentStyles,'width',width)
                    this.$set(this.componentStyles,'height',height)
                    this.$set(this.componentStyles,'backgroundColor',backgroundColor)
                    this.$set(this.componentStyles,'borderWidth',borderWidth)
                    this.$set(this.componentStyles,'borderStyle',borderStyle)
                    this.$set(this.componentStyles,'borderColor',borderColor)
                    this.$set(this.componentStyles,'borderRadius',borderRadius)
                    this.$set(this.componentStyles,'fontFamily',fontFamily)
                    this.$set(this.componentStyles,'fontSize',fontSize)
                    this.$set(this.componentStyles,'textAlign',textAlign)
                    this.$set(this.componentStyles,'fontWeight',fontWeight)
                    this.$set(this.componentStyles,'opacityValue',opacityValue)
                    this.$set(this.componentStyles,'rotateValue',rotateValue)
                    this.$set(this.componentStyles,'color',color)
                    this.$set(this.componentStyles,'overflow',overflow)
                    for(let item in this.componentStyles) {
                        this.$set(component.style,item,this.componentStyles[item])
                    }
                }else {
                    for(let item in component.style) {
                        this.$set(this.componentStyles,item,component.style[item])
                    }
                }
            },
            onResize(x,y,width,height) {
                this.$set(this.currentComponent.style,'width',width + 'px')
                this.$set(this.currentComponent.style,'height',height + 'px')
                this.$set(this.componentStyles,'width',width + 'px')
                this.$set(this.componentStyles,'height',height + 'px')
                this.currentComponent.echartInstance.resize();
                $('.datav-com').eq(this.currentComponent.index).parents('.datav-transform').css('width',this.componentStyles.width)
                $('.datav-com').eq(this.currentComponent.index).find('.datav-wrapper').css('width',this.componentStyles.width)
                $('.datav-com').eq(this.currentComponent.index).find('.datav-wrapper').children().children().first().css('width',this.componentStyles.width)
                $('.datav-com').eq(this.currentComponent.index).find('.datav-wrapper').children().children().first().find('canvas').css('width',this.componentStyles.width)
                $('.datav-com').eq(this.currentComponent.index).parents('.datav-transform').css('height',this.componentStyles.height)
                $('.datav-com').eq(this.currentComponent.index).find('.datav-wrapper').css('height',this.componentStyles.height)
                $('.datav-com').eq(this.currentComponent.index).find('.datav-wrapper').children().children().first().css('height',this.componentStyles.height)
                $('.datav-com').eq(this.currentComponent.index).find('.datav-wrapper').children().children().first().find('canvas').css('height',this.componentStyles.height)
            },
            onDrag(x,y) {
                this.$set(this.currentComponent.style,'x',x + 'px')
                this.$set(this.currentComponent.style,'y',y + 'px')
                this.$set(this.componentStyles,'x',x + 'px')
                this.$set(this.componentStyles,'y',y + 'px')
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
            getX(item) {
                if(item.isOld === 1) {
                    return parseInt(item.style.x)
                }
            },
            getY(item) {
                if(item.isOld === 1) {
                    return parseInt(item.style.y)
                }
            },
            getTransform(item) {
                if(item.isOld === 1) {
                    return {
                        transform: 'rotate(' + item.style.rotateValue + 'deg)'
                    }
                }
            }
        },
        computed: {
            ...mapGetters([
                'componentArray',
                'isIconcss',
                'currentComponent'
            ]),
        },
        created() {
            let projectId = this.$route.query.projectId;
            database.getProjectContentById(projectId).then(res => {
                console.log(JSON.parse(res.data.item.content))
                if(res.code == 1) {
                    if(res.data.item.content === "" || res.data.item.content === null) {

                    }else {
                        this.$store.commit('setComponentArray',[])
                        let view = JSON.parse(res.data.item.content)
                        for(let i = 0; i < view.length; i++) {
                            this.$set(view[i],'isOld',1)
                            this.$store.commit('pushView',view[i])
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
                        this.$store.commit('setComponentArrayLength',viewLength)
                        this.$store.commit('setCanvasLayers',layers)
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        }
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
    .Playground_root__3qvBq {
        width: 100%;
        flex-grow: 1;
        flex-basis: 0;
        overflow: auto;
        height: 100%;
        display: flex;

        padding: 0 2px 2px;
        flex-direction: column;
        position: relative;
        background: linear-gradient(
                -90deg
                ,rgba(0,0,0,.02) 1px,transparent 0),linear-gradient(rgba(0,0,0,.02) 1px,transparent 0),linear-gradient(
                -90deg
                ,rgba(0,0,0,.03) 1px,transparent 0),linear-gradient(rgba(0,0,0,.03) 1px,transparent 0),linear-gradient(transparent 4px,#f5f5f5 0,#f5f5f5 97px,transparent 0),linear-gradient(
                -90deg
                ,#e5e5e5 1px,transparent 0),linear-gradient(
                -90deg
                ,transparent 4px,#f5f5f5 0,#f5f5f5 97px,transparent 0),linear-gradient(#e5e5e5 1px,transparent 0),#f5f5f5;
        background-size: 10px 10px,10px 10px,100px 100px,100px 100px,100px 100px,100px 100px,100px 100px,100px 100px;
    }
    .Playground_area__Fv-_L {
        width: 100%;
        flex-grow: 1;
        flex-basis: 0;
        overflow: auto;
        height: 100%;
        display: flex;
    }
    .screenContainer {
        width: 1920px;
        height: 1080px;
        background-color: white;
        background-repeat: repeat;
        color: rgb(0, 0, 0);
        position: relative;
        box-shadow: rgba(0,0,0,0.15) 3px 3px 15px;
        z-index: 1;
        transform: scale(0.4);
        transform-origin: 0px 0px 0px;
    }


    /*新增拖拽样式*/
    .datav-transform {
        position: absolute;
        will-change: transform;
    }
    .datav-transform.active {
        z-index: 1 !important;
    }
    .datav-scale {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-origin: 0 0;
    }
    .transform-handler {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: move;
        box-sizing: border-box;
    }
    .datav-scale .datav-com {
        width: 100%;
        height: 100%;
        outline: 0;
        box-sizing: border-box;
        transform-origin: 50% 50%;
        transform: scaleX(1) scaleY(1);
    }
    .datav-transform.active .datav-com {
        background: rgba(36,63,162,.03);
    }
    .datav-transform.hided, .datav-transform.locked {
        pointer-events: none;
    }
</style>