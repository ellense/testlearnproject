<template>
    <el-dialog v-model="store.dialogFormEditApprovedVisible" title='Измените значение "Утверждено"'
        close-on-click-modal close-on-press-escape draggable style="width: 20%;">
        <form @submit.prevent>
            <el-form-item>
                <el-input v-model="store.editApproved" clearable 
                    placeholder="Введите новое значение" style="width: 100%"  @keyup.enter="handleEnterKeyPress"  />
            </el-form-item>
        </form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="store.dialogFormEditApprovedVisible = false">Отмена</el-button>
                <el-button @click="editApproved()">Сохранить</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { useGraphicСStore } from "~~/stores/graphicСStore";
import dayjs from "dayjs";


const store = useGraphicСStore()
// Функция для обработки нажатия клавиши Enter
const handleEnterKeyPress = (event: KeyboardEvent) => {
    event.preventDefault(); // Остановить стандартное действие события (отправка формы)
    editApproved(); // Вызвать вашу функцию editApproved()
};
//изменение поля утверждено
const editApproved = async () => {
    const selectedRows = store.selectedRowEditApproved
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
        date_start: dayjs(selectedRows.date_start).format("YYYY-MM-DD"),
        date_end: dayjs(selectedRows.date_end).format("YYYY-MM-DD"),
        date_calc: dayjs(selectedRows.date_calc).format("YYYY-MM-DD"),
        percent: selectedRows.percent,
        sum_calc: selectedRows.sum_calc,
        sum_bonus: selectedRows.sum_bonus,
        sum_approved: store.editApproved,
    };

    try {
        const response = await GRAPHIC.updateGraphic(data);
        console.log("Поле успешно обновлено:", response);
        store.dialogFormEditApprovedVisible = false;
        ElMessage.success("Поле успешно изменено");
        await store.getGraphicsFromAPIWithFilter();
        store.editApproved = null;
    } catch (error) {
        console.error("Ошибка при обновлении поля:", error);
        ElMessage.error("Ошибка при изменении поля");
    }
};

</script>

<style scoped></style>