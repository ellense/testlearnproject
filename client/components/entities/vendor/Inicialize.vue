<template></template>

<script lang="ts" setup>
import { useVendorTableStore } from "~~/stores/providerTableStore";

const initializeTableData = () => {
  if (useVendorTableStore().tableData.length === 0) {
    useVendorTableStore().tableData.push({
      id: 1,
      score: 4325,
      name: "Mikki",
      nameEntity: "Jerry",
    });
    useVendorTableStore().tableData.push({
      id: 2,
      score: 345345,
      name: "Minni",
      nameEntity: "Tom",
    });
  }
};

initializeTableData();
</script>
