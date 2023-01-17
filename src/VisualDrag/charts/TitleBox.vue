<template>
    <div class="datav-wrapper" style="width: 200px;height: 40px;transform: translateZ(0px);opacity: 1;">
        <div class="text" ref="text" style="width: 200px;height: 40px">
            <div contenteditable="true">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TitleBox"
    }
</script>

<style scoped>
    .datav-wrapper {
        /*pointer-events: none!important;*/
    }
    .text div {
        width: 100%;
        height: 100%;
        border: 1px solid #e5e5e5;
        color: black;
        font-size: 20px;
        padding: 0px 0px 0px 10px;
        line-height: 40px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
    }
</style>