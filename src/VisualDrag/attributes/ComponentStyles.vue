<template>
    <div id="componentsEdit" v-if="this.currentComponentElement != null">
        <div class="AttributeSide_title__kTBBo" style="display: flex;justify-content: space-between">
            <div style="width: 70%;overflow: hidden">组件样式</div>
        </div>
        <div class="AttributeSide_styleSetting__D_nAA">
            <div class="AttributeSide_title__kTBBo">
                <p>位置和尺寸</p>
                <div style="display: flex;flex-wrap: wrap">
                    <article class="Style_itemBox__3r86h">
                        <label for="X">X：</label>
                        <span>
                            <div class="mojito-input-number" style="width: 80px;margin-left: 6px">
                                <div class="mojito-input-number-handler-wrap">
                                    <span unselectable="on" role="button" aria-label="Increase Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-up">
                                        <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                            <i class="iconfont iconxiangshangjiantou" @click="changeX('add',ComponentStyles.x)"></i>
                                        </span>
                                    </span>
                                    <span unselectable="on" role="button" aria-label="Decrease Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-down">
                                        <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                            <i class="iconfont icondown" @click="changeX('sub',ComponentStyles.x)"></i>
                                        </span>
                                    </span>
                                </div>
                                <div class="mojito-input-number-input-wrap">
                                    <input role="spinbutton" step="1" class="mojito-input-number-input" v-model="ComponentStyles.x" id="X" type="text" @change="changeX('change',ComponentStyles.x)"/>
                                </div>
                            </div>
                        </span>
                    </article>
                    <article class="Style_itemBox__3r86h">
                        <label for="Y">Y：</label>
                        <span>
                            <div class="mojito-input-number" style="width: 80px;margin-left: 6px">
                                <div class="mojito-input-number-handler-wrap">
                                    <span unselectable="on" role="button" aria-label="Increase Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-up">
                                        <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                            <i class="iconfont iconxiangshangjiantou" @click="changeY('add',ComponentStyles.y)"></i>
                                        </span>
                                    </span>
                                    <span unselectable="on" role="button" aria-label="Decrease Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-down">
                                        <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                            <i class="iconfont icondown" @click="changeY('sub',ComponentStyles.y)"></i>
                                        </span>
                                    </span>
                                </div>
                                <div class="mojito-input-number-input-wrap">
                                    <input class="mojito-input-number-input" v-model="ComponentStyles.y" id="Y" @change="changeY('change',ComponentStyles.y)"/>
                                </div>
                            </div>
                        </span>
                    </article>
                    <article class="Style_itemBox__3r86h">
                        <label for="width">宽：</label>
                        <span>
                            <div class="mojito-input-number" style="width: 80px;margin-left: 6px">
                                <div class="mojito-input-number-handler-wrap">
                                    <span unselectable="on" role="button" aria-label="Increase Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-up">
                                        <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                            <i class="iconfont iconxiangshangjiantou" @click="changeWidth('add',ComponentStyles.width)"></i>
                                        </span>
                                    </span>
                                    <span role="button" class="mojito-input-number-handler mojito-input-number-handler-down">
                                        <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                            <i class="iconfont icondown" @click="changeWidth('sub',ComponentStyles.width)"></i>
                                        </span>
                                    </span>
                                </div>
                                <div class="mojito-input-number-input-wrap">
                                    <input class="mojito-input-number-input" v-model="ComponentStyles.width" id="width" @change="changeWidth('change',ComponentStyles.width)"/>
                                </div>
                            </div>
                        </span>
                    </article>
                    <article class="Style_itemBox__3r86h">
                        <label for="height">高：</label>
                        <span>
                            <div class="mojito-input-number" style="width: 80px;margin-left: 6px">
                                <div class="mojito-input-number-handler-wrap">
                                    <span unselectable="on" role="button" aria-label="Increase Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-up">
                                        <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                            <i class="iconfont iconxiangshangjiantou" @click="changeHeight('add',ComponentStyles.height)"></i>
                                        </span>
                                    </span>
                                    <span unselectable="on" role="button" aria-label="Decrease Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-down">
                                        <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                            <i class="iconfont icondown" @click="changeHeight('sub',ComponentStyles.height)"></i>
                                        </span>
                                    </span>
                                </div>
                                <div class="mojito-input-number-input-wrap">
                                    <input class="mojito-input-number-input" v-model="ComponentStyles.height" id="height" @change="changeHeight('change',ComponentStyles.height)"/>
                                </div>
                            </div>
                        </span>
                    </article>
                </div>
            </div>

            <div class="AttributeSide_title__kTBBo">
                <p>溢出</p>
                <div class="mojito-radio-group mojito-radio-group-outline">
                    <label class="mojito-radio-button-wrapper " :class="model == 0 ? 'mojito-radio-button-wrapper-checked' : '' ">
                        <span class="mojito-radio-button " :class="model == 0 ? 'mojito-radio-button-checked' : '' ">
                            <input type="radio" class="mojito-radio-button-input" value="visible"  @click.stop.prevent="changeOverflow('visible',$event)"/>
                            <span class="mojito-radio-button-inner"></span>
                        </span>
                        <span>显示</span>
                    </label>
                    <label class="mojito-radio-button-wrapper" :class="model == 1 ? 'mojito-radio-button-wrapper-checked' : '' ">
                        <span class="mojito-radio-button" :class="model == 1 ? 'mojito-radio-button-checked' : '' ">
                            <input type="radio" class="mojito-radio-button-input" value="hidden" @click.stop.prevent="changeOverflow('hidden',$event)"/>
                            <span class="mojito-radio-button-inner"></span>
                        </span>
                        <span>隐藏</span>
                    </label>
                    <label class="mojito-radio-button-wrapper" :class="model == 2 ? 'mojito-radio-button-wrapper-checked' : '' ">
                        <span class="mojito-radio-button" :class="model == 2 ? 'mojito-radio-button-checked' : '' ">
                            <input type="radio" class="mojito-radio-button-input" value="auto" @click.stop.prevent="changeOverflow('auto',$event)"/>
                            <span class="mojito-radio-button-inner"></span>
                        </span>
                        <span>滚动</span>
                    </label>
                </div>
            </div>

            <div class="AttributeSide_title__kTBBo">
                <p>颜色</p>
                <div style="display: flex;flex-wrap: wrap">
                    <article class="Style_itemBox__3r86h">
                        <label for="background">背景颜色</label>
                        <div style="width: 40px; height: 24px; padding: 2px; border: 1px solid rgb(204, 204, 204); margin-left: 6px;" id="background">
                            <colorPicker  v-model.lazy="ComponentStyles.backgroundColor"  v-on:change="headleChangeBgColor"/>
                        </div>
                    </article>
                    <article class="Style_itemBox__3r86h" v-if="this.currentComponentElement != null && this.currentComponent.type === 'text'">
                        <label for="fontcolor">字体颜色</label>
                        <div style="width: 40px; height: 24px; padding: 2px; border: 1px solid rgb(204, 204, 204); margin-left: 6px;" id="fontcolor">
                            <colorPicker v-model.lazy="ComponentStyles.color"  v-on:change="headleChangeFontColor"/>
                        </div>
                    </article>
                </div>
            </div>

            <div class="AttributeSide_title__kTBBo" v-if="this.currentComponentElement != null && this.currentComponent.type === 'text'">
                <p>文字</p>
                <div style="margin-top: 12px">
                    <article class="Style_itemBox__3r86h" style="width: 100%;flex-wrap: wrap">
                        <section style="width: 100%">
                            <div style="display: inline-block;width: 50%;padding: 0px 3px;font-size: 12px">
                                <div>字体</div>
                                <div class="mojito-input-select" style="width: 100%;margin-top: 6px">
                                    <el-select v-model="ComponentStyles.fontFamily" placeholder="请选择" @change="headleChangeFontFamily">
                                        <el-option
                                                v-for="item in fontFamilies"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div style="display: inline-block;width: 50%;padding: 0px 3px;font-size: 12px">
                                <div>大小</div>
                                <div class="mojito-input-number" style="width: 100%;margin-top: 6px">
                                    <div class="mojito-input-number-handler-wrap">
                                        <span unselectable="on" role="button" aria-label="Increase Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-up">
                                            <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                                <i class="iconfont iconxiangshangjiantou" @click="headleChangeFontSize('add')"></i>
                                            </span>
                                        </span>
                                        <span unselectable="on" role="button" aria-label="Decrease Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-down">
                                            <span role="img" aria-label="up" class="anticon anticon-down mojito-input-number-handler-down-inner">
                                                <i class="iconfont icondown" @click="headleChangeFontSize('sub')"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <div class="mojito-input-number-input-wrap">
                                        <input step="1" class="mojito-input-number-input" v-model="ComponentStyles.fontSize" @change="headleChangeFontSize('change')">
                                    </div>
                                </div>
                            </div>
                            <div style="display: inline-block;width: 50%;padding: 0px 3px;font-size: 12px;margin-top: 6px">
                                <div>加粗</div>
                                <div class="mojito-input-select" style="width: 100%;margin-top: 6px">
                                    <el-select v-model="ComponentStyles.fontWeight" placeholder="请选择" @change="headleChangeFontWeight">
                                        <el-option
                                                v-for="item in weights"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div style="display: inline-block;width: 50%;padding: 0px 3px;font-size: 12px;margin-top: 6px">
                                <div>对齐</div>
                                <div class="mojito-input-select" style="width: 100%;margin-top: 6px">
                                    <el-select v-model="ComponentStyles.textAlign" placeholder="请选择" @change="headleChangeTextAlign">
                                        <el-option
                                                v-for="item in aligns"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </div>

            <div class="AttributeSide_title__kTBBo">
                <p>边框</p>
                <div style="margin-top: 12px">
                    <article class="Style_itemBox__3r86h" style="width: 100%;flex-wrap: wrap">
                        <section style="width: 100%">
                            <div style="display: inline-block;width: 50%;padding: 0px 3px;font-size: 12px">
                                <div>风格</div>
                                <div class="mojito-input-select" style="width: 100%;margin-top: 6px">
                                    <el-select v-model="ComponentStyles.borderStyle" placeholder="请选择" @change="headleChangeBorderStyle">
                                        <el-option
                                                v-for="item in borderStyles"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div style="display: inline-block;width: 50%;padding: 0px 3px;font-size: 12px">
                                <div>大小</div>
                                <div class="mojito-input-number" style="width: 100%;margin-top: 6px">
                                    <div class="mojito-input-number-handler-wrap">
                                        <span unselectable="on" role="button" aria-label="Increase Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-up">
                                            <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                                <i class="iconfont iconxiangshangjiantou" @click="headleChangeBorderWidth('add')"></i>
                                            </span>
                                        </span>
                                        <span unselectable="on" role="button" aria-label="Decrease Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-down">
                                            <span role="img" aria-label="up" class="anticon anticon-down mojito-input-number-handler-down-inner">
                                                <i class="iconfont icondown" @click="headleChangeBorderWidth('sub')"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <div class="mojito-input-number-input-wrap">
                                        <input  role="spinbutton"  step="1" class="mojito-input-number-input" v-model="ComponentStyles.borderWidth" @change="headleChangeBorderWidth('change')">
                                    </div>
                                </div>
                            </div>
                            <div style="display: inline-block;width: 50%;padding: 0px 3px;font-size: 12px;margin-top: 6px">
                                <div style="display: flex;align-items: center;height: 30px;">
                                    <label for="borderColor" style="margin-right: 5px">边框颜色</label>
                                    <div style="width: 40px; height: 24px; padding: 2px; border: 1px solid rgb(204, 204, 204); margin-left: 6px;" id="borderColor">
                                        <colorPicker v-model.lazy="ComponentStyles.borderColor"  v-on:change="headleChangeBorderColor"/>
                                    </div>
                                </div>

                            </div>
                            <div style="display: inline-block;width: 50%;padding: 0px 3px;font-size: 12px;margin-top: 6px">
                                <div>圆角</div>
                                <div class="mojito-input-number" style="width: 100%;margin-top: 6px;">
                                    <div class="mojito-input-number-handler-wrap">
                                        <span unselectable="on" role="button" aria-label="Increase Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-up">
                                            <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner" @click="headleChangeBorderRadius('add')">
                                                <i class="iconfont iconxiangshangjiantou"></i>
                                            </span>
                                        </span>
                                        <span unselectable="on" role="button" aria-label="Decrease Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-down">
                                            <span role="img" aria-label="up" class="anticon anticon-down mojito-input-number-handler-down-inner" @click="headleChangeBorderRadius('sub')">
                                                <i class="iconfont icondown"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <div class="mojito-input-number-input-wrap">
                                        <input  role="spinbutton" step="1" class="mojito-input-number-input" v-model="ComponentStyles.borderRadius" @change="headleChangeBorderRadius('change')">
                                    </div>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </div>

            <div class="AttributeSide_title__kTBBo">
                <div>
                    <p>不透明度</p>
                    <div class="mojito-row" style="row-gap: 0">
                        <div class="block" style="width: 100%">
                            <el-slider
                                    v-model.lazy="ComponentStyles.opacityValue"
                                    show-input input-size="mini" @input="changOpacity" :max="maxOpacity" :min="minOpacity" :step="opacityStep">
                            </el-slider>
                        </div>
                    </div>
                </div>
            </div>

<!--            <div class="AttributeSide_title__kTBBo">-->
<!--                <div>-->
<!--                    <p>缩放比例</p>-->
<!--                    <div class="mojito-row" style="row-gap: 0">-->
<!--                        <div class="block" style="width: 100%">-->
<!--                            <el-slider-->
<!--                                    v-model.lazy="ComponentStyles.zoomValue"-->
<!--                                    show-input input-size="mini" @input="changeZoom" :max="maxZoom">-->
<!--                            </el-slider>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

            <div class="AttributeSide_title__kTBBo">
                <div>
                    <p>旋转角度</p>
                    <div class="mojito-row" style="row-gap: 0">
                        <div class="block" style="width: 100%">
                            <el-slider
                                    v-model.lazy="ComponentStyles.rotateValue"
                                    show-input input-size="mini" @input="changeRotate" :max="maxRotate">
                            </el-slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import $ from 'jquery'
    export default {
        name: "ComponentStyles",
        props: ['ComponentStyles'],
        data() {
            return {
                model: 2,
                fontFamilies: [
                    {
                        label: 'auto',
                        value: 'auto'
                    },
                    {
                        label: '宋体',
                        value: '宋体'
                    },
                    {
                        label: '黑体',
                        value: '黑体'
                    },
                    {
                        label: '微软雅黑',
                        value: '微软雅黑'
                    },
                ],
                aligns: [
                    {
                        label: 'left',
                        value: 'left'
                    },
                    {
                        label: 'right',
                        value: 'right'
                    },
                    {
                        label: 'center',
                        value: 'center'
                    }
                ],
                weights: [
                    {
                        label: 'normal',
                        value: 'normal'
                    },
                    {
                        label: 'bold',
                        value: 'bold'
                    },
                    {
                        label: '200',
                        value: '200'
                    },
                    {
                        label: '300',
                        value: '300'
                    },
                    {
                        label: '400',
                        value: '400'
                    },
                    {
                        label: '500',
                        value: '500'
                    },
                    {
                        label: '600',
                        value: '600'
                    },
                    {
                        label: '700',
                        value: '700'
                    },
                ],
                borderStyles: [
                    {
                        value: 'none',
                        label: 'none'
                    },
                    {
                        value: 'hidden',
                        label: 'hidden'
                    },
                    {
                        value: 'dotted',
                        label: 'dotted'
                    },
                    {
                        value: 'dashed',
                        label: 'dashed'
                    },
                    {
                        value: 'solid',
                        label: 'solid'
                    },
                    {
                        value: 'double',
                        label: 'double'
                    },
                    {
                        value: 'groove',
                        label: 'groove'
                    },
                    {
                        value: 'ridge',
                        label: 'ridge'
                    },
                    {
                        value: 'inset',
                        label: 'inset'
                    },
                    {
                        value: 'outset',
                        label: 'outset'
                    },
                    {
                        value: 'inherit',
                        label: 'inherit'
                    },
                ],
                maxRotate: 360,
                maxZoom: 300,

                maxOpacity: 1,
                minOpacity: 0,
                opacityStep: 0.01
            }
        },
        methods: {
            changeOverflow(model,event) {
                event.preventDefault()
                event.stopPropagation()
                if(model === 'visible') {
                    this.model = 0
                    $(this.currentComponentElement).parents('.datav-transform').css('overflow','visible')
                    this.$set(this.currentComponent.style,'overflow','visible')
                }else if(model === 'hidden') {
                    this.model = 1
                    $(this.currentComponentElement).parents('.datav-transform').css('overflow','hidden')
                    this.$set(this.currentComponent.style,'overflow','hidden')
                }else {
                    this.model = 2
                    $(this.currentComponentElement).parents('.datav-transform').css('overflow','auto')
                    this.$set(this.currentComponent.style,'overflow','auto')
                }
            },
            // 颜色值改变时候触发
            headleChangeBgColor() {
                $(this.currentComponentElement).parents('.datav-transform').css('backgroundColor',this.ComponentStyles.backgroundColor)
                this.$set(this.currentComponent.style,'backgroundColor',this.ComponentStyles.backgroundColor)
            },

            headleChangeFontColor() {
                $(this.currentComponentElement).find('.datav-wrapper').children().children().css('color',this.ComponentStyles.color)
                this.$set(this.currentComponent.style,'color',this.ComponentStyles.color)
            },

            // 边框
            headleChangeBorderColor() {
                $(this.currentComponentElement).parents('.datav-transform').css('borderColor',this.ComponentStyles.borderColor)
                this.$set(this.currentComponent.style,'borderColor',this.ComponentStyles.borderColor)
            },
            headleChangeBorderStyle() {
                $(this.currentComponentElement).parents('.datav-transform').css('borderStyle',this.ComponentStyles.borderStyle)
                this.$set(this.currentComponent.style,'borderStyle',this.ComponentStyles.borderStyle)
            },
            headleChangeBorderWidth(option) {
                if(option === 'add') {
                    this.ComponentStyles.borderWidth = parseInt(this.ComponentStyles.borderWidth) + 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform').css('borderWidth',this.ComponentStyles.borderWidth)
                }else if(option === 'sub') {
                    this.ComponentStyles.borderWidth = parseInt(this.ComponentStyles.borderWidth) - 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform').css('borderWidth',this.ComponentStyles.borderWidth)
                }else {
                    $(this.currentComponentElement).parents('.datav-transform').css('borderWidth',this.ComponentStyles.borderWidth)
                }
                this.$set(this.currentComponent.style,'borderWidth',this.ComponentStyles.borderWidth)
            },
            headleChangeBorderRadius(option) {
                if(option === 'add') {
                    this.ComponentStyles.borderRadius = parseInt(this.ComponentStyles.borderRadius) + 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform').css('borderRadius',this.ComponentStyles.borderRadius)
                }else if(option === 'sub') {
                    this.ComponentStyles.borderRadius = parseInt(this.ComponentStyles.borderRadius) - 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform').css('borderRadius',this.ComponentStyles.borderRadius)
                }else {
                    $(this.currentComponentElement).parents('.datav-transform').css('borderRadius',this.ComponentStyles.borderRadius)
                }
                this.$set(this.currentComponent.style,'borderRadius',this.ComponentStyles.borderRadius)
            },

            // 字体
            headleChangeFontFamily() {
                $(this.currentComponentElement).find('.datav-wrapper').children().children().css('fontFamily',this.ComponentStyles.fontFamily)
                this.$set(this.currentComponent.style,'fontFamily',this.ComponentStyles.fontFamily)
            },
            headleChangeFontWeight() {
                $(this.currentComponentElement).find('.datav-wrapper').children().children().css('fontWeight',this.ComponentStyles.fontWeight)
                this.$set(this.currentComponent.style,'fontWeight',this.ComponentStyles.fontWeight)
            },
            headleChangeTextAlign() {
                $(this.currentComponentElement).find('.datav-wrapper').children().children().css('textAlign',this.ComponentStyles.textAlign)
                this.$set(this.currentComponent.style,'textAlign',this.ComponentStyles.textAlign)
            },
            headleChangeFontSize(option) {
                if(option === 'add') {
                    this.ComponentStyles.fontSize = parseInt(this.ComponentStyles.fontSize) + 1 + 'px'
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().css('fontSize',this.ComponentStyles.fontSize)
                }else if(option === 'sub') {
                    this.ComponentStyles.fontSize = parseInt(this.ComponentStyles.fontSize) - 1 + 'px'
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().css('fontSize',this.ComponentStyles.fontSize)
                }else {
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().css('fontSize',this.ComponentStyles.fontSize)
                }
                this.$set(this.currentComponent.style,'fontSize',this.ComponentStyles.fontSize)
            },


            changOpacity() {
                $(this.currentComponentElement).find('.datav-wrapper').css('opacity',this.ComponentStyles.opacityValue)
                this.$set(this.currentComponent.style,'opacityValue',this.ComponentStyles.opacityValue)
            },
            changeZoom() {
                let transform = this.currentComponentElement.parentNode.parentNode.style.transform
                if(!(transform === "")) {
                    let scale = /scale\(\S+\)/g.exec(transform)[0]
                    transform = transform.replace(scale,'')
                    transform = transform + "scale(" + this.ComponentStyles.zoomValue / 100 + ")"
                    this.currentComponentElement.parentNode.parentNode.style.transform = transform
                    this.$set(this.currentComponent.style,'zoomValue',this.ComponentStyles.zoomValue)
                }else {
                    let transform = "scale(" + this.ComponentStyles.zoomValue / 100 + ")"
                    this.currentComponentElement.parentNode.parentNode.style.transform = transform
                    this.$set(this.currentComponent.style,'zoomValue',this.ComponentStyles.zoomValue)
                }
            },
            changeRotate() {
                let transform = $(this.currentComponentElement).parents('.transform-handler')[0].style.transform
                if(transform === "") {
                    let transform1 = "rotate(" + this.ComponentStyles.rotateValue / 100 + "deg)"
                    $(this.currentComponentElement).parents('.transform-handler').css('transform',transform1)
                    this.$set(this.currentComponent.style,'rotateValue',this.ComponentStyles.rotateValue)
                }else {
                    let rotate = /rotate\(\S+\)/g.exec(transform)
                    transform = transform.replace(rotate,'')
                    transform = transform + "rotate(" + this.ComponentStyles.rotateValue + "deg)"
                    $(this.currentComponentElement).parents('.transform-handler').css('transform',transform)
                    this.$set(this.currentComponent.style,'rotateValue',this.ComponentStyles.rotateValue)
                }
            },
            changeX(type,x) {
                if(type == 'add') {
                    this.ComponentStyles.x = parseInt(x) + 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform')[0].style.transform = 'translate(' + this.ComponentStyles.x  + ',' + this.ComponentStyles.y + ')'
                }else if(type = 'sub'){
                    this.ComponentStyles.x = parseInt(x) - 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform')[0].style.transform = 'translate(' + this.ComponentStyles.x  + ',' + this.ComponentStyles.y + ')'
                }else {
                    this.ComponentStyles.x = parseInt(x) + 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform')[0].style.transform = 'translate(' + this.ComponentStyles.x  + ',' + this.ComponentStyles.y + ')'
                }
                this.$set(this.currentComponent.style,'x',this.ComponentStyles.x)
            },
            changeY(type,y) {
                if(type == 'add') {
                    this.ComponentStyles.y = parseInt(y) + 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform')[0].style.transform = 'translate(' + this.ComponentStyles.x  + ',' + this.ComponentStyles.y + ')'
                }else if(type == 'sub'){
                    this.ComponentStyles.y = parseInt(y) - 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform')[0].style.transform = 'translate(' + this.ComponentStyles.x  + ',' + this.ComponentStyles.y + ')'
                }else {
                    this.ComponentStyles.y = parseInt(y) - 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform')[0].style.transform = 'translate(' + this.ComponentStyles.x  + ',' + this.ComponentStyles.y + ')'
                }
                this.$set(this.currentComponent.style,'y',this.ComponentStyles.y)
            },

            changeWidth(type,width) {
                if(type == 'add') {
                    this.ComponentStyles.width = parseInt(width) + 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform').css('width',this.ComponentStyles.width)
                    $(this.currentComponentElement).find('.datav-wrapper').css('width',this.ComponentStyles.width)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().css('width',this.ComponentStyles.width)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().find('canvas').css('width',this.ComponentStyles.width)
                }else if(type == 'sub'){
                    this.ComponentStyles.width = parseInt(width) - 1 + 'px'
                    this.ComponentStyles.width = parseInt(width) + 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform').css('width',this.ComponentStyles.width)
                    $(this.currentComponentElement).find('.datav-wrapper').css('width',this.ComponentStyles.width)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().css('width',this.ComponentStyles.width)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().find('canvas').css('width',this.ComponentStyles.width)
                }else {
                    $(this.currentComponentElement).parents('.datav-transform').css('width',this.ComponentStyles.width)
                    $(this.currentComponentElement).find('.datav-wrapper').css('width',this.ComponentStyles.width)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().css('width',this.ComponentStyles.width)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().find('canvas').css('width',this.ComponentStyles.width)
                }
                this.$set(this.currentComponent.style,'width',this.ComponentStyles.width)
            },
            changeHeight(type,height) {
                if(type == 'add') {
                    this.ComponentStyles.height = parseInt(height) + 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform').css('height',this.ComponentStyles.height)
                    $(this.currentComponentElement).find('.datav-wrapper').css('height',this.ComponentStyles.height)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().css('height',this.ComponentStyles.height)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().find('canvas').css('height',this.ComponentStyles.height)
                }else if(type == 'sub'){
                    this.ComponentStyles.height = parseInt(height) - 1 + 'px'
                    $(this.currentComponentElement).parents('.datav-transform').css('height',this.ComponentStyles.height)
                    $(this.currentComponentElement).find('.datav-wrapper').css('height',this.ComponentStyles.height)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().css('height',this.ComponentStyles.height)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().find('canvas').css('width',this.ComponentStyles.height)
                }else {
                    $(this.currentComponentElement).parents('.datav-transform').css('height',this.ComponentStyles.height)
                    $(this.currentComponentElement).find('.datav-wrapper').css('height',this.ComponentStyles.height)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().css('height',this.ComponentStyles.height)
                    $(this.currentComponentElement).find('.datav-wrapper').children().children().first().find('canvas').css('height',this.ComponentStyles.height)
                }
                this.$set(this.currentComponent.style,'height',this.ComponentStyles.height)
            },
            getCurrentElementTagName() {
                if(this.currentComponentElement != null) {
                    return this.currentComponentElement.className
                }
            },
        },
        watch: {
            ComponentStyles: {
                handler(value) {
                    if(value.overflow === 'auto') {
                        this.model = 2
                    }else if(value.overflow === 'hidden') {
                        this.model = 1
                    }else if(value.overflow === 'visible'){
                        this.model = 0
                    }
                    this.$set(this.currentComponent.style,'x',value.x)
                    this.$set(this.currentComponent.style,'y',value.y)
                    this.$set(this.currentComponent.style,'width',value.width)
                    this.$set(this.currentComponent.style,'height',value.height)
                },
                deep: true,
            }
        },
        computed: {
            ...mapGetters([
                'currentComponentElement',
                'currentComponent'
            ])
        },
        mounted() {
            console.log(this.ComponentStyles)
        }
    }
</script>

<style scoped>
    #componentsEdit {
        box-sizing: border-box;
    }
    p {
        margin-bottom: 1em;
    }

    [role=button], a, area, button, input:not([type=range]), label, select, summary, textarea {
        touch-action: manipulation;
    }


    .AttributeSide_title__kTBBo {
        padding: 10px 12px;
        border-bottom: 1px solid #303247;
        position: relative;
    }
    .Style_itemBox__3r86h {
        display: flex;
        width: 50%;
        margin: 3px 0;
        align-items: center;
    }
    .Style_itemBox__3r86h > label {
        text-align: right;
        width: 50px;
        font-size: 12px;
    }
    .mojito-input-number {
        box-sizing: border-box;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: "tnum","tnum";
        position: relative;
        width: 100%;
        min-width: 0;
        color: hsla(0,0%,100%,.85);
        font-size: 14px;
        line-height: 1.5715;
        background-color: transparent;
        background-image: none;
        transition: all .3s;
        display: inline-block;
        width: 90px;
        margin: 0;
        padding: 0;
        border: 1px solid #434343;
        border-radius: 2px;
    }
    .mojito-input-number-handler-wrap {
        position: absolute;
        top: 0;
        right: 0;
        width: 22px;
        height: 100%;
        background: #141414;
        border-left: 1px solid #434343;
        border-radius: 0 2px 2px 0;
        opacity: 0;
        transition: opacity .24s linear .1s;
    }
    .mojito-input-number-handler-wrap:hover {
        opacity: 1;
    }
    .mojito-input-number-handler {
        position: relative;
        display: block;
        width: 100%;
        height: 50%;
        overflow: hidden;
        color: hsla(0,0%,100%,.45);
        font-weight: 700;
        line-height: 0;
        text-align: center;
        transition: all .1s linear;
    }
    .mojito-input-number-handler-up {
        border-top-right-radius: 2px;
        cursor: pointer;
    }
    .mojito-input-number-handler-down {
        top: 0;
        border-top: 1px solid #434343;
        border-bottom-right-radius: 2px;
        cursor: pointer;
    }
    .mojito-input-number-handler-down {
        top: 0;
        border-top: 1px solid #434343;
        border-bottom-right-radius: 2px;
        cursor: pointer;
    }
    .mojito-input-number-input {
        width: 100%;
        height: 30px;
        padding: 0 11px;
        text-align: left;
        background-color: transparent;
        border: 0;
        border-radius: 2px;
        outline: 0;
        transition: all .3s linear;
        color: white;
    }
    .mojito-input-number-handler-wrap
    .mojito-input-number-handler
    .mojito-input-number-handler-down-inner,
    .mojito-input-number-handler-wrap
    .mojito-input-number-handler
    .mojito-input-number-handler-up-inner {
        min-width: auto;
        margin-right: 0;
        font-size: 7px;
        margin-top: 8px;
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
        -moz-osx-font-smoothing: grayscale;
    }
    .anticon > i {
        color: white;
    }



    .mojito-radio-group {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: hsla(0,0%,100%,.85);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        font-feature-settings: "tnum","tnum";
        display: inline-block;
        font-size: 0;
        line-height: unset;
    }
    .mojito-radio-button-wrapper {
        position: relative;
        display: inline-block;
        height: 32px;
        margin: 0;
        padding: 0 15px;
        color: hsla(0, 0%, 100%, .85);
        font-size: 14px;
        line-height: 30px;
        background: transparent;
        border-color: #434343;
        border-style: solid;
        border-width: 1.02px 1px 1px 0;
        cursor: pointer;
        transition: color .3s, background .3s, border-color .3s, box-shadow .3s;
    }
    .mojito-radio-button-wrapper>.mojito-radio-button {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
    }

    .mojito-radio-button-wrapper-checked:not([class*=" mojito-radio-button-wrapper-disabled"]).mojito-radio-button-wrapper:first-child {
        border-right-color: #165996
    }
    .mojito-radio-button-wrapper-checked:not(.mojito-radio-button-wrapper-disabled):first-child {
        border-color:#177ddc;
    }
    .mojito-radio-button-wrapper-checked:not(.mojito-radio-button-wrapper-disabled) {
        z-index: 1;
        color: #177ddc;
        background: transparent;
        border-color: #177ddc;
    }
    .mojito-radio-button-wrapper:first-child {
        border-left: 1px solid #434343;
        border-radius: 2px 0 0 2px;
    }
    .mojito-radio-button-wrapper-checked:not(.mojito-radio-button-wrapper-disabled):before {
        z-index: 1;
        color: #177ddc;
        background: transparent;
        border-color: #177ddc;
    }
    .mojito-radio-button-wrapper:not(:first-child):before {
        position: absolute;
        top: -1px;
        left: -1px;
        display: block;
        box-sizing: content-box;
        width: 1px;
        height: 100%;
        padding: 1px 0;
        background-color: #177ddc;
        transition: background-color .3s;
        content: "";
    }


    .mojito-radio-button-wrapper
    .mojito-radio-inner,
    .mojito-radio-button-wrapper input[type=checkbox],
    .mojito-radio-button-wrapper input[type=radio] {
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
    }


    #background >>> .m-colorPicker {
        width: 100%;
        height: 100%;
    }
    #background >>> .m-colorPicker .colorBtn{
        width: 100%;
        height: 100%;
    }
    #fontcolor >>> .m-colorPicker {
        width: 100%;
        height: 100%;
    }
    #fontcolor >>> .m-colorPicker .colorBtn{
        width: 100%;
        height: 100%;
    }
    #fontcolor >>> .m-colorPicker .box {
        right: -50px;
        top: 20px;
    }
    #borderColor >>> .m-colorPicker {
        width: 100%;
        height: 100%;
    }
    #borderColor >>> .m-colorPicker .colorBtn{
        width: 100%;
        height: 100%;
    }



    /*选择框*/
    .mojito-input-select {
        box-sizing: border-box;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: "tnum","tnum";
        position: relative;
        width: 100%;
        min-width: 0;
        font-size: 14px;
        line-height: 1.5715;
        background-color: transparent;
        background-image: none;
        transition: all .3s;
        display: inline-block;
        width: 90px;
        margin: 0;
        padding: 0;
        border-radius: 2px;
    }
    /deep/ .el-input__inner {
        background-color: transparent !important;
        padding: 0 11px !important;
        border-radius: 0px !important;
        outline: none !important;
        height: 30px !important;
        line-height: 30px !important;
        border: 1px solid #434343 !important;
        color: hsla(0,0%,100%,.85) !important;
    }
    /deep/ .el-input__icon {
        line-height: 30px;
    }


    /*滑快*/
    /deep/ .el-slider__runway.show-input {
        width: 150px !important;
    }
    /deep/ .el-slider__input {
        width: 100px;
    }
    /deep/ .el-slider__bar {
        background-color: #335ae9!important;
    }
    /deep/ .el-slider__button {
        border: 1px solid #fff;
        background-color: #6f6ff5;
    }

    /*颜色选择器*/
    /deep/ .m-colorPicker .box.open {
        z-index: 99999999;
    }
    /*滑快*/
    .mojito-col {
        display: flex;
        flex-flow: row wrap;
    }
</style>