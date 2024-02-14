<template>
  <EntitiesProductBar />
<div class="product">
  <EntitiesProductTree/>
  <EntitiesProductProductsTable />
</div>
</template>

<script lang="ts" setup></script>

<style>
.product {
  display: flex;
  height: calc(100vh - 160px);
  margin: 10px 10px 0 0;
}
</style>
