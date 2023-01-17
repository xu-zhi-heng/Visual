// DataProcessing
const DataProcessing = {
    state: {
        currentPopup: '',             // 当前显示的是什么弹出框
        currentFiledName: "",        // 当前选择的字段
        category: "",                // 当前字段的类别
        dataSetStructureIndex: "",   // 当前选择的字段结构中在第几个位置
        dataSetStructure: {},       // 数据的结构（用于最后的保存）
        DataStore: [],
        DataHeadStore: [],

        // 数据关联的参数
        AssociatedDataSets: [],
        AssociatedFields: [],

        // 拆分
        chopperFileds: [],

        // 过滤
        filedType: '',
        onlyTexts: [],

        startDate: '',
        endDate: '',

        numberCon: '',
        numberValue: '',

        textValue: '',
        onlyText: '',
        textModel: '',

        isIn: false,

        IndexParameters: [],        // 指标参数
    },
    getters: {
        IndexParameters: state => {
            let IndexParameters = state.IndexParameters
            if(IndexParameters.length != 0) {
                return IndexParameters
            }else {
                return []
            }
        },
        isIn: state => {
            let isIn = state.isIn
            if(isIn) {
                return isIn
            }else {
                return false
            }
        },
        DataStore: state => {
            let DataStore = state.DataStore
            if(DataStore) {
                return DataStore
            }else {
                return []
            }
        },
        DataHeadStore: state => {
            let DataHeadStore = state.DataHeadStore
            if(DataHeadStore) {
                return DataHeadStore
            }else {
                return []
            }
        },
        textModel: state => {
            let textModel = state.textModel
            if(textModel) {
                return textModel
            }else {
                return ""
            }
        },
        onlyText: state => {
            let onlyText = state.onlyText
            if(onlyText) {
                return onlyText
            }else {
                return ""
            }
        },
        textValue: state => {
            let textValue = state.textValue
            if(textValue) {
                return textValue
            }else {
                return ""
            }
        },
        numberCon: state => {
            let numberCon = state.numberCon
            if(numberCon) {
                return numberCon
            }else {
                return ""
            }
        },
        numberValue: state => {
            let numberValue = state.numberValue
            if(numberValue) {
                return numberValue
            }else {
                return ""
            }
        },
        currentFiledName: state => {
            let currentFiledName = state.currentFiledName
            if(currentFiledName) {
                return currentFiledName
            }else {
                return ""
            }
        },
        category: state => {
            let category = state.category
            if(category) {
                return category
            }else {
                return ""
            }
        },
        dataSetStructureIndex: state => {
            let dataSetStructureIndex = state.dataSetStructureIndex
            if(dataSetStructureIndex != 0) {
                return dataSetStructureIndex
            }else {
                return 0
            }
        },
        dataSetStructure: state => {
            let dataSetStructure = state.dataSetStructure
            if(dataSetStructure) {
                return dataSetStructure
            }else {
                return ""
            }
        },
        currentPopup: state => {
            let currentPopup = state.currentPopup
            if(currentPopup) {
                return currentPopup
            }else {
                return ""
            }
        },
        AssociatedDataSets: state => {
            let AssociatedDataSets = state.AssociatedDataSets
            if(AssociatedDataSets.length != 0) {
                return AssociatedDataSets
            }else {
                return []
            }
        },
        AssociatedFields: state => {
            let AssociatedFields = state.AssociatedFields
            if(AssociatedFields.length != 0) {
                return AssociatedFields
            }else {
                return []
            }
        },
        chopperFileds: state => {
            let chopperFileds = state.chopperFileds
            if(chopperFileds.length != 0) {
                return chopperFileds
            }else {
                return []
            }
        },
        filedType: state => {
            let filedType = state.filedType
            if(filedType) {
                return filedType
            }else {
                return ''
            }
        },
        onlyTexts: state => {
            let onlyTexts = state.onlyTexts
            if(onlyTexts.length != 0) {
                return onlyTexts
            }else {
                return []
            }
        },
        startDate: state => {
            let startDate = state.startDate
            if(startDate) {
                return startDate
            }else {
                return ''
            }
        },
        endDate: state => {
            let endDate = state.endDate
            if(endDate) {
                return endDate
            }else {
                return ''
            }
        },
    },
    mutations: {
        setDataStore: (state,DataStore) => {
            state.DataStore = DataStore
        },
        setDataHeadStore: (state,DataHeadStore) => {
            state.DataHeadStore = DataHeadStore
        },
        setTextModel: (state,textModel) => {
            state.textModel = textModel
        },
        setCurrentFiledName: (state,currentFiledName) => {
            state.currentFiledName = currentFiledName
        },
        setCategory: (state,category) => {
            state.category = category
        },
        setDataSetStructureIndex: (state,dataSetStructureIndex) => {
            state.dataSetStructureIndex = dataSetStructureIndex
        },
        setDataSetStructure: (state,dataSetStructure) => {
            state.dataSetStructure = dataSetStructure
        },
        setAssociatedDataSets: (state,AssociatedDataSets) => {
            state.AssociatedDataSets = AssociatedDataSets
        },
        setAssociatedFields: (state,AssociatedFields) => {
            state.AssociatedFields = AssociatedFields
        },
        setChopperFileds: (state,chopperFileds) => {
            state.chopperFileds = chopperFileds
        },
        setFiledType: (state,filedType) => {
            state.filedType = filedType
        },
        setOnlyTexts: (state,onlyTexts) => {
            state.onlyTexts = onlyTexts
        },
        setStartDate: (state,startDate) => {
            state.startDate = startDate
        },
        setEndDate: (state,endDate) => {
            state.endDate = endDate
        },
        setNumberCon: (state,numberCon) => {
            state.numberCon = numberCon
        },
        setNumberValue: (state,numberValue) => {
            state.numberValue = numberValue
        },
        setTextValue: (state,textValue) => {
            state.textValue = textValue
        },
        setOnlyText: (state,onlyText) => {
            state.onlyText = onlyText
        },
        setCurrentPopup: (state,currentPopup) => {
            state.currentPopup = currentPopup
        },
        setIsIn: (state,isIn) => {
            state.isIn = isIn
        },
        pushIndexParameters: (state,IndexParameters) => {
            state.IndexParameters.push(IndexParameters)
        },
        setIndexParameters: (state,IndexParameters) => {
            state.IndexParameters = IndexParameters
        },
    }
}

export default DataProcessing