// csv文件内容
const CSVContent = {
    state: {
        csvAggregation: null,           // csv的头部信息汇总，
        CSVSource: null                 // 用户下所有的csv文件
    },
    getters: {
        csvAggregation: state => {
            let csvAggregation = state.csvAggregation
            if(csvAggregation) {
                return csvAggregation
            }else {
                return null
            }
        },
        CSVSource: state => {
            let CSVSource = state.CSVSource
            if(CSVSource) {
                return CSVSource
            }else {
                return null
            }
        }
    },
    mutations: {
        setCsvAggregation: (state,csvAggregation) => {
            state.csvAggregation = csvAggregation
        },
        setCSVSource: (state,CSVSource) => {
            state.CSVSource = CSVSource
        }
    }
}

export default CSVContent