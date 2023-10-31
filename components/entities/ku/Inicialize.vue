<template></template>

<script lang="ts" setup>
import { useKuTableStore } from "~~/stores/kuTableStore";

const initializeTableData = () => {
  if (useKuTableStore().tableData.length === 0) {
    // две сущности при инициализации стора
    useKuTableStore().tableData.push({
      id: 1,
      kuNumber: "КУ00001",
      percent: 10,
      provider: "Mikki",
      type: "Месяц",
      dateStart: "21.06.2023",
      dateEnd: "21.06.2029",
      dateActual: "21.04.2024",
      base: 234534,
    });
    useKuTableStore().tableData.push({
      id: 2,
      kuNumber: "КУ00002",
      percent: 15,
      provider: "Mikki",
      type: "Квартал",
      dateStart: "15.09.2023",
      dateEnd: "15.09.2027",
      dateActual: "15.09.2024",
      base: 242424,
    });
    useKuTableStore().tableData.push({
      id: 3,
      kuNumber: "КУ00003",
      percent: 8,
      provider: "Minni",
      type: "Полгода",
      dateStart: "10.07.2023",
      dateEnd: "10.07.2030",
      dateActual: "10.07.2025",
      base: 389030,
    });
    useKuTableStore().tableData.push({
      id: 4,
      kuNumber: "КУ00004",
      percent: 3,
      provider: "Minni",
      type: "Год",
      dateStart: "05.11.2023",
      dateEnd: "05.11.2030",
      dateActual: "05.11.2026",
      base: 49324,
    });
  }
};
initializeTableData();
</script>
