<template>
  <EntitiesProductBar />
<div class="product">
  <EntitiesProductProductsTable />
  <EntitiesProductTree/>
  
</div>
</template>

<script lang="ts" setup></script>

<style>
.product {
  display: flex;
  height: calc(100vh - 160px);
  margin: 10px 10px 0 0;
  /* justify-content: space-between; */
}
</style>
