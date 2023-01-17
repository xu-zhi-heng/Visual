<template>
    <div id="sweetFunMain" class="scroll">
        <div class="width-box scroll-con" id="main-box">
            <div class="page-body shown" ref="pageBody">
                <component :is="currentPage"></component>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "SweetFunMain",
        computed: {
            ...mapGetters([
                'currentPage'
            ])
        },
        mounted() {
            this.$store.commit('setPageBody',this.$refs.pageBody)
        }
    }
</script>

<style scoped>
    #sweetFunMain {
        height: 100%;
    }
    .scroll {
        position: relative;
        height: 100%;
    }
    .scroll > .scroll-con {
        height: 100%;
        overflow: inherit;
    }
    .width-box {
        width: 1500px;
        height: 100%;
        margin: 0 auto;
        position: relative;
    }
    .page-body.shown{
        transform: scale(1);
        opacity: 1;
    }
    .page-body.changing {
        transform: scale(0.9);
        opacity: 0.5;
    }
    .page-body {
        transform: scale(0.8);
        opacity: 0.25;
        transition: all 0.5s;
    }
    .page-body {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
    }
</style>