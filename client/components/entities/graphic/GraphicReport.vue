<template>
    <el-dialog v-model="useReportStore().dialogForm" title="Отчет по расчету" close-on-click-modal>
        <div class="reportTableWrapper__table">
            <vue-excel-editor v-if="tableData.length > 0" v-model="tableData" :readonly="true" :disable-panel-filter="true"
                :disable-panel-setting="true" :localized-label="localizedExcelTableLabel">
                <vue-excel-column v-for="column in columnTable" :key="column.field" :field="column.field"
                    :label="column.label" :type="column.type" :width="`${column.width}px`" :summary="column.summary"
                    :init-style="column.style" />
            </vue-excel-editor>
            <div v-if="!getGraphicDone">Данных с такими параметрами нет</div>
        </div>
        <template #footer>
            <span>
                <el-button @click="useReportStore().dialogForm = false">Отмена</el-button>
                <el-button type="primary" @click="">Экспортировать в Excel</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { localizedExcelTableLabel } from '~/composables/localizedExcelTable'
import { storeToRefs } from "pinia";
import { useReportStore } from "~~/stores/reportStore";
const { printReportToggle, graphic, filterValue, getGraphicDone } =
    storeToRefs(useReportStore())
interface ColumnTable {
    field: string
    label: string
    type: string
    width: number
    summ?: boolean
    summary?: 'sum' | 'min' | 'max' | 'avg' | 'count'
    style?: Object
}
const columnTable: ColumnTable[] = [
    {
        field: 'entity_id',
        label: 'Юр. лицо',
        type: 'string',
        width: 100,
    },
    {
        field: 'ku_id',
        label: 'Код ку',
        type: 'string',
        width: 250,
    },
    {
        field: 'period',
        label: 'Период расчета',
        type: 'string',
        width: 250,
    },
    {
        field: 'percent',
        label: 'Процент',
        type: 'string',
        width: 130,
    },
    {
        field: 'status',
        label: 'Статус',
        type: 'string',
        width: 170,
    },
]
const tableData = ref(graphic.value)
watch(graphic, (value) => {
    tableData.value = value
})
</script>

<style scoped></style>