import request from "../api/request"

export default {
    // 测试连接
    TestConnect(db) {
        return request({
            method: 'POST',
            url: `/db/testConnection`,
            data: db
        })
    },
    // 获取当前能够支持的数据源类型有哪些
    getDbType() {
        return request({
            method: 'GET',
            url: '/db/getSupportDB',
        })
    },
    // 保存数据源
    save(db) {
        return request({
            method: 'POST',
            url: '/db/saveConnection',
            data: db
        })
    },
    // 获取当前用户下的所有数据源信息
    getDataSourceByUserId(userId) {
        return request({
            method: 'GET',
            url: `/db/getDataSourceByUser?user_id=${userId}`
        })
    },
    // 删除数据源
    deleteDataSource(id) {
        return request({
            method: 'GET',
            url: `/db/deleteDataSource?id=${id}`,
        })
    },
    // 通过数据源id获取该数据源下所有的表的
    getAllTablesById(id) {
        return request({
            method: 'GET',
            url: `/db/getTables?id=${id}`,
        })
    },
    // 根据数据源id获取数据源基本信息(哪个数据库，有多少表等)
    getDataSourceById(data) {
        return request({
            method: 'POST',
            url:  '/db/getConnInfoById',
            data: data
        })
    },
    // 获取表的详细信息
    getTableInfoById(id,tableName) {
        return request({
            method: 'GET',
            url: `/db/getTableDetail?id=${id}&table_name=${tableName}`,
        })
    },
    // 创建数据集
    createDataSet(data) {
        return request({
            method: 'POST',
            url: '/data/createDataset',
            data: data,
        })
    },
    // 创建文件数据集
    createFileDataSet(data) {
        return request({
            method: 'POST',
            url: '/data/createFileDataset',
            data: data
        })
    },
    // 获取数据集
    getDataSetByUserId(id) {
        return request({
            method: 'GET',
            url: `/data/getDataset?user_id=${id}`
        })
    },
    // 删除数据集
    deleteDataSetById(id) {
        return request({
            method: 'GET',
            url: `/data/removeDataset?id=${id}`
        })
    },
    getDataSetInfoById(id) {
        return request({
            method: 'GET',
            url: `data/getDatasetInfo?id=${id}`
        })
    },
    // 修改数据源信息
    updateDbTitle(data) {
        return request({
            method: 'POST',
            url: '/db/modifyDataSource',
            data: data
        })
    },
    // 获取表的字段和类型
    getTableFiled(id,tableName) {
        return request({
            method: 'GET',
            url: `/db/getTableFiled?id=${id}&tableName=${tableName}`
        })
    },
    createProject(data) {
        return request({
            method: 'POST',
            url: '/mgr/project/createProject',
            data: data
        })
    },
    getProjectByUserId(id) {
        return request({
            method: 'GET',
            url: `/mgr/project/getProjects?user_id=${id}`
        })
    },
    deleteProjectById(id) {
        return request({
            method: 'GET',
            url: `/mgr/project/removeProject?id=${id}`
        })
    },
    // 获取工程内容
    getProjectContentById(id) {
        return request({
            method: 'GET',
            url: `/mgr/project/getProjectInfo?id=${id}`
        })
    },

    // // 图表数据
    // getGenerateData(data) {
    //     return request({
    //         method: 'POST',
    //         url: '/data/generateData',
    //         data: data
    //     })
    // }
    // 保存图表数据
    saveChartsData(data) {
        return request({
            method: 'POST',
            url: '/mgr/project/modifyProject',
            data: data
        })
    }
}