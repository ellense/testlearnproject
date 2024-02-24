<template>
    <el-dialog v-model="useKuStore().dialogFormEditApprovedVisible" title='Измените значение "Утверждено"'
        close-on-click-modal close-on-press-escape draggable style="width: 20%;">
        <form>
            <el-form-item>
                <el-input v-model="useKuStore().editApproved" clearable @input="" placeholder="Введите новое значение"
                    style="width: 100%" />
            </el-form-item>
        </form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="useKuStore().dialogFormEditApprovedVisible = false">Отмена</el-button>
                <el-button @click="editApproved()">Сохранить</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { useKuStore } from "~~/stores/kuStore";

// const percentValidation = ref<"error" | "success" | "validating" | undefined>('success');
// const percentError = ref<string | undefined>('');

// // Функция проверки процента
// const validateInput = () => {
//     const percent = parseFloat(String(useKuStore().editApproved));
//     if (isNaN(percent) || percent < 1 || percent > 100) {
//         percentValidation.value = 'error';
//         percentError.value = 'Введите корректное число';
//     } else {
//         percentValidation.value = undefined;
//         percentError.value = undefined;
//     }
// };

// watch(() => useKuStore().editApproved, validateInput);

//изменение поля утверждено
const editApproved = async () => {
    const selectedRows = useKuStore().selectedRowEditApproved
    console.log("selectedRows поле", selectedRows)
    const data = {
        graph_id: selectedRows.graph_id,
        ku_id: selectedRows.ku_id,
        status: selectedRows.status,
        vendor_name: selectedRows.vendor_name,
        vendor_id: selectedRows.vendor_id,
        period: selectedRows.period,
        date_start: selectedRows.date_start,
        date_end: selectedRows.date_end,
        date_calc: selectedRows.date_calc,
        percent: selectedRows.percent,
        sum_calc: selectedRows.sum_calc,
        sum_bonus: selectedRows.sum_bonus,
        sum_approved: useKuStore().editApproved,
    };

    try {
        const response = await GRAPHIC.updateGraphic(data);
        console.log("Поле успешно обновлено:", response);
        useKuStore().dialogFormEditApprovedVisible = false;
        ElMessage.success("Поле успешно изменено");
        await useKuStore().getGraphicsFromAPIWithFilter();
        useKuStore().editApproved = null;
    } catch (error) {
        console.error("Ошибка при обновлении поля:", error);
        ElMessage.error("Ошибка при изменении поля");
    }
};

</script>

<style scoped></style>