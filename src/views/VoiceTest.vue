<template>
    <div>
        <div>
            <button @click="start()" class="startBtn">开始说话</button>
            <br />
            <button @click="end()" class="endBtn">结束并转换普通话</button>
            <div id="resultText" style="width: 200px;height: 20px;color: red;opacity: 0"></div>
            <button @click="cut()" class="cutBtn">分词</button>
        </div>
        <div id="table" style="overflow:hidden;">
            <vxe-toolbar>
                <template #buttons>
                    <vxe-button @click="$refs.xTable1.toggleCheckboxRow(tableData[1])">切换第二行选中</vxe-button>
                    <vxe-button @click="$refs.xTable1.setCheckboxRow([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
                    <vxe-button @click="$refs.xTable1.setAllCheckboxRow(true)">设置所有行选中</vxe-button>
                    <vxe-button @click="$refs.xTable1.clearCheckboxRow()">清除所有行选中</vxe-button>
                    <vxe-button @click="getSelectEvent">获取选中</vxe-button>
                </template>
            </vxe-toolbar>

            <vxe-table
                    border
                    ref="xTable1"
                    :data="tableData"
                    @checkbox-all="selectAllEvent"
                    @checkbox-change="selectChangeEvent">
                <vxe-table-column type="checkbox" width="60"></vxe-table-column>
                <vxe-table-column field="name" title="Name"></vxe-table-column>
                <vxe-table-column field="sex" title="Sex"></vxe-table-column>
                <vxe-table-column field="age" title="Age"></vxe-table-column>
                <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
            </vxe-table>

        </div>
    </div>
</template>

<script>
    import {Trie,Node} from "./Trie";

    export default {
        name: "VoiceTest",
        data() {
            return {
                dict: ["拖动", "折线图", "柱状图", "散点图", "仪表板", "饼图", "面积图"],
                stop: {"的": 1},
                words: "",
                trie: null,
                allAlign: null,
                tableData: [
                    { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                    { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                    { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
                    { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
                    { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
                    { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
                    { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '2020-09-20' },
                    { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
                ],
                sexList: [
                    { label: '', value: '' },
                    { label: '男', value: '1' },
                    { label: '女', value: '0' }
                ]
            }
        },
        components: {

        },
        methods: {
            start() {
                this.voiceConversion('start')
            },
            end() {
                this.voiceConversion('end')
            },
            voiceConversion(type) {
                console.log(type);
                try {
                    let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
                    recognition.lang = 'cmn-Hans-CN'; //普通话 (中国大陆)
                    recognition.interimResults = true;
                    recognition.continuous = true;
                    if (type === 'start') {
                        recognition.start();
                    } else {
                        recognition.stop();
                    }
                    recognition.onresult = function(event) {
                        const text = event.results[0][0].transcript;
                        document.getElementById("resultText").innerText = text
                        this.words = text
                    }
                } catch (e) {
                    console.log('调用后端接口');
                }
            },
            cut() {
                this.words = document.getElementById("resultText").innerText
                console.log(this.words)
                this.trie = new Trie()
                this.trie.init(this.dict)
                let result = this.trie.splitWords(this.words);
                console.group("Trie 分词: ");
                console.log("待分词的字符串: ", this.words);
                console.log("分词结果:       ", result);
                console.groupEnd();
            },
            selectAllEvent ({ checked, records }) {
                console.log(checked ? '所有勾选事件' : '所有取消事件', records)
            },
            selectChangeEvent ({ checked, records }) {
                console.log(checked ? '勾选事件' : '取消事件', records)
            },
            getSelectEvent () {
                let selectRecords = this.$refs.xTable1.getCheckboxRecords()
                this.$XModal.alert(selectRecords.length)
            }
        }
    }
</script>

<style scoped>
    * {margin: 0;padding: 0;}
    body {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .startBtn, .endBtn {
        display: block;
        width: 150px;
        height: 120px;
        border: 2px solid;
        margin: 10px;
    }
    .cutBtn {
        display: block;
        width: 150px;
        height: 120px;
        border: 2px solid;
        margin: 10px;
    }
</style>