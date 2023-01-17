<template>
    <div id="dataTreat" class="page" @click.stop.prevent="closeOptions">
        <NavLeft/>
        <NavRight/>
        <div id="panels">
            <rename-popup/>
            <associated-popup/>
            <merge-popup/>
            <break-popup/>
            <filter-popup/>
            <conditions-popup/>
            <chang-type-popup/>
            <sort-popup/>
            <IndicatorsPopup/>
        </div>
    </div>
</template>

<script>
    import NavLeft from "./components/NavLeft";
    import NavRight from "./components/NavRight";
    import {processing} from "./js/processing";
    import RenamePopup from "./panels/renamePopup";
    import {mapGetters} from 'vuex'
    import AssociatedPopup from "./panels/associatedPopup";
    import MergePopup from "./panels/mergePopup";
    import BreakPopup from "./panels/breakPopup";
    import FilterPopup from "./panels/filterPopup";
    import ConditionsPopup from "./panels/conditionsPopup";
    import ChangTypePopup from "./panels/changTypePopup";
    import SortPopup from "./panels/sortPopup";
    import IndicatorsPopup from "./panels/IndicatorsPopup";
    export default {
        name: "Index",
        mixins: [processing],
        data() {
            return {
            }
        },
        components: {
            IndicatorsPopup,
            SortPopup,
            ChangTypePopup,
            ConditionsPopup,
            FilterPopup, BreakPopup, MergePopup, AssociatedPopup, RenamePopup, NavRight, NavLeft},
        methods: {

        },
        computed: {
            ...mapGetters([

            ])
        }
    }
</script>

<style scoped>
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(49 52 52 / 0.5);
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        background: none;
        border-radius: 5px;
    }
    #dataTreat {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        overflow: scroll;
    }
    #dataTreat:before{
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

    #dataTreat.before::before{
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
    #panels {
        position: absolute;
        left: 50%;
        top: 0%;
        transform: translate(-50%,-50%);
        z-index: 1200;
    }
</style>