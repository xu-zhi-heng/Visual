import request from "../api/request"

export default {
    getCsvByUser(userId) {
        return request({
            method: 'GET',
            url: `/db/getUserFiles?id=${userId}`
        })
    },
    getAllColumn(id) {
        return request({
            method: 'GET',
            url: ''
        })
    },
    deleteCsvById(id) {
        return request({
            method: 'GET',
            url: `/db/removeFile?id=${id}`,
        })
    },
    addToFile(data) {
        return request({
            method: 'POST',
            url: '/db/addFile',
            data: data
        })
    },
    cleanCsv(id) {
        return request({
            method: 'GET',
            url: `/data/cleaning?datasetId=${id}`,
        })
    }
}