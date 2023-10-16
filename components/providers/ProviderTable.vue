<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="dialogFormVisible = true"> Добавить </el-button>
      <el-button @click="storeProvider.deleteSelectedRows()">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input
        v-model="storeProvider.search"
        placeholder="Поиск"
        style="width: 200px"
        :prefix-icon="Search"
      />
    </div>
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="Новый поставщик"
    close-on-click-modal
    close-on-press-escape
  >
    <el-form>
      <el-form-item label="Счет:" :label-width="formLabelWidth">
        <el-input
          v-model="newScore"
          placeholder="Введите счет"
          style="width: 200px"
          clearable
        />
      </el-form-item>
      <el-form-item label="Поставщик:" :label-width="formLabelWidth">
        <el-input
          v-model="newName"
          label="Наименование"
          placeholder="Введите наименование"
          style="width: 200px"
          clearable
        />
      </el-form-item>
      <el-form-item label="Юридическое лицо:" :label-width="formLabelWidth">
        <el-select
          v-model="EntityName"
          clearable
          placeholder="Выберите юр. лицо"
        >
          <el-option
            v-for="item in options"
            :key="item.EntityName"
            :label="item.label"
            :value="item.EntityName"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Отмена</el-button>
        <el-button @click="save()"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>

  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      ref="multipleTableRef"
      :data="storeProvider.searchTableData"
      style="width: 100%"
      @selection-change="storeProvider.handleSelectionChange"
      height="400"
    >
      <el-table-column
        property="selection"
        type="selection"
        width="55"
        show-overflow-tooltip
      />
      <el-table-column type="index" width="55" show-overflow-tooltip />
      <el-table-column
        property="score"
        label="Счет"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        property="name"
        label="Наименование"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="nameEntity"
        label="Юридическое лицо"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useEntityTableStore } from "~~/stores/entityTableStore";
import { useProviderTableStore } from "~~/stores/providerTableStore";

const storeEntity = useEntityTableStore();
const storeProvider = useProviderTableStore();

const dialogFormVisible = ref(false);
const formLabelWidth = "200px";
const options = ref<{ EntityName: string; label: string }[]>([]);
const newName = ref<string>("");
const newScore = ref<number | null>(null);
const EntityName = ref<string>("");

const messageClose = () => {
  ElMessage({
    message: "Поставщик '" + newName.value + "' успешно добавлен",
    type: "success",
  });
};
const updateOptions = () => {
  options.value = storeEntity.tableData.map((entity) => ({
    EntityName: entity.name,
    label: entity.name,
  }));
};

const save = () => {
  storeProvider.addRows({
    id: storeProvider.tableData.length + 1,
    score: newScore.value,
    name: newName.value,
    nameEntity: EntityName.value,
  });
  dialogFormVisible.value = false;
  messageClose();
  newName.value = "";
  EntityName.value = "";
  newScore.value = null;
};

updateOptions();
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
