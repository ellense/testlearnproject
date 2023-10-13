<template>

</template>

<script  lang="ts" setup>
import { useProductTableStore } from "~~/stores/productTableStore";

const initializeTableData = () => {
      if (useProductTableStore().tableData.length === 0) {
        useProductTableStore().tableData.push({
          id: 1,
          name: "Футболка жен.",
          nameProvider: "Mikki",
          category: "Женская одежда",
        });
        useProductTableStore().tableData.push({
          id: 2,
          name: "Набор тарелок",
          nameProvider: "Minni",
          category: "Посуда",
        });
      }
    };

initializeTableData();
</script>