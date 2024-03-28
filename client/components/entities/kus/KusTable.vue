<template>
  <div class="scrollTable">
    <el-table :data="tableData" style="width: 100%" @selection-change="useKuStore().handleSelectionChange"
      height="calc(100vh - 130px)" @row-dblclick="row => rowDblclick(row.ku_id)" v-loading="loading" stripe
      :border="true" @sort-change="handleSortChange" >
      <el-table-column type="selection" width="30" fixed />
      <el-table-column property="ku_id" label="Код КУ" width="100" fixed sortable show-overflow-tooltip />
      <el-table-column property="contract" label="Контракт" width="200" fixed show-overflow-tooltip />
      <el-table-column property="description" label="Описание" width="250" show-overflow-tooltip />

      <el-table-column label="Юридическое лицо">
        <template #header>
          <div class="column-header" :style="{ color: LegalEntity.length > 0 ? '#409EFF' : 'inherit' }">
            Юридическое лицо
            <el-popover placement="bottom" :width="325" trigger="click">
              <template #reference>
                <el-button style="background-color: transparent; border:none; padding: 10px"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-select v-model="LegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
                :max-collapse-tags="3" placeholder="Фильтр по юр. лицу" style="width: 300px" @change="changeLegalEntity"
                size="small">
                <el-option v-for="item in optionsLegalEntity" :key="item" :label="item" :value="item" />
              </el-select>
            </el-popover>
          </div>
        </template>
        <el-table-column property="entity_id" label="Код" width="90" sortable show-overflow-tooltip />
        <el-table-column property="entity_name" label="Наименование" width="170" sortable show-overflow-tooltip />
      </el-table-column>
      <el-table-column label="Поставщик">
        <template #header>
          <div class="column-header" :style="{ color: Vendor.length > 0 ? '#409EFF' : 'inherit' }">
            Поставщик
            <el-popover placement="bottom" :width="325" trigger="click">
              <template #reference>
                <el-button style="background-color: transparent; border:none; padding: 10px"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-select-v2 v-model="Vendor" multiple clearable filterable collapse-tags collapse-tags-tooltip
                :max-collapse-tags="3" :options="optionsVendor" style="width: 300px" placeholder="Фильтр по поставщику"
                @change="onVendorChange" size="small">
                <template #default="{ item }" class="selectVendorInKuAdd">
                  <span style="margin-right: 8px">{{ item.label }}</span>
                </template>
              </el-select-v2>
            </el-popover>
          </div>
        </template>
        <el-table-column property="vendor_id" label="Код" width="140" sortable show-overflow-tooltip />
        <el-table-column property="vendor_name" label="Наименование" width="250" show-overflow-tooltip />
      </el-table-column>
      <el-table-column>
        <template #header>
          <div class="column-header" :style="{ color: dateRange ? '#409EFF' : 'inherit' }">
            Начальная дата
            <el-popover placement="bottom" :width="400" :visible="popoverVisible">
              <template #reference>
                <el-button style="background-color: transparent; border:none; padding: 10px" @click="popoverVisible = !popoverVisible"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-date-picker v-model="dateRange" type="daterange" format="DD.MM.YYYY" start-placeholder="Начало"
                end-placeholder="Окончание"  size="small" @change="changeDateRange" />
            </el-popover>
          </div>
        </template>
        <el-table-column property="date_start" type="date" sortable width="90" show-overflow-tooltip />
      </el-table-column>
      <el-table-column >
        <template #header>
          <div class="column-header" :style="{ color: dateRange2 ? '#409EFF' : 'inherit' }">
            Конечная дата
            <el-popover placement="bottom" :width="400" :visible="popoverVisible2" >
              <template #reference>
                <el-button style="background-color: transparent; border:none; padding: 10px" @click="popoverVisible2 = !popoverVisible2"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-date-picker v-model="dateRange2" type="daterange" format="DD.MM.YYYY" start-placeholder="Начало"
                end-placeholder="Окончание" :clearable="true" size="small" @change="changeDateRange2" />
            </el-popover>
          </div>
        </template>
        <el-table-column property="date_end" type="date" sortable width="90" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="graph_exists" label="График расчета" width="100" align="center" fixed="right">
        <template #header>
          <div class="column-header" :style="{ color: Graph.length > 0 ? '#409EFF' : 'inherit' }">
            График
            <el-popover placement="bottom-end" :width="175" trigger="click">
              <template #reference>
                <el-button style="background-color: transparent; border:none; padding: 10px"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-select-v2 v-model="Graph" multiple clearable filterable collapse-tags collapse-tags-tooltip
                :max-collapse-tags="2" :options="optionsGraph" style="width: 150px" placeholder="Фильтр по графику"
                @change="onGraphChange" size="small">
                <template #default="{ item }" class="selectVendorInKuAdd">
                  <span style="margin-right: 8px">{{ item.label }}</span>
                </template>
              </el-select-v2>            
            </el-popover>
          </div>
        </template>
        <template #default="scope4">
          <el-icon v-if="scope4.row.graph_exists" name="check"><Select /></el-icon>
          <el-icon v-else name="close">
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Статус" fixed="right">
        <template #header>
          <div class="column-header" :style="{ color: Status.length > 0 ? '#409EFF' : 'inherit' }">
            Статус
            <el-popover placement="bottom-end" :width="325" trigger="click" >
              <template #reference hide-on-click="false">
                <el-button style="background-color: transparent; border:none; padding: 10px"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-select-v2 v-model="Status" multiple clearable filterable collapse-tags collapse-tags-tooltip
                :max-collapse-tags="2" :options="optionsStatus" style="width: 300px" placeholder="Фильтр по статусу КУ"
                 size="small" @change="onStatusChange">
                <template #default="{ item }" class="selectVendorInKuAdd">
                  <span style="margin-right: 8px">{{ item.label }}</span>
                </template>
              </el-select-v2>             
            </el-popover>
          </div>
        </template>
        <template #default="scope3">
          <span :style="{ color: getStatusColor(scope3.row.status) }">{{ scope3.row.status }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div v-if="pagination?.count" class="pagination">
    <el-pagination v-model:pageSize="pageSize" small :page-sizes="[50, 100, 300, 500]"
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
      @size-change="handleSizeChange" @current-change="paginationChange" size="small" />
  </div>
  <!-- <div class="cell">
    Код КУ
    <span class="caret-wrapper">
      <i class="sort-caret ascending"></i>
      <i class="sort-caret descending"></i>
    </span>
  </div> -->
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from "pinia";
import { Select, SemiSelect, Filter } from '@element-plus/icons-vue'
import { ref, onMounted, watch } from "vue";
import type { IEntityIdAndName, IKuList, IVendorId } from "~/utils/types/directoryTypes";
import { useKuStore } from "~~/stores/kuStore";
import { useKuIdStore } from "~~/stores/kuIdStore";
import { useKuAddStore } from "~~/stores/kuAddStore";
import dayjs from 'dayjs';
const { getKu, pagination, countRowTable } = storeToRefs(
  useKuStore()
);
const storeKuAdd = useKuAddStore();
const visible = ref(false)
const tableData = ref<IKuList[]>(getKu.value);

const loading = ref()

//открывание и редактитрование ку
const rowDblclick = async (kuId: string) => {
  const router = useRouter();
  useKuIdStore().getKuDetailFromApi(kuId)
  // useKuIdStore().getKuRequirementDetailFromApi(kuId)
  useKuIdStore().fetchBonusForKuId(kuId)
  useKuIdStore().fetchExInvoiceForKuId(kuId)

  router.push({ path: `/ku/${kuId}` });
};

//пагинация
const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useKuStore().setCountRowTable(val);
  try {
    await useKuStore().getKuFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных ку1", error);
  }
};
const paginationChange = (page: number) => {
  try {
    useKuStore().setFilterValue('page', page);
    useKuStore().getKuFromAPIWithFilter(page);
  } catch (error) {
    console.error("Ошибка при загрузке данных ку2", error);
  }
};

//монтирование и отслеживание таблицы
watch(getKu, (value) => {
  tableData.value = value || [];
});


const handleSortChange = async ({ prop, order }: { prop: string, order: string }) => {
  try {
    const sortField = prop; // поле, по которому сортируем
    const sortOrder = order === 'ascending' ? 'asc' : 'desc'; // порядок сортировки
    console.log("(поле, порядок) = (", sortField, ",", sortOrder, ")");
    await useKuStore().getKuFromAPIWithFilter(undefined, sortField, sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

onMounted(async () => {
  try {
    loading.value = true;
    await useKuStore().getKuFromAPIWithFilter();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Ошибка при загрузке данных ку3", error);
  }
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Действует':
      return '#55940e';
    case 'Создано':
      return '#117ba5';
    case 'Закрыто':
      return '#3a3838';
    case 'Отменено':
      return '#f7745c';
    default:
      return '#000';
  }
}

//для общей фильтрации
const { legalEntity } = storeToRefs(useKuStore());
const { filterKuValue } = storeToRefs(useKuStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);
watch(triggerFilter, () => {
  useKuStore().getKuFromAPIWithFilter();
});

//фильтр юр лица
const LegalEntity = ref<string[]>(filterKuValue.value.entity_id || []);
const optionsLegalEntity = ref<string[]>(legalEntity.value);
const changeLegalEntity = () => {
  useKuStore().pagination = null;
  useKuStore().setFilterValue('entity_id', LegalEntity.value);
  console.log('shopLegalEntity.value:', LegalEntity.value);
  toggleTriggerFilter();
};
watch(legalEntity, (value) => {
  optionsLegalEntity.value = value;
});

//фильтр поставщика
const Vendor = ref<string[]>(filterKuValue.value.vendor_id || []);
const optionsVendor = ref<Array<{ label: string; value: string }>>([]);
watch(() => storeKuAdd.dataVendorId, (vendors: IVendorId[]) => {
  optionsVendor.value = vendors.map(item => ({ label: item.vendor_id, value: item.vendor_id }));
});
onMounted(async () => {
  try {
    await storeKuAdd.fetchAllVendorIdForEntity();
  } catch (error) {
    console.error("Ошибка при загрузке данных поставщика", error);
  }
});
const onVendorChange = async () => {
  useKuStore().setFilterValue('vendor_id', Vendor.value);
  toggleTriggerFilter();
};

//фильтр по статусу
const Status = ref<string[]>(filterKuValue.value.status || []);
const optionsStatus = ref<Array<{ label: string; value: string }>>([
  { label: 'Действует', value: 'Действует' },
  { label: 'Создано', value: 'Создано' },
  { label: 'Закрыто', value: 'Закрыто' },
  { label: 'Отменено', value: 'Отменено' }
]);
const onStatusChange = async () => {
  useKuStore().setFilterValue('status', Status.value);
  toggleTriggerFilter();
};

//фильтр по графику
const Graph = ref<string[]>(filterKuValue.value.graph_exists || []);
const optionsGraph = ref<Array<{ label: string; value: string }>>([
  { label: 'Есть', value: 'True' },
  { label: 'Нет', value: 'False' },
]);
const onGraphChange = async () => {
  useKuStore().setFilterValue('graph_exists', Graph.value);
  toggleTriggerFilter();
};

//для фильтрации по начальной и конечной дате
const popoverVisible = ref(false);
const popoverVisible2 = ref(false);
const togglePopover = () => {
  popoverVisible.value = !popoverVisible.value;
};
const togglePopover2 = () => {
  popoverVisible2.value = !popoverVisible2.value;
};
const closePopover = () => {
  popoverVisible.value = false;
};

const closePopover2 = () => {
  popoverVisible2.value = false;
};
const dateRange = ref()
const dateRange2 = ref()
const formatDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');// Функция для форматирования даты в формат "YYYY-MM-DD"

const changeDateRange = (newDateRange: Date[]) => {
  if (newDateRange && Array.isArray(newDateRange) && newDateRange.length === 2) {
    const [startDate, endDate] = newDateRange;
    if (!startDate || !endDate) {
      // Если даты не выбраны (то есть сброшены), сбрасываем фильтр
      useKuStore().removeFilterValue('date_start_s');
      useKuStore().removeFilterValue('date_start_e');
    } else {
      // Иначе, форматируем даты и устанавливаем их в фильтр
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      useKuStore().setFilterValue('date_start_s', startFormatted);
      useKuStore().setFilterValue('date_start_e', endFormatted);
    }
    toggleTriggerFilter();
    closePopover()
  } else {
    // Если даты не выбраны, сбрасываем фильтр
    useKuStore().removeFilterValue('date_start_s');
    useKuStore().removeFilterValue('date_start_e');
    toggleTriggerFilter();
    closePopover()
  }
};

const changeDateRange2 = (newDateRange: Date[]) => {
  if (newDateRange && Array.isArray(newDateRange) && newDateRange.length === 2) {
    const [startDate, endDate] = newDateRange;
    if (!startDate || !endDate) {
      useKuStore().removeFilterValue('date_end_s');
      useKuStore().removeFilterValue('date_end_e');
    } else {
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      useKuStore().setFilterValue('date_end_s', startFormatted);
      useKuStore().setFilterValue('date_end_e', endFormatted);
    }
    toggleTriggerFilter();
    closePopover2()
  } else {
    useKuStore().removeFilterValue('date_end_s');
    useKuStore().removeFilterValue('date_end_e');
    toggleTriggerFilter();
    closePopover2()
  }
};


</script>
<style scoped>
/* .column-header {
  display: flex;
  align-items: center;
}

.column-header .el-button {
  margin-left: 5px;
} */
</style>