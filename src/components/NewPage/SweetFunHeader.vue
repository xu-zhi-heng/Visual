<template>
    <div id="sweetFunHeader">
        <div class="width-box top-box">
            <div class="logoTitle">
                <span>
                    <i>DataVisual</i> 智能分析平台
                </span>
            </div>
            <div class="account">
                <div class="account-box">
                    <span class="account-notLogin" v-show="isLogin">你还没有登陆</span>
                    <span class="account-Login" v-show="!isLogin">当前用户: {{user.username}}</span>
                    <el-dropdown v-show="!isLogin" @command="handleCommand">
                        <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="exit">退出</el-dropdown-item>
                            <el-dropdown-item command="face">人脸认证</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="menu">
                <span v-for="(item) in headerList" :key="item.key" :class="currentMenuIndex === item.key ? 'active' : ''" @click="changePage(item.title,item.key)">
                    {{item.title}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {header} from "../../assets/data/SweetFunHeader";
    import {mapGetters} from 'vuex'
    import DataSourceAccess from "./DataSourceAccess";
    import UserAction from "./UserAction";
    import UploadTheCSV from "./UploadTheCSV";
    import MyData from "./MyData";
    import MyProject from "./MyProject";
    import user from "../../api/user";
    import Cookies from "js-cookie";
    export default {
        name: "SweetFunHeader",
        data() {
            return {
                headerList: [],
                currentMenuIndex: 0,
                user: {},
                isLogin: true
            }
        },
        methods: {
            handleCommand(command) {
                if(command === 'exit') {
                    // let date = Date.parse();
                    // Cookies.set('endTime',new Date())
                    // let onlineTime = Math.round(Cookies.get('endTime') -  Cookies.get('startTime') / 1000 / 60)
                    // user.postDate({
                    //     // startTime: Cookies.get('startTime'),
                    //     // endTime: Cookies.get('endTime'),
                    //     startTime: '2021-08-13 16:00:00',
                    //     endTime: '2021-08-13 16:20:00',
                    //     userId: Cookies.get('userId')
                    // }).then(res => {
                    //     if(res.code == 1) {
                    //         this.$message({
                    //             showClose: true,
                    //             message: "退出成功",
                    //             type: 'success'
                    //         });
                    //     }
                    // }).catch(err => {
                    //     console.log(err)
                    // })
                    Cookies.remove('userId')
                    this.$router.push("/")
                }else if(command === 'face') {
                    this.$router.push("/faceRenZhen")
                }
            },
            changePage(title,key) {
                if(this.currentMenuIndex === key) {
                    return
                }
                this.currentMenuIndex = key
                this.$store.commit("setCurrentTitle",title)
                switch (key) {
                    case 0:
                        this.$store.commit('setCurrentPage',MyProject);
                        this.changeCss()
                        break;
                    case 1:
                        this.$store.commit('setCurrentPage',DataSourceAccess);
                        this.changeCss()
                        break
                    case 2:
                        this.$store.commit('setCurrentPage',UploadTheCSV);
                        this.changeCss()
                        break
                    case 3:
                        this.$store.commit('setCurrentPage',MyData);
                        this.changeCss()
                        break
                    case 4:
                        this.$store.commit('setCurrentPage',UserAction);
                        this.changeCss()
                        break
                }
            },
            // 切换页面时的动画效果
            changeCss() {
                this.pageBody.classList.add('changing')
                let _this = this
                setTimeout(function () {
                    _this.pageBody.classList.remove('changing')
                },450)
            },
            // 获取用户信息
            getUserInfo() {
                user.getUserInfoByToken().then(res => {
                    if(res.code == 1) {
                        this.user = res.data
                        this.isLogin = false
                        Cookies.set("userId",this.user.id)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        created() {
            this.headerList = header
        },
        mounted() {
            this.getUserInfo()
        },
        computed: {
            ...mapGetters([
                'currentTitle',
                'pageBody'
            ])
        }
    }
</script>

<style scoped>
    #sweetFunHeader {
        height: 70px;
        margin-top: -150px;
        background: #191f28;
    }
    .top-box {
        padding: 0 190px 0 200px;
    }
    .width-box {
        width: 1500px;
        height: 100%;
        margin: 0 auto;
        position: relative;
    }
    .logoTitle {
        float: left;
        width: 300px;
        margin-left: -200px;
        padding: 22px 0;
    }
    /*.recommend {*/
    /*    padding: 22px 0;*/
    /*}*/
    .logoTitle span {
        background: linear-gradient(#16d9e3,#46aef7);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 20px;
    }
    .account {
        float: right;
        width: 190px;
        margin-right: -190px;
        text-align: right;
        padding-top: 25px;  /*padding-top: 15px*/
    }
    .account-box {
        cursor: pointer;
    }
    .menu {
        text-align: center;
        padding-top: 20px;
    }
    .menu > span {
        display: inline-block;
        height: 30px;
        line-height: 20px;
        padding: 5px;
        margin: 0 15px;
        color: #aaa;
        font-size: 14px;
        letter-spacing: 1px;
        position: relative;
        transition: all 0.5s;
    }
    .menu > span.active {
        color: #ffffff;
        font-size: 16px;
    }
    .menu > span:before {
        right: 50%;
    }
    .menu > span:before, .menu > span::after {
        content: "";
        position: absolute;
        bottom: -20px;
        width: 0;
        border-top: solid 2px #ddd;
        transition: all 0.5s;
    }
</style>