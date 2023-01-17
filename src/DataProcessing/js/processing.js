import {mapGetters} from 'vuex'
import $ from 'jquery'
import database from "../../api/database";
import Cookies from "js-cookie";
import datapre from "../../api/datapre";
import axios from "axios";
import {getToken} from "../../api/auth";
export const processing = {
    data() {
        return {
            AssociatedDataSet: '',
            AssociatedField: '',

            chopperFiled: '',

            loading: false,
            loading1: false,
            tableData1: [],
            tablePage1: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
            },

        }
    },
    computed: {
        ...mapGetters([
            'currentFiledName',
            'category',
            'dataSetStructureIndex',
            'AssociatedDataSets',
            'AssociatedFields',
            'dataSetStructure',
            'chopperFileds',
            'onlyTexts',
            'startDate',
            'endDate',
            'filedType',
            'numberCon',
            'numberValue',
            'textValue',
            'onlyText',
            'textModel',
            'DataStore',
            'DataHeadStore',
            'isIn'
        ])
    },
    methods: {
        beforeRename(category,name,index) {
            this.$store.commit('setCurrentPopup','rename')
            this.$store.commit('setCurrentFiledName',name)
            this.$store.commit('setCategory',category)
            this.$store.commit('setDataSetStructureIndex',index)
            $('#panels').css('top','50%')
            $('#dataTreat').addClass('before')
            $('#renamePopup').addClass('show')
            $('#renamePopup').css('zIndex',1500)
            this.closeOptions()
        },
        // 关联前
        beforeAssociated(category,name,index) {
            this.$store.commit('setCurrentPopup','associated')
            this.$store.commit('setCurrentFiledName',name)
            this.$store.commit('setCategory',category)
            this.$store.commit('setDataSetStructureIndex',index)
            if(this.AssociatedDataSets.length == 0) {
                database.getDataSetByUserId(Cookies.get('userId')).then(res => {
                    if(res.code == 1) {
                        let arr = []
                        for(let i = 0; i < res.data.item.length; i++) {
                            if(res.data.item[i].id === this.$route.query.dataSetId) {
                                continue
                            }else {
                                let obj = {
                                    value: res.data.item[i].id,
                                    label: res.data.item[i].title
                                }
                                arr.push(obj)
                            }
                        }
                        this.$store.commit('setAssociatedDataSets',arr)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            $('#panels').css('top','50%')
            $('#dataTreat').addClass('before')
            $('#associatedPopup').addClass('associatedPopupShow')
            $('#associatedPopup').css('zIndex',1500)
            this.closeOptions()
        },
        chooseAssociatedDataSet() {
            this.AssociatedFields.splice(0,this.AssociatedFields.length)
            datapre.getAllFieldsById(this.AssociatedDataSet).then(res => {
                if(res.code == 1) {
                    let arr = []
                    for(let i = 0; i < res.data.item.length; i++) {
                        let obj = {
                            value: res.data.item[i].id,
                            label: res.data.item[i].name
                        }
                        arr.push(obj)
                    }
                    this.$store.commit('setAssociatedFields',arr)
                }
            }).catch(err => {
                console.log(err)
            })
        },

        // 合并
        beforeMerge(category,name) {
            this.$store.commit('setCurrentPopup','merge')
            this.getChoppers(1)
            this.$store.commit('setCurrentFiledName',name)
            this.$store.commit('setCategory',category)
            $('#panels').css('top','50%')
            $('#dataTreat').addClass('before')
            $('#mergePopup').addClass('mergePopupShow')
            $('#mergePopup').css('zIndex','1500')
            this.closeOptions()
        },
        getChoppers(type) {
            let arr = []
            for(let i = 0; i < this.dataSetStructure.dimension.length; i++) {
                if(this.dataSetStructure.dimension[i].level.length != 0) {
                    for(let j = 0; j < this.dataSetStructure.dimension[i].level.length; j++) {
                        let obj = {
                            label: this.dataSetStructure.dimension[i].level[j].caption,
                            value: this.dataSetStructure.dimension[i].level[j].caption
                        }
                        arr.push(obj)
                    }
                }else {
                    let name = (this.dataSetStructure.dimension[i].label === '' ? this.dataSetStructure.dimension[i].caption : this.dataSetStructure.dimension[i].label)
                    let obj = {
                        label: name,
                        value: name
                    }
                    arr.push(obj)
                }
            }
            for(let i = 0; i < this.dataSetStructure.measure.length; i++) {
                if(this.dataSetStructure.measure[i].level.length != 0) {
                    for(let j = 0; j < this.dataSetStructure.measure[i].level.length; j++) {
                        this.chopperFileds.push({
                            label: this.dataSetStructure.measure[i].level[j].caption,
                            value: this.dataSetStructure.measure[i].level[j].caption
                        })
                    }
                }else {
                    let name = (this.dataSetStructure.measure[i].label === '' ? this.dataSetStructure.measure[i].caption : this.dataSetStructure.measure[i].label)
                    arr.push({
                        label: name,
                        value: name
                    })
                }
            }
            this.$store.commit('setChopperFileds',arr)
        },

        beforeBreak(category,name,index) {
            this.$store.commit('setCurrentPopup','break')
            this.$store.commit('setCurrentFiledName',name)
            this.$store.commit('setCategory',category)
            this.$store.commit('setDataSetStructureIndex',index)
            $('#panels').css('top','50%')
            $('#dataTreat').addClass('before')
            $('#breakPopup').addClass('breakPopupShow')
            $('#breakPopup').css('zIndex','1500')
            this.closeOptions()
        },

        beforeFilter(category,name,type) {
            this.$store.commit('setCurrentFiledName',name)
            this.$store.commit('setCategory',category)
            this.$store.commit('setFiledType',type)
            this.closeOptions();
            $('#panels').css('top','50%')
            $('#dataTreat').addClass('before')
            $('#filterPopup').addClass('filterPopupShow')
            $('#filterPopup').css('zIndex','1500')
        },
        filter() {
            console.log(this.isIn)
            let index;
            for(let i = 0; i < this.dataSetStructure[this.category].length; i++) {
                if(this.dataSetStructure[this.category][i].caption === this.currentFiledName) {
                    index = i;
                }
            }
            if(this.filedType === 'text') {
                let obj = {}
                obj.operator = 'and'
                let filters = []
                let filter = {}
                filter.oper = this.textModel
                filter.values = []
                if(this.isIn) {
                    for(let i = 0; i < this.onlyText.length; i++) {
                        filter.values.push(this.onlyText[i])
                    }
                }else {
                    filter.values.push(this.textValue)
                }
                filters.push(filter)
                obj.filters = filters
                this.dataSetStructure[this.category][index].complexFilter = obj
            }else if(this.filedType === 'number') {
                let obj = {}
                obj.operator = 'and'
                let filters = []
                let filter = {}
                filter.oper = this.numberCon
                filter.values = []
                filter.values.push(this.numberValue)
                filters.push(filter)
                obj.filters = filters
                this.dataSetStructure[this.category][index].complexFilter = obj
            }else {
                let obj = {}
                obj.operator = 'and'
                let filters = []
                let filter = {}
                filter.oper = 'between'
                filter.values = []
                filter.values.push(new Date(this.startDate))
                filter.values.push(new Date(this.endDate))
                filters.push(filter)
                obj.filters = filters
                this.dataSetStructure[this.category][index].complexFilter = obj
            }
            this.chopperFiled = ''
            this.chopperFileds.splice(0,this.chopperFileds.length)
            axios.post(`http://47.100.107.173:8000/data/updatePreview`,JSON.stringify(this.dataSetStructure),{headers: {'token': getToken()}}).then(res => {
                if(res.data.code == 1) {
                    this.findList1(res.data.data.item)
                    this.$message({
                        showClose: true,
                        message: "过滤成功",
                        type: 'success'
                    });
                }
            }).catch(err => {
                console.log(err)
            })
            $('#panels').css('top','0%')
            $('#dataTreat').removeClass('before')
            $('#filterPopup').removeClass('filterPopupShow')
            $('#filterPopup').css('zIndex','1')
            this.$store.commit('setNumberCon','')
            this.$store.commit('setNumberValue','')

            this.$store.commit('setTextModel',"")
            this.$store.commit('setOnlyText','')
            this.$store.commit('setOnlyTexts',[])
            this.$store.commit('setTextValue','')

            this.$store.commit('setStartDate','')
            this.$store.commit('setEndDate','')
            this.$store.commit('setFiledType','')
        },

        beforeChangeType(category,index,name) {
            this.$store.commit('setCurrentPopup','chang-type')
            this.$store.commit('setCurrentFiledName',name)
            this.$store.commit('setCategory',category)
            this.$store.commit('setDataSetStructureIndex',index)
            this.closeOptions();
            $('#panels').css('top','50%')
            $('#changeTypePopup').addClass('show')
            $('#changeTypePopup').css('zIndex','1500')
            $('#dataTreat').addClass('before')
        },
        beforeSort(category,index,name) {
            this.$store.commit('setCurrentPopup','sort')
            this.$store.commit('setCurrentFiledName',name)
            this.$store.commit('setCategory',category)
            this.$store.commit('setDataSetStructureIndex',index)
            this.closeOptions();
            $('#panels').css('top','50%')
            $('#sortPopup').addClass('show')
            $('#sortPopup').css('zIndex','1500')
            $('#dataTreat').addClass('before')
        },
        beMeasure(category,index) {
            let element = this.dataSetStructure['dimension'][index]
            this.dataSetStructure['dimension'].splice(index,1)
            this.dataSetStructure['measure'].push(element)
        },
        beDimension(category,index) {
            let element = this.dataSetStructure['measure'][index]
            this.dataSetStructure['measure'].splice(index,1)
            this.dataSetStructure['dimension'].push(element)
        },
        hidden(category,name,type,index) {
            this.closeOptions();
            this.dataSetStructure[category][index].isHidden = (type === 0 ? 1 : 0)
        },
        Delete(category,name,type,index) {
            this.closeOptions();
            if(type == 0) {
                this.dataSetStructure[category][index].isDelete = 1
            }else {
                this.dataSetStructure[category][index].isDelete = 0
            }
        },
        closeOptions() {
            let li = document.getElementsByClassName('nav-tab')
            for(let i = 0; i < li.length; i++) {
                if(li[i].classList.contains("current")) {
                    li[i].classList.remove('current')
                }
            }
        },
        beforeNumberFormat() {

        },
        beforeDataFormat() {

        },

        findList1 (data) {
            this.$store.commit('setDataStore',[])
            this.$store.commit('setDataHeadStore',[])
            this.loading1 = true
            if(data === null) {
                setTimeout(() => {
                    this.loading1 = false
                    this.loading = true
                    datapre.PreviewData(this.$route.query.dataSetId,1).then(res => {
                        console.log(res)
                        let result = res.data.item
                        let arr = []
                        for(let i = 0; i < 50; i++) {
                            let obj = {}
                            for(let item in result) {
                                obj[item] = result[item][i]
                            }
                            arr.push(obj)
                        }
                        this.$store.commit('setDataStore',arr)
                        let head = []
                        for(let item in result) {
                            head.push(item)
                        }
                        this.$store.commit('setDataHeadStore',head)
                        this.loading = false
                    }).catch(err => {
                        console.log(err)
                    })
                    this.tablePage1.totalResult = this.DataStore.length
                    this.tableData1 = this.DataStore.slice((this.tablePage1.currentPage - 1) * this.tablePage1.pageSize, this.tablePage1.currentPage * this.tablePage1.pageSize)
                }, 300)
            }else if(data !== null) {
                setTimeout(() => {
                    this.loading1 = false
                    this.loading = true
                    let arr = []
                    for(let i = 0; i < 50; i++) {
                        let obj = {}
                        for(let item in data) {
                            obj[item] = data[item][i]
                        }
                        arr.push(obj)
                    }
                    this.$store.commit('setDataStore',arr)
                    let head = []
                    for(let item in data) {
                        head.push(item)
                    }
                    this.$store.commit('setDataHeadStore',head)
                    this.loading = false
                    this.tablePage1.totalResult = this.DataStore.length
                    this.tableData1 = this.DataStore.slice((this.tablePage1.currentPage - 1) * this.tablePage1.pageSize, this.tablePage1.currentPage * this.tablePage1.pageSize)
                }, 300)
            }
        },
    }
}