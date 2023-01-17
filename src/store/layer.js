// 图层信息
const Layer = {
    state: {
        layerComponents: [

        ]
    },
    getters: {
        layerComponents: state => {
            let layerComponents = state.layerComponents
            if(layerComponents) {
                return layerComponents
            }else {
                return null
            }
        }
    },
    mutations: {
        setLayerComponents: (state,Components) => {
            state.layerComponents.push(Components)
        },
    }
}
export default Layer