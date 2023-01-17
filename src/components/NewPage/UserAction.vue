<template>
    <!--用户操作分析-->
    <div id="userAction">
        <div class="index-row2">
            <div class="col6" v-for="(item) in col4Chart" :key="item.key">
                <component :is="item.com"></component>
            </div>
        </div>
        <div class="index-row2">
            <div class="col6" v-for="(item) in col6Chart" :key="item.key">
                <component :is="item.com"></component>
            </div>
        </div>

        <div id="report">
            <div class="content active">
                <div class="close" style="position: absolute;top: 8px;color: black;right: 15px;z-index: 100000" @click="closePanel">x</div>
                <div class="book" style="height: 100%; width: 100%;">
                    <div class="cover active hide" style>
                        <div class="bend" style="width: 0px"></div>
                    </div>
                    <div class="pages shadow" style="position: relative;width: 250px;height: 420px;overflow:hidden;transform: translate3d(0px,0px,0px)">
                        <div class="page-wrapper" page="1" style="position: absolute;overflow: hidden;width: 250px;height: 420px;top: 0px;left: 0px;right: auto;z-index: 4">
                            <div style="position: absolute;top: 0px;left: 0px;overflow:hidden;z-index: auto;width: 489px;height: 489px;transform-origin: 0% 100%">
                                <div class="page p1" style="float: left;width: 250px;height: 420px;position: absolute;inset:0px auto auto 0px;transform-origin: 0% 100%">
                                    <div class="pages-content">
                                        <div class="content-inner" style="opacity: 1">
                                            <div class="title">本月报告</div>
                                            <div class="text">
                                                <p>
                                                    尊敬的用户sweetFun您好!，在{{report.month}}这一个月中，您在我们平台中使用时间达到了{{report.totalTime}}分钟，
                                                    共上传了文件{{report.fileCount}}个，接入数据源{{report.dataBaseCount}}个，创建了{{report.projectCount}}个工程。<br/>
                                                        根据你的操作我们发现:
                                                        <br/>
                                                        您在本月中最喜欢使用的图表是{{report.bestChart}},
                                                        最喜欢的计算方式是{{report.bestMethod}},
                                                        最长一天在线时长为{{report.bestADayTime}}分钟。
                                                </p>
                                            </div>
                                        </div>
                                        <div class="page-number"> {{report.year}} - {{report.month}} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {col4Chart,col6Chart} from "../../assets/data/SweetFunChart";
    import {mapGetters} from 'vuex'
    export default {
        name: "UserAction",
        data() {
            return {
                col4Chart: [],
                col6Chart: [],
            }
        },
        methods: {
            closePanel() {
                document.getElementById("report").classList.remove('show')
                document.getElementById("report").style.zIndex = '1'
                document.getElementById("userAction").classList.remove('before')
            }
        },
        computed: {
            ...mapGetters([
                'report'
            ])
        },
        created() {
            this.col4Chart = col4Chart
            this.col6Chart = col6Chart
        }
    }
</script>

<style scoped>
    #userAction {
        width: 100%;
        height: 100%;
    }
    #userAction:before{
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
    #userAction.before::before{
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
    .index-row1,.index-row2 {
        display: flex;
        margin-bottom: 30px;
    }
    .col1, .col2, .col3, .col4, .col5, .col6, .col7, .col8, .col9, .col10, .col11, .col12 {
        float: left;
    }

    .index-row2 > .col6 {
        height: 400px;
    }
    .col6 {
        width: 50%;
    }
    .index-row2>.col6:first-child {
        padding-right: 15px;
    }
    .index-row2>.col6:last-child {
        padding-left: 15px;
    }

    #report {
        width: 400px;
        height: 450px;
        padding: 15px;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: none;
    }
    #report.show {
        display: block;
    }
    #report .content.active {
        position: relative;
        width: 100%;
        height: 100%;
    }
    #report .content {
        position: relative;
        width: calc(280px - (2 * 15px));
        height: calc(450px - (2 * 15px));
        border-radius: 10px;
        box-shadow: 0 2.8px 2.2px rgb(0 0 0 / 3%), 0 6.7px 5.3px rgb(0 0 0 / 5%), 0 12.5px 10px rgb(0 0 0 / 6%), 0 22.3px 17.9px rgb(0 0 0 / 7%), 0 41.8px 33.4px rgb(0 0 0 / 9%), 0 100px 80px rgb(0 0 0 / 12%);
        background-color: #fff;
        overflow: hidden;
        perspective: 1200px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    #report .content .book {
        position: relative;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #report .content .book .cover.active {
        width: 100%;
        height: 100%;
        transform: rotateY(-180deg);
        transform-origin: top left;
    }
    #report .content .book .cover {
        position: absolute;
        width: 150px;
        height: 225px;
        /*background-image: url(stories-of-the-saints_sxtxjl.jpg);*/
        background-repeat: no-repeat;
        background-size: cover;
        border-top-left-radius: 5px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 10px;
        box-shadow: 0 12px 6px -6px rgb(0 0 0 / 40%), -8px 12px 6px -6px rgb(0 0 0 / 20%), 8px 12px 6px -6px rgb(0 0 0 / 20%);
        transition: transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1)
    }
    #report .content .book .cover .bend {
        content: '';
        position: absolute;
        width: 2px;
        height: 100%;
        left: 10px;
        background-color: rgba(0, 0, 0, 0.25);
        box-shadow: 0 0 4px 0 rgb(0 0 0 / 40%);
    }
    #report .content .book .pages {
        border-radius: 10px;
    }
    #report .content .book .pages .pages-content {
        text-align: center;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #report .content .book .pages .pages-content .content-inner {
        text-align: center;
        opacity: 0;
    }
    #report .content .book .pages .pages-content .content-inner .title {
        font-size: 35px;
        font-weight: 400;
        padding-bottom: 10px;
        color: #444444;
    }
    #report .content .book .pages .pages-content .content-inner .text {
        text-align: justify;
        font-size: 18px;
        text-indent: 30px;
        font-weight: 300;
        color: #444444;
    }
    #report .content .book .pages .pages-content .page-number {
        position: absolute;
        bottom: 15px;
        font-size: 12px;
        font-weight: 300;
        color: #444444;
    }
</style>