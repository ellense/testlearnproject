<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <div class="toolbarAdd">
      <el-input
        v-model="store.newPercent"
        placeholder="Введите процент"
        style="width: 200px"
      ></el-input>
      <el-select
        v-model="store.providerName"
        clearable
        placeholder="Выберите поставщика"
      >
        <el-option
          v-for="item in options"
          :key="item.providerName"
          :label="item.label"
          :value="item.providerName"
        />
      </el-select>
      <el-select v-model="store.newType" placeholder="Выберите тип графика">
      <el-option label="Месяц" value="Месяц"></el-option>
      <el-option label="Квартал" value="Квартал"></el-option>
      <el-option label="Полгода" value="Полгода"></el-option>
    </el-select>
      <el-button @click="addItemAndNavigate()">Добавить элемент</el-button>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElInput } from "element-plus";
import { useKuTableStore } from "~~/stores/kuTableStore";
import { useProviderTableStore } from "~~/stores/providerTableStore";
import { useRouter } from "vue-router";

const providerStore = useProviderTableStore();
const store = useKuTableStore();
const router = useRouter();
const options = ref<{ providerName: string; label: string }[]>([]);

const addItemAndNavigate = () => {
  store.addItem();
  // После выполнения действия, перейдите на другую страницу
  router.push("/");
};
store.initializeTableData();

const updateOptions = () => {
  options.value = providerStore.tableData.map((provider) => ({
    providerName: provider.name,
    label: provider.name,
  }));
};
updateOptions();
</script>
