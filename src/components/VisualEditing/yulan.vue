<template>
    <div id="yulan">

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import $ from "jquery";
    export default {
        name: "yulan",
        computed: {
            ...mapGetters([
                'screen'
            ])
        },
        mounted() {
            document.getElementById("yulan").style.width = this.screen.style.width
            document.getElementById("yulan").style.height = this.screen.style.height
            // this.screen.style.position = 'absolute'
            // this.screen.style.left = '50%'
            // this.screen.style.transform = 'scale(0.7) translateX(-50%)'
            document.getElementById("yulan").append(this.screen)
        }
    }
</script>

<style scoped>
    #yulan {
        width: 100vw;
        height: 100vh;
        background-color: white;
        background-image: url("../../assets/bg.jpg");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>