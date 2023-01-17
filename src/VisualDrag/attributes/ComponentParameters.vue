<template>
    <div id="ComponentsAttributes">
        <div class="AttributeSide_title__kTBBo" style="display: flex;justify-content: space-between;">
            <div style="width: 70%;overflow: hidden">{{this.currentComponent.typeText}}</div>
        </div>

        <div style="display: flex;height: 100%;flex-direction: column" v-if="currentComponent.echartInstance != null">
            <div class="AttributeSide_title__kTBBo">
                <button type="button" class="mojito-btn" @click="DataBinding">
                    <span role="img" aria-label="api" class="anticon anticon-api">
                        <i class="iconfont icondashujukeshihuaico-"></i>
                    </span>
                    <span style="margin-left: 8px">数据绑定</span>
                </button>
                <button type="button" class="mojito-btn" style="margin-top: 6px;color: red" @click="Compute">
                    <span role="img" aria-label="delete" class="anticon anticon-delete">
                        <i class="iconfont iconjisuan" style="vertical-align: initial"></i>
                    </span>
                    <span style="margin-left: 8px">高级计算</span>
                </button>
            </div>

            <div style="height: 100%;flex-grow: 1;flex-basis: 0px">
                <form class="mojito-form mojito-form-horizontal" v-if="currentComponent.echartInstance != null">
                    <div class="mojito-collapse mojito-collapse-icon-position-left">
                        <div class="mojito-collapse-item">
                            <div class="mojito-collapse-header" role="button" tabindex="0" aria-expanded="false">
                                <span role="img" aria-label="right" class="anticon anticon-right mojito-collapse-arrow">
                                    <i class="iconfont iconiconfontjiantou2" @click.stop.prevent="showCodemirror($event,'echartOption')" style="transition: all 0.2s ease"></i>
                                </span>
                                <div>
                                    图表参数
                                    <span style="color: rgb(102,102,102);margin-left: 6px">
                                        <span role="img" aria-label="exclamation-circle" class="anticon anticon-exclamation-circle" @click.stop.prevent="showCodemirror($event,'echartOption')">
                                            <i class="iconfont icongantanhao"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="mojito-collapse-content mojito-collapse-content-inactive mojito-collapse-content-hidden" ref="codemirrorContentOption">
                                <div class="mojito-collapse-content-box">
                                    <codemirror v-model="echartOptionCode" :options="cmOptions" autofocus="autofocus" @ready="onCmReadyByOption" @focus="onCmFocusByOption" @input="onCmCodeChangeByOption"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <form class="mojito-form mojito-form-horizontal" v-if="currentComponent.echartInstance != null">
                    <div class="mojito-collapse mojito-collapse-icon-position-left">
                        <div class="mojito-collapse-item">
                            <div class="mojito-collapse-header" role="button" tabindex="0" aria-expanded="false">
                                <span role="img" aria-label="right" class="anticon anticon-right mojito-collapse-arrow">
                                    <i class="iconfont iconiconfontjiantou2" @click.stop.prevent="showCodemirror($event,'drawEchart')" style="transition: all 0.2s ease"></i>
                                </span>
                                <div>
                                    重绘图表
                                    <span style="color: rgb(102,102,102);margin-left: 6px">
                                        <span role="img" aria-label="exclamation-circle" class="anticon anticon-exclamation-circle" @click.stop.prevent="showCodemirror($event,'drawEchart')">
                                            <i class="iconfont icongantanhao"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div class="mojito-collapse-content mojito-collapse-content-inactive mojito-collapse-content-hidden" ref="codemirrorContentText" >
                                <div class="mojito-collapse-content-box">
                                    <codemirror v-model="drawEchartCode" :options="cmOptions" autoFocus="autofocus" @ready="onCmReadyByDraw" @focus="onCmFocusByDraw" @input="onCmCodeChangeByDraw"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/mode/javascript/javascript.js'
    import 'codemirror/theme/base16-dark.css'

    import 'codemirror/addon/scroll/annotatescrollbar.js'
    import 'codemirror/addon/search/matchesonscrollbar.js'
    import 'codemirror/addon/search/match-highlighter.js'
    import 'codemirror/addon/search/jump-to-line.js'

    import 'codemirror/addon/dialog/dialog.js'
    import 'codemirror/addon/dialog/dialog.css'
    import 'codemirror/addon/search/searchcursor.js'
    import 'codemirror/addon/search/search.js'

    import {mapGetters} from 'vuex'
    import $ from 'jquery'
    export default {
        name: "ComponentParameters",
        props: ['echartsOption'],
        data()  {
            return {
                isShowCodeMirror: false,
                echartOptionCode: '',
                drawEchartCode: '',
                cmOptions: {
                    tabSize: 4,
                    mode: 'application/json',
                    theme: 'base16-dark',
                    lineNumbers: true,
                    line: true,
                }
            }
        },
        methods: {
            DataBinding() {
                $('#getData').css('display','block')
                $('#panels').css('zIndex','1001')
                $('#root').addClass('before')
            },
            // 显示代码编辑器
            showCodemirror(event,type) {
                event.stopPropagation()
                if(type === 'echartOption') {
                    if(!this.isShowCodeMirror) {
                        this.$refs.codemirrorContentOption.classList.remove("mojito-collapse-content-hidden")
                        event.target.style.transform = "rotate(90deg)"
                        this.isShowCodeMirror = true
                    }else {
                        this.$refs.codemirrorContentOption.classList.add("mojito-collapse-content-hidden")
                        event.target.style.transform = "rotate(0deg)"
                        this.isShowCodeMirror = false
                    }
                }else {
                    if(!this.isShowCodeMirror) {
                        this.$refs.codemirrorContentText.classList.remove("mojito-collapse-content-hidden")
                        event.target.style.transform = "rotate(90deg)"
                        this.isShowCodeMirror = true
                    }else {
                        this.$refs.codemirrorContentText.classList.add("mojito-collapse-content-hidden")
                        event.target.style.transform = "rotate(0deg)"
                        this.isShowCodeMirror = false
                    }
                }

            },

            onCmReadyByOption(cm) {

            },
            onCmFocusByOption(cm) {

            },

            // 代码改变时
            onCmCodeChangeByOption(newCode) {
                this.echartOptionCode = newCode
                this.$set(this.currentComponent,'options',JSON.parse(newCode))
                this.$nextTick(() => {
                    this.currentComponent.echartInstance.setOption(JSON.parse(newCode),true)
                })
            },
            onCmReadyByDraw(cm) {

            },
            onCmFocusByDraw(cm) {

            },

            // 重绘图表
            onCmCodeChangeByDraw(newCode) {
                this.drawEchartCode = newCode
                this.$set(this.currentComponent,'options',JSON.parse(newCode))
                this.$nextTick(() => {
                    this.currentComponent.echartInstance.setOption(JSON.parse(newCode),true)
                })
            },
            Compute() {
                $('#advancedComputing').css('display','block')
                $('#panels').css('zIndex','1001')
                $('#root').addClass('before')
            }
        },
        computed: {
            ...mapGetters([
                'currentComponent'
            ])
        },
        watch: {
            echartsOption: {
                deep: true,
                handler(value) {
                    this.echartOptionCode = JSON.stringify(value,undefined,2)
                }
            }
        },
        components: {
            codemirror
        },
        mounted() {
            this.echartOptionCode = JSON.stringify(this.echartsOption,undefined,2)
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
    #ComponentsAttributes {
        box-sizing: border-box;
    }
    [role=button], a, area, button, input:not([type=range]), label, select, summary, textarea {
        touch-action: manipulation;
    }
    .AttributeSide_title__kTBBo {
        padding: 10px 12px;
        border-bottom: 1px solid #303247;
        position: relative;
    }
    [type=reset], [type=submit], button, html [type=button] {
        -webkit-appearance: button;
    }
    .mojito-btn, .mojito-btn:active, .mojito-btn:focus {
        outline: 0;
    }
    .mojito-btn {
        line-height: 1.5715;
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        background-image: none;
        box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
        cursor: pointer;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        user-select: none;
        touch-action: manipulation;
        height: 32px;
        padding: 4px 15px;
        font-size: 14px;
        border-radius: 2px;
        color: hsla(0,0%,100%,.85);
        background: transparent;
        border: 1px solid #434343;
    }
    .mojito-btn:hover {
        border-color: #03a9f4;
        color: #03a9f4;
    }
    .mojito-btn>.anticon {
        line-height: 1;
    }
    .mojito-btn>span {
        display: inline-block;
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


    /*配置项*/
    .mojito-form {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: hsla(0,0%,100%,.85);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        font-feature-settings: "tnum","tnum";
    }
    .mojito-collapse {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: hsla(0,0%,100%,.85);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        font-feature-settings: "tnum","tnum";
        background-color: hsla(0,0%,100%,.04);
        border: 1px solid #434343;
        border-bottom: 0;
        border-radius: 2px;
    }
    .mojito-collapse>.mojito-collapse-item {
        border-bottom: 1px solid #434343;
        transition: all 0.5s ease;
    }
    .mojito-collapse>.mojito-collapse-item>.mojito-collapse-header {
        position: relative;
        padding: 12px 16px 12px 40px;
        color: hsla(0,0%,100%,.85);
        line-height: 1.5715;
        cursor: pointer;
        transition: all .3s,visibility 0s;
    }
    .mojito-collapse>.mojito-collapse-item>.mojito-collapse-header .mojito-collapse-arrow {
        color: inherit;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;
        vertical-align: -.125em;
        text-rendering: optimizeLegibility;
        position: absolute;
        top: 12px;
        left: 16px;
        display: inline-block;
        padding: 12px 0 0;
        font-size: 12px;
        transition: all 0.5s ease;
    }
    .mojito-collapse>.mojito-collapse-item>.mojito-collapse-header:before {
        display: table;
        content: "";
    }
    .mojito-collapse>.mojito-collapse-item>.mojito-collapse-header:after {
        display: table;
        clear: both;
        content: "";
    }
    .mojito-collapse-content-hidden {
        display: none;
    }
    .mojito-collapse-content {
        color: hsla(0,0%,100%,.85);
        background-color: #141414;
        border-top: 1px solid #434343;
        transition: all 0.5s ease;
    }
    .mojito-collapse-content-box {
        padding: 3px;
    }
</style>