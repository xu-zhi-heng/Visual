<template>
    <div id="login">
        <vue-particles
                class="login-bg"
                color="#39AFFD"
                :particleOpacity="0.7"
                :particlesNumber="100"
                shapeType="circle"
                :particleSize="4"
                linesColor="#8DD1FE"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
        >
        </vue-particles>

        <div class="loginBox">
            <h2>DataVisual智能分析平台</h2>
            <div class="item">
                <label for="username">用户名</label>
                <input id="username" v-model="user.username"/>
            </div>
            <div class="item">
                <label for="password">密码</label>
                <input type="password" id="password" v-model="user.password"/>
            </div>
            <div class="btn">
                <button @click="login()">登录</button>
                <span style="display: inline-block;width: 40px"></span>
                <button @click="registered()">注册</button>
            </div>
            <div style="text-align: center;padding-top: 30px;color: cornflowerblue">
                <span @click="face">切换人脸登陆</span>
            </div>
        </div>


        <div class="registered" ref="registered">
            <div class="header">用户注册</div>
            <div class="form">
                <el-form size="small" :model="signUser" :rules="rules" label-width="80px" ref="ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="signUser.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="signUser.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="signUser.phone" type="text"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="signUser.email" type="email"></el-input>
                    </el-form-item>
                    <el-form-item label="身份" prop="identity">
                        <el-select v-model="identity" placeholder="请选择">
                            <el-option
                                    v-for="item in identitys"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="submit()">注册</el-button>
                        <el-button type="warning" size="small" @click="cancel()">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import user from "../api/user";
    import {removeToken, setToken} from "../api/auth";
    import Cookies from "js-cookie";
    export default {
        name: "Login",
        data() {
            return {
                identitys: [{
                    value: '0',
                    label: '普通用户'
                }, {
                    value: '1',
                    label: '公司人员'
                }, {
                    value: '2',
                    label: '学生/教师'
                }, {
                    value: '3',
                    label: '社会管理人员'
                }],
                identity: '',
                user: {
                    username: '',
                    password: ''
                },
                signUser: {
                    username: '',
                    password: '',
                    email: '',
                    phone: ''
                },
                RepeatPassword: '',
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            login() {
                if(this.user.username.trim() === "" || this.user.password.trim() === "") {
                    this.$message({
                        message: '信息不能为空',
                        type: 'warning'
                    });
                }else {
                    user.login(this.user).then(res => {
                        // this.$router.push("/sweetfun")
                        if(res.code == 1) {
                            // let date = Date.parse();
                            Cookies.set('startTime',new Date())
                            removeToken();
                            setToken(res.data.token)
                            user.getUserInfoByToken().then(res => {
                                if(res.code == 1) {
                                    Cookies.set("userId",res.data.id)
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                            this.$router.push("/sweetfun")
                        }else {
                            alert("登陆失败")
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            registered() {
                this.$refs.registered.style.transform = "translateX(0px)"
            },
            face() {
                this.$router.push('/faceToLand')
            },
            submit() {
                if(this.signUser.username == "" || this.signUser.password == "") {
                    this.$message({
                        message: '请将信息填完整',
                        type: 'error'
                    });
                    return
                }
                user.signUp(this.signUser).then(res => {
                    console.log(res)
                    if(res.code == 1) {
                        this.$message({
                            message: '注册成功,请登陆',
                            type: 'success'
                        });
                        this.$refs.registered.style.transform = "translateX(0px)"
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            cancel() {
                this.$refs.registered.style.transform = "translateX(400px)"
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
    }
    #login .login-bg {
        width: 100%;
        height: 100%;
        background: #3E3E3E;
    }
    .loginBox {
        width: 400px;
        position: absolute;
        background: radial-gradient(black, transparent);
        box-shadow: 0px 15px 25px rgb(0 0 0);
        padding: 40px;
    }
    .loginBox h2{
        color: white;
        text-align: center;
        margin-bottom: 40px;
    }
    .item {
        height: 45px;
        margin-bottom: 40px;
        position: relative;
    }
    .item input {
        width: 100%;
        height: 100%;
        outline: none;
        background: transparent;
        border: none;
        border-bottom: 1px solid white;
        box-sizing: border-box;
        padding-top: 20px;
        color: white;
    }
    .item label {
        position: absolute;
        color: white;
    }
    .loginBox .btn {
        text-align: center;
    }
    .loginBox .btn button{
        padding: 10px 20px;
        background: transparent;
        outline: none;
        border: 1px solid white;
        color: white;
        margin-top: 20px;
        border-radius: 5px;
    }
    .registered {
        position: absolute;
        height: 100%;
        width: 400px;
        right: 0;
        top: 0;
        background-color: #4a4a4a;
        transform: translateX(400px);
        transition: all 0.5s ease;
    }
    .registered .header {
        width: 100%;
        padding: 15px 10px;
        background-color: #0d8aee;
        color: white;
        font-size: 20px;
        font-weight: 500;
        border-bottom: 1px solid #5b5b5b;
    }
    .form {
        width: 100%;
        height: calc(100% - 100px);
    }
    .el-form {
        padding: 40px 15px;
    }
    .el-form-item__label {
        color: white;
    }
    /deep/ .el-select {
        width: 100%;
    }
</style>