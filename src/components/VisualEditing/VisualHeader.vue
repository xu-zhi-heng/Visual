<template>
    <div class="whole">
        <header class="Header_header__1p-tM" style="border-bottom: 2px solid rgb(0, 0, 0); display: flex;">
        <span style="padding: 0 12px">
            <a href="http://localhost:8080/sweetfun">
                <span role="img" class="anticon ContentLayout_backIcon__39_Tm">
                    <i class="iconfont iconzuojiantou"></i>
                </span>
            </a>
        </span>
            <span>航班</span>
            <span></span>
        </header>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .Header_header__1p-tM {
        background: #212c3d;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        color: #fff;
    }
    a {
        color: #1890ff;
        text-decoration: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        transition: color .3s;
        touch-action: manipulation;
    }
    .anticon {
        display: inline-block;
        color: inherit;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;
        /*vertical-align: 0.1em;*/
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    .anticon i {
        display: inline-block;
    }
    .ContentLayout_backIcon__39_Tm {
        color: #92abcf;
    }

    .whole{
        animation-name: show;
        animation-duration: 0.8s;
        animation-fill-mode: backwards;
    }
    @keyframes show {
        from{
            margin-top: -40px;
        }
        to{
            margin-top: 0px;
        }
    }
</style>