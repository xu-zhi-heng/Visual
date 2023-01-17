<template>
    <div id="myPorject" :style="{backgroundImage: projectS.length === 0 ? '' : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F81%2F88%2F705c3d3cefbfb23.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627586815&t=b8efcc774b882d720f25b7d313386ce2'}">
        <div class="index-row1" v-if="projectS.length != 0">
            <div class="col4" v-for="(item,index) in projectS" :key="index">
                <div style="padding: 12px">
                    <div class="screenList_item__1QYlz">
                        <div class="screenList_toolBar__3CZA6">
                            <span title="编辑" @click.stop.prevent="goVisual(item.dataSetId,item.id)">
                                <span role="img" class="anticon">
                                    <i class="iconfont iconzhongmingming"></i>
                                </span>
                            </span>
                            <span title="预览">
                                <span role="img" class="anticon">
                                     <i class="iconfont iconyulan1"></i>
                                </span>
                            </span>
                            <span title="删除" @click.stop.prevent="deleteProject(item.id)">
                                <span role="img" class="anticon">
                                     <i class="iconfont iconshanchu"></i>
                                </span>
                            </span>
                        </div>
                        <div class="screenList_itemPre__3hHTQ">
                            <div class="mojito-image">
                                <img :src="item.image"/>
                            </div>
                        </div>
                        <div class="screenList_itemName__3qBki">
                            <div style="font-size: 16px; height: 25px; overflow: hidden;">{{item.projectName}}</div>
                            <div style="font-size: 12px; color: rgb(146, 171, 207);">{{item.createTime}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else style="font-size: 40px;color: #03a9f4;text-align: center">
            你还没有创建工程
        </div>

        <div class="popup" id="createProject" style="z-index: 1">
            <div class="popup-title">
                <a class="popup-close" @click.stop="closePanel('createProject')"></a>
                <span class="title-text">创建工程</span>
            </div>
            <div class="popup-body">
                <div class="popup-form">
                    <div class="row">
                        <div class="key">工程名称</div>
                        <div class="val">
                            <input type="text" v-model="projectName"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="key">
                            选择数据集
                        </div>
                        <div class="val" v-if="dataSets.length != 0">
                            <el-select v-model="dataSet" placeholder="请选择">
                                <el-option
                                        v-for="item in dataSets"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-button type="warning" @click.stop.prevent="goPage('0')">上传数据</el-button>
                        </div>
                        <div class="val" v-else>
                            <el-button type="warning" @click.stop.prevent="goPage('0')">上传数据</el-button>
                            <el-button type="success" @click.stop.prevent="goPage('1')">创建数据集</el-button>
                        </div>
                    </div>
                    <div class="row-popup-btn">
                        <button class="btn bd yellow" id="btn-cancle" @click.stop.prevent="closePanel('createProject')">
                            <span>取消</span>
                        </button>
                        <button class="btn bd green am am-scale" id="btn-save" @click.stop.prevent="createProject">
                            <span>确定</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import MyData from "./MyData";
    import {mixin} from "../../mixins";
    import database from "../../api/database";
    import Cookies from 'js-cookie'
    import DataSourceAccess from "./DataSourceAccess";
    import user from "../../api/user";
    export default {
        name: "MyProject",
        mixins: [mixin],
        data() {
            return {
                projectName: '',
                projectS: [],
                dataSets: [],
                dataSet: ''
            }
        },
        methods: {
            closePanel(name) {
                document.getElementById("createProject").classList.remove('show')
                document.getElementById("createProject").style.zIndex = '1'
                document.getElementById("myPorject").classList.remove('before')
            },
            createProject() {
                let data = {
                    user_id: Cookies.get('userId'),
                    project_name: this.projectName,
                    dataset_id: this.dataSet
                }
                database.createProject(data).then(res => {
                    this.projectS.splice(0,this.projectS.length)
                    if(res.code == 1) {
                        this.getProject(Cookies.get('userId'))
                        this.$message({
                            showClose: true,
                            message: "创建成功",
                            type: 'success'
                        });
                        document.getElementById("myPorject").classList.remove('before')
                    }
                }).catch(err => {
                    console.log(err)
                })
                user.postInput({userId: Cookies.get('userId'),input: this.projectName}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                this.closePanel()
            },
            getProject(userId) {
                database.getProjectByUserId(userId).then(res => {
                    if(res.code == 1) {
                        for(let i = 0; i < res.data.item.length; i++) {
                            let obj = {}
                            obj.projectName = res.data.item[i].project_name
                            obj.createTime = this.formatTime(Date(res.data.item[i].create_time))
                            obj.id = res.data.item[i].id
                            obj.dataSetId = res.data.item[i].dataset_id
                            obj.image = res.data.item[i].cover
                            this.projectS.push(obj)
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            getDataSet() {
                  database.getDataSetByUserId(Cookies.get('userId')).then(res => {
                      if(res.code == 1) {
                          for(let i = 0; i < res.data.item.length; i++) {
                              let obj = {}
                              obj.value = res.data.item[i].id
                              obj.label = res.data.item[i].title
                              this.dataSets.push(obj)
                          }
                      }
                  }).catch(err =>{
                      console.log(err)
                  })
            },
            goPage(type) {
                if(type === '0') {
                    this.$store.commit('setCurrentPage',DataSourceAccess)
                }else {
                    this.$store.commit('setCurrentPage',MyData)
                }
            },
            goVisual(dataSetId,id) {
                this.$router.push({path: '/newPage',query: {dataSetId: dataSetId,projectId: id}})
            },
            deleteProject(id) {
                database.deleteProjectById(id).then(res => {
                    this.projectS.splice(0,this.projectS.length)
                    if(res.code == 1) {
                        this.getProject(Cookies.get('userId'))
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        mounted() {
            this.getDataSet()
            this.getProject(Cookies.get('userId'))
        },
        computed: {
            ...mapGetters([
                'currentPage'
            ])
        }
    }
</script>

<style scoped>
    #myPorject {
        height: 100%;
        width: 100%
    }
    #myPorject:before{
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
    #myPorject.before::before{
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
    #myPorject .index-row1 {
        display: flex;
        margin-bottom: 30px;
    }
    .index-row1>.col4:first-child {
        padding-right: 20px;
    }
    .index-row1>.col4 {
        height: 300px;
    }
    .index-row1>.col4:nth-child(2) {
        padding: 0 10px;
    }
    .index-row1>.col4:last-child {
        padding-left: 20px;
    }
    .col4 {
        width: 33.33%;
    }
    .col1, .col2, .col3, .col4, .col5, .col6, .col7, .col8, .col9, .col10, .col11, .col12 {
        float: left;
    }

    .screenList_item__1QYlz {
        position: relative;
        border-radius: 4px;
        /*width: 367px;*/
        width: 100%;
        overflow: hidden;
        cursor: pointer;
        background-color: #24364e;
        box-shadow: 0 2px 3px 2px rgb(0 0 0 / 27%);
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
    }
    .screenList_item__1QYlz .screenList_toolBar__3CZA6 {
        display: none;
    }
    .screenList_toolBar__3CZA6 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 3px;
        background: rgba(0,0,0,.5);
        text-align: right;
        z-index: 2;
    }

    .screenList_itemPre__3hHTQ {
        width: 100%;
        height: 182px;
        background: rgba(0,0,0,.4);
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-align-items: center;
        align-items: center;
        font-size: 60px;
        overflow: hidden;
    }
    .mojito-image {
        position: relative;
        display: inline-block;
    }
    [class*=mojito-], [class*=mojito-] *, [class*=mojito-] :after, [class*=mojito-] :before,
    [class^=mojito-], [class^=mojito-] *, [class^=mojito-] :after, [class^=mojito-] :before {
        box-sizing: border-box;
    }
    .screenList_itemName__3qBki {
        height: 48px;
        color: #fff;
        padding: 0 12px;
    }
    .screenList_toolBar__3CZA6 span {
        olor: #92abcf;
        margin: 0 6px;
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
        -moz-osx-font-smoothing: grayscale;
    }
    .anticon>* {
        line-height: 1;
        display: inline-block;
    }
    .screenList_item__1QYlz:hover > .screenList_toolBar__3CZA6 {
        display: block;
    }



    .popup.show {
        opacity: 1;
        transform: translate(-50%, -30%) scale(1);
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
    .row-popup-btn #btn-save {
        margin-left: 25px;
    }
    .row-popup-btn #btn-save-1 {
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

    /deep/ .el-select {
        width: 80%;
    }
    /deep/ .el-input__inner {
        background-color: transparent;
        border-color: rgb(90, 104, 130);
        border-radius: 0px;
        height: 34px;
        line-height: 34px;
    }
    /deep/ .el-input__icon {
        line-height: 34px;
    }
    /deep/ .el-select .el-input.is-focus .el-input__inner {
        border-color: rgb(90, 104, 130);
    }
    /deep/ .el-select .el-input__inner:focus {
        border-color: rgb(90, 104, 130);
    }
    /deep/ .el-button {
        margin-left: 10px;
        padding: 7px 10px;
    }
</style>