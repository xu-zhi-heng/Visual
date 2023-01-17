import request from "../api/request"
export default {
    fit(data) {
        return request({
            method: 'POST',
            url: `/data/fit`,
            data: data
        })
    },
    forecast(data) {
        return request({
            method: 'POST',
            url: `/data/forecast`,
            data: data
        })
    },
    clustering(data) {
        return request({
            method: 'POST',
            url: `/data/clustering`,
            data: data
        })
    },
}