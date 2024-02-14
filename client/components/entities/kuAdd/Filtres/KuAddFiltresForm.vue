 <template>

  <el-dialog v-model="useKuStore().dialogFormCategoryVisible"  width="70%" title="Выбор категории, производителя и торговой марки для КУ" close-on-click-modal
    close-on-press-escape draggable>
    <div class="containerFilter">
    <EntitiesKuAddFiltresClassificator/>
    <EntitiesKuAddFiltresProducer/>
    <EntitiesKuAddFiltresBrand/>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="useKuStore().dialogFormCategoryVisible = false">Отмена</el-button>
        <el-button @click="AddCategoryItem()">Сохранить</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">

import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import type { IProduct } from "~/utils/types/directoryTypes";
import { useKuStore } from "~~/stores/kuStore";
import { ElTable } from 'element-plus'

//добавление условий
const AddCategoryItem = () => {
  // const selectedRows = useKuStore().valueCategory;


    useKuStore().tableDataRequirement.push({
      type_item: "Категория",
      item_id: useKuStore().valueCategory_id,
      item_name: useKuStore().valueCategory_name,
      producer: "",
      brand: "",
    });

//   toggleSelection()
useKuStore().dialogFormCategoryVisible = false;
};

</script>

<style scoped>
.containerFilter{
display: flex;
}

</style>
