<template>
    <div class="ComponentSide_category__1sNY8" style="z-index: 99999">
        <div v-for="(item) in ComponentSide_icon" :key="item.index" class="ComponentSide_icon__1vrU7" :class="item.index == componentCategoryIcon ? 'ComponentSide_iconSelected__3UNGU' : '' " @click="ChooseComponentIcon(item.index)">
            <span role="img" class="anticon">
                <i class="iconfont" :class="item.icon" @click="ChooseComponentIcon(item.index)"></i>
            </span>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {mapGetters} from 'vuex'
    export default {
        name: "ComponentCategoryIcon",
        data() {
            return {
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
                ]
            }
        },
        methods: {
            // 选择组件图标，对应的图标变亮
            ChooseComponentIcon(index) {
                this.$store.commit('setComponentCategoryIcon',index)
                $('#ComponentSide_components__2Wcic').css('display','flex')
                for(let item of this.ComponentSide_icon) {
                    if(index == item.index) {
                        this.$store.commit('setComponentCategoryTitle',item.type)
                        return
                    }
                }
            },
        },
        computed: {
            ...mapGetters([
                'componentCategoryIcon'
            ])
        }
    }
</script>

<style scoped>
    .ComponentSide_category__1sNY8 {
        height: 100%;
        background: #212c3d;
        overflow: hidden;
        position: relative;
        width: 40px;
    }
    .ComponentSide_icon__1vrU7 {
        font-size: 16px;
        padding: 5px 0;
        margin: 10px 5px;
        text-align: center;
        height: 30px;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #92abcf;
        cursor: pointer;
    }
    .ComponentSide_iconSelected__3UNGU {
        color: #1d2636;
        background-color: #11ece5;
        border-radius: 4px;
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
</style>