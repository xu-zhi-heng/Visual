<template>
    <div class="datav-wrapper" style="width: 300px;height: 300px;transform: translateZ(0px);opacity: 1;">
        <div class="image" ref="text">
            <div class="chooseImg" v-if="imageUrl == ''">
                <input type="file" @change="chooseImage($event)"/>
                <i class="iconfont iconjiahao"></i>
                <p>选择图片</p>
            </div>
            <div v-else class="imageContainer">
                <img :src="imageUrl"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PictureBox",
        data() {
            return {
                imageUrl: ''
            }
        },
        methods: {
            chooseImage(event) {
                // this.imageUrl = require("../../../assets/" + event.target.files[0].name)
            }
        }
    }
</script>

<style scoped>
    .datav-wrapper {
        pointer-events: none!important;
    }
    .image {
        width: 300px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .chooseImg {
        width: 100%;
        height: 100%;
        background-color: #efefef;
        border: 3px slateblue dashed;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: black;
        font-size: 24px;
        position: relative;
    }
    .chooseImg input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .chooseImg > i {
        font-size: 50px;
    }

    .imageContainer {
        width: 100%;
        height: 100%;
    }

    .imageContainer > img {
        width: 100%;
        height: 100%;
    }
</style>