<template>
    <div id="faceToLand">
        <div class="header">
            <div class="header-container">
                <div class="header-title">人脸认证</div>
                <div class="header-img"></div>
            </div>
        </div>
        <div class="box">
            <video id="video" preload autoplay loop muted></video>
<!--            <canvas id="canvas"></canvas>-->
            <canvas id="canvas-face-upload" width="200px" height="200px" style="opacity: 0"></canvas>
            <div class="line"></div>
            <div class="bottom"></div>
        </div>
    </div>
</template>

<script>
    import user from '../api/user'
    import tracking from '../../public/tracking-min'
    import '../../public/face-min'
    import {removeToken, setToken} from "../api/auth";
    import Cookies from 'js-cookie'
    export default {
        name: 'FaceToLand',
        data() {
            return {
                trackerTask: null,
                trackering: null,
                mediaStreamTrack: null,
                faceImg: {
                    image: '',
                }
            }
        },
        mounted() {
            this.getCompetence()
        },
        methods: {
            getCompetence() {
                let flag = true;    // 标记,如果检测出来人脸就停止检测
                const _this = this;
                const video = this.mediaStreamTrack = document.getElementById('video');  // 获取video
                // const canvas = document.getElementById('canvas');  // 获取canvas
                // const context = canvas.getContext('2d');    // 2d绘制的环境

                const tracker = new window.tracking.ObjectTracker('face');  // 只检测人脸的对象
                // 设置参数
                tracker.setInitialScale(4);
                tracker.setStepSize(2);
                tracker.setEdgesDensity(0.1);

                // 启动摄像头初始化
                this.trackerTask = window.tracking.track('#video', tracker, {
                    camera: true
                });

                // 开始检测
                tracker.on('track', function(event) {
                    // // 在画布中清空出一个矩形来,矩形的大小和canvas一样
                    // context.clearRect(0, 0, canvas.width, canvas.height);
                    // event.data.forEach(function(rect) {
                    //     context.strokeStyle = '#a64ceb';
                    //     context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                    //     context.fillStyle = "#fff";
                    //     context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                    //     context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
                    // });
                    if (event.data.length) {
                        // 会不停的去检测人脸，所以这里需要做个锁
                        if (flag) {
                            // 裁剪出人脸并绘制下来
                            const canvasUpload = document.getElementById('canvas-face-upload')
                            const contextUpload = canvasUpload.getContext('2d')
                            // 画出图片
                            contextUpload.drawImage(video, 0, 0, 200, 200)
                            flag = false
                            // 人脸的base64
                            const dataURL = canvasUpload.toDataURL('image/jpeg');
                            _this.faceImg.image = dataURL

                            // 生成人脸令牌
                            user.createFaceToken({image: _this.faceImg.image,user_id: Cookies.get('userId')}).then(res => {
                                console.log(res)
                                if(res.code == 1) {
                                    _this.$message({message: "认证成功",type: 'success'})
                                    _this.$router.push("/home")
                                }else {
                                    _this.$message({message: "已认证成功",type: 'warning'})
                                    _this.$router.push("/home")
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    }
                });
            }
        },
        destroyed() {
            if(!this.mediaStreamTrack) {
                return
            }
            // 关闭摄像头和侦测
            this.mediaStreamTrack.srcObject.getTracks()[0].stop();
            this.trackerTask.stop()
        }
    }
</script>

<style scoped>
    #faceToLand {
        width: 100vw;
        height: 100vh;
        background-image: url("../assets/bj.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    #faceToLand .box {
        width: 25vw;
        height: 35vw;
        position: relative;
        overflow: hidden;
        border: 2px solid rgba(3, 169, 244, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .line {
        height: calc(100% - 2px);
        width: 100%;
        background: linear-gradient(
                180deg
                , rgba(0, 255, 51, 0) 43%, #03a9f4 211%);
        border-bottom: 2px solid #03a9f4;
        transform: translateY(-100%);
        animation: radar-beam 2s infinite;
        animation-timing-function: cubic-bezier(0.3, 0, 0.43, 0.7);
        animation-delay: 1.4s;
    }
    video,canvas {
        position: absolute;
    }
    #video {
        object-fit: cover;
        width: 95%;
        height: 95%;
    }
    #canvas {
        width: 300px;
    }
    @keyframes radar-beam {
        0% {
            transform: translateY(-100%)
        }
        100% {
            transform: translateY(0%)
        }
    }
    /*四个边角*/
    .box:before {
        top: 0;
        border-top-color: #03a9f4 !important;
    }
    .box:before {
        left: 0;
        border-left-color: #03a9f4 !important;
    }
    .box:after {
        top: 0;
        border-top-color: #03a9f4 !important;
    }
    .box:after {
        right: 0;
        border-right-color: #03a9f4 !important;
    }
    .bottom:before {
        bottom: 0;
        border-bottom-color: #03a9f4 !important;
    }
    .bottom:before {
        left: 0;
        border-left-color: #03a9f4 !important;
    }
    .bottom:after {
        bottom: 0;
        border-bottom-color: #03a9f4 !important;
    }
    .bottom:after {
        right: 0;
        border-right-color: #03a9f4 !important;
    }
    #faceToLand .box:after, #faceToLand .box:before, #faceToLand .bottom:after, #faceToLand .bottom:before {
        content: '';
        display: block;
        position: absolute;
        width: 3vw;
        height: 3vw;
        border: 2px solid transparent;
    }
    .header {
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .header-container {
        height: 100%;
        width: 600px;
    }
    .header-title {
        text-align: center;
        color: #ffffff;
        font-size: 30px;
        text-shadow: 0 0 0.3rem #00d8ff;
    }
    .header-img {
        width: 100%;
        height: 100%;
    }
</style>