// 图表组件等内容
const Components = {
    state: {
        // 用户拖拽的所有图表信息
        view: [

        ],
        viewLength: 0,
        setOptionsLength: 0,        // 保存后，用户进来时需要绘制图表从0开始

        // 图层信息
        layers: [

        ],

        CurrentIndex: -1,           // 当前选择的图层组件的index,用于图层的显示

        currentEchartInstance: null, // 当前的echarts图表实列,


        screen: null
    },
    getters: {
        currentEchartInstance: state => {
            let currentEchartInstance = state.currentEchartInstance
            if(currentEchartInstance) {
                return currentEchartInstance
            }else {
                return null
            }
        },
        view: state => {
            let view = state.view
            if(view) {
                return view
            }else {
                return null
            }
        },
        layers: state => {
            let layers = state.layers
            if(layers) {
                return layers
            }else {
                return null
            }
        },
        CurrentIndex: state => {
            let currentIndex = state.CurrentIndex
            if(currentIndex) {
                return currentIndex
            }else {
                return null
            }
        },
        viewLength: state => {
            let viewLength = state.viewLength
            if(viewLength) {
                return viewLength
            }else {
                return null
            }
        },
        currentEchartOption: state => {
            let currentEchartOption = state.currentEchartOption
            if(currentEchartOption) {
                return currentEchartOption
            }else {
                return null
            }
        },
        setOptionsLength: state => {
            let setOptionsLength = state.setOptionsLength
            if(setOptionsLength) {
                return setOptionsLength
            }else {
                return 0
            }
        },
        screen: state => {
            let screen = state.screen
            if(screen) {
                return screen
            }else {
                return 0
            }
        },
    },
    mutations: {
        setCurrentEchartInstance: (state,currentEchartInstance) => {
            state.currentEchartInstance = currentEchartInstance
        },
        setView: (state,item) => {
            state.view.push(item)
        },
        AssignmentView: (state,view) => {
            state.view = view
        },
        setLayers: (state,layer) => {
            state.layers.push(layer)
        },
        AssignmentLayers: (state,layers) => {
            state.layers = layers
        },
        setCurrentIndex: (state,currentIndex) => {
            state.CurrentIndex = currentIndex
        },
        setViewLength: (state,viewLength) => {
            state.viewLength = viewLength
        },
        AsetOptionsLength: (state,setOptionsLength) => {
            state.setOptionsLength = setOptionsLength
        },
        setScreen: (state,screen) => {
            state.screen = screen
        }
    }
}
export default Components