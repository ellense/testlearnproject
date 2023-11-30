<template></template>

<script lang="ts" setup>
import { useProfileStore } from "~~/stores/profileStore";

const initializeTableData = () => {
  if (useProfileStore().data.length === 0) {
    useProfileStore().data.push({
      id: 1,
      last_name: "Иванова",
      first_name: "Анна",
      middle_name: "Владимировна",
      email: "john.doe@example.com",
    });
  }
};

initializeTableData();
</script>
