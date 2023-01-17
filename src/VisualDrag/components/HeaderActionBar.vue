<template>
    <div class="Playground_actionBar__1-h20">
        <!--大小收缩菜单-->
        <div class="Playground_zoomBox__z21We">
            <div class="Playground_zoomBtn__2YF2V">
                <span role="img" aria-label="minus" class="anticon" @click="scale('minus')">
                    <i class="iconfont iconjianhao"></i>
                </span>
            </div>
            <div class="Playground_zoomBtn__2YF2V" style="width: 50%">
                {{scaleSize + '%'}}
            </div>
            <div class="Playground_zoomBtn__2YF2V" style="margin-bottom: 2px" @click="scale('plus')">
                <span role="img" aria-label="minus" class="anticon">
                    <i class="iconfont iconjiahao"></i>
                </span>
            </div>
        </div>
        <!--其他操作-->
        <div class="Playground_toolbar__2AZ8M">
            <span role="img" tabindex="-1" class="anticon IconFont_iconLink__V-Gb1" style="margin: 0 12px; cursor: pointer;" title="生成热力图">
                <i class="iconfont iconrelitu1" style="font-size: 22px" @click.stop.prevent="createHeatMap" id="HeatMap" ></i>
            </span>
            <span role="img" tabindex="-1" class="anticon IconFont_iconLink__V-Gb1" style="margin: 0 12px; cursor: pointer;" title="语音操作">
                <i class="iconfont iconvoice" style="font-size: 22px" @click.stop.prevent="startVoice" id="voice"></i>
            </span>
            <span role="img" tabindex="-1" class="anticon IconFont_iconLink__V-Gb1" style="margin: 0 12px; cursor: pointer;" title="静音">
                <i class="iconfont iconmaikefeng" style="font-size: 22px" @click.stop.prevent="stopVoice" id="stopVoice"></i>
            </span>
            <span role="img" tabindex="-1" class="anticon IconFont_iconLink__V-Gb1" style="margin: 0 12px; cursor: pointer;" title="导出图片">
                <i class="iconfont iconzhaoxiangji" style="font-size: 22px" @click.stop.prevent="saveImage" id="saveImage"></i>
            </span>
            <span role="img" tabindex="-1" class="anticon IconFont_iconLink__V-Gb1" style="margin: 0 12px; cursor: pointer;" title="保存">
                <i class="iconfont iconbaocun" style="font-size: 22px" @click.stop.prevent="saveView" id="saveView"></i>
            </span>
            <span role="img" tabindex="-1" class="anticon IconFont_iconLink__V-Gb1" style="margin: 0 12px; cursor: pointer;" title="预览">
                <i class="iconfont iconyulan1" style="font-size: 22px" @click.stop.prevent="preview"></i>
            </span>
        </div>
        <div id="resultText" style="opacity: 0;"></div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import html2canvas from "html2canvas";
    import {getToken} from "../../api/auth";
    import database from "../../api/database";
    import {mapGetters} from 'vuex'
    import {Trie} from "../../views/Trie";
    import TheLineChart from "../charts/TheLineChart";
    import {dragEvent} from "../js/dragEvent";
    import Heatmap from 'heatmap.js'
    export default {
        name: "HeaderActionBar",
        mixins: [dragEvent],
        data() {
            return {
                scaleSize: 40,
                projectId: '',
                dict: ["拖动", "折线图", "柱状图", "散点图", "仪表板", "饼图", "面积图", '拖拽', '大屏', '生成', '散点', '折线', '柱状', '面积',],
                stop: {"的": 1},
                words: "",
                trie: null,
                action: ''
            }
        },
        methods: {
            scale(type) {
                if(type == 'minus') {
                    if(this.scaleSize <= 0) {
                        return
                    }
                    this.scaleSize -= 10
                    $('#screen').css('width',parseInt($('#screen').css('width')) - 192 + 'px')
                    $('#screen').css('height',parseInt($('#screen').css('height')) - 108 + 'px')
                    $('.screenContainer').css('transform',"scale(" + this.scaleSize / 100 + ")")
                }else {
                    if(this.scaleSize >= 100) {
                        return
                    }
                    this.scaleSize += 10
                    $('#screen').css('width',parseInt($('#screen').css('width')) + 192 + 'px')
                    $('#screen').css('height',parseInt($('#screen').css('height')) + 108 + 'px')
                    $('.screenContainer').css('transform',"scale(" + this.scaleSize / 100 + ")")
                }
            },
            saveImage() {
                html2canvas($('#screen')[0],{
                    backgroundColor: 'none'
                }).then((canvas) => {
                    let image = canvas.toDataURL('image/png')
                    this.downloadImage(image)
                    let formData = new window.FormData();
                    formData.append("cover", this.dataURLtoFile(image));
                    formData.append("id",this.projectId)
                    this.request({
                        url: '/mgr/project/uploadCover',
                        data: formData,
                    }).then(res => {

                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            saveView() {
                for(let i = 0; i < this.componentArray.length; i++) {
                    delete this.componentArray[i].echartInstance
                }
                let obj = {
                    id: this.projectId,
                    content: this.componentArray
                }
                obj.content = JSON.stringify(obj.content)
                database.saveChartsData(obj).then(res => {
                    if(res.code == 1) {
                        this.$message({
                            showClose: true,
                            message: "保存成功",
                            type: 'success'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            downloadImage(imgUrl) {
                if (window.navigator.msSaveOrOpenBlob) {
                    let bstr = atob(imgUrl.split(',')[1])
                    let n = bstr.length
                    let u8arr = new Uint8Array(n)
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n)
                    }
                    let blob = new Blob([u8arr])
                    window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png')
                } else {
                    // 这里就按照chrome等新版浏览器来处理
                    const a = document.createElement('a')
                    a.href = imgUrl
                    a.setAttribute('download', 'chart-download')
                    a.click()
                }
            },
            dataURLtoFile(dataurl) {
                let arr = dataurl.split(',');
                let mime = arr[0].match(/:(.*?);/)[1];
                let bstr = atob(arr[1]);
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                // return new Blob([u8arr], { type: mime });
                return new File([u8arr], this.projectId + '.png', {type:mime});
            },
            request({url, method = "post", data, headers = {}}) {
                return new Promise(resolve => {
                    const xhr = new XMLHttpRequest();
                    xhr.open(method, 'http://192.168.43.13:8000' + url);
                    Object.keys(headers).forEach(key =>
                        xhr.setRequestHeader(key, headers[key])
                    );
                    if(getToken()) {
                        xhr.setRequestHeader("token",getToken())
                    }
                    xhr.send(data);
                    xhr.onload = e => {
                        resolve({
                            data: e.target.response
                        });
                    };
                });
            },
            preview() {
                this.$store.commit('setScreen',$('#allScreen')[0])
                this.$router.push('/yulan')
            },
            startVoice() {
                this.isVoice = true
                this.voiceConversion('start')
            },
            stopVoice() {
                this.isVoice = false
                this.voiceConversion('end')
            },
            voiceConversion(type) {
                try {
                    let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
                    recognition.lang = 'cmn-Hans-CN'; //普通话 (中国大陆)
                    recognition.interimResults = true;
                    recognition.continuous = true;
                    if (type === 'start') {
                        recognition.start();
                    } else {
                        recognition.stop();
                        this.cut()
                    }
                    recognition.onresult = function(event) {
                        const text = event.results[0][0].transcript;
                        document.getElementById("resultText").innerText = text
                    }
                } catch (e) {
                    console.log('调用后端接口');
                }
            },
            cut() {
                console.log("cut")
                if(document.getElementById("resultText").innerText !== "") {
                    this.words = document.getElementById("resultText").innerText
                    console.log(this.words)
                    this.trie = new Trie()
                    this.trie.init(this.dict)
                    let result = this.trie.splitWords(this.words);
                    console.group("Trie 分词: ");
                    console.log("待分词的字符串: ", this.words);
                    console.log("分词结果:       ", result);
                    console.groupEnd();
                    this.voiceAction(result)
                }
            },
            createHeatMap() {
                let heatmapInstance = Heatmap.create({
                    container: document.getElementById('root'),
                    radius: 20,
                    opacity:0.8,
                })
                let data = {
                    max: 10,
                    data: JSON.parse(window.localStorage.getItem("points"))
                }
                heatmapInstance.setData(data)
            }
        },
        computed: {
            ...mapGetters([
                'componentArray',
                'componentArrayLength'
            ])
        },
        mounted() {
            this.projectId = this.$route.query.projectId;
        }
    }
</script>

<style scoped>
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
    .Playground_actionBar__1-h20 {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        width: 55%;
        height: 40px;
        justify-content: space-between;
    }
    .Playground_zoomBox__z21We {
        display: flex;
        align-items: center;
    }
    .Playground_zoomBtn__2YF2V {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }
    .Playground_zoomBtn__2YF2V:hover {
        background-color: #a5a5a5;
        border-radius: 7px;
    }
    .Playground_toolbar__2AZ8M {
        font-size: 16px;
        height: 45px;
        position: absolute;
        right: 12px;
        cursor: pointer;
        line-height: 45px;
    }
    .IconFont_iconLink__V-Gb1 > i:hover {
        color: #00f2f1;
    }
    .IconFont_iconLink__V-Gb1 {
        color: #92abcf!important;
    }
</style>