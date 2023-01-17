<template>
    <div id="table">
        <el-table
                :data="tableData"
                height="250"
                style="width: 80%">
            <el-table-column
                    prop="date"
                    label="航线"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="次数"
                    width="180">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "table",
        data() {
            return {
                tableData: [{
                    date: 'FAC-FEC',
                    name: 29284,
                }, {
                    date: 'BEF-CAG-CCC',
                    name: 22644
                }, {
                    date: 'FFE-AEF',
                    name: 22159
                }, {
                    date: 'FCD-DEA-AEF',
                    name: 21201
                }, {
                    date: 'FFE-EAD',
                    name: 21191
                }, {
                    date: 'EAD-FFE',
                    name: 21152
                }, {
                    date: 'FFE-CCG',
                    name: 18405
                }, {
                    date: 'AEF-FFE',
                    name: 16695
                }, {
                    date: 'FAC-DGA',
                    name: 16545
                }, {
                    date: 'AAE-GAD',
                    name: 16163
                }]
            }
        }
    }
</script>

<style scoped>

</style>