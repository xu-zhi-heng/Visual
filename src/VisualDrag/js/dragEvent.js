import {mapGetters} from 'vuex'
import TitleBox from "../charts/TitleBox";
import PictureBox from "../charts/PictureBox";
import DataTable from "../charts/DataTable";
import user  from "../../api/user";
import Cookies from 'js-cookie'
import TheLineChart from "../charts/TheLineChart";
import TheHistogram from "../charts/TheHistogram";
import ThePieChart from "../charts/ThePieChart";
import TheAreaChart from "../charts/TheAreaChart";
import TheScatterDiagram from "../charts/TheScatterDiagram";
import ClusterChart from "../charts/ClusterChart";
export const dragEvent = {
    data() {
        return {
            components: {
                line:{
                    img: 'iconzhexiantu',
                    text: '折线图',
                    com: TheLineChart,
                },
                histogram:{
                    img: 'iconzhuzhuangtutubiao',
                    text: '柱状图',
                    com: TheHistogram,
                },
                clusterChart:{
                    img: 'iconjulei',
                    text: '聚类图',
                    com: ClusterChart,
                },
                pie:{
                    img: 'iconbingtu',
                    text: '饼图',
                    com: ThePieChart,
                },
                area:{
                    img: 'iconduijimianjitu',
                    text: '面积图',
                    com: TheAreaChart,
                },
                scatter:{
                    img: 'iconsandiantu',
                    text: '散点图',
                    com: TheScatterDiagram,
                },
                text: {
                    img: 'iconwenzi',
                    text: '文本',
                    com: TitleBox
                },
                image:{
                    img: 'icontupian',
                    text: '图片',
                    com: PictureBox
                },
                table:{
                    img: 'iconbiaoge',
                    text: '表格',
                    com: DataTable,
                },
            },
        }
    },
    computed: {
        ...mapGetters([
            'componentArray',
            'componentType',
            'componentArrayIndex',
            'componentArrayLength',
            'isPush'
        ])
    },
    methods: {
        dragStart(e) {
            let x = e.clientX
            let y = e.clientY
            let value = 1
            let points = JSON.parse(window.localStorage.getItem('points'))
            for(let i = 0; i < points.length; i++) {
                let item = points[i]
                if(item.x == x && item.y == y) {
                    item.value++
                    break
                }else {
                    let point = {
                        x: x,
                        y: y,
                        value: value,
                    }
                    points.push(point)
                    break
                }
            }
            window.localStorage.setItem('points',JSON.stringify(points))
            this.$store.commit('setComponentType',e.target.dataset.type)
        },
        dragOver(e) {
            if(this.componentType === '') {
                return
            }
            e.preventDefault()
            e.stopPropagation()
            const defaultData = {
                type: this.componentType,
                status: 2,
                data: {},
                dataTitle: [],
                options: {},            // echarts的option
                style: {},              // 组件样式
                echartInstance: null,   // echarts对象
                index: this.componentArrayLength,
                typeText: this.components[this.componentType].text
            }
            const layer = {
                type: this.componentType,
                index: this.componentArrayLength,
                typeText: this.components[this.componentType].text
            }
            if(!this.isPush) {
                this.$store.commit('setComponentArrayIndex',this.componentArray.length)
                this.$store.commit('setIsPush',true)
                this.$store.commit("pushView",defaultData)
                this.$store.commit("pushCanvasLayers",layer)
                this.$nextTick(() => {
                    let length = this.componentArrayLength
                    this.$store.commit("setComponentArrayLength",length + 1)
                })
            }
        },
        drag(e) {
            if (this.componentType === '') {
                return
            }
            e.preventDefault()
            e.stopPropagation()
            this.dragEnd()
        },
        dragEnd() {
            user.postEchart({
                chartType: this.componentType,
                userId: Cookies.get('userId')
            }).then(res => {

            }).catch(err => {
                console.log(err)
            })
            this.$delete(this.componentArray[this.componentArrayIndex], 'status')
            this.$store.commit('setIsPush',false)
            this.$store.commit('setComponentType','')
        },
        voiceAction(result) {
            if(result.indexOf('折线图') != -1 || result.indexOf('折线') != -1) {
                this.createComponent('line')
            } else if(result.indexOf('散点图') != -1 || result.indexOf('散点') != -1) {
                this.createComponent('scatter')
            } else if(result.indexOf('饼图') != -1 || result.indexOf('饼') != -1) {
                this.createComponent('pie')
            } else if(result.indexOf("柱状图") != -1 || result.indexOf("柱状") != -1) {
                this.createComponent('histogram')
            } else if(result.indexOf('面积图') != -1 || result.indexOf('面积')) {
                this.createComponent('area')
            } else {
                this.$message({
                    showClose: true,
                    message: '抱歉，未能识别',
                    type: 'warning'
                });
            }
        },
        createComponent(type) {
            let component = {
                type: type,
                data: {},
                dataTitle: [],
                options: {},
                style: {},
                echartInstance: null,
                index: this.componentArrayLength,
                typeText: this.components[type].text
            }
            let layer = {
                type: type,
                index: this.componentArrayLength,
                typeText: this.components[type].text
            }
            this.$store.commit('setComponentArrayIndex',this.componentArray.length)
            this.$store.commit("pushView",component)
            this.$store.commit("pushCanvasLayers",layer)
            this.$nextTick(() => {
                let length = this.componentArrayLength
                this.$store.commit("setComponentArrayLength",length + 1)
            })
            // user.postEchart({
            //     type: type,
            //     userId: Cookies.get('userId')
            // }).then(res => {
            //
            // }).catch(err => {
            //     console.log(err)
            // })
        }
    }
}