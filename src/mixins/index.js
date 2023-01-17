import csv from "../api/csv";
import database from "../api/database";
import Cookies from "js-cookie";
export const mixin = {
    methods: {
        // 获取用户下的csv信息
        getCSVInfoByUser(userId) {
            csv.getCsvByUser(userId).then(res => {
                if(res.code == 1) {
                    this.$store.commit('setCSVSource',res.data.item)
                }else {
                    this.$store.commit('setCSVSource',null)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        formatTime(time) {
            let date = new Date(time)
            return date.getFullYear() + '年' + (date.getMonth() >= 10 ?  date.getMonth() : date.getMonth() + 1) + '月' + date.getDate() + '日'
        },
        formatTimegang(time) {
            let date = new Date(time)
            let year = date.getFullYear()
            let month = date.getMonth()
            month = month + 1
            if(month < 10) {
                month = '0' + month
            }
            let day = date.getDate()
            if(day < 10) {
                day = '0' + day
            }
            let hour = date.getHours()
            if(hour < 10) {
                hour = '0' + hour
            }
            let minutes = date.getMinutes()
            if(minutes < 10) {
                minutes = '0' + minutes
            }
            let seconds = date.getSeconds()
            if(seconds < 10) {
                seconds = '0' + seconds
            }
            return year + '年' + month + '月' + day + '日' + hour + ':' + minutes + ':' + seconds
        },


        // 去除handle
        removeHandle() {
            let elements = document.getElementsByClassName("item")
            for(let i = 0; i < elements.length; i++) {
                let children = elements[i].childNodes[0].childNodes
                for(let j = 0; j < children.length; j++) {
                    if(children[j].classList.contains("handle")) {
                        children[j].style.display = "none"
                    }
                }
            }
        },

        // 通过用户id获取当前的数据集
        getDataSetByUserId() {
            database.getDataSetByUserId(Cookies.get('userId')).then(res => {
                if(res.code == 1) {
                    this.$store.commit('setDataSet',res.data.item)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
}