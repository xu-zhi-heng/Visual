<template>
    <div class="layers" id="layers">
        <div class="AttributeSide_layer__3grol" v-for="(item,index) in canvasLayers" :key="index" :class="active == item.index ? 'AttributeSide_layerSelected__1FETI' : '' " @click="activeIndex(item.index)">
            <span role="img" tabindex="-1" class="anticon AttributeSide_icons__uVkHF" style="color: rgb(255,255,255);font-size: 16px">
                <i class="iconfont iconiconset0114" @click.stop.prevent="lockComponent($event,item.index)"></i>
            </span>
            <span role="img" tabindex="-1" class="anticon AttributeSide_icons__uVkHF" style="right: 0px;color: rgb(255,255,255);font-size: 16px;margin-left: 6px">
                <i class="iconfont iconxianshi" @click.stop.prevent="hiddenComponent($event,item.index)"></i>
            </span>
            <div :title="item.typeText" style="margin-left: 12px;width: 100%;height: 33px;line-height: 33px;overflow: hidden;flex-grow: 1;cursor: progress">
                {{item.typeText}}{{item.index}}
            </div>
            <span role="img" tabindex="-1" class="anticon AttributeSide_icons__uVkHF" style="right: 0px;font-size: 14px">
                <i class="iconfont iconshanchu" @click.stop.prevent="deleteComponent($event,item.index)"></i>
            </span>
        </div>
    </div>
</template>

<script>
    import Sortable from 'sortablejs'
    import $ from 'jquery'
    import {mapGetters} from "vuex"
    import {mixin} from "../../mixins";
    export default {
        name: "CanvasLayers",
        data() {
            return {
                active: -1,
                value: null
            }
        },
        mixins: [mixin],
        methods: {
            sortable() {
                let that = this
                let element = document.getElementById("layers")
                new Sortable(element,{
                    animation: 150,
                    ghostClass: 'blue-background-class',
                    onEnd(event) {
                        that.value.splice(event.newIndex, 0, that.value.splice(event.oldIndex,1)[0])
                        let newArray = that.value.slice(0)
                        that.value = []
                        that.$nextTick(function () {
                            that.value = newArray
                        })
                    }
                })
            },
            deleteComponent(event,index) {
                for(let i = 0; i < this.componentArray.length; i++) {
                    if(this.componentArray[i].index == index) {
                        this.componentArray.splice(i,1)
                        this.canvasLayers.splice(i,1)
                        let length = this.componentArrayLength
                        this.$store.commit('setComponentArrayLength',length - 1)
                        this.$store.commit('AsetOptionsLength',0)
                        return
                    }
                }
            },
            lockComponent(event,index) {
                if($('.datav-transform').eq(index).attr('class').indexOf('locked') === -1) {
                    $('.datav-transform').eq(index).addClass('locked')
                }else {
                    $('.datav-transform').eq(index).removeClass('locked')
                }
            },
            hiddenComponent(event,index) {
                if($('.datav-scale').eq(index).css('display') === 'block') {
                    $('.datav-scale').eq(index).css('display','none')
                    $('.datav-com').eq(index).css('display','none')
                    $('.datav-transform').eq(index).addClass('hided')
                }else {
                    $('.datav-scale').eq(index).css('display','block')
                    $('.datav-com').eq(index).css('display','block')
                    $('.datav-transform').eq(index).removeClass('hided')
                }
            },
            activeIndex(index) {
                this.removeHandle()
                this.$nextTick(() => {
                    this.active = index
                    this.$store.commit("setCurrentCanvasLayersIndex",index)
                })
            }
        },
        mounted() {
            this.sortable()
            this.value = this.canvasLayers
        },
        computed: {
            ...mapGetters([
                'currentCanvasLayersIndex',
                'componentArrayLength',
                'canvasLayers',
                'componentArray'
            ])
        }
    }
</script>

<style scoped>
    .layers {
        box-sizing: border-box;
    }
    .AttributeSide_layerSelected__1FETI {
        background-color: black;
    }
    .AttributeSide_layer__3grol {
        display: flex;
        height: 45px;
        font-size: 14px;
        padding: 6px;
        align-items: center;
    }
    .AttributeSide_layer__3grol:hover {
        background: linear-gradient(
                134deg
                ,rgba(51,90,233,.2),rgba(111,111,245,.2))
    }
    .anticon {
        display: inline-block;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;
        vertical-align: -.125em;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing:antialiased;
    }
</style>