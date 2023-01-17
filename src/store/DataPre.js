// 预处理
const DataPre = {
    state: {
        AllStructures: null,      // 所以的数据结构
        dimension: null,          // 维度
        measure: null,            // 度量
        activeField: null,        // 当前选择的字段
        activeFieldType: null,    // 当前选择字段的类型
        index: null,              // 主页面,主要是控制遮罩层
    },
    getters: {
        AllStructures: state => {
            let allStructures = state.AllStructures;
            if(allStructures) {
                return allStructures
            }else {
                return null
            }
        },
        dimension: state => {
            let dimension = state.dimension
            if(dimension) {
                return dimension
            }else {
                return null
            }
        },
        measure: state => {
            let measure = state.measure
            if(measure) {
                return measure
            }else {
                return null
            }
        },
        activeField: state => {
            let activeField = state.activeField
            if(activeField) {
                return activeField
            }else {
                return null
            }
        },
        index: state => {
            let index = state.index
            if(index) {
                return index
            }else {
                return null
            }
        },
        activeFieldType: state => {
            let activeFieldType = state.activeFieldType
            if(activeFieldType) {
                return activeFieldType
            }else {
                return null
            }
        }
    },
    mutations: {
        setAllStructures: (state,AllStructures) => {
            state.AllStructures = AllStructures
        },
        setDimension: (state,dimension) => {
            state.dimension = dimension
        },
        setMeasure: (state,measure) => {
            state.measure = measure
        },
        setActiveField: (state,activeField) => {
            state.activeField = activeField
        },
        setIndex: (state,index) => {
            state.index = index
        },
        setActiveFieldType: (state,activeFieldType) => {
            state.activeFieldType = activeFieldType
        },
    },
    // 支持异步
    actions: {

    }
}

export default DataPre