<template>
  <div class="scrollTable">
    <el-table :data="tableData" style="width: 100%" @selection-change="store.handleSelectionChange"
      height="calc(100vh - 130px)" @row-dblclick="row => rowDblclick(row.ku_id)" v-loading="loading" stripe
      :border="true" @sort-change="handleSortChange">
      <el-table-column type="selection" width="30" fixed />
      <el-table-column prop="ku_id" label="Код КУ" width="100" fixed sortable show-overflow-tooltip />
      <el-table-column prop="contract" label="Контракт" width="200" fixed show-overflow-tooltip />
      <el-table-column label="Юридическое лицо" align="center">
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
                :max-collapse-tags="2" placeholder="Фильтр по юр. лицу" style="width: 300px" @change="changeLegalEntity"
                size="small">
                <el-option v-for="item in optionsLegalEntity" :key="item.value" :label="item.label" :value="item.value">
                  <span style="float: left">{{ item.label }}</span>
                  <span style="
                    margin-left: 10px;
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  ">{{ item.value }}</span>
                </el-option>
              </el-select>
            </el-popover>
          </div>
        </template>
        <el-table-column prop="entity_id" label="Код" width="90" sortable show-overflow-tooltip />
        <el-table-column prop="entity_name" label="Наименование" width="200" sortable show-overflow-tooltip />
      </el-table-column>
      <el-table-column label="Клиент" align="center">
        <template #header>
          <div class="column-header" :style="{ color: Vendor.length > 0 ? '#409EFF' : 'inherit' }">
            Клиент
            <el-popover placement="bottom" :width="325" trigger="click">
              <template #reference>
                <el-button style="background-color: transparent; border:none; padding: 10px"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-select-v2 v-model="Vendor" multiple clearable filterable collapse-tags collapse-tags-tooltip
                :max-collapse-tags="2" :options="optionsVendor" popper-class="vendorPopper" style="width: 300px"
                placeholder="Фильтр по клиенту" @change="onVendorChange" size="small">
                <template #default="{ item }" class="selectVendorInKuAdd">
                  <span style="margin-right: 8px">{{ item.label }}</span>
                  <span style="
                    margin-left: 10px;
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  ">{{ item.value }}</span>

                </template>
              </el-select-v2>
            </el-popover>
          </div>
        </template>
        <el-table-column prop="vendor_id" label="Код" width="140" sortable show-overflow-tooltip />
        <el-table-column prop="vendor_name" label="Наименование" width="250" show-overflow-tooltip />
      </el-table-column>
      <el-table-column>
        <template #header>
          <div class="column-header" :style="{ color: dateRange ? '#409EFF' : 'inherit' }">
            Начальная дата
            <el-popover placement="bottom" :width="400" :visible="popoverVisible">
              <template #reference>
                <el-button style="background-color: transparent; border:none; padding: 10px"
                  @click="popoverVisible = !popoverVisible"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-date-picker v-model="dateRange" type="daterange" format="DD.MM.YYYY" start-placeholder="Начало"
                end-placeholder="Окончание" size="small" @change="changeDateRange" />
            </el-popover>
          </div>
        </template>
        <el-table-column property="date_start" type="date" sortable width="90" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ formatOkDate(row.date_start) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div class="column-header" :style="{ color: dateRange2 ? '#409EFF' : 'inherit' }">
            Конечная дата
            <el-popover placement="bottom" :width="400" :visible="popoverVisible2">
              <template #reference>
                <el-button style="background-color: transparent; border:none; padding: 10px"
                  @click="popoverVisible2 = !popoverVisible2"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-date-picker v-model="dateRange2" type="daterange" format="DD.MM.YYYY" start-placeholder="Начало"
                end-placeholder="Окончание" :clearable="true" size="small" @change="changeDateRange2" />
            </el-popover>
          </div>
        </template>
        <el-table-column property="date_end" type="date" sortable width="90" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ formatOkDate(row.date_end) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="" label="Сумма выплат" width="150" show-overflow-tooltip />
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
            <el-popover placement="bottom-end" :width="325" trigger="click">
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
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next, total "
      @size-change="handleSizeChange" @current-change="paginationChange"  :total="pagination.count" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { Select, Filter } from '@element-plus/icons-vue'
import { ref, onMounted, watch } from "vue";
import { useKuCStore } from "~~/stores/kuCStore";
import { useKuIdStore } from "~~/stores/kuIdStore";
import { useKuAddStore } from "~~/stores/kuAddStore";
import dayjs from 'dayjs';
import type { IEntityInKu } from "~/utils/types/entityTypes";
import type { IKuCList } from "~/utils/types/kuCustomerTypes";
import type { IVendorIdAndName } from "~/utils/types/vendorTypes";
const { getKu, pagination, countRowTable } = storeToRefs(
  useKuCStore()
);
const store = useKuCStore();
const storeKuAdd = useKuAddStore();
const visible = ref(false)
const tableData = ref<IKuCList[]>(getKu.value);

const loading = ref()

//открывание и редактитрование ку
const rowDblclick = async (kuId: string) => {
  const router = useRouter();
  await useKuIdStore().getKuDetailFromApi(kuId)
  await useKuIdStore().fetchInRequirementForKuId(kuId)
  router.push({ path: `/kuV/${kuId}` });
  useKuIdStore().fetchExRequirementForKuId(kuId)
  useKuIdStore().fetchBonusForKuId(kuId)
  useKuIdStore().fetchExInvoiceForKuId(kuId)
  useKuIdStore().fetchOfficialForKuId(kuId)

  console.log("СТАТУС", useKuIdStore().kuIdStatus)
  console.log("КЛИЕНТ", useKuIdStore().kuIdVendorId)

  if (useKuIdStore().kuIdStatus === "Создано") {
    const entity = storeKuAdd.dataEntity.find(item => item.entity_id === useKuIdStore().kuIdEntityId);
  if (entity) {
    if (entity.merge_id) {
      useKuIdStore().kuIdSubsidiaries = true;
      console.log(`merge_id для выбранного юр. лица: ${entity.merge_id}`);
      useKuIdStore().disableSubsidiaries = false;
    } else {
      console.log('У выбранного юр. лица отсутствует merge_id');
      useKuIdStore().disableSubsidiaries = true;
    }
  } else {
    console.log('Выбранное юр. лицо не найдено в данных');
  }
    if (useKuIdStore().kuIdVendorId && useKuIdStore().kuIdVendorId.length > 0) {
      storeKuAdd.setFilterVendor('vendor_id', useKuIdStore().kuIdVendorId);
      storeKuAdd.getVendorNameFromAPIWithFilter()
      try {
        storeKuAdd.setFilterVendor("entity_id", useKuIdStore().kuIdEntityId)
        storeKuAdd.setFilterBrand("vendor_id", useKuIdStore().kuIdVendorId)
        storeKuAdd.setFilterCategory("vendor_id", useKuIdStore().kuIdVendorId)
        storeKuAdd.setFilterExInvoice("vendor_id", useKuIdStore().kuIdVendorId)
        storeKuAdd.setFilterProducer("vendor_id", useKuIdStore().kuIdVendorId)
        storeKuAdd.setFilterProductEx("vendor_id", useKuIdStore().kuIdVendorId)
        storeKuAdd.setFilterProductInRequirement("vendor_id", useKuIdStore().kuIdVendorId)
        await storeKuAdd.fetchKuEntity({
          entity_id: "",
          name: "",
          merge_id: "",
        });
        await storeKuAdd.fetchAllVendorIdForEntity();
        await storeKuAdd.fetchCategories();
        await storeKuAdd.getProductFromIncludedWithFilter();
        await storeKuAdd.fetchAllProducersForInclided();
        await storeKuAdd.fetchAllBrandsForIncluded();
        await storeKuAdd.getProductFromExcludedWithFilter();
        await storeKuAdd.getInvoicesFromAPIWithFilter();
      } catch (error) {
        console.error("Ошибка при загрузке данных товаров/производителей/брендов по фильтру клиента", error);
      }

    }
    else {
      useKuIdStore().disableButtonsIncluded = true;
    }
  };
}

//пагинация
const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  store.setCountRowTable(val);
  try {
    await store.getKuFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных ку1", error);
  }
};
const paginationChange = (page: number) => {
  try {
    store.setFilterValue('page', page);
    store.getKuFromAPIWithFilter(page, store.sortProp, store.sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных ку2", error);
  }
};

//монтирование и отслеживание таблицы
watch(getKu, (value) => {
  tableData.value = value || [];
});

const handleSortChange = async ({ page, prop, order  }: { page: number, prop: string, order: string }) => {
  try {
    store.pagination = null
    store.sortProp = prop; // поле, по которому сортируем
    store.sortOrder = order === 'ascending' ? 'asc' : 'desc'; // порядок сортировки
    console.log("(поле, порядок) = (", store.sortProp,",", store.sortOrder, ")");
    await store.getKuFromAPIWithFilter(page, store.sortProp, store.sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

onMounted(async () => {
  try {
    loading.value = true;
    await store.getKuFromAPIWithFilter();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Ошибка при загрузке данных ку3", error);
  }
});

const formatOkDate = (dateTime: any) => {
  return dayjs(dateTime).format('DD.MM.YYYY');
};

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
const { filterKuValue } = storeToRefs(store)
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);
watch(triggerFilter, () => {
  store.getKuFromAPIWithFilter();
});

//фильтр юр лица
const LegalEntity = ref<string[]>(filterKuValue.value.entity_id || []);
const optionsLegalEntity = ref<Array<{ label: string; value: string }>>([]);
const changeLegalEntity = () => {
  store.pagination = null;
  store.setFilterValue('entity_id', LegalEntity.value);
  toggleTriggerFilter();
};
watch(() => storeKuAdd.dataEntity, (dataEntity: IEntityInKu[]) => {
    optionsLegalEntity.value = dataEntity.map((item) => ({label: item.name,value: item.entity_id,}));
});
onMounted(async () => {
  try {
    await storeKuAdd.fetchKuEntity({
      entity_id: "",
      name: "",
      merge_id: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных юр. лица", error);
  }
});

//фильтр клиента
const Vendor = ref<string[]>(filterKuValue.value.customer_id || []);
const optionsVendor = ref<Array<{ label: string; value: string }>>([]);
watch(() => storeKuAdd.dataVendorId, (vendors: IVendorIdAndName[]) => {
  optionsVendor.value = vendors.map(item => ({ label: item.name, value: item.vendor_id }));
});

onMounted(async () => {
  try {
    await storeKuAdd.fetchAllVendorIdForEntity();
  } catch (error) {
    console.error("Ошибка при загрузке данных Клиента", error);
  }
});
const onVendorChange = async () => {
  store.pagination = null;
  store.setFilterValue('customer_id', Vendor.value);
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
  store.setFilterValue('status', Status.value);
  toggleTriggerFilter();
};

//фильтр по графику
const Graph = ref<string[]>(filterKuValue.value.graph_exists || []);
const optionsGraph = ref<Array<{ label: string; value: string }>>([
  { label: 'Есть', value: 'True' },
  { label: 'Нет', value: 'False' },
]);
const onGraphChange = async () => {
  store.setFilterValue('graph_exists', Graph.value);
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
      store.removeFilterValue('date_start_s');
      store.removeFilterValue('date_start_e');
    } else {
      // Иначе, форматируем даты и устанавливаем их в фильтр
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      store.setFilterValue('date_start_s', startFormatted);
      store.setFilterValue('date_start_e', endFormatted);
    }
    toggleTriggerFilter();
    closePopover()
  } else {
    // Если даты не выбраны, сбрасываем фильтр
    store.removeFilterValue('date_start_s');
    store.removeFilterValue('date_start_e');
    toggleTriggerFilter();
    closePopover()
  }
};

const changeDateRange2 = (newDateRange: Date[]) => {
  if (newDateRange && Array.isArray(newDateRange) && newDateRange.length === 2) {
    const [startDate, endDate] = newDateRange;
    if (!startDate || !endDate) {
      store.removeFilterValue('date_end_s');
      store.removeFilterValue('date_end_e');
    } else {
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      store.setFilterValue('date_end_s', startFormatted);
      store.setFilterValue('date_end_e', endFormatted);
    }
    toggleTriggerFilter();
    closePopover2()
  } else {
    store.removeFilterValue('date_end_s');
    store.removeFilterValue('date_end_e');
    toggleTriggerFilter();
    closePopover2()
  }
};


</script>
<style scoped>

</style>