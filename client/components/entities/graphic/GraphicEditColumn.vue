<template>
    <el-dialog v-model="useGraphicStore().dialogFormEditApprovedVisible" title='Измените значение "Утверждено"'
        close-on-click-modal close-on-press-escape draggable style="width: 20%;">
        <form>
            <el-form-item>
                <el-input v-model="useGraphicStore().editApproved" clearable @input=""
                    placeholder="Введите новое значение" style="width: 100%" />
            </el-form-item>
        </form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="useGraphicStore().dialogFormEditApprovedVisible = false">Отмена</el-button>
                <el-button @click="editApproved()">Сохранить</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { useGraphicStore } from "~~/stores/graphicStore";

//изменение поля утверждено
const editApproved = async () => {
    const selectedRows = useGraphicStore().selectedRowEditApproved
    console.log("selectedRows поле", selectedRows)
    const data = {
        graph_id: selectedRows.graph_id,
        ku_id: selectedRows.ku_id,
        status: selectedRows.status,
        entity_id: selectedRows.entity_id,
        entity_name: selectedRows.entity_name,
        vendor_name: selectedRows.vendor_name,
        vendor_id: selectedRows.vendor_id,
        period: selectedRows.period,
        date_start: selectedRows.date_start,
        date_end: selectedRows.date_end,
        date_calc: selectedRows.date_calc,
        percent: selectedRows.percent,
        sum_calc: selectedRows.sum_calc,
        sum_bonus: selectedRows.sum_bonus,
        sum_approved: useGraphicStore().editApproved,
    };

    try {
        const response = await GRAPHIC.updateGraphic(data);
        console.log("Поле успешно обновлено:", response);
        useGraphicStore().dialogFormEditApprovedVisible = false;
        ElMessage.success("Поле успешно изменено");
        await useGraphicStore().getGraphicsFromAPIWithFilter();
        useGraphicStore().editApproved = null;
    } catch (error) {
        console.error("Ошибка при обновлении поля:", error);
        ElMessage.error("Ошибка при изменении поля");
    }
};

</script>

<style scoped></style>