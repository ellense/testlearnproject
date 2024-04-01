<template>
    <div>
        <el-button size="small" round @click="">Добавить</el-button>
        <el-button size="small" type="primary" round plain @click="">Cформировать поле контакт</el-button>
    </div>
    <el-scrollbar class="scrollTableRequirement">
        <el-table style="width: 100%; min-height:100px; height:26vh" height="26vh" :data="tableData" border
            empty-text="">
            <el-table-column  label="Производитель"  show-overflow-tooltip>
                <el-table-column property="item_type" label="Код" width="150" show-overflow-tooltip />
                <el-table-column property="item_code" label="наименование" width="300" />
            </el-table-column>
            <el-table-column  label="Торговая марка"  show-overflow-tooltip>
                <el-table-column property="item_type" label="Код" width="150" show-overflow-tooltip />
                <el-table-column property="item_code" label="наименование" width="300" />
            </el-table-column>
            <el-table-column prop="fix" label="Использовать производителя" width="100" align="center">
        <template #default="{ row }">
          <el-checkbox v-model="row.fix" @change="onFixChange(row)"></el-checkbox>
        </template>
      </el-table-column>
            <el-table-column property="item_name" label="Наименование" width="300" show-overflow-tooltip />
            <el-table-column property="producer" label="Производитель" width="300" show-overflow-tooltip />
            <el-table-column property="brand" label="Торговая марка" width="300" show-overflow-tooltip />
            <el-table-column fixed="right" label="Операция">
                <template #default="scope">
                    <el-button text type="danger" :icon="Delete" size="small" @click.prevent="deleteRow(scope.$index)"
                        style="width: 125px; height: 100%;">Удалить</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Delete } from '@element-plus/icons-vue'
import { useKuAddStore } from "~~/stores/kuAddStore";

const store = useKuAddStore();
const tableData = ref(store.tableDataContract);
//удаление строк
const deleteRow = (index: number) => {
    store.tableDataContract.splice(index, 1);
}
</script>