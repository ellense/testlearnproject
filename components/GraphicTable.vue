<template>
  <div class="toolbarAdd"></div>
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table style="width: 100%" height="400" border>
      <el-table-column property="id" label="Koд КУ" show-overflow-tooltip />
      <el-table-column
        property="nameProvider"
        label="Поставщик"
        show-overflow-tooltip
      />
      <el-table-column
        property="type"
        label="Тип графика"
        show-overflow-tooltip
      />
      <el-table-column
        property="dateStart"
        label="Начальная дата"
        width="140"
        show-overflow-tooltip
      />
      <el-table-column
        property="dateEnd"
        label="Конечная дата"
        show-overflow-tooltip
      />
      <el-table-column
        property="dateCalc"
        label="Дата расчета"
        show-overflow-tooltip
      />
      <el-table-column property="base" label="База" show-overflow-tooltip />
      <el-table-column
        property="precent"
        label="Процент"
        show-overflow-tooltip
      />
      <el-table-column
        property="calculated"
        label="Рассчитано"
        show-overflow-tooltip
      />
      <el-table-column
        property="approved"
        label="Утверждено"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>
</template>
