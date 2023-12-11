
  <template>
  <el-scrollbar class="scrollTable">
    <el-table
      style="width: 100%"
      @selection-change="entityStore.handleSelectionChange"
      height="calc(100vh - 160px)"
      :data="entityList"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="entityid" label="ID" width="70" show-overflow-tooltip />
      <el-table-column prop="name" label="Наименование"  width="250" show-overflow-tooltip />
      <el-table-column prop="urasticname" label="Полное наименование" width="400" show-overflow-tooltip />
      <el-table-column prop="directorname" label="Директор"  width="400" show-overflow-tooltip />
      <el-table-column prop="urasticaddress" label="Адрес"  show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
</template>


<script setup lang="ts">
import { useEntityTableStore } from '@/stores/entityTableStore';

const entityStore = useEntityTableStore();
const entityList = ref(entityStore.getEntityList);

onMounted(async () => {
  try {
    await entityStore.fetchEntitiesList({ /* Ваши параметры запроса */ });
    // Обновление entityList не требуется, так как watchEffect следит за изменениями в сторе
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>

<style scoped>

</style>
