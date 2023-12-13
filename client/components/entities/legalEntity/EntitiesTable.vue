  <template>
  <el-scrollbar class="scrollTable">
    <el-table
      style="width: 100%"
      height="calc(100vh - 130px)"
      :data="filteredEntityList"
    >
      <el-table-column prop="entityid" label="ID" width="70" show-overflow-tooltip />
      <el-table-column prop="name" label="Наименование"  width="250" show-overflow-tooltip />
      <el-table-column prop="urasticname" label="Полное наименование" width="400" show-overflow-tooltip />
      <el-table-column prop="directorname" label="Директор"  width="400" show-overflow-tooltip />
      <el-table-column prop="urasticaddress" label="Адрес"  show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
</template>


<script setup lang="ts">
import { ref,  onMounted, watch } from 'vue';
import { useEntityTableStore } from '@/stores/entityTableStore';

const entityStore = useEntityTableStore();
const filteredEntityList = ref(entityStore.searchEntityList);

// Обновляем filteredEntityList при изменении searchEntityList
watch(() => entityStore.searchEntityList, () => {
  filteredEntityList.value = entityStore.searchEntityList;
});

onMounted(async () => {
  try {
    await entityStore.fetchEntitiesList({ 
      entityid: '',
      directorname: '',
      urasticname: '',
      name: '',
      urasticaddress: '', });
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>

<style scoped>

</style>
