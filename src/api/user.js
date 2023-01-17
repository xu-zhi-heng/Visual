import request from "../api/request"
import JavaRequest from '../api/JavaRequest'
export default {
    login(user) {
        return request({
            method: 'POST',
            url: `/mgr/auth/login`,
            data: user
        })
    },
    getUserInfoByToken() {
        return request({
            method: 'GET',
            url: '/mgr/auth/getUserInfo'
        })
    },
    createFaceToken(image) {
        return request({
            method: 'POST',
            url: '/mgr/auth/createFaceToken',
            data: image
        })
    },
    loginByFace(image) {
        return request({
            method: 'POST',
            url: '/mgr/auth/faceLogin',
            data: image
        })
    },
    signUp(user) {
        return request({
            method: 'POST',
            url: '/mgr/auth/register',
            data: user
        })
    },
    // 用户在线日期
    postDate(date) {
        return JavaRequest({
            method: 'POST',
            url: '/record/addUserTime',
            data: date
        })
    },
    // 用户最喜欢使用图表
    postEchart(data) {
        return JavaRequest({
            method: 'POST',
            url: '/record/addUserChart',
            data: data
        })
    },
    // 用户最喜欢的计算方式
    postCompute(data) {
        return JavaRequest({
            method: 'POST',
            url: '/record/addUserCompute',
            data: data
        })
    },
    postInput(data) {
        return JavaRequest({
            method: 'POST',
            url: '/record/addUserInput',
            data: data
        })
    },
    postDataSize(data) {
        return JavaRequest({
            method: 'POST',
            url: '/record/addUserData',
            data: data
        })
    },
    postQuota(data) {
        return JavaRequest({
            method: 'POST',
            url: '/record/addUserQuota',
            data: data
        })
    },


    // 获取使用图表占比数据
    getEchart(id) {
        return request({
            method: 'GET',
            url: `/record/getChartTimes?userId=${id}`,
        })
    },
    getCompute(id) {
        return request({
            method: 'GET',
            url: `/record/getComputeTimes?userId=${id}`,
        })
    },
    getOnlineTime(id) {
        return request({
            method: 'GET',
            url: `/record/getOnlineTime?userId=${id}`,
        })
    },
    getDataSize(id) {
        return request({
            method: 'GET',
            url: `/record/getDataAmount?userId=${id}`
        })
    },
    createReport(id,date) {
        return request({
            method: 'GET',
            url: `record/generateReport?userId=${id}&date=${date}`
        })
    }
}