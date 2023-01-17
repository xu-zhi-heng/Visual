<template>
    <!--数据源接入页面-->
    <div id="dataSourceAccess">
        <div class="form-row2">
            <div class="col4">
                <div class="item-box">
                    <div class="item-title" style="padding-right: 14px">
                        <div class="switch on" id="switch">
                            <span class="s1" @click="switchItem('on')">
                                数据源接入
                            </span>
                            <span class="s2" @click="switchItem('off')">
                                数据源列表
                            </span>
                        </div>
                    </div>
                    <!--数据源接入表单-->
                    <div class="item-con" v-show="!isSwitch">
                        <div class="row small">
                            <div class="key">名称：</div>
                            <div class="val">
                                <input type="text" placeholder="起一个你喜欢的名字" v-model="db.title"/>
                            </div>
                        </div>
                        <div class="row small">
                            <div class="key">类型：</div>
                            <div class="val">
                                <div class="select" id="select-dept" tabindex="10" @click="select">
                                    <input type="text" readonly class="sc" v-model="db.type"/>
                                    <div class="sel-list scroll sc" id="list">
                                        <ul class="scroll-con">
                                            <li v-for="(item,index) in databaseList" :key="index" @click.stop.prevent="choose(item.name)">
                                                {{item.name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row small">
                            <div class="key">
                                URL
                            </div>
                            <div class="val">
                                <input type="text" placeholder="地址" v-model="db.host"/>
                            </div>
                        </div>
                        <div class="row small">
                            <div class="key">
                                数据库
                            </div>
                            <div class="val">
                                <input type="text" placeholder="数据库名" v-model="db.database"/>
                            </div>
                        </div>
                        <div class="row small">
                            <div class="key">
                                端口号
                            </div>
                            <div class="val">
                                <input type="text" placeholder="端口号" v-model="db.port"/>
                            </div>
                        </div>
                        <div class="row small">
                            <div class="key">
                                用户名
                            </div>
                            <div class="val">
                                <input type="text" placeholder="用户名" v-model="db.user"/>
                            </div>
                        </div>
                        <div class="row small">
                            <div class="key">
                                密码
                            </div>
                            <div class="val">
                                <input type="password" placeholder="密码" v-model="db.password"/>
                            </div>
                        </div>
                        <div class="row small" v-show="isPostgreSQL">
                            <div class="key">
                                application
                            </div>
                            <div class="val">
                                <input type="text" v-model="db.application_name"/>
                            </div>
                        </div>
                        <div class="btns">
                            <div class="test">
                                <button @click.stop.prevent="TestConnect">测试</button>
                            </div>
                            <div class="save">
                                <button disabled="disabled" id="saveBtn" @click.stop.prevent="saveDB">保存</button>
                            </div>
                        </div>
                    </div>
                    <!--数据源列表-->
                    <div class="item-con" v-show="isSwitch">
                        <table class="border-bottom" id="table2" v-if="dataSource != null">
                            <thead>
                                <tr>
                                    <th>名称</th>
                                    <th>数据库</th>
                                    <th>类型</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in dataSource" :key="index">
                                    <td>{{item.title}}</td>
                                    <td>{{item.database}}</td>
                                    <td>{{item.type}}</td>
                                    <td class="border-btn">
                                        <button @click.stop.prevent="getAllTables(item.id,item.title)">
                                            <span>预览</span>
                                        </button>
                                        <button @click.stop.prevent="BeforeUpdateTitle(item.id,item.title)">
                                            <span>修改名称</span>
                                        </button>
                                        <button @click.stop.prevent="deleteDataSource(item.id)">
                                            <span>删除</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-else style="text-align: center;font-size: 25px;margin-top: 20px;color: #e32424">
                            你还没有接入过数据源
                        </div>
                    </div>
                </div>
            </div>

            <!--数据展示-->
            <div class="col8">
                <div class="item-box">
                    <div class="item-title" style="padding-top: 0px">数据预览</div>
                    <div class="item-con">
                        <table class="border" id="table" v-if="activeTables != null">
                            <thead>
                                <tr>
                                    <th>表名</th>
                                    <th>注释</th>
                                    <th>字段总数</th>
                                    <th v-show="isTest">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in activeTables" :key="index">
                                    <td>{{item[0]}}</td>
                                    <td>{{item[1] == "" ? '没有注释' : item[1]}}</td>
                                    <td>{{item[2]}}</td>
                                    <td class="neon-btn" v-show="isTest">
                                        <button class="one" @click.stop.prevent="getTableInfo(item[0])">
                                            <span>预览表内容</span>
                                        </button>
                                        <button class="two" @click.stop.prevent="BeforeCreateDataset(item[0])">
                                            <span>创建数据集</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!--修改数据源名称面板-->
            <div class="popup" id="popup" style="z-index: 1001">
                <div class="popup-title">
                    <a class="popup-close" @click.stop="closePanel('popup')"></a>
                    <span class="title-text">修改数据源名称</span>
                </div>
                <div class="popup-body">
                    <div class="popup-form">
                        <div class="row">
                            <div class="key">原名称</div>
                            <div class="val">
                                <input type="text" readonly v-model="oldTitle"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="key">改为</div>
                            <div class="val">
                                <input type="text" v-model="newTitle"/>
                            </div>
                        </div>
                        <div class="row-popup-btn">
                            <button class="btn bd yellow" id="btn-cancle" @click.stop.prevent="closePanel('popup')">
                                <span>取消</span>
                            </button>
                            <button class="btn bd green am am-scale" id="btn-save" @click.stop.prevent="updateTitle">
                                <span>确定</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <!--表中内容预览面板-->
            <div class="popup" id="tableContentPopup" style="z-index: 1001">
                <div class="popup-title">
                    <a class="popup-close" @click.stop="closePanel('tableContentPopup')"></a>
                    <span class="title-text">{{currentDBTitle}}-{{currentTableTitle}}</span>
                </div>
                <div class="tablePopupBody" style="padding: 10px 15px">
                    <table class="border-bottom" id="tableContent" v-if="tableInfo != null">
                        <thead>
                        <tr>
                            <th>字段名</th>
                            <th>字段类型</th>
                            <th>描述</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in tableInfo" :key="index">
                            <td>{{item.field}}</td>
                            <td>{{item.type}}</td>
                            <td>{{item.desc}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div v-else style="text-align: center;font-size: 25px;margin-top: 20px;color: #e32424">
                        该表中没有内容
                    </div>
                </div>
            </div>


            <!--创建数据集面板-->
            <div class="popup" id="dataSetPopup" style="z-index: 1001">
                <div class="popup-title">
                    <a class="popup-close" @click.stop="closePanel('dataSetPopup')"></a>
                    <span class="title-text">{{currentTableTitle}}</span>
                </div>
                <div class="popup-body dataSet">
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

<!--                        <div class="row" >-->
<!--                            <div class="key">总条数</div>-->
<!--                            <div class="val">-->
<!--                                <input type="text" class="sc" v-model="limit"/>-->
<!--                            </div>-->
<!--                        </div>-->

<!--                        <div class="row" >-->
<!--                            <div class="key">添加条件</div>-->
<!--                            <div class="val" @click.stop.prevent="addConditions" style="display: flex;align-items: center;justify-content: flex-start">-->
<!--                                <div class="addConditions">-->
<!--                                    <i class="iconfont iconjiahao"></i>-->
<!--                                </div>-->
<!--                                <div style="margin-left: 20px;color: #e6a23c">可添加多个条件</div>-->
<!--                            </div>-->
<!--                        </div>-->

<!--                        <div class="row">-->
<!--                            <div class="key">条件字段</div>-->
<!--                            <div class="val">-->
<!--                                <ul class="condFields" v-if="conditionsFields.length != 0">-->
<!--                                    <li v-for="(item,index) in conditionsFields" :key="index">-->
<!--                                        {{item}}-->
<!--                                    </li>-->
<!--                                </ul>-->
<!--                                <div style="color: red" v-else>你还没有添加条件</div>-->
<!--                            </div>-->
<!--                        </div>-->

                        <div class="row-popup-btn" id="row-popup-btn">
                            <button class="btn bd yellow" id="btn-cancle-1" @click.stop.prevent="closePanel('dataSetPopup')">
                                <span>取消</span>
                            </button>
                            <button class="btn bd green am am-scale" id="btn-save-1" @click.stop.prevent="createDataset(currentTableTitle)">
                                <span>确定</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="popup Conditions" id="Conditions" style="z-index: 1001;">
                <div class="popup-title">
                    <a class="popup-close" @click.stop="closePanel('Conditions')"></a>
                    <span class="title-text">添加条件</span>
                </div>
                <div class="popup-body condition">
                    <form class="popup-form">
                        <div class="row" >
                            <div class="key">选择字段</div>
                            <div class="val">
                                <div class="select conditions" tabindex="10" @click="selectFiled">
                                    <input type="text" readonly class="sc" v-model="filed"/>
                                    <div class="sel-list scroll sc" id="filed">
                                        <ul class="scroll-con">
                                            <li v-for="(item,index) in tableFiled" :key="index" @click.stop.prevent="chooseFiled(item.name,item.type)">
                                                {{item.name}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="type === 'number'">
                            <div class="row">
                                <div class="key">过滤条件</div>
                                <div class="val">
                                    <div class="select conditions" tabindex="10" @click.stop.prevent="selectNumberCon">
                                        <input type="text" class="sc" v-model="numberCon"/>
                                        <div class="sel-list scroll sc" id="numberCons">
                                            <ul class="scroll-con" style="overflow: scroll">
                                                <li v-for="(item,index) in numberCons" :key="index" @click.stop.prevent="chooseNumberCon(item)">
                                                    {{item}}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="key">填写数值</div>
                                <div class="val">
                                    <input type="text" v-model="numberValue"/>
                                </div>
                            </div>
                        </div>

                        <div v-else-if="type === 'date'">
                            <div class="row">
                                <div class="key">开始日期</div>
                                <div class="val">
                                    <el-date-picker
                                            v-model="startDate"
                                            type="date"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="row">
                                <div class="key">结束日期</div>
                                <div class="val">
                                    <el-date-picker
                                            v-model="endDate"
                                            type="date"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>


                        <div v-else>

                            <div class="row">
                                <div class="key">过滤条件</div>
                                <div class="val">
                                    <div class="select conditions" tabindex="10" @click.stop.prevent="selectText">
                                        <input type="text"  class="sc" v-model="textCon"/>
                                        <div class="sel-list scroll sc" id="text">
                                            <ul class="scroll-con" style="overflow: scroll">
                                                <li v-for="(item,index) in textCons" :key="index" @click.stop.prevent="chooseText(item)">
                                                    {{item}}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row" v-show="isIn">
                                <div class="key">选择字符</div>
                                <div class="val">
                                    <input type="text" class="sc"/>
                                </div>
                            </div>
                            <div class="row" v-show="isText">
                                <div class="key">输入字符</div>
                                <div class="val">
                                    <input type="text" class="sc" v-model="textValue"/>
                                </div>
                            </div>
                        </div>

                        <div class="row-popup-btn">
                            <button class="btn bd yellow btn-cancle" @click.stop.prevent="closePanel('Conditions')" style="margin-right: 25px">
                                <span>取消</span>
                            </button>
                            <button class="btn bd green am am-scale btn-save" @click.stop.prevent="setDataSet">
                                <span>确定</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import database from "../../api/database";
    import Cookies from "js-cookie";
    import {mapGetters} from "vuex";
    import axios from 'axios'
    import qs from 'qs'
    import {getToken} from "../../api/auth";
    import user from "../../api/user";
    export default {
        name: "DataSourceAccess",
        data() {
            return {
                db: {
                    title: '',                      // 数据库的连接后的昵称
                    database: '',                   // 数据库名字
                    user: '',                       // 用户名
                    password: '',                   // 密码
                    host: '',                       // 地址
                    port: '3306',                       // 端口号
                    type: '',                       // 数据库类型
                    user_id: '',                    // 对应的哪个用户
                    application_name: 'public',     // PostgreSQL的特有属性,
                },
                isPostgreSQL: false,
                databaseList: [],                   // 数据源类型列表
                DBContent: [],                      // 数据源种的部分内容
                isSwitch: false,
                newTitle: '',
                oldTitle: '',
                currentDBTitle: '',
                currentTableTitle: '',
                dataSetTitle: '',
                dataSetDesc: '',
                isTest: true,

                dataSet: {
                    user_id: '',
                    conn_id: '',
                    table_name: '',
                    describe: '',
                    title: '',
                    scope: {
                        limit: null,
                        complexFilter: []
                    }
                },
                tableFiled: [],
                type: 'number',
                limit: '',
                startDate: '',
                endDate: '',
                filed: '',          // 当前选择的字段
                numberCons: ['=','<>','<','>','<=','>='],
                numberCon: '',
                numberValue: '',

                textCons: ['枚举','为空','不为空','包含','不包含','开头是','开头不是','结尾是','结尾不是','等于','不等于'],
                textCon: '',
                text: '',
                textValue: '',

                isIn: false,
                isText: false,
                conditionsFields: [],
            }
        },
        methods: {
            // 添加条件
            addConditions() {
                document.getElementById('Conditions').style.display = 'block'
                document.getElementById('Conditions').classList.add('conditionShow')
                document.getElementById("popup").style.display = 'none'
                document.getElementById('tableContentPopup').style.display = 'none'
            },
            selectFiled() {
                if(document.getElementById("filed").style.display === 'block') {
                    document.getElementById("filed").style.display = 'none'
                }else {
                    document.getElementById("filed").style.display = 'block'
                }
            },
            chooseFiled(name,type) {
                if(type === 'number') {
                    this.type = 'number'
                }else if(type === 'text') {
                    this.type = 'text'
                }else {
                    this.type = 'date'
                }
                this.filed = name
                document.getElementById("filed").style.display = 'none'
            },
            selectNumberCon() {
                if(document.getElementById("numberCons").style.display === 'block') {
                    document.getElementById("numberCons").style.display = 'none'
                }else {
                    document.getElementById("numberCons").style.display = 'block'
                }
            },
            chooseNumberCon(name) {
                this.numberCon = name
                document.getElementById("numberCons").style.display = 'none'
            },
            selectText() {
                if(document.getElementById("text").style.display === 'block') {
                    document.getElementById("text").style.display = 'none'
                }else {
                    document.getElementById("text").style.display = 'block'
                }
            },
            chooseText(name) {
                this.textCon = name
                switch (name) {
                    case '枚举':
                        this.text = 'in';
                        this.isIn = true;
                        this.isText = false
                        break;
                    case '为空':  this.text = 'null';this.isIn = false;this.isText = false;break;
                    case '不为空':  this.text = 'not_null';this.isIn = false;this.isText = false;break;
                    case '包含':  this.text = 'contain';this.isIn = false;this.isText = true;break;
                    case '不包含':  this.text = 'not_contain';this.isIn = false;this.isText = true;break;
                    case '开头是':  this.text = 'start_with';this.isIn = false;this.isText = true;break;
                    case '开头不是':  this.text = 'not_start_with';this.isIn = false;this.isText = true;break;
                    case '结尾是':  this.text = 'tail_with';this.isIn = false;this.isText = true;break;
                    case '结尾不是':  this.text = 'not_tail_with';this.isIn = false;this.isText = true;break;
                    case '等于':  this.text = '=';this.isIn = false;this.isText = true;break;
                    case '不等于':  this.text = '<>';this.isIn = false;this.isText = true;break;
                }
                document.getElementById("text").style.display = 'none'
            },

            setDataSet() {
                if(this.type === 'number') {
                    let obj = {}
                    obj.caption = this.filed
                    obj.type = this.type
                    obj.operator = 'and'

                    obj.filters = []
                    let filter = {}
                    filter.oper = this.numberCon
                    filter.values = []
                    filter.values.push(this.numberValue)
                    obj.filters.push(filter)

                    this.dataSet.scope.complexFilter.push(obj)

                    this.caption = ''
                    this.type = ''
                    this.numberCon = ''
                    this.numberValue = ''
                    this.text = ''
                    this.textCon = ''
                    this.startDate = ''
                    this.endDate = ''
                    this.textValue = ''
                    this.isIn = false
                    this.isText = false
                }else if(this.type === 'text') {
                    let obj = {}
                    obj.caption = this.filed
                    obj.type = this.type
                    obj.operator = 'and'

                    obj.filters = []
                    let filter = {}
                    filter.oper = this.text
                    filter.values = []
                    filter.values.push('sweetfun')
                    obj.filters.push(filter)

                    this.dataSet.scope.complexFilter.push(obj)

                    this.caption = ''
                    this.type = ''
                    this.numberCon = ''
                    this.numberValue = ''
                    this.text = ''
                    this.textCon = ''
                    this.startDate = ''
                    this.endDate = ''
                    this.textValue = ''
                    this.isIn = false
                    this.isText = false
                }else {
                    let obj = {}
                    obj.caption = this.filed
                    obj.type = this.type
                    obj.operator = 'and'

                    obj.filters = []
                    let filter = {}
                    filter.oper = 'between'
                    filter.values = []
                    filter.values.push(this.startDate)
                    filter.values.push(this.endDate)
                    obj.filters.push(filter)

                    this.dataSet.scope.complexFilter.push(obj)

                    this.caption = ''
                    this.type = ''
                    this.numberCon = ''
                    this.numberValue = ''
                    this.text = ''
                    this.textCon = ''
                    this.startDate = ''
                    this.endDate = ''
                    this.textValue = ''
                    this.isIn = false
                    this.isText = false
                }
                this.closePanel('Conditions')
            },
            // 选择数据源类型，
            select() {
                if(document.getElementById("list").style.display === 'block') {
                    document.getElementById("list").style.display = 'none'
                }else {
                    document.getElementById("list").style.display = 'block'
                }
            },
            // 选择数据源类型
            choose(type) {
                switch (type) {
                    case 'MySQL':
                        this.db.type = 'MySQL';this.isPostgreSQL = false;this.db.application_name = null;break
                    case 'Oracle':
                        this.db.type = 'Oracle';this.isPostgreSQL = false;this.db.application_name = null;break;
                    case 'PostgreSQL':
                        this.db.type = 'PostgreSQL';this.isPostgreSQL = true;this.db.application_name = 'public';break
                    case 'SQL Server':
                        this.db.type = 'SQL Server';this.isPostgreSQL = false;this.db.application_name = null;break
                }
                document.getElementById("list").style.display = 'none'
            },
            // 获取数据库的类型
            getDbType() {
                // 获取数据库类型的列表
                database.getDbType().then(res => {
                    if(res.code == 1) {
                        this.databaseList = res.data.item
                        this.db.type = res.data.item[1].name
                        if(this.db.type === 'PosgreSql') {
                            this.isPostgreSQL = true
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 测试数据源接入
            TestConnect() {
                user.postInput({userId: Cookies.get('userId'),input: this.db.database}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                user.postInput({userId: Cookies.get('userId'),input: this.db.title}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                database.TestConnect(this.db).then(res => {
                    if(res.code == 1) {
                        this.$message({
                            showClose: true,
                            message: '测试连接成功',
                            type: 'success'
                        });
                        this.$store.commit('setActiveTables',res.data.item)
                        this.isTest = false
                        document.getElementById("saveBtn").disabled = false
                        document.getElementById("saveBtn").parentNode.style.backgroundColor = "#449d44"
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.data.error,
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 保存数据源
            saveDB() {
                this.db.user_id = Cookies.get('userId')
                user.postInput({userId: Cookies.get('userId'),input: this.db.database}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                user.postInput({userId: Cookies.get('userId'),input: this.db.title}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                database.save(this.db).then(res => {
                    if(res.code == 1) {
                        this.$message({
                            showClose: true,
                            message: '保存成功',
                            type: 'success'
                        });
                        this.switchItem('off')
                        this.getDataSources(Cookies.get('userId'))
                    }else {
                        if(res.data === null) {
                            this.$message({
                                showClose: true,
                                message: "连接失败",
                                type: 'error'
                            });
                        }else {
                            this.$message({
                                showClose: true,
                                message: res.data.error,
                                type: 'error'
                            });
                        }
                        document.getElementById("saveBtn").disabled = true
                        document.getElementById("saveBtn").parentNode.style.backgroundColor = "#666"
                    }
                }).catch(err => {
                    console.log(err)
                })
            },


            // 获取某一个数据源下的表信息(是已经保存的好的，在数据库中有id的)
            getAllTables(id,title) {
                this.currentDBTitle = title
                this.$store.commit("setLoading",true)
                database.getAllTablesById(id).then(res => {
                    if(res.code == 1) {
                        this.$store.commit("setLoading",false)
                        this.$store.commit('setActiveTables',res.data.item)
                        this.$store.commit('setTotalTables',res.data.item.length)
                        this.$store.commit("setActiveDataBaseId",id)
                        let Ids = {
                            connId: id,
                            userId: Cookies.get("userId")
                        }
                        this.getDataSourceById(Ids)
                        this.isTest = true
                    }else {
                        this.$message({
                            showClose: true,
                            message: "查询失败",
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            // 通过数据源id获取对应数据源的基本信息
            getDataSourceById(Ids) {
                this.$store.commit("setLoading",true)
                database.getDataSourceById(Ids).then(res => {
                    if(res.code == 1) {
                        this.$store.commit("setLoading",false)
                        this.$store.commit("setActiveDataBase",res.data.item)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },

            // 获取当前用户下所有的数据源
            getDataSources(userId) {
                this.$store.commit("setLoading",true)
                database.getDataSourceByUserId(userId).then(res => {
                    if(res.code == 1) {
                        this.$store.commit("setLoading",false)
                        this.$store.commit("setDataSource",res.data.item)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 获取某一张表下的字段信息
            getTableInfo(tableName) {
                this.currentTableTitle = tableName
                document.getElementById("app").classList.add('before')
                document.getElementById('tableContentPopup').classList.add('tableContentPopupShow')
                document.getElementById("popup").style.display = 'none'
                document.getElementById("dataSetPopup").style.display = 'none'
                document.getElementById('Conditions').style.display = 'none'
                this.$store.commit("setLoading",true)
                database.getTableInfoById(this.activeDataBaseId,tableName).then(res => {
                    console.log(res)
                    if(res.code == 1) {
                        this.$store.commit("setLoading",false)
                        let arr = res.data.item
                        let infoData = []
                        for(let i = 0; i < arr.length;i++) {
                            let object = {
                                field: arr[i][0],
                                type: arr[i][1],
                                desc: arr[i][2]
                            }
                            infoData.push(object)
                        }
                        this.$store.commit("setTableInfo",infoData)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 删除数据源
            deleteDataSource(id) {
                database.deleteDataSource(id).then(res => {
                    if(res.code == 1) {
                        if(id === this.activeDataBaseId) {
                            this.$store.commit('setActiveTables',null)
                        }
                        this.$message({
                            showClose: true,
                            message: "删除成功",
                            type: 'success'
                        });
                        this.getDataSources(Cookies.get("userId"))
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.data.error,
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 创建数据集之前
            BeforeCreateDataset(tableName) {
                document.getElementById("app").classList.add('before')
                this.currentTableTitle = tableName
                document.getElementById("dataSetPopup").classList.add('show')
                document.getElementById("popup").style.display = 'none'
                document.getElementById("tableContentPopup").style.display = 'none'
                document.getElementById('Conditions').style.display = 'none'
                this.getTableFiled(this.activeDataBaseId,tableName)
            },
            getTableFiled(id,tableName) {
                database.getTableFiled(id,tableName).then(res => {
                    if(res.code == 1) {
                        this.tableFiled = res.data.item
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 创建数据集
            createDataset(tableName) {
                this.dataSet.user_id = Cookies.get("userId")
                this.dataSet.conn_id = this.activeDataBaseId
                this.dataSet.title = this.dataSetTitle
                this.dataSet.table_name = tableName
                this.dataSet.describe = this.dataSetDesc
                // this.dataSet.scope.limit = this.limit
                this.dataSet.scope.limit = 1000

                axios.post(`http://47.100.107.173:8000/data/createDataset`,JSON.stringify(this.dataSet),{headers: {'token': getToken()}}).then(res => {
                    console.log(res)
                    if(res.data.code == 1) {
                        this.$message({
                            showClose: true,
                            message: "创建成功",
                            type: 'success'
                        });
                        user.postInput({userId: Cookies.get('userId'),input:this.dataSetTitle}).then(res => {
                            console.log(res)
                        }).catch(err => {
                            console.log(err)
                        })
                        user.postInput({userId: Cookies.get('userId'),input:this.dataSetDesc}).then(res => {
                            console.log(res)
                        }).catch(err => {
                            console.log(err)
                        })
                        document.getElementById("app").classList.add('before')
                        this.closePanel("dataSetPanel")
                        this.dataSet.title = ''
                        this.dataSet.describe = ''
                        this.dataSet.scope.limit = ''
                    }else {
                        this.$message({
                            showClose: true,
                            message: res.data.data.error === '' ? 'res.data.data.error' : '创建失败',
                            type: 'error'
                        });
                        this.closePanel("dataSetPanel")
                        this.dataSet.title = ''
                        this.dataSet.describe = ''
                        this.dataSet.scope.limit = ''
                    }
                }).catch(err => {
                    console.log(err)
                })

            },

            // 修改数据源名称
            BeforeUpdateTitle(id,title) {
                document.getElementById("app").classList.add('before')
                this.$store.commit('setActiveDataBaseId',id)
                document.getElementById("popup").classList.add('show')
                document.getElementById("tableContentPopup").style.display = 'none'
                document.getElementById("dataSetPopup").style.display = 'none'
                document.getElementById('Conditions').style.display = 'none'
                this.oldTitle = title
            },

            // 切换
            switchItem(type) {
                switch (type) {
                    case 'on':
                        document.getElementById('switch').classList.remove('off')
                        document.getElementById('switch').classList.add('on')
                        this.isSwitch = false
                        break
                    case 'off':
                        document.getElementById('switch').classList.remove('on')
                        document.getElementById('switch').classList.add('off')
                        this.isSwitch = true
                        break
                }
            },

            closePanel(name) {
                if(name === 'popup') {
                    document.getElementById("popup").classList.remove('show')
                    document.getElementById('tableContentPopup').style.display = 'block'
                    document.getElementById('dataSetPopup').style.display = 'block'
                    document.getElementById('Conditions').style.display = 'block'
                    document.getElementById("app").classList.remove('before')
                }else if(name === 'tableContentPopup'){
                    document.getElementById("tableContentPopup").classList.remove('tableContentPopupShow')
                    document.getElementById('popup').style.display = 'block'
                    document.getElementById('dataSetPopup').style.display = 'block'
                    document.getElementById('Conditions').style.display = 'block'
                    document.getElementById("app").classList.remove('before')
                }else if(name === 'Conditions') {
                    document.getElementById("Conditions").style.display = 'none'
                    document.getElementById("Conditions").classList.remove('conditionShow')
                    document.getElementById('popup').style.display = 'block'
                    document.getElementById('dataSetPopup').style.display = 'block'
                    document.getElementById('tableContentPopup').style.display = 'block'
                }else {
                    document.getElementById("dataSetPopup").classList.remove('show')
                    document.getElementById('popup').style.display = 'block'
                    document.getElementById('tableContentPopup').style.display = 'block'
                    document.getElementById('Conditions').style.display = 'block'
                    document.getElementById("app").classList.remove('before')
                }
            },
            // 修改数据源名称
            updateTitle() {
                let id = this.activeDataBaseId
                let newTitle = this.newTitle
                user.postInput({userId: Cookies.get('userId'),input:this.newTitle}).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
                database.updateDbTitle({id: id,title:newTitle}).then(res => {
                    if(res.code == 1) {
                        this.$message({
                            showClose: true,
                            message: "修改成功",
                            type: 'success'
                        });
                        document.getElementById("app").classList.add('before')
                        this.getDataSources(Cookies.get('userId'))
                        this.newTitle = ""
                        this.oldTitle = ""
                    }else {
                        this.$message({
                            showClose: true,
                            message: "修改失败",
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
                this.closePanel("popup")
            }
        },
        mounted() {
            this.getDbType()
            this.getDataSources(Cookies.get('userId'))
        },
        computed: {
            ...mapGetters([
                'dataSource',
                'activeTables',
                'activeDataBaseId',
                'tableInfo',
            ])
        }
    }
</script>

<style scoped>
    #dataSourceAccess {

    }
    #dataSourceAccess:before{
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
    .form-row2 {
        display: flex;
    }
    .form-row2 > .col4 {
        padding-right: 20px;
    }
    .form-row2 > .col4, .form-row2 > .col8 {
        height: 600px;
    }
    .form-row2 > .col8 {
        padding-left: 10px;
    }
    .col8 {
        width: 66.67%;
        -overflow: scroll;
    }
    .col4 {
        width: 33.33%;
    }
    .col1, .col2, .col3, .col4, .col5, .col6, .col7, .col8, .col9, .col10, .col11, .col12 {
        float: left;
    }
    .item-box {
        background: #191f28;
        border-radius: 5px;
        height: 100%;
        padding-top: 60px;
        overflow-y: visible;
    }
    .item-box > .item-title {
        height: 60px;
        padding-top: 10px;
        margin-top: -60px;
        line-height: 50px;
        padding-left: 14px;
        color: #aaa;
        font-weight: 600;
    }
    .form-row2 .item-con {
        padding: 20px 25px;
    }
    .item-con {
        height: 100%;
        position: relative;
    }
    .row {
        line-height: 34px;
        margin-bottom: 12px;
    }
    .row:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
    }
    .row.small .key {
        width: 88px;
        padding-right: 12px;
    }
    .row .key {
        width: 100px;
        float: left;
        padding-right: 18px;
        text-align: right;
    }
    .row.small .val {
        margin-left: 88px;
        padding-right: 10px;
    }
    .row .val {
        margin-left: 100px;
        padding-right: 80px;
    }
    .row input {
        height: 34px;
        border: solid 1px #5a6882;
        width: 100%;
        background: transparent;
        color: #ddd;
        padding: 0 14px;
        font-family: "Arial","微软雅黑";
        font-size: 14px;
    }
    .row .val .addConditions {
        height: 34px;
        border: solid 1px #5a6882;
        width: 50%;
        background: transparent;
        color: #ddd;
        padding: 0 14px;
        font-family: "Arial","微软雅黑";
        font-size: 14px;
        position: relative;
        text-align: center;
        transition: all 0.5s;
    }
    .row .val .addConditions:hover {
        border: solid 1px white;
    }
    .row .val .addConditions:hover > i {
        font-size: 25px;
    }
    .row .val .conditions {
        height: 34px;
        border: solid 1px #5a6882;
        width: 100%;
        background: transparent;
        color: #ddd;
        padding: 0 14px;
        font-family: "Arial","微软雅黑";
        font-size: 14px;
        position: relative;
        text-align: center;
        transition: all 0.5s;
    }
    .select.conditions {
        border: none !important;
        padding: 0 !important;
    }


    input {
        outline: none;
        vertical-align: top;
    }
    .select {
        position: relative;
    }
    .select:before {
        top: 1px;
        bottom: 1px;
        right: 33px;
        border-left: solid 1px #5a6882;
    }
    .select:after {
        border-top: solid 6px #ffffff;
        border-left: solid 7px transparent;
        border-right: solid 7px transparent;
        top: 16px;
        right: 10px;
    }
    .select:before, .select:after {
        content: "";
        position: absolute;
        pointer-events: auto;
    }
    .select input {
        padding-right: 44px;
    }
    .select>.sel-list {
        position: absolute;
        left: 0;
        top: 36px;
        width: 100%;
        background: #191F28;
        border: solid 1px #5A6882;
        height: auto;
        z-index: 99;
        display: none;
    }
    .scroll {
        height: 100%;
        position: relative;
    }
    .scroll>.scroll-con {
        height: 100%;
        overflow: hidden;
    }
    .select ul {
        display: block;
        padding: 2px;
        height: auto;
        overflow: hidden;
        max-height: 166px;
    }
    ol, li, ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .select>.sel-list li {
        display: block;
        line-height: 30px;
        margin: 1px 0;
        padding: 0 14px

    }
    .select>.sel-list li:hover {
        background-color: black;
    }

    /*数据源连接和测试*/
    .btns {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
    }
    .btns button {
        background: transparent;
        outline: none;
        border: none;
        color: #ddd;
    }
    .btns button:hover {
        color: white;
    }
    .btns .test {
        display: inline-block;
        vertical-align: top;
        height: 32px;
        line-height: 32px;
        letter-spacing: 1px;
        transition: all 0.4s;
        position: relative;
        font-size: 14px;
        padding: 0 19px;
        background: #21a6df;
        margin-right: 30px;
    }
    .btns .save {
        display: inline-block;
        vertical-align: top;
        height: 32px;
        line-height: 32px;
        letter-spacing: 1px;
        transition: all 0.4s;
        position: relative;
        font-size: 14px;
        padding: 0 19px;
        background: #666;
        color: #aaa;
    }

    /*表格*/
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
    table td, table th {
        padding: 0;
    }
    table tr {
        height: 40px;
        line-height: 40px;
    }
    table td {
        padding: 0 14px;
        text-align: center;
    }

    table.border td, table.border th {
        border: solid 1px #555;
    }
    table.border-bottom thead tr {
        background: rgba(255, 255, 255, 0.1);
    }
    table.border-bottom tbody tr {
        border-bottom: solid 1px #555;
    }

    /*切换*/
    .switch {
        position: relative;
        overflow: hidden;
        height: 32px;
        border: solid 1px #5a6882;
        border-radius: 3px;
        display: flex;
    }
    .switch > span {
        font-size: 14px;
        display: block;
        width: 50%;
        line-height: 32px;
        height: 32px;
        text-align: center;
        cursor: pointer;
        position: relative;
        z-index: 10;
        color: #ffffff;
    }
    .switch.on.after {
        left: 0;
    }
    .switch.off:after {
        left: 50%;
    }
    .switch:after {
        content: "";
        display: block;
        width: 50%;
        height: 32px;
        background: #21a6df;
        position: absolute;
        z-index: 9;
        top: 0;
        left: 0;
        transition: all 0.4s;
    }


    /*变化按钮*/
    .border-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
    }
    .border-btn button {
        border: 0;
        border-radius: 1px;
        background: #2ec4b6;
        color: white;
        font-size: 12px;
        font-weight: bold;
        padding: 5px 7px;
        outline: none;
        position: relative;
        transition: border-radius 0.5s;
        -webkit-transition: border-radius 0.5s;
        box-sizing: border-box;
        line-height: 1;
    }
    .border-btn button:first-child {
        background-color: #21a6df;
        margin-right: 4px;
    }
    .border-btn button:nth-child(2) {
        background-color: #67c23a;
        margin-right: 4px;
    }
    .border-btn button:last-child {
        background-color: #e6a23c;
    }
    .border-btn button:hover{
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 1px;
        border-top-right-radius: 1px;
    }


    /*发光按钮*/
    .neon-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
    }
    .neon-btn button {
        border: 1px solid;
        background-color: transparent;
        text-transform: uppercase;
        font-size: 12px;
        padding: 7px 15px;
        font-weight: 300;
        line-height: 1;
        box-sizing: border-box;
    }
    .one {
        color: #4cc9f0;
        margin-right: 15px;
    }
    .two {
        color: #f038ff;
    }
    .neon-btn button:hover {
        color: white;
        border: 0;
    }
    .one:hover {
        background-color: #4cc9f0;
        -webkit-box-shadow: 10px 10px 99px 6px rgba(76,201,240,1);
        -moz-box-shadow: 10px 10px 99px 6px rgba(76,201,240,1);
        box-shadow: 10px 10px 99px 6px rgba(76,201,240,1);
    }
    .two:hover {
        background-color: #f038ff;
        -webkit-box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
        -moz-box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
        box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
    }


    /*修改数据源名称面板*/
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
    .popup.Conditions {
        z-index: 200;
        background: #181f29;
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
    .popup-body.dataSet {
        width: 750px;
        height: 200px;
        overflow: hidden;
    }
    .popup-body.condition {
        width: 500px;
        height: 300px;
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

    /*表中内容信息面板*/
    .popup.tableContentPopupShow {
        opacity: 1;
        transform: translate(-50%, -60%) scale(1);
    }
    .popup.conditionShow {
        opacity: 1;
        transform: translate(-50%, -98%) scale(1);
    }
    .tablePopupBody {
        width: 750px;
        height: 480px;
        overflow-y: scroll;
    }





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

    /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 100%;
    }
    /deep/ .el-input__inner {
        background: transparent !important;
        border-radius: 0px !important;
        border: solid 1px #5a6882 !important;
        height: 34px !important;
    }
    /deep/ .el-input__icon {
        line-height: 34px !important;
    }
</style>