<template></template>

<script lang="ts" setup>
import { useProviderTableStore } from "~~/stores/providerTableStore";

const initializeTableData = () => {
  if (useProviderTableStore().tableData.length === 0) {
    useProviderTableStore().tableData.push({
      id: 1,
      score: 4325,
      name: "Mikki",
      nameEntity: "Jerry",
    });
    useProviderTableStore().tableData.push({
      id: 2,
      score: 345345,
      name: "Minni",
      nameEntity: "Tom",
    });
  }
};

initializeTableData();
</script>
