<template>
    <div id="sweetFunTitle">
        <div class="width-box title-box">
            <span class="help" id="help" v-if="currentTitle != '项目工程' && currentTitle != '操作分析'">
                操作提示
            </span>
            <span class="help" id="creport" v-else-if="currentTitle == '操作分析'" @click.stop.prevent="beforeCreateReport">
                生成报告
            </span>
            <span class="help" id="create" v-else @click.stop.prevent="beforeCreateProject">
                创建工程
            </span>
            <span class="text">{{currentTitle}}</span>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Cookies from 'js-cookie'
    import user from "../../api/user";
    export default {
        name: "SweetFunTitle",
        methods: {
            beforeCreateProject() {
                document.getElementById("myPorject").classList.add('before')
                document.getElementById('createProject').classList.add('show')
                document.getElementById('createProject').style.zIndex = '10001'
            },
            beforeCreateReport() {
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() >= 10 ? date.getMonth() : ('0' + date.getMonth())
                user.createReport(Cookies.get('userId'),year + '-' + month).then(res => {
                    if(res.code == 1) {
                        console.log(res)
                        this.$store.commit("setReportYear",year)
                        this.$store.commit("setReportMonth",month)
                        this.$store.commit("setReportBestMethod",res.data.item.aggregate.type)
                        this.$store.commit("setReportBestChart",res.data.item.char.type)
                        this.$store.commit("setReportDataBaseCount",res.data.item.connection_count)
                        this.$store.commit("setReportFileCount",res.data.item.file_count)
                        this.$store.commit("setReportProjectCount",res.data.item.project_count)
                        this.$store.commit("setReportBestADayTime",res.data.item.time.time_max)
                        this.$store.commit("setReportTotalTime",res.data.item.time_sum)
                        document.getElementById("userAction").classList.add('before')
                        document.getElementById('report').classList.add('show')
                        document.getElementById('report').style.zIndex = '10001'
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        computed: {
            ...mapGetters([
                'currentTitle'
            ])
        }
    }
</script>

<style scoped>
    #sweetFunTitle {
        height: 80px;
    }
    .title-box {
        padding: 25px 0;
    }
    .width-box {
        height: 100%;
        width: 1500px;
        margin: 0 auto;
        position: relative;
    }
    .title-box .text {
        font-size: 24px;
        line-height: 30px;
        color: #bbb;
    }
    .title-box .help {
        display: block;
        width: 105px;
        height: 30px;
        border-radius: 3px;
        border: solid 1px #aaa;
        line-height: 28px;
        text-align: center;
        float: right;
        color: #bbb;
    }
</style>