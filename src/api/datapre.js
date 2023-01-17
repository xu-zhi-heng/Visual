import request from "../api/request"
export default {
    // 预览数据集数据
    PreviewData(datasetId,page) {
        return request({
            method: 'GET',
            url: `/data/previewData?dataset_id=${datasetId}&page=${page}`
        })
    },
    // 获取数据集的结构
    PreviewStructure(datasetId) {
        return request({
            method: 'GET',
            url: `/data/previewStructure?dataset_id=${datasetId}`
        })
    },
    // 保存数据结构
    saveDataSet(data) {
        return request({
            method: 'POST',
            url: `/data/saveDataset`,
            data: data
        })
    },
    // 通过数据集id获取该数据集的所有字段
    getAllFieldsById(id) {
        return request({
            method: 'GET',
            url: `/data/getAllProperties?id=${id}`,
        })
    },

    // 获取某一个字段下面不重复的名称
    getDistinctValue(id,column) {
        return request({
            method: 'GET',
            url: `/db/getColumnDistinctValue?id=${id}&column=${column}`,
        })
    },

    addQuota(data) {
        return request({
            method: 'POST',
            url: `/data/addQuota`,
            data: data
        })
    }
}