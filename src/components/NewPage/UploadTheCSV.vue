<template>
    <div id="uploadTheCsv">
        <div class="keypoint bg-blue bg-inverse radius text-center csbg">
            <p>
                <img src="../../assets/img/数据接入-文件上传.png"/>
            </p>
            <p>选择你想要上传的文件</p>
            <p>
                <br/>
                <button class="button bg-main button-big icon-arrow-circle-up">
                    选择文件
                    <input
                            type="file"
                            :disabled="status !== Status.wait"
                            @change="handleFileChange" class="upload" id="fileUpload"
                    />
                </button>
            </p>
            <div class="file" v-show="isChoose">
                <span id="fileName">{{fileName}}</span>
                <div>
                    <button class="uploadBtn" @click="BeforehandleUpload" :disabled="uploadDisabled">上传</button>
                    <button class="deleteBtn" @click="deleteFile">删除</button>
                    <button class="resumeBtn" @click="handleResume"  v-if="status === Status.pause">恢复</button>
                    <button class="pauseBtn" @click="handlePause" v-else :disabled="status !== Status.uploading || !container.hash">暂停</button>
                </div>
            </div>
            <div style="display: flex;" v-show="isBar">
                <el-progress :percentage="fakeUploadPercentage"></el-progress>
            </div>
        </div>

        <div class="fileList">
            <table class="odd-even" id="table1" v-if="CSVSource != null">
                <thead>
                    <tr>
                        <th>文件名</th>
                        <th>上传日期</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in CSVSource" :key="item.id">
                        <td>{{item.filename}}</td>
                        <td>{{formatTime(item.create_time)}}</td>
                        <td class="frozen-btn">
                            <button class="createDataSet" @click="BeforeCreateDataset(item.id,item.filename)" title="创建数据集">
                                <span>数据集</span>
                            </button>
                            <button class="update" @click="beforeAddTo(item.id,item.filename)" title="对文件内容进行追加数据">
                                <span>追加</span>
                            </button>
                            <button class="delete" @click.stop.prevent="deleteCsv(item.id)" title="删除文件">
                                <span>删除</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else style="text-align: center;font-size: 25px;margin-top: 20px;color: #e32424">
                你还没有上传过文件
            </div>
        </div>

        <div class="alert" id="alert" style="z-index: 1001">
            <i></i>
            <div class="alert-box">
                <div class="alert-title">
                    提示
                    <i class="iconfont iconchahao" style="position: absolute;right: 10px" @click="closeAlert"></i>
                </div>
                <div class="alert-body" style="z-index: 1001">
                    <div class="alert-con scroll-con">
                        上传的文件是否包含表头?
                    </div>
                </div>
                <div class="alert-foot">
                    <button class="btn bd blue alert-ok alert-btn" @click="Have">
                        <span>包含</span>
                    </button>
                    <button class="btn bd yellow alert-cancle alert-btn" @click="None">
                        <span>不包含</span>
                    </button>
                </div>
            </div>
        </div>

        <!--创建数据集面板-->
        <div class="popup" id="dataSetPopup2" style="z-index: 1001">
            <div class="popup-title">
                <a class="popup-close" @click.stop="closePanel('dataSetPopup')"></a>
                <span class="title-text">{{currentFileName}}</span>
            </div>
            <div class="popup-body">
                <div class="popup-form">
                    <div class="row">
                        <div class="key">数据集名称</div>
                        <div class="val">
                            <input type="text" v-model="dataSetTitle"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">描述</div>
                        <div class="val">
                            <input type="text" v-model="dataSetDesc"/>
                        </div>
                    </div>
                    <div class="row-popup-btn">
                        <button class="btn bd yellow" id="btn-cancle-2" @click.stop.prevent="closePanel('dataSetPopup')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" id="btn-save-2" @click.stop.prevent="createDataset(currentFileId,currentFileName)">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!--追加文件面板-->
        <div class="popup" id="addTo" style="z-index: 1001">
            <div class="popup-title">
                <a class="popup-close" @click.stop="closePanel('addTo')"></a>
                <span class="title-text">{{addFileName}}</span>
            </div>
            <div class="popup-body">
                <div class="popup-form">
                    <div class="row">
                        <div class="key">追加文件</div>
                        <div class="val">
                            <input type="file" @change="addNewFile($event)"/>
                        </div>
                    </div>
                    <div class="row-popup-btn">
                        <button class="btn bd yellow" style="margin-right: 20px" @click.stop.prevent="closePanel('addTo')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale"@click.stop.prevent="addTo(addFileId,addFileName)">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {mapGetters} from 'vuex'
    import {mixin} from "../../mixins";
    import csv from "../../api/csv";
    import Cookies from "js-cookie";
    import database from "../../api/database";
    import auth, {getToken} from '../../api/auth'
    import user from "../../api/user";
    const SIZE = 1024 * 1024 * 10; // 切片大小
    const Status = {
        wait: "wait",
        pause: "pause",
        uploading: "uploading"
    };
    export default {
        name: "UploadTheCSV",
        mixins: [mixin],
        data() {
            return {
                fileName: '',                // 文件名
                isChoose: false,             // 是否选择的文件
                isBar: false,                // 是否点击上传，上传后进度条显示

                Status,
                container: {
                    file: null,
                    hash: "",
                    worker: null
                },
                data: [],
                requestList: [],
                status: Status.wait,
                // 当暂停时会取消 xhr 导致进度条后退
                // 为了避免这种情况，需要定义一个假的进度条
                fakeUploadPercentage: 0,

                isHaveHeader: 0,            // 文件是否包含头部
                dataSetTitle: '',
                dataSetDesc: '',
                currentFileName: '',
                currentFileId: '',
                baseUrl: 'http://47.100.107.173:3000',  //http://47.100.107.173:3000，47.100.107.173，172.29.230.26:3000
                // baseUrl: 'http://localhost:3000',

                startDate: '',
                endDate: '',


                // 追加
                addFileName: '',
                addFileId: '',
                newFile: ''
            }
        },
        methods: {
            None() {
                this.handleUpload()
                document.getElementById("alert").classList.remove('show')
                document.getElementById("uploadTheCsv").classList.remove('before')
            },
            Have() {
                this.isHaveHeader = 1;
                this.handleUpload()
                document.getElementById("alert").classList.remove('show')
                document.getElementById("uploadTheCsv").classList.remove('before')
            },
            handleFileChange(e) {
                const [file] = e.target.files;
                if (!file) return;
                let str = file.name.split(".")
                if(str[1] == 'csv' || str[1] == 'xls' || str[1] == 'xlsx') {
                }else {
                    alert("只能上传csv或者xlsx文件")
                    return;
                }
                this.resetData();
                Object.assign(this.$data, this.$options.data());
                this.container.file = file;
                this.isChoose = true
                this.fileName = e.target.files[0].name
            },
            resetData() {
                this.requestList.forEach(xhr => xhr?.abort());
                this.requestList = [];
                if (this.container.worker) {
                    this.container.worker.onmessage = null;
                }
            },
            BeforehandleUpload() {
                document.getElementById("uploadTheCsv").classList.add('before')
                document.getElementById("alert").classList.add('show')
                document.getElementById("dataSetPopup2").style.display = 'none'
                document.getElementById("addTo").style.display = 'none'
            },
            async handleUpload() {
                if (!this.container.file) return;
                this.startDate = new Date()
                this.isChoose = false;
                this.isBar = true
                this.status = Status.uploading;
                const fileChunkList = this.createFileChunk(this.container.file);
                this.container.hash = await this.calculateHash(fileChunkList);
                const { shouldUpload, uploadedList } = await this.verifyUpload(
                    this.container.file.name,
                    this.container.hash,
                    Cookies.get('userId')
                );
                if (!shouldUpload) {
                    this.$message.success("秒传：上传成功");
                    this.isBar = false
                    this.isChoose = false
                    this.status = Status.wait;
                    return;
                }
                this.data = fileChunkList.map(({ file }, index) => ({
                    fileHash: this.container.hash,
                    index,
                    hash: this.container.hash + "-" + index,
                    chunk: file,
                    size: file.size,
                    percentage: uploadedList.includes(index) ? 100 : 0
                }));
                await this.uploadChunks(uploadedList);
            },
            // 生成文件切片
            createFileChunk(file, size = SIZE) {
                const fileChunkList = [];
                let cur = 0;
                while (cur < file.size) {
                    fileChunkList.push({ file: file.slice(cur, cur + size) });
                    cur += size;
                }
                return fileChunkList;
            },
            // 生成文件 hash（web-worker）
            calculateHash(fileChunkList) {
                return new Promise(resolve => {
                    this.container.worker = new Worker("/hash.js");
                    this.container.worker.postMessage({ fileChunkList });
                    this.container.worker.onmessage = e => {
                        const { percentage, hash } = e.data;
                        this.hashPercentage = percentage;
                        if (hash) {
                            resolve(hash);
                        }
                    };
                });
            },
            // 上传切片，同时过滤已上传的切片
            async uploadChunks(uploadedList = []) {
                const requestList = this.data
                    .filter(({ hash }) => !uploadedList.includes(hash))
                    .map(({ chunk, hash, index }) => {
                        const formData = new FormData();
                        formData.append("chunk", chunk);
                        formData.append("hash", hash);
                        formData.append("filename", this.container.file.name);
                        formData.append("fileHash", this.container.hash);
                        formData.append('userId',Cookies.get('userId'))
                        return { formData, index };
                    })
                    .map(async ({ formData, index }) =>
                        this.request({
                            url: this.baseUrl,
                            data: formData,
                            onProgress: this.createProgressHandler(this.data[index]),
                            requestList: this.requestList
                        })
                    );
                await Promise.all(requestList);
                // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时
                // 合并切片
                if (uploadedList.length + requestList.length === this.data.length) {
                    await this.mergeRequest();
                }
            },
            // 用闭包保存每个 chunk 的进度数据
            createProgressHandler(item) {
                return e => {
                    item.percentage = parseInt(String((e.loaded / e.total) * 100));
                };
            },
            // 根据 hash 验证文件是否曾经已经被上传过
            // 没有才进行上传
            async verifyUpload(filename, fileHash,userId) {
                const { data } = await this.request({
                    url: this.baseUrl + "/verify",
                    headers: {
                        "content-type": "application/json"
                    },
                    data: JSON.stringify({
                        filename,
                        fileHash,
                        userId
                    })
                });
                return JSON.parse(data);
            },
            request({
                        url,
                        method = "post",
                        data,
                        headers = {},
                        onProgress = e => e,
                        requestList
                    }) {
                return new Promise(resolve => {
                    const xhr = new XMLHttpRequest();
                    xhr.upload.onprogress = onProgress;
                    xhr.open(method, url);
                    Object.keys(headers).forEach(key =>
                        xhr.setRequestHeader(key, headers[key])
                    );
                    if(getToken()) {
                        xhr.setRequestHeader("token",getToken())
                    }
                    xhr.send(data);
                    xhr.onload = e => {
                        // 将请求成功的 xhr 从列表中删除
                        if (requestList) {
                            const xhrIndex = requestList.findIndex(item => item === xhr);
                            requestList.splice(xhrIndex, 1);
                        }
                        resolve({
                            data: e.target.response
                        });
                    };
                    // 暴露当前 xhr 给外部
                    requestList?.push(xhr);
                });
            },
            deleteFile() {
                let file = document.getElementById("fileUpload")
                if(file.outerHTML) {
                    file.outerHTML = file.outerHTML
                }else {
                    file.value = ""
                }
                $('#fileUpload').val(null);
                this.isChoose = false;
                this.fileName = ''
            },
            async handleResume() {
                this.status = Status.uploading;
                const { uploadedList } = await this.verifyUpload(
                    this.container.file.name,
                    this.container.hash
                );
                await this.uploadChunks(uploadedList);
            },
            handlePause() {
                this.status = Status.pause;
                this.resetData();
            },
            // 通知服务端合并切片
            async mergeRequest() {
                await this.request({
                    url: this.baseUrl + "/merge",
                    headers: {
                        "content-type": "application/json"
                    },
                    data: JSON.stringify({
                        size: SIZE,
                        fileHash: this.container.hash,
                        filename: this.container.file.name,
                        userId: Cookies.get('userId'),
                        isHaveHeader: this.isHaveHeader
                    })
                }).then(res => {
                    let data = JSON.parse(res.data)
                    user.postDataSize({userId: Cookies.get('userId'),amount:this.container.file.size,dataName: this.container.file.name}).then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                    if(data.code == 0) {
                        this.$message.success("上传成功");
                        let file = document.getElementById("fileUpload")
                        if(file.outerHTML) {
                            file.outerHTML = file.outerHTML
                        }else {
                            file.value = ""
                        }
                        this.isBar = false
                        this.endDate = new Date()
                        console.log(this.startDate)
                        console.log(this.endDate)
                        console.log(this.endDate - this.startDate)
                        this.status = Status.wait;
                        this.getCSVInfoByUser(Cookies.get('userId'))
                    }
                }).catch(err => {
                    console.log(err)
                });
            },

            closeAlert() {
                document.getElementById("alert").classList.remove('show')
                document.getElementById("dataSetPopup2").style.display = 'block'
                document.getElementById("uploadTheCsv").classList.remove('before')
                // document.getElementById("dataSetPopup2").style.display = 'none'
            },
            // 删除csv文件
            deleteCsv(id) {
                csv.deleteCsvById(id).then(res => {
                    if(res.code == 1) {
                        this.getCSVInfoByUser(Cookies.get('userId'))
                        this.$message({
                            showClose: true,
                            message: "删除成功",
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.data.error != '' ? res.data.error : "删除失败",
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            BeforeCreateDataset(id,fileName) {
                this.currentFileName = fileName
                this.currentFileId = id
                document.getElementById("dataSetPopup2").style.display = 'block'
                document.getElementById("dataSetPopup2").classList.add('show')
                document.getElementById("alert").style.display = 'none'
                document.getElementById("addTo").style.display = 'none'
                document.getElementById("uploadTheCsv").classList.add('before')
            },
            // 创建数据集
            createDataset(id,fileName) {
                let user_id = Cookies.get("userId")
                let title = this.dataSetTitle
                let conn_id = id
                let describe = this.dataSetDesc
                user.postInput({userId: Cookies.get('userId'),input: this.dataSetTitle}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                user.postInput({userId: Cookies.get('userId'),input: this.dataSetDesc}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                database.createFileDataSet({user_id,conn_id,title,describe}).then(res => {
                    if(res.code == 1) {
                        this.$message({
                            showClose: true,
                            message: "创建成功",
                            type: 'success'
                        });
                        this.closePanel()
                        this.dataSetTitle = ""
                        this.dataSetDesc = ""
                        document.getElementById("uploadTheCsv").classList.remove('before')
                    }else {
                        this.$message({
                            showClose: true,
                            message: "创建失败",
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })

            },
            closePanel(type) {
                if(type == 'addTo') {
                    document.getElementById("addTo").classList.remove('show')
                    document.getElementById("alert").style.display = 'block'
                    document.getElementById("uploadTheCsv").classList.remove('before')
                }else {
                    document.getElementById("dataSetPopup2").classList.remove('show')
                    document.getElementById("alert").style.display = 'block'
                    document.getElementById("uploadTheCsv").classList.remove('before')
                }
            },
            beforeAddTo(id,addFileName) {
                this.addFileName = addFileName
                this.addFileId = id
                document.getElementById("addTo").style.display = 'block'
                document.getElementById("addTo").classList.add('show')
                document.getElementById("alert").style.display = 'none'
                document.getElementById("dataSetPopup2").style.display = 'none'
                document.getElementById("uploadTheCsv").classList.add('before')
            },
            // 追加
            addTo(id,fileName) {
                const formData = new FormData();
                formData.append("fileId",id)
                formData.append("newFile",this.newFile)
                this.request({
                    url: 'http://47.100.107.173:8000/db/addFile',
                    data: formData
                }).then(res => {
                    this.$message({
                        showClose: true,
                        message: "追加成功",
                        type: 'success'
                    });
                    this.closePanel('addTo')
                }).catch(err => {
                    console.log(err)
                })
            },
            addNewFile(e) {
                this.newFile = e.target.files[0];
            }
        },
        mounted() {
            this.getCSVInfoByUser(Cookies.get('userId'))
        },
        computed: {
            ...mapGetters([
                'CSVSource'
            ]),
            uploadDisabled() {
                return (
                    !this.container.file ||
                    [Status.pause, Status.uploading].includes(this.status)
                );
            },
            uploadPercentage() {
                if (!this.container.file || !this.data.length) return 0;
                const loaded = this.data
                    .map(item => item.size * item.percentage)
                    .reduce((acc, cur) => acc + cur);
                return parseInt((loaded / this.container.file.size).toFixed(2));
            }
        },
        watch: {
            uploadPercentage(now) {
                if (now > this.fakeUploadPercentage) {
                    this.fakeUploadPercentage = now;
                }
            }
        },
    }
</script>

<style scoped>
    #uploadTheCsv {
        width: 1200px;
        margin: 0 auto;
        height: 100%;
    }
    #uploadTheCsv:before{
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

    #uploadTheCsv.before::before{
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
    .csbg {
        background-image: linear-gradient(to right, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%, #b49fda 79%, #7ac5d8 100%);
    }
    .bg-blue {
        background-color: #0ae;
    }
    .bg-inverse, .bg-inverse a {
        color: white;
    }
    .radius {
        border-radius: 10px;
    }
    .text-center {
        text-align: center;
    }
    .keypoint {
        padding: 50px;
    }
    .keypoint p {
        font-size: 18px;
    }
    p,.p {
        margin-bottom: 15px;
        line-height: 24px;
    }
    .button.bg-main {
        border-color: #0a8;
        color: #ffffff;
    }
    .bg-main {
        background-color: #0a8;
    }
    .button-big {
        padding: 10px 15px;
        font-size: 18px;
        line-height: 22px;
    }
    .button {
        border: solid 1px #ddd;
        -background: transparent;
        border-radius: 4px;
        font-size: 14px;
        padding: 6px 15px;
        margin: 0;
        display: inline-block;
        line-height: 20px;
        transition: all 1s cubic-bezier(0.175,0.885,0.32,1) 0s;
    }
    button {
        -webkit-appearance: button;
        cursor: pointer;
        text-transform: none;
        overflow: visible;
        font: inherit;
    }
    [class*='icon-']:before {
        display: inline-block;
        font-family: "FontAwesome";
        font-weight: normal;
        font-style: normal;
        vertical-align: baseline;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
    }
    .icon-arrow-circle-up:before {
        content: "";
    }
    .button-big {
        padding: 10px 15px;
        font-size: 18px;
        line-height: 22px;
    }
    .upload {
        position: absolute;
        left: 686.612488px;
        top: 262px;
        opacity: 0;
        z-index: 9999;
        width: 123px;
        height: 42px;
    }

    .file {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
    }
    .file > span {
        margin-right: 15px;
        font-size: 20px;
    }
    .uploadBtn {
        background-color: #67c23a;
        color: white;
        outline: none;
        border: 1px solid #67c23a;
        padding: 3px 10px;
        margin-right: 5px;
        font-size: 14px;
        border-radius: 2px;
    }
    .deleteBtn {
        color: white;
        background-color: #e6a23c;
        outline: none;
        border: 1px solid #e6a23c;
        padding: 3px 10px;
        font-size: 14px;
        border-radius: 2px;
        margin-right: 5px;
    }
    .resumeBtn {
        color: white;
        background-color: #cccccc;
        outline: none;
        border: 1px solid #cccccc;
        padding: 3px 10px;
        font-size: 14px;
        border-radius: 2px;
    }
    .pauseBtn {
        color: white;
        background-color: #cccccc;
        outline: none;
        border: 1px solid #cccccc;
        padding: 3px 10px;
        font-size: 14px;
        border-radius: 2px;
    }

    /deep/ .el-progress-bar__outer {
        background-color: #cccccc !important;
        height: 10px !important;
    }
    /deep/ .el-progress-bar__inner {
        background-color: #f60 !important;
    }
    /deep/ .el-progress {
        width: 100% !important;
    }

    .fileList {
        width: 1200px;
        margin: 0 auto;
        margin-top: 20px;
        background-color: #222224;
        border-radius: 4px;
    }
    table {
        color: #cccccc;
    }
    table {
        border-collapse: collapse;
        font-size: 14px;
        padding: 0;
        margin: 0;
        width: 100%;
    }
    table.odd-even thead tr {
        background: rgba(255, 255, 255, 0.1);
    }
    table tr {
        height: 40px;
        line-height: 40px;
    }
    table td, table th {
        padding: 0;
    }
    table td {
        padding: 0 14px;
        text-align: center;
    }
    table.odd-even tbody tr:nth-child(2n+1) {

    }
    table.odd-even tbody tr:nth-child(2n) {
        background: rgba(170, 170, 170, 0.1);
    }

    .frozen-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
    }
    .frozen-btn button {
        border: 0;
        font-size: 12px;
        font-weight: bold;
        padding: 7px 15px;
        border-radius: 4px;
        color: white;
        outline: none;
        position: relative;
        line-height: 1;
        box-sizing: border-box;

    }
    .frozen-btn button:before{
        content: '';
        display: block;
        background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
        background-size: 210% 100%;
        background-position: right bottom;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        bottom:0;
        right:0;
        left: 0;
        border-radius: 4px;
        transition: all 1s;
        -webkit-transition: all 1s;
    }
    .frozen-btn .createDataSet {
        background-image: linear-gradient(to right, #25aae1, #40e495);
        box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
        margin-right: 5px;
    }
    .frozen-btn .update {
        background-image: linear-gradient(to right, #6253e1, #852D91);
        box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
        margin-right: 5px;
    }
    .frozen-btn .delete {
        background-image: linear-gradient(to right, #8360c3, #2ebf91);
        box-shadow: 0 4px 15px 0 rgba(147, 179, 229, 0.75);
    }
    .frozen-btn .update:hover:before {
        background-position: left bottom;
    }
    .frozen-btn .createDataSet:hover:before {
        background-position: left bottom;
    }
    .frozen-btn .delete:hover:before {
        background-position: left bottom;
    }

    .alert.show {
        opacity: 1;
        transform: translate(-50%, -86%) scale(1);
    }
    .alert {
        position: absolute;
        width: 360px;
        left: 50%;
        top: 50%;
        opacity: 0;
        transform: translate(-50%, -86%) scale(0.5);
        transition: all 0.5s ease-in-out;
        z-index: 101;
    }
    .alert .alert-box {
        border: solid 1px #5e636a;
        background: rgba(24,31,41,0.8);
    }
    .alert .alert-title {
        height: 38px;
        line-height: 38px;
        border-bottom: solid 1px #464c54;
        margin: 0 9px;
        text-align: center;
        color: #fff;
    }
    .alert .alert-body {
        padding: 20px;
    }
    .alert .alert-con {
        max-height: 200px;
        line-height: 34px;
        text-align: center;
        font-size: 16px;
    }
    .alert .alert-foot {
        height: 55px;
        text-align: center;
        padding-top: 5px;
    }
    .alert-foot button:after {
        content: '';
        display: block;
        position: absolute;
        top: -36px;
        left: -100px;
        background: white;
        width: 50px;
        height: 125px;
        opacity: 20%;
        transform: rotate(-45deg);
    }
    .alert-foot button > span {
        z-index: 20;
    }
    .alert-foot button:hover:after {
        left: 120%;
        transition: all 600ms cubic-bezier(0.3, 1, 0.2, 1);
        -webkit-transition: all 600ms cubic-bezier(0.3, 1, 0.2, 1);
    }
    .btn.bd.blue {
        border-color: #21a6df;
    }
    .btn.bd {
        border: solid 1px #666;
        background: transparent;
    }
    .btn {
        display: inline-block;
        vertical-align: top;
        height: 32px;
        line-height: 32px;
        padding: 0 18px;
        letter-spacing: 1px;
        color: #ddd;
        transition: all 0.4s;
        position: relative;
        font-size: 14px;
        overflow: hidden;
    }
    a {
        cursor: pointer;
        text-decoration: none;
        color: unset;
    }
    .alert .alert-foot .alert-cancle {
        margin-left: 30px;
    }
    .btn.bd.yellow {
        border-color: #ec971f;
    }


    .alert:before, .alert>i:before {
        border-left: solid 2px #21a6df;
        border-right: solid 2px transparent;
        left: 0;
    }
    .alert:before, .alert:after {
        top: 0;
        border-top: solid 2px #21a6df;
        border-bottom: solid 2px transparent;
    }
    .alert:before, .alert:after, .alert>i:before, .alert>i:after {
        content: "";
        position: absolute;
        display: block;
        width: 6px;
        height: 6px;
    }
    .alert:after, .alert>i:after {
        border-right: solid 2px #21a6df;
        border-left: solid 2px transparent;
        right: 0;
    }
    .alert:before, .alert:after {
        top: 0;
        border-top: solid 2px #21a6df;
        border-bottom: solid 2px transparent;
    }
    .alert:before, .alert:after, .alert>i:before, .alert>i:after {
        content: "";
        position: absolute;
        display: block;
        width: 6px;
        height: 6px;
    }
    .alert>i:before, .alert>i:after {
        bottom: 0;
        border-top: solid 2px transparent;
        border-bottom: solid 2px #21a6df;
    }
    .alert:before, .alert>i:before {
        border-left: solid 2px #21a6df;
        border-right: solid 2px transparent;
        left: 0;
    }

    .popup.show {
        opacity: 1;
        transform: translate(-50%, -100%) scale(1);
    }
    .popup {
        position: absolute;
        left: 50%;
        top: 50%;
        background: #181f29;
        z-index: 101;
        border-radius: 5px;
        box-shadow: 0 0 3px 3px rgb(0 0 0 / 10%);
        display: block;
        opacity: 0;
        transform: translate(-50%, -60%) scale(0.5);
        transition: all 0.5s ease-in-out;
    }
    .popup-title {
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #000;
        padding-left: 14px;
    }
    .popup-close {
        width: 20px;
        height: 20px;
        display: block;
        float: right;
        margin: 15px;
        position: relative;
    }
    .popup-title > a {
        cursor: pointer;
        text-decoration: none;
        color: unset;
    }
    .popup-close:before, .popup-close:after {
        content: "";
        position: absolute;
        display: block;
        width: 0;
        height: 18px;
        border-left: solid 2px #ccc;
        top: 1px;
        left: 9px;
    }
    .popup-close:before {
        transform: rotate(45deg);
    }
    .popup-close:after {
        transform: rotate(-45deg)
    }
    .popup-body {
        width: 750px;
        height: 200px;
        overflow: hidden;
    }
    .popup-form {
        padding: 20px 20px 20px 40px;
    }
    .popup-form .row {
        line-height: 34px;
        margin-bottom: 12px;
    }
    .popup-form .row .key {
        width: 100px;
        float: left;
        padding-right: 18px;
        text-align: right;
    }
    .popup-form .row .val {
        margin-left: 100px;
        padding-right: 80px;
    }
    .popup-form .row input {
        height: 34px;
        width: 100%;
        color: rgb(221, 221, 221);
        font-family: Arial, 微软雅黑;
        font-size: 14px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(90, 104, 130);
        border-image: initial;
        background: transparent;
        padding: 0px 14px;
    }
    .popup-form .row:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
    }
    .row-popup-btn {
        text-align: center;
        padding-top: 20px;
    }
    .btn.bd.yellow {
        border-color: #ec971f;
    }
    .btn.bd {
        border: solid 1px #666;
        background: transparent;
    }
    .btn {
        display: inline-block;
        vertical-align: top;
        height: 32px;
        line-height: 32px;
        padding: 0 18px;
        letter-spacing: 1px;
        color: #ddd;
        transition: all 0.4s;
        position: relative;
        font-size: 14px;
    }
    .row-popup-btn #btn-save-2 {
        margin-left: 25px;
    }
    .btn.bd.green {
        border-color: #449d44;
    }
    .btn.am {
        overflow: hidden;
    }
    .btn.am>span {
        position: relative;
        z-index: 2;
    }
    .btn.am-scale:before {
        background: #449d44;
        width: 0;
        height: 0;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 1000px;
        opacity: 0;
        transition: all 0.6s;
    }
    .btn.am:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
    }
    .btn.am-scale:hover::before {
        opacity: 1;
        width: 100%;
        height: 100%;
        border-radius: 0px;
    }
</style>