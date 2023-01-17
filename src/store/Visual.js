// 可视化拖拽
const Visual = {
    state: {
        screenContainer: null,
        currentElement: null,             // 当前选中的canvas图表
        currentView: null,                // 当前选择的某个view
        theme: '',
        DataBindingComponent: null,       // 数据源设置组件,
        Calculate: null,                  //  计算组件
        CalculateType: 0,                 //  计算方式
    },
    getters: {
        screenContainer: state => {
            let screenContainer = state.screenContainer
            if(screenContainer) {
                return screenContainer
            }else {
                return null
            }
        },
        currentElement: state => {
            let currentElement = state.currentElement
            if(currentElement) {
                return currentElement
            }else {
                return null
            }
        },
        currentView: state => {
            let currentView = state.currentView
            if(currentView) {
                return currentView
            }else {
                return null
            }
        },
        theme: state => {
            let theme = state.theme
            if(theme) {
                return theme
            }else {
                return null
            }
        },
        DataBindingComponent: state => {
            let DataBindingComponent = state.DataBindingComponent
            if(DataBindingComponent) {
                return DataBindingComponent
            }else {
                return null
            }
        },
        Calculate: state => {
            let Calculate = state.Calculate
            if(Calculate) {
                return Calculate
            }else {
                return null
            }
        },
        CalculateType: state => {
            let CalculateType = state.CalculateType
            if(CalculateType) {
                return CalculateType
            }else {
                return null
            }
        }
    },
    mutations: {
        setScreenContainer: (state,screenContainer) => {
            state.screenContainer = screenContainer
        },
        setCurrentElement: (state,currentElement) => {
            state.currentElement = currentElement
        },
        setCurrentView: (state,currentView) => {
            state.currentView = currentView
        },
        changeTheme: (state,theme) => {
            state.theme = theme
        },
        setDataBindingComponent: (state,DataBindingComponent) => {
            state.DataBindingComponent = DataBindingComponent
        },
        setCalculate:(state,Calculate) => {
            state.Calculate = Calculate
        },
        setCalculateType: (state,CalculateType) => {
            state.CalculateType = CalculateType
        }
    }
}
export default Visual