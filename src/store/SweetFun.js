// 新的页面
import MyProject from "../components/NewPage/MyProject";
const SweetFun = {
    state: {
        currentTitle: '项目工程',            //当前选择的header上面的导航title
        currentPage: MyProject,              // 当前展示的页面组件
        pageBody: null,                       // 显示页面的容器，主要页面切换时触发的样式,
        projectId: '',
        report: {
            year: '',
            month: '',
            totalTime: 0,
            fileCount: 0,
            dataBaseCount: 0,
            projectCount: 0,
            bestChart: '',
            bestMethod: '',
            bestADayTime: 0,
        }
    },
    getters: {
        currentTitle: state => {
            let currentTitle = state.currentTitle
            if(currentTitle) {
                return currentTitle
            }else {
                return null
            }
        },
        currentPage: state => {
            let currentPage = state.currentPage
            if(currentPage) {
                return currentPage
            }else {
                return null
            }
        },
        pageBody: state => {
            let pageBody = state.pageBody
            if(pageBody) {
                return pageBody
            }else {
                return null
            }
        },
        projectId: state => {
            let projectId = state.projectId
            if(projectId) {
                return projectId
            }else {
                return null
            }
        },
        report: state => {
            let report = state.report
            if(report) {
                return report
            }else {
                return null
            }
        },
    },
    mutations: {
        setCurrentTitle: (state,currentTitle) => {
            state.currentTitle = currentTitle
        },
        setCurrentPage: (state,currentPage) => {
            state.currentPage = currentPage
        },
        setPageBody: (state,pageBody) => {
            state.pageBody = pageBody
        },
        setProjectId: (state,projectId) => {
            state.projectId = projectId
        },
        setReportFileCount: (state,fileCount) => {
            state.report.fileCount = fileCount
        },
        setReportMonth: (state,month) => {
            state.report.month = month
        },
        setReportTotalTime: (state,totalTime) => {
            state.report.totalTime = totalTime
        },
        setReportDataBaseCount: (state,dataBaseCount) => {
            state.report.dataBaseCount = dataBaseCount
        },
        setReportProjectCount: (state,projectCount) => {
            state.report.projectCount = projectCount
        },
        setReportYear: (state,year) => {
            state.report.year = year
        },
        setReportBestChart: (state,bestChart) => {
            state.report.bestChart = bestChart
        },
        setReportBestMethod: (state,bestMethod) => {
            state.report.bestMethod = bestMethod
        },
        setReportBestADayTime: (state,bestADayTime) => {
            state.report.bestADayTime = bestADayTime
        }
    }
}
export default SweetFun