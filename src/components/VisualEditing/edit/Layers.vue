<template>
    <div class="layers" id="layers">
        <div class="AttributeSide_layer__3grol" v-for="(item,index) in layers" :key="index" :class="active == item.index ? 'AttributeSide_layerSelected__1FETI' : '' " @click="activeIndex(item.index)">
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
    import {mapGetters} from "vuex"
    import {mixin} from "../../../mixins";
    export default {
        name: "Layers",
        data() {
            return {
                isHidden: false,
                isLock: false,
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
                event.stopPropagation()
                for(let i = 0; i < this.view.length; i++) {
                    if(this.view[i].index == index) {
                        this.view.splice(i,1)
                        this.layers.splice(i,1)
                        let length = this.viewLength
                        this.$store.commit('setViewLength',length - 1)
                        this.$store.commit('AsetOptionsLength',0)
                        return
                    }
                }
            },
            lockComponent(event,index) {
                event.stopPropagation()
                if(!this.isLocal) {
                    event.target.style.color = "rgb(68,68,68)"
                    this.isLocal = true
                }else {
                    event.target.style.color = "rgb(255,255,255)"
                    this.isLocal = false
                }
            },
            hiddenComponent(event,index) {
                event.stopPropagation()
                if(!this.isHidden) {
                    event.target.style.color = "rgb(68,68,68)"
                    this.isHidden = true
                }else {
                    event.target.style.color = "rgb(255,255,255)"
                    this.isHidden = false
                }
            },
            activeIndex(index) {
                this.removeHandle()
                this.$nextTick(() => {
                    this.active = index
                    this.$store.commit("setCurrentIndex",index)
                })
            }
        },
        mounted() {
            this.sortable()
            this.value = this.layers
        },
        computed: {
            ...mapGetters([
                'layers',
                'view',
                'CurrentIndex',
                'viewLength'
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