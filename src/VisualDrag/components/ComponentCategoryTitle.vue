<template>
    <div class="ComponentSide_cateTitle__2dqZl">
        {{componentCategoryTitle}}
        <span class="ComponentSide_close__b-tZ0">
            <span role="img" aria-label="close" class="anticon anticon-close">
                <i class="iconfont iconchahao" @click="close"></i>
            </span>
        </span>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import $ from 'jquery'
    export default {
        name: "ComponentCategoryTitle",
        methods: {
            // 关闭组件侧边栏
            close() {
                $('#ComponentSide_components__2Wcic').css('display','none')
                this.$store.commit('setComponentCategoryIcon',-1)
            },
        },
        computed: {
            ...mapGetters([
                'componentCategoryTitle'
            ])
        }
    }
</script>

<style scoped>
    .ComponentSide_cateTitle__2dqZl {
        height: 36px;
        line-height: 36px;
        text-align: center;
        position: relative;
        border-bottom: 1px solid #303247;
    }
    .ComponentSide_close__b-tZ0 {
        position: absolute;
        right: 12px;
        cursor: pointer;
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