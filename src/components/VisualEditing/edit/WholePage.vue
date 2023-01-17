<template>
    <div class="AttributeSide_styleSetting__D_nAA">
        <div class="AttributeSide_title__kTBBo">
            <p>页面尺寸</p>
            <div style="display: flex;flex-wrap: wrap">
                <div class="Style_itemBox__3r86h">
                    <label for="width">宽度</label>
                    <span>
                        <div class="mojito-input-number" style="width: 80px;margin-left: 6px">
                            <div class="mojito-input-number-handler-wrap">
                                <span unselectable="on" role="button" aria-label="Increase Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-up">
                                    <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                        <i class="iconfont iconxiangshangjiantou"></i>
                                    </span>
                                </span>
                                <span unselectable="on" role="button" aria-label="Decrease Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-down">
                                    <span role="img" aria-label="down" class="anticon anticon-down mojito-input-number-handler-down-inner">
                                        <i class="iconfont icondown"></i>
                                    </span>
                                </span>
                            </div>
                            <div class="mojito-input-number-input-wrap">
                                <input aria-autocomplete="off" role="spinbutton" aria-valuenow="1920" step="1" class="mojito-input-number-input" value="1920" id="width" @change="setScreenWidth"/>
                            </div>
                        </div>
                    </span>
                </div>


                <div class="Style_itemBox__3r86h">
                    <label for="height">高度</label>
                    <span>
                        <div class="mojito-input-number" style="width: 80px;margin-left: 6px">
                            <div class="mojito-input-number-handler-wrap">
                                <span unselectable="on" role="button" aria-label="Increase Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-up">
                                    <span role="img" aria-label="up" class="anticon anticon-up mojito-input-number-handler-up-inner">
                                        <i class="iconfont iconxiangshangjiantou"></i>
                                    </span>
                                </span>
                                <span unselectable="on" role="button" aria-label="Decrease Value" aria-disabled="false" class="mojito-input-number-handler mojito-input-number-handler-down">
                                    <span role="img" aria-label="down" class="anticon anticon-down mojito-input-number-handler-down-inner">
                                        <i class="iconfont icondown"></i>
                                    </span>
                                </span>
                            </div>
                            <div class="mojito-input-number-input-wrap">
                                <input aria-autocomplete="off" role="spinbutton" aria-valuenow="1080" step="1" class="mojito-input-number-input" value="1080" id="height" @change="setScreenHeight"/>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>



        <div class="AttributeSide_title__kTBBo">
            <p>页面颜色</p>
            <div style="display: flex;flex-wrap: wrap">
                <div class="Style_itemBox__3r86h">
                    <label for="background">背景颜色</label>
                    <div style="width: 40px; height: 24px; padding: 2px; border: 1px solid rgb(204, 204, 204); margin-left: 6px;" id="background">
                        <colorPicker  v-model="backGroundColor"  v-on:change="headleChangeBgColor"/>
                    </div>
                </div>
                <div class="Style_itemBox__3r86h">
                    <label for="fontcolor">字体颜色</label>
                    <div style="width: 40px; height: 24px; padding: 2px; border: 1px solid rgb(204, 204, 204); margin-left: 6px;" id="fontcolor">
                        <colorPicker v-model="fontColor"  v-on:change="headleChangeFontColor"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="AttributeSide_title__kTBBo">
            <p>主题</p>
            <div style="display: flex;flex-wrap: wrap">
                <div class="Style_itemBox__3r86h">
                    <div style="width: 40px; height: 24px; padding: 2px; border: 1px solid rgb(204, 204, 204); margin-left: 6px; background-color: white" id="light" @click="changeTheme('light')"></div>
                    <div style="width: 40px; height: 24px; padding: 2px; border: 1px solid rgb(204, 204, 204); margin-left: 6px; background-color: black" id="dark" @click="changeTheme('dark')"></div>
                </div>
            </div>
        </div>



        <div class="AttributeSide_title__kTBBo">
            <p>背景图</p>
            <span class="mojito-upload-picture-card-wrapper avatar-uploader">
                <div class="mojito-upload mojito-upload-select mojito-upload-select-picture-card">
                    <span tabindex="0" class="mojito-upload" role="button" @click="clickInput">
                        <input type="file" accept=".png,.jpg,.gif,.jpeg" style="display: none;" ref="fileInput" @change="uploadFile($event)" id="imageFile">
                        <div class="UploadImg_upload__1c5dp" v-if="imgUrl != '' ">
                            <img :src="imgUrl"/>
                            <div class="UploadImg_toolBar__kUkZJ">
                                <a>
                                    <span role="img" aria-label="delete" class="anticon anticon-delete">
                                        <i class="iconfont iconcangpeitubiao_shanchu" @click="deleteImg($event)"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div v-else class="UploadImg_upload__1c5dp">
                            <div style="margin-top: 20px">
                                <i class="iconfont iconjiahao" style="vertical-align: middle"></i>
                                <div>上传图片</div>
                            </div>
                        </div>
                    </span>
                </div>
            </span>
            <div class="mojito-radio-group mojito-radio-group-solid">
                <div class="mojito-radio-button-wrapper mojito-radio-button-wrapper-checked" @click="changeBgImageSize($event)">
                    平铺
                </div>
                <div class="mojito-radio-button-wrapper" @click="changeBgImageSize($event)">
                    拉伸
                </div>
            </div>
        </div>
    </div>



</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "WholePage",
        props: ["data"],
        data() {
            return {
                backGroundColor: 'white',
                fontColor: '',
                imgUrl: "",
            }
        },
        methods: {
            // 颜色值改变时候触发
            headleChangeBgColor() {
                this.screenContainer.style.backgroundColor = this.backGroundColor
            },
            headleChangeFontColor() {
                this.screenContainer.style.color = this.fontColor
            },
            //js点击出现文件上传
            clickInput() {
                this.$refs.fileInput.click()
            },
            // 删除图片
            deleteImg(event) {
                event.stopPropagation()
                this.imgUrl = ""
                this.screenContainer.style.backgroundImage = "url(" + this.imgUrl + ")"
            },
            // 上传图片
            uploadFile(event) {
                let imgName = event.target.files[0].name
                this.imgUrl = require("../../../assets/" + imgName)
                this.screenContainer.style.backgroundImage = "url(" + this.imgUrl + ")"
            },
            setScreenWidth() {
                let width = document.getElementById("width").value
                this.screenContainer.style.width = parseInt(width) + "px";
            },
            setScreenHeight() {
                let height = document.getElementById("height").value
                this.screenContainer.style.height = parseInt(height) + "px";
            },
            changeBgImageSize(event) {
                if(event.target.classList.contains("mojito-radio-button-wrapper-checked")) {

                }else {
                    event.target.classList.add("mojito-radio-button-wrapper-checked")
                    if(event.target.nextSibling != null) {
                        event.target.nextSibling.classList.remove("mojito-radio-button-wrapper-checked")
                    }else {
                        event.target.previousSibling.classList.remove("mojito-radio-button-wrapper-checked")
                    }
                }
                if(event.target.innerText === '拉伸') {
                    this.screenContainer.style.backgroundSize = "100% 100%"
                }else {
                    this.screenContainer.style.backgroundSize = ""
                }
            },
            changeTheme(type) {
                if(type === 'light') {
                    this.screenContainer.style.backgroundColor = 'white'
                    this.$store.commit('changeTheme','vintage')
                }else if(type === 'dark') {
                    this.screenContainer.style.backgroundColor = '#161522'
                    this.$store.commit('changeTheme','chalk')
                }
            }
        },
        computed: {
            ...mapGetters([
                'screenContainer',
                'theme'
            ])
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .AttributeSide_styleSetting__D_nAA {

        box-sizing: border-box;
    }
    .AttributeSide_title__kTBBo {
        padding: 10px 12px;
        border-bottom: 1px solid #303247;
        position: relative;
    }
    .AttributeSide_title__kTBBo > p {
        margin-top: 0;
        margin-bottom: 1em;
    }

    .Style_itemBox__3r86h {
        display: flex;
        width: 50%;
        margin: 3px 0;
        align-items: center;
    }
    .Style_itemBox__3r86h > label{
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
        transition: all .3s ease;
        display: inline-block;
        width: 90px;
        margin: 0;
        padding: 0;
        border: 1px solid #434343;
        border-radius: 2px;
    }
    .mojito-input-number:hover {
        border: 1px solid #1890ff;
        border-radius: 5px;
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
    .mojito-input-number-handler-up-inner {
        top: 50%;
        margin-top: -5px;
        text-align: center;
    }
    .mojito-input-number-handler-down {
        top: 0;
        border-top: 1px solid #434343;
        border-bottom-right-radius: 2px;
        cursor: pointer;
    }
    .mojito-input-number-handler-down-inner {
        top: 50%;
        text-align: center;
        transform: translateY(-50%);
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

    [role=button],input:not([type=range]) {
        touch-action: manipulation;
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


    .mojito-upload-picture-card-wrapper {
        display: inline-block;
        width: 100%;
    }
    .mojito-upload.mojito-upload-select-picture-card {
        width: 104px;
        height: 104px;
        margin-right: 8px;
        margin-bottom: 8px;
        text-align: center;
        vertical-align: top;
        background-color: hsla(0,0%,100%,.04);
        border: 1px dashed #434343;
        border-radius: 2px;
        cursor: pointer;
        transition: border-color .3s;
    }
    .mojito-upload.mojito-upload-select {
        display: inline-block;
    }
    .mojito-upload {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: hsla(0,0%,100%,.85);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        font-feature-settings: "tnum","tnum";
        outline: 0;
    }
    .mojito-upload:hover {
        border-color: rgb(24,144,255);
    }

    input {
        margin: 0;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
        overflow: visible;
    }
    .mojito-upload.mojito-upload-select-picture-card>.mojito-upload {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
    }

    .UploadImg_upload__1c5dp {
        padding: 6px;
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .UploadImg_upload__1c5dp img {
        vertical-align: middle;
        border-style: none;
        width: 100%;
    }

    .UploadImg_toolBar__kUkZJ {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 2px;
        background: rgba(0,0,0,.5);
        text-align: right;
        display: none;
    }
    .UploadImg_toolBar__kUkZJ>a {
        margin: 0 6px;
        color: #1890ff;
        text-decoration: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        transition: color .3s;
    }
    .mojito-upload:hover .UploadImg_toolBar__kUkZJ{
        display: block;
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
        color: hsla(0,0%,100%,.85);
        font-size: 14px;
        line-height: 30px;
        background: transparent;
        border-color: #434343;
        border-style: solid;
        border-width: 1.02px 1px 1px 0;
        cursor: pointer;
        transition: color .3s,background .3s,border-color .3s,box-shadow .3s;
    }
    .mojito-radio-button-wrapper:hover:not(.mojito-radio-button-wrapper-checked) {
        color: #177ddc;
    }
    .mojito-radio-button-wrapper-checked {
        color: #fff;
        background: #177ddc;
        border-color: #177ddc;
    }
    .mojito-radio-button-wrapper:first-child {
        border-left: 1px solid #434343;
        border-radius: 2px 0 0 2px;
    }
</style>