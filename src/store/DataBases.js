// 数据源文件内容
const DataBases = {
    state: {
        activeTables: null,             // 当前数据库下所有的表
        totalTables: 0,                 // 当前数据库下有多少表
        activeDataBase: null,           // 当前展示的数据库是哪个
        activeDataBaseId: null,         // 当前的数据源id
        dataSource: null,               // 该用户下所有的数据源
        tableInfo: null,                // 某一张表下的字段信息


        loading: false,                 // 加载动画
        dataAggregation: null,          // 数据库的头部信息汇总,用户控制和csv的头部进行显示
        tableElement: null,             // 显示字段信息的容器元素

        dataSet: null,                  // 数据集信息
    },
    getters: {
        activeTables: state => {
            let activeTables = state.activeTables;
            if(activeTables) {
                return activeTables;
            }else {
                return null
            }
        },
        totalTables: state => {
            let totalTables = state.totalTables;
            if(totalTables) {
                return totalTables
            }else {
                return ''
            }
        },
        activeDataBase: state => {
            let activeDataBase = state.activeDataBase
            if(activeDataBase) {
                return activeDataBase
            }else {
                return ''
            }
        },
        activeDataBaseId: state => {
            let activeDataBaseId = state.activeDataBaseId
            if(activeDataBaseId) {
                return activeDataBaseId
            }else {
                return ''
            }
        },
        loading: state => {
            let loading = state.loading
            if(loading) {
                return loading
            }else {
                return ""
            }
        },
        dataSource: state => {
            let dataSource = state.dataSource
            if(dataSource) {
                return dataSource
            }else {
                return null
            }
        },
        dataAggregation: state => {
            let dataAggregation = state.dataAggregation
            if(dataAggregation) {
                return dataAggregation
            }else {
                return null
            }
        },
        tableInfo: state => {
            let tableInfo = state.tableInfo
            if(tableInfo) {
                return tableInfo
            }else {
                return null
            }
        },
        tableElement: state => {
            let tableElement = state.tableElement
            if(tableElement) {
                return tableElement
            }else {
                return null
            }
        },
        DataSet: state => {
            let dataSet = state.dataSet
            if(dataSet) {
                return dataSet
            }else {
                return null
            }
        }
    },
    mutations: {
        setActiveTables: (state,activeTables) => {
            state.activeTables = activeTables
        },
        setTotalTables: (state,totalTables) => {
            state.totalTables = totalTables
        },
        setActiveDataBase: (state,activeDataBase) => {
            state.activeDataBase = activeDataBase
        },
        setActiveDataBaseId: (state,activeDataBaseId) => {
            state.activeDataBaseId = activeDataBaseId
        },
        setLoading: (state,loading) => {
            state.loading = loading
        },
        setDataSource: (state,dataSource) => {
            state.dataSource = dataSource
        },
        setDataAggregation: (state,dataAggregation) => {
            state.dataAggregation = dataAggregation
        },
        setTableInfo: (state,tableInfo) => {
            state.tableInfo = tableInfo
        },
        setTableElement: (state,tableElement) => {
            state.tableElement = tableElement
        },
        setDataSet: (state,DataSet) => {
            state.dataSet = DataSet
        }
    }
}

export default DataBases