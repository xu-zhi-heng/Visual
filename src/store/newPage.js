// newPage
const newPage = {
    state: {
        componentCategoryTitle: "",     // 组件分类名称
        componentCategoryIcon: -1,      // 当前的分类图表index
        componentArray: [],             // 当前的组件数组
        componentArrayLength: 0,        // 当前组件数组的长度

        // 拖拽事件
        componentType: '',              // 拖拽的是哪一个图表
        isPush: false,
        componentArrayIndex: 0,

        isIconcss: false,                // 选择组件的时候才显示样式
        currentComponentElement: null,
        currentComponent: null,           // 当前的组件参数

        canvasLayers: [],                  // 图层数组
        currentCanvasLayersIndex: -1            // 选择当前图层的index
    },
    getters: {
        componentCategoryTitle: state => {
            let componentCategoryTitle = state.componentCategoryTitle
            if(componentCategoryTitle != "") {
                return componentCategoryTitle
            }else {
                return ""
            }
        },
        componentCategoryIcon: state => {
            let componentCategoryIcon = state.componentCategoryIcon
            if(componentCategoryIcon != -1) {
                return componentCategoryIcon
            }else {
                return -1
            }
        },
        componentArray: state => {
            let componentArray = state.componentArray
            if(componentArray.length != 0) {
                return componentArray
            }else {
                return []
            }
        },
        componentType: state => {
            let componentType = state.componentType
            if(componentType != '') {
                return componentType
            }else {
                return ''
            }
        },
        isPush: state => {
            let isPush = state.isPush
            if(isPush) {
                return isPush
            }else {
                return false
            }
        },
        componentArrayIndex: state => {
            let componentArrayIndex = state.componentArrayIndex
            if(componentArrayIndex !== 0) {
                return componentArrayIndex
            }else {
                return 0
            }
        },
        componentArrayLength: state => {
            let componentArrayLength = state.componentArrayLength
            if(componentArrayLength !== 0) {
                return componentArrayLength
            }else {
                return 0
            }
        },
        isIconcss: state => {
            let isIconcss = state.isIconcss
            if(isIconcss) {
                return isIconcss
            }else {
                return false
            }
        },
        currentComponentElement: state => {
            let currentComponentElement = state.currentComponentElement
            if(currentComponentElement) {
                return currentComponentElement
            }else {
                return null
            }
        },
        currentComponent: state => {
            let currentComponent = state.currentComponent
            if(currentComponent) {
                return currentComponent
            }else {
                return null
            }
        },
        canvasLayers: state => {
            let canvasLayers = state.canvasLayers
            if(canvasLayers) {
                return canvasLayers
            }else {
                return []
            }
        },
        currentCanvasLayersIndex: state => {
            let currentCanvasLayers = state.currentCanvasLayers
            if(currentCanvasLayers) {
                return currentCanvasLayers
            }else {
                return -1
            }
        },
    },
    mutations: {
        setComponentCategoryTitle: (state,componentCategoryTitle) => {
            state.componentCategoryTitle = componentCategoryTitle
        },
        setComponentCategoryIcon: (state,componentCategoryIcon) => {
            state.componentCategoryIcon = componentCategoryIcon
        },
        // 一次性加载所有组件
        setComponentArray: (state,componentArray) => {
            state.componentArray = componentArray
        },
        // 拖拽时添加组件
        pushView: (state,componentArray) => {
            state.componentArray.push(componentArray)
        },
        setComponentType: (state,componentType) => {
            state.componentType = componentType
        },
        setIsPush: (state,isPush) => {
            state.isPush = isPush
        },
        setComponentArrayIndex: (state,componentArrayIndex) => {
            state.componentArrayIndex = componentArrayIndex
        },
        setComponentArrayLength: (state,componentArrayLength) => {
            state.componentArrayLength = componentArrayLength
        },
        setIsIconcss: (state,isIconcss) => {
            state.isIconcss = isIconcss
        },
        setCurrentComponentElement: (state,currentComponentElement) => {
            state.currentComponentElement = currentComponentElement
        },
        setCurrentComponent: (state,currentComponent) => {
            state.currentComponent = currentComponent
        },
        setCanvasLayers: (state,canvasLayers) => {
            state.canvasLayers = canvasLayers
        },
        pushCanvasLayers: (state,canvasLayer) => {
            state.canvasLayers.push(canvasLayer)
        },
        setCurrentCanvasLayersIndex: (state,currentCanvasLayersIndex) => {
            state.currentCanvasLayersIndex = currentCanvasLayersIndex
        },
    }
}

export default newPage