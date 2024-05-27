<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <h3>Графики расчетов КУ клиентов</h3>
      <el-divider direction="vertical" />
      <el-dropdown :disabled="isButtonsDisabled">
        <el-button type="success" plain :disabled="isButtonsDisabled" :title="disableButtonTooltip" size="small">
          Создать акт<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><el-button @click="store.dialogFormShopAndServiceVisible = true" link size="small" :disabled="isButtonsDisabledAct">Приложение к договору</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown :disabled="isButtonsDisabled">
        <el-button type="primary" plain :disabled="isButtonsDisabled" :title="disableButtonTooltip" size="small">
          Изменить статус<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><el-button @click="AccruedGraphic()" link type="primary"
                size="small">Начислено</el-button></el-dropdown-item>
            <el-dropdown-item><el-button @click="ApproveGraphic()" link type="success"
                size="small">Утверждено</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button type="danger" plain @click="deleteGraphic()" :disabled="isDeleteButtonDisabled"
        :title="disableButtonDeleteTooltip" size="small">Удалить</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { useGraphicСStore } from "~~/stores/graphicСStore";
import { dayjs } from "element-plus";


const store = useGraphicСStore()

onMounted(() => {
  store.getLegalEntityFilterForGraphicFromApi();
  store.getKuIdFilterForGraphicFromApi();
});

//начисление графика
const AccruedGraphic = async () => {
  const selectedRows = store.multipleSelectionGraphic
  console.log("selectedRows статус", selectedRows)
  const data = {
    graph_id: selectedRows[0].graph_id,
    ku: selectedRows[0].ku,
    status: "Начислено",
    entity: selectedRows[0].entity,
    entity_name: selectedRows[0].entity_name,
    customer_name: selectedRows[0].customer_name,
    customer: selectedRows[0].customer,
    period: selectedRows[0].period,
    date_start: dayjs(selectedRows[0].date_start).format("YYYY-MM-DD"),
    date_end: dayjs(selectedRows[0].date_end).format("YYYY-MM-DD"),
    date_calc: dayjs(selectedRows[0].date_calc).format("YYYY-MM-DD"),
    date_accrual: dayjs(selectedRows[0].date_accrual).format("YYYY-MM-DD"),
    sum_calc: selectedRows[0].sum_calc,
    sum_bonus: selectedRows[0].sum_bonus,
    sum_approved: selectedRows[0].sum_bonus,
  };

  try {
    const response = await GRAPHICC.updateGraphic(data);
    console.log("Статус графика успешно обновлен :", response);
    await store.getGraphicsFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при обновлении статуса грфика:", error);
  }
};

//утверждение графика
const ApproveGraphic = async () => {
  const selectedRows = store.multipleSelectionGraphic
  console.log("selectedRows статус", selectedRows)
  const data = {
    graph_id: selectedRows[0].graph_id,
    ku: selectedRows[0].ku,
    status: "Утверждено",
    entity: selectedRows[0].entity,
    entity_name: selectedRows[0].entity_name,
    customer_name: selectedRows[0].customer_name,
    customer: selectedRows[0].customer,
    period: selectedRows[0].period,
    date_start: dayjs(selectedRows[0].date_start).format("YYYY-MM-DD"),
    date_end: dayjs(selectedRows[0].date_end).format("YYYY-MM-DD"),
    date_calc: dayjs(selectedRows[0].date_calc).format("YYYY-MM-DD"),
    date_accrual: dayjs(selectedRows[0].date_accrual).format("YYYY-MM-DD"),
    sum_calc: selectedRows[0].sum_calc,
    sum_bonus: selectedRows[0].sum_bonus,
    sum_approved: selectedRows[0].sum_approved,
  };

  try {
    const response = await GRAPHICC.updateGraphic(data);
    console.log("Статус графика успешно обновлен :", response);
    await store.getGraphicsFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при обновлении статуса грфика:", error);
  }
};




//удаление графиков
const deleteGraphic = async () => {
  try {
    await ElMessageBox.confirm(
      'Вы действительно хотите удалить график расчета без возможности восстановления?',
      'Подтверждение удаления',
      {
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
        type: 'warning',
      }
    );
  const selectedRows = store.multipleSelectionGraphic.map((row) => row.graph_id);
  try {
    for (const graph_id of selectedRows) {
      const results = await GRAPHICC.deleteGraphic({ graph_id });
      console.log("успешно удалилось", results);
      if (selectedRows.length === 1) {
        ElMessage.success(`График расчета ${selectedRows} успешно удален`);
      } else {
        ElMessage.success(`Успешно удалены графики №: ${selectedRows.join(", ")}`);
      }
    }
  } catch (error) {
    console.error("Ошибка при удалении строк:", error);
    ElMessage.error("Ошибка при удалении графика");
  } finally {
    store.dataGraphic = store.dataGraphic.filter(
      (row) => !selectedRows.includes(row.graph_id)
    );
    store.multipleSelectionGraphic = [];
  }
} catch {
    ElMessage({
      type: 'info',
      message: 'Удаление отменено'
    });
  }
}
const isButtonsDisabled = computed(() => {
  return store.multipleSelectionGraphic.length > 1 || store.multipleSelectionGraphic.length === 0;
});
const isDeleteButtonDisabled = computed(() => {
  return store.multipleSelectionGraphic.length === 0;
});
const disableButtonTooltip = computed(() => {
  return store.multipleSelectionGraphic.length > 1 || store.multipleSelectionGraphic.length === 0 ? 'Кнопка заблокирована. Для доступа выберите только один график' : '';
});
const disableButtonDeleteTooltip = computed(() => {
  return store.multipleSelectionGraphic.length === 0 ? 'Кнопка заблокирована. Для доступа выберите график/и' : '';
});

const isButtonsDisabledAct = computed(() => {
  return store.multipleSelectionGraphic.length > 1 || store.multipleSelectionGraphic.length === 0 || store.multipleSelectionGraphic[0].status!=="Утверждено";
});


</script>

<style scoped></style>
