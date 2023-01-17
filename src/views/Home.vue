<template>
<!--    v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)"-->
    <div id="home" >
<!--        <div class="header">-->
<!--            <Header :user-name="user.username"/>-->
<!--        </div>-->
<!--        <div class="main">-->
<!--            <div class="column">-->
<!--                <div class="ConnectData">-->
<!--                    <ConnectionTable :user-id="user.id"/>-->
<!--                    <div class="after"></div>-->
<!--                </div>-->
<!--                <div class="uploadCSV">-->
<!--                    <UploadCSV/>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div class="column">-->
<!--                <div class="dataAggregation" ref="dataAggregation">-->
<!--                    <DataAggregation/>-->
<!--                </div>-->
<!--                <div class="csvAggregation" ref="csvAggregation">-->
<!--                    <CSVAggregation/>-->
<!--                </div>-->
<!--                <div class="ShowTables">-->
<!--                    <ShowTables/>-->
<!--                    <div class="after"></div>-->
<!--                </div>-->
<!--            </div>-->


<!--            <div class="column">-->
<!--                <div class="showData">-->
<!--                    <ShowData/>-->
<!--                </div>-->
<!--                <div class="dataSet">-->
<!--                    <DataSet/>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div class="showTableInfo" ref="tableElement">-->
<!--                <ShowTableInfo/>-->
<!--            </div>-->
<!--            -->
<!--        </div>-->
        <SweetFun/>
    </div>
</template>

<script>
    import SweetFun from "../components/NewPage/SweetFun";
    export default {
        name: "Home",
        components: {
            SweetFun,
        },
        data() {
            return {
            }
        },
        computed: {
        },
        methods: {
        },
        mounted() {
        }
    }
</script>

<style scoped>
    * {
        /*cursor: url("../assets/img/IndexImg/pointer.png") 8 3,auto!important;*/
        box-sizing: border-box;
    }
    #home {
        width: 100vw;
        height: 100vh;
        /*background-color: #071540;*/
        background-color: #010a37;
        overflow: auto;         /*超出部分能继续有背景颜色*/
    }
    /*#home .main {*/
    /*    display: flex;*/
    /*    margin: 0 auto;*/
    /*    min-width: 1024px;*/
    /*    max-width: 1920px;*/
    /*    padding: .015rem .125rem 0 .125rem;*/
    /*}*/
    /*#home .main .column:nth-child(1) {*/
    /*    position: relative;*/
    /*    flex: 3;*/
    /*}*/
    /*#home .main .column:nth-child(2) {*/
    /*    position: relative;*/
    /*    flex: 6;*/
    /*}*/
    /*#home .main .column:nth-child(3) {*/
    /*    position: relative;*/
    /*    flex: 3;*/
    /*}*/
    /*#home .main .column {*/
    /*    overflow: hidden;*/
    /*}*/

    /*!*连接数据源的*!*/
    /*.ConnectData {*/
    /*    border: 1px rgba(25,186,139,.17) solid;*/
    /*    padding: 0 .1875rem 0.1rem .1875rem;*/
    /*    margin-bottom: .1875rem;*/
    /*    position: relative;*/
    /*    background-color: rgba(101,132,226,.1);*/
    /*}*/
    /*.ConnectData::before {*/
    /*    position: absolute;*/
    /*    content: "";*/
    /*    width: 30px;*/
    /*    height: 30px;*/
    /*    left: 0;*/
    /*    top: 0;*/
    /*    border-top: 2px solid #03a9f4;*/
    /*    border-left: 2px solid #03a9f4;*/
    /*    border-bottom-left-radius: 3px;*/
    /*}*/
    /*.ConnectData::after {*/
    /*    position: absolute;*/
    /*    content: "";*/
    /*    width: 30px;*/
    /*    height: 30px;*/
    /*    right: 0;*/
    /*    top: 0;*/
    /*    border-top: 2px solid #03a9f4;*/
    /*    border-right: 2px solid #03a9f4;*/
    /*    border-bottom-right-radius: 3px;*/
    /*}*/

    /*!*显示数据源的和csv的*!*/
    /*.showData {*/
    /*    border: 1px rgba(25,186,139,.17) solid;*/
    /*    padding: 0.25rem 0.1rem;*/
    /*    margin-bottom: .1875rem;*/
    /*    position: relative;*/
    /*    border-top-left-radius: 30px;*/
    /*    background-color: rgba(101,132,226,.1);*/
    /*}*/
    /*.showData::before {*/
    /*    position: absolute;*/
    /*    content: "";*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    bottom: 0;*/
    /*    left: 0;*/
    /*    border-bottom: 2px solid #68d8fe;*/
    /*    border-left: 2px solid #68d8fe;*/
    /*}*/

    /*!*文件上传的*!*/
    /*.uploadCSV {*/
    /*    border: 1px rgba(25,186,139,.17) solid;*/
    /*    padding: 0.1rem;*/
    /*    margin-bottom: .1875rem;*/
    /*    position: relative;*/
    /*    background-color: rgba(3, 9, 23, 0.1);*/
    /*    border-radius: 10px;*/
    /*}*/


    /*!*数据源中表的显示*!*/
    /*.ShowTables {*/
    /*    border: 1px rgb(43, 54, 220) solid;*/
    /*    padding: 0.25rem 0.1rem;*/
    /*    margin: 0 .1875rem .1875rem .1875rem;*/
    /*    position: relative;*/
    /*    background-color: rgba(3, 9, 23, 0.1);*/
    /*    border-radius: 5px;*/
    /*}*/
    /*.ShowTables::before {*/
    /*    position: absolute;*/
    /*    content: "";*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    top: 0;*/
    /*    left: 0;*/
    /*    border-top: 2px solid #68d8fe;*/
    /*    border-left: 2px solid #68d8fe;*/
    /*}*/
    /*.ShowTables::after {*/
    /*    position: absolute;*/
    /*    content: "";*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    top: 0;*/
    /*    right: 0;*/
    /*    border-top: 2px solid #68d8fe;*/
    /*    border-right: 2px solid #68d8fe;*/
    /*}*/

    /*!*数据源数据汇总*!*/
    /*.dataAggregation {*/
    /*    border: 1px rgba(25,186,139,.17) solid;*/
    /*    padding: 0.1rem;*/
    /*    margin: 0 .1875rem .1875rem .1875rem;*/
    /*    position: relative;*/
    /*    background-color: rgba(101,132,226,.1);*/
    /*    border-bottom-left-radius: 20px;*/
    /*    border-top-right-radius: 20px;*/
    /*    display: block;*/
    /*}*/
    /*.dataAggregation::before {*/
    /*    position: absolute;*/
    /*    content: "";*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    top: 0;*/
    /*    left: 0;*/
    /*    border-top: 2px solid #68d8fe;*/
    /*    border-left: 2px solid #68d8fe;*/
    /*}*/
    /*.dataAggregation::after {*/
    /*    position: absolute;*/
    /*    content: "";*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    bottom: 0;*/
    /*    right: 0;*/
    /*    border-bottom: 2px solid #68d8fe;*/
    /*    border-right: 2px solid #68d8fe;*/
    /*}*/

    /*!*csv的数据汇总*!*/
    /*.csvAggregation {*/
    /*    border: 1px rgba(25,186,139,.17) solid;*/
    /*    padding: 0.1rem;*/
    /*    margin: 0 .1875rem .1875rem .1875rem;*/
    /*    position: relative;*/
    /*    background-color: rgba(101,132,226,.1);*/
    /*    border-bottom-left-radius: 20px;*/
    /*    border-top-right-radius: 20px;*/
    /*    display: none;*/
    /*}*/
    /*.csvAggregation::before {*/
    /*    position: absolute;*/
    /*    content: "";*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    top: 0;*/
    /*    left: 0;*/
    /*    border-top: 2px solid #68d8fe;*/
    /*    border-left: 2px solid #68d8fe;*/
    /*}*/
    /*.csvAggregation::after {*/
    /*    position: absolute;*/
    /*    content: "";*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    bottom: 0;*/
    /*    right: 0;*/
    /*    border-bottom: 2px solid #68d8fe;*/
    /*    border-right: 2px solid #68d8fe;*/
    /*}*/


    /*.dataSet {*/
    /*    border: 1px rgba(25,186,139,.17) solid;*/
    /*    padding: 0.1rem;*/
    /*    margin-bottom: .1875rem;*/
    /*    position: relative;*/
    /*    border-top-left-radius: 30px;*/
    /*    background-color: rgba(101,132,226,.1);*/
    /*}*/

    /*.showTableInfo {*/
    /*    !*border: 1px rgb(10, 25, 241) solid;*!*/
    /*    position: absolute;*/
    /*    left: 50%;*/
    /*    transform: translate(-50%,-400px);*/
    /*    background-color: #ffffff;*/
    /*    box-shadow: 0 0 50px rgba(0,0,0,0.5);*/
    /*    width: 600px;*/
    /*    max-height: 3.5rem;*/
    /*    min-height: 1.4rem;*/
    /*    overflow: auto;*/
    /*    transition: all 0.2s ease-in-out;*/
    /*    border-radius: 10px;*/
    /*}*/
    /*.showTableInfo::-webkit-scrollbar {*/
    /*    display: none;*/
    /*    width: 0;*/
    /*    height: 0;*/
    /*}*/


    /*.isHaveHeader {*/
    /*    display: flex;*/
    /*    position: absolute;*/
    /*    left: 50%;*/
    /*    top: 50%;*/
    /*    transform: translate(-50%,-180%);*/
    /*    background-color: white;*/
    /*    width: 400px;*/
    /*    height: 50px;*/
    /*    justify-content: center;*/
    /*    align-items: center;*/
    /*    border-radius: 4px;*/
    /*    border: 1px solid #00d8ff;*/
    /*    box-shadow: 0px 1px 1px #03a9f4;*/
    /*}*/


    /*!*遮罩层*!*/
    /*#index::before {*/
    /*    content: "";*/
    /*    position: absolute;*/
    /*    left: 0;*/
    /*    top: -100vh;*/
    /*    width: 100vw;*/
    /*    height: 100vh;*/
    /*    background-color: rgba(0,0,0,.5);*/
    /*}*/
    /*#index.active::before {*/
    /*    content: "";*/
    /*    position: absolute;*/
    /*    left: 0;*/
    /*    top: 0;*/
    /*    width: 100vw;*/
    /*    height: 100vh;*/
    /*    background-color: rgba(0,0,0,.5);*/
    /*}*/













    /*.after::before {*/
    /*    position: absolute;*/
    /*    content: "";*/
    /*    width: 30px;*/
    /*    height: 30px;*/
    /*    left: 0;*/
    /*    bottom: 0;*/
    /*    border-bottom: 2px solid #03a9f4;*/
    /*    border-left: 2px solid #03a9f4;*/
    /*    border-bottom-right-radius: 3px;*/
    /*}*/

    /*.after::after {*/
    /*    position: absolute;*/
    /*    content: "";*/
    /*    width: 30px;*/
    /*    height: 30px;*/
    /*    right: 0;*/
    /*    bottom: 0;*/
    /*    border-bottom: 2px solid #03a9f4;*/
    /*    border-right: 2px solid #03a9f4;*/
    /*    border-bottom-right-radius: 3px;*/
    /*}*/
</style>