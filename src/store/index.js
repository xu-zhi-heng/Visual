import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import CSVContent from './CSVContent'
import DataBases from "./DataBases";
import DataPre from './DataPre'
import Visual from "./Visual";
import Components from "./Components";
import Layer from "./layer";
import SweetFun from "./SweetFun";
import newPage from "./newPage";
import DataProcessing from "./DataProcessing";
export default new Vuex.Store({
  modules: {
    CSVContent,
    DataBases,
    DataPre,
    Visual,
    Components,
    Layer,
    SweetFun,
    newPage,
    DataProcessing
  }
})

