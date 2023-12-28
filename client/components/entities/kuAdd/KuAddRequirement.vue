<template>
  <el-scrollbar class="scrollTable">
    <el-table style="width: 100%" height="calc(100vh - 700px)">
      <el-table-column
        property="number"
        label="Тип номенклатуры"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        property="Товар"
        label="Товар"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="Категория"
        label="Категория"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="Производитель"
        label="Производитель"
        show-overflow-tooltip
      />
      <el-table-column
        property="Торговая марка"
        label="Торговая марка"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>
</template>
<script lang="ts" setup>
</script>
