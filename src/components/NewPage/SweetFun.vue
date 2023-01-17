<template>
    <div id="sweetFun">
        <div class="header">
            <SweetFunHeader/>
        </div>
        <div class="title">
            <SweetFunTitle/>
        </div>
        <div class="main">
            <SweetFunMain/>
        </div>
        <div class="recommend">
            <div class="box">
                <a>
                    <div class="card bg-01" @click.stop.prevent="showRecommend">
                        <span class="card-content">推荐</span>
                    </div>
                </a>
            </div>
        </div>
        <div class="wrapper vertical demo2">
            <ul class="container">
                <li class="cards-list" v-for="(item,index) in news.data" :key="index">
                    <div class="img">
                        <img :src="item.pictureUrl">
                    </div>
                    <div class="main-con">
                        <h4 class="name">{{item.topic}}</h4>
                        <p class="content" @click="goMsgUrl(item.msgUrl)">
                            新闻地址: {{item.msgUrl}}
                        </p>
                        <p class="label">{{item.labelId}}</p>
                    </div>
                </li>
            </ul>
            <i class="btn-direct btn-left">
                <span class="shift-left"></span>
            </i>
            <i class="btn-direct btn-right">
                <span class="shift-right"></span>
            </i>
        </div>
    </div>
</template>

<script>
    import SweetFunHeader from "./SweetFunHeader";
    import SweetFunTitle from "./SweetFunTitle";
    import SweetFunMain from "./SweetFunMain";
    import Cookies from 'js-cookie'
    import axios from 'axios'
    import {getToken} from '../../api/auth'
    export default {
        name: "SweetFun",
        data() {
            return {
                $: '',
                news: []
            }
        },
        methods: {
            goMsgUrl(url) {
                window.location.href = url
            },
            showRecommend() {
                document.getElementsByClassName("wrapper")[0].style.display = 'block'
                var empile2 = new Empile(this.$('.demo2>.container'), {
                    autoplay: {
                        delay: 7000,
                    },
                    isClickSlide: true,
                    navigation: {
                        nextEl: this.$('.demo2 .btn-right'),
                        prevEl: this.$('.demo2 .btn-left'),
                    },
                    css: function (coord, absCoord, index) {

                        var zIndex = 100 - absCoord,
                            opacity = Math.pow(.92, absCoord).toFixed(3),
                            scale = 'scale(' + Math.pow(.9, absCoord).toFixed(2) + ')',
                            translateX = 'translateY(' + 35 * coord + 'px)';

                        var transform = [translateX, scale].join(' ');
                        return {
                            zIndex: zIndex,
                            opacity: opacity,
                            transform: transform,
                        }

                    },
                });
            }
        },
        components: {SweetFunMain, SweetFunTitle, SweetFunHeader},
        created() {
            this.$ = function (el) {
                try {
                    var item = document.querySelectorAll(el);
                    return item.length == 1 ? item[0] : item;
                } catch (err) {
                    console.log(err)
                }
            }
            axios.get("http://192.168.43.13:5020/manager/recommend/userRecommend/" + Cookies.get('userId')).then(res => {
                if(res.data.code == 20000) {
                    this.news = res.data.data
                }
                console.log(this.news)
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    @import "../../assets/css/empile.css";
    #sweetFun {
        height: 100%;
        overflow: auto;
        padding: 150px 0 30px 0;
        box-sizing: border-box;
        color: white;
        background-color: #0e131a;
        z-index: 101;
    }

    /*滚动条*/
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.1);
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        background: none;
        border-radius: 5px;
    }
    a:link,a:hover,a:visited,a:active {  color: #fff;  text-decoration: none;  }
    .recommend {  position: fixed;  width: 0px;  overflow: visible; top: 80%}
    .box {  display: inline-block;  float: right;  clear: both;  }
    .card {
        position: relative;
        left: 32px;
        padding: 16px 32px 16px 64px;
        margin: 8px;
        box-shadow: 8px 0 8px -8px rgba(0, 0, 0, 0.5);
        background: #fff;
        transition: all 0.3s ease-in-out 0.1s;       /* 閬庢浮*/
    }
    .card:hover {
        position: relative;
        left: 100%;
        margin-left: -32px;
        box-shadow:
                0 -8px 8px -8px rgba(0, 0, 0, 0.5),
                0 8px 8px -8px rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease-in-out;
    }
    .card-content {
        color: #fff;
        font-family: 'Droid Sans', sans-serif;
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
    }
    .bg-01 { background: #539770; }
</style>