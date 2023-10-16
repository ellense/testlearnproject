<template>

</template>

<script  lang="ts" setup>
import { useEntityTableStore } from "~~/stores/entityTableStore";

 const initializeTableData = () => {
      if (useEntityTableStore().tableData.length === 0) {
        useEntityTableStore().tableData.push({ name: "Tom", id: 1 });
        useEntityTableStore().tableData.push({ name: "Jerry", id: 2 });
      }
    };

initializeTableData();
</script>