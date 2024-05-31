<template>
  <el-scrollbar class="scrollTable">
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 130px)" v-loading="loading" :border="true" @sort-change="handleSortChange" stripe>
      <el-table-column prop="invoice_id" label="ID" width="100" sortable show-overflow-tooltip/>
      <el-table-column property="invoice_number" label="Номер" width="200" sortable show-overflow-tooltip/>
      <el-table-column property="invoice_name" label="Наименование" width="160" sortable show-overflow-tooltip />

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
      
      <el-table-column label="Поставщик" align="center">
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
                :max-collapse-tags="2" :options="optionsVendor" popper-class="vendorPopper" style="width: 300px"
                placeholder="Фильтр по поставщику" @change="onVendorChange" size="small">
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
            Дата
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
        <el-table-column property="invoice_date" type="date" sortable width="90" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ formatOkDate(row.invoice_date) }}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column property="product_amount" label="Сумма" show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
  <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
    <el-pagination v-model:pageSize="pageSize" small :page-sizes="[50, 100, 300, 500]"
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next, total"
      @size-change="handleSizeChange" @current-change="paginationChange" :total="pagination.count"/>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import type { IEntityInKu } from "~/utils/types/entityTypes";
import { Filter } from '@element-plus/icons-vue'
import type { IInvoice } from "~/utils/types/invoiceTypes";
import type { IVendorIdAndName } from "~/utils/types/vendorTypes";
import { useInvoiceStore } from "~~/stores/invoiceStore";
import { useKuAddStore } from "~~/stores/kuAddStore";
import dayjs from 'dayjs';


const store = useInvoiceStore()
const store2 = useKuAddStore();

const { getInvoices, pagination, countRowTable } = storeToRefs(
  useInvoiceStore()
);

const tableData = ref<IInvoice[]>(getInvoices.value);

const loading = ref()

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useInvoiceStore().setCountRowTable(val);
  try {
    loading.value = true; 
    await useInvoiceStore().getInvoicesFromAPIWithFilter();
    loading.value = false; 
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
    loading.value = false; 
  }
};
const paginationChange = (page: number) => {
  try {
    useInvoiceStore().setFilterValue('page', page);
    loading.value = true; 
    useInvoiceStore().getInvoicesFromAPIWithFilter(page, store.sortProp, store.sortOrder);
    loading.value = false; 
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
    loading.value = false; 
  }
};

const handleSortChange = async ({ page, prop, order  }: { page: number, prop: string, order: string }) => {
  try {
    store.pagination = null
    store.sortProp = prop; // поле, по которому сортируем
    store.sortOrder = order === 'ascending' ? 'asc' : 'desc'; // порядок сортировки
    console.log("(поле, порядок) = (", store.sortProp,",", store.sortOrder, ")");
    loading.value = true; 
    await useInvoiceStore().getInvoicesFromAPIWithFilter(page, store.sortProp, store.sortOrder);
    loading.value = false; 
  } catch (error) {
    loading.value = false; 
    console.error("Ошибка при загрузке данных", error);
  }
};

watch(getInvoices, (value) => {
  tableData.value = value || [];
});

onMounted(async () => {
  try {
    loading.value = true; 
    await useInvoiceStore().getInvoicesFromAPIWithFilter();
    loading.value = false; 
  } catch (error) {
    loading.value = false; 
    console.error("Ошибка при загрузке данных 22", error);
  }
});


const { filterValue } = storeToRefs(store)
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);
watch(triggerFilter, () => {
  loading.value = true; 
  store.getInvoicesFromAPIWithFilter();
  loading.value = false; 
});

//фильтр юр лица
const LegalEntity = ref<string[]>(filterValue.value.entity_id || []);
const optionsLegalEntity = ref<Array<{ label: string; value: string }>>([]);
const changeLegalEntity = () => {
  store.pagination = null;
  store.setFilterValue('entity_id', LegalEntity.value);
  toggleTriggerFilter();
};
watch(() => store2.dataEntity, (dataEntity: IEntityInKu[]) => {
    optionsLegalEntity.value = dataEntity.map((item) => ({label: item.name,value: item.entity_id,}));
});
onMounted(async () => {
  try {
    await store2.fetchKuEntity({
      entity_id: "",
      name: "",
      merge_id: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных юр. лица", error);
  }
});

//фильтр поставщика
const Vendor = ref<string[]>(filterValue.value.vendor_id || []);
const optionsVendor = ref<Array<{ label: string; value: string }>>([]);
watch(() => store2.dataVendorId, (vendors: IVendorIdAndName[]) => {
  optionsVendor.value = vendors.map(item => ({ label: item.name, value: item.vendor_id }));
});

onMounted(async () => {
  try {
    await store2.fetchAllVendorIdForEntity();
  } catch (error) {
    console.error("Ошибка при загрузке данных поставщика", error);
  }
});
const onVendorChange = async () => {
  store.pagination = null;
  store.setFilterValue('vendor_id', Vendor.value);
  toggleTriggerFilter();
};

//для фильтрации по дате
const formatOkDate = (dateTime: any) => {
  return dayjs(dateTime).format('DD.MM.YYYY') 
};
const popoverVisible = ref(false);
const closePopover = () => {
  popoverVisible.value = false;
};
const dateRange = ref()

const formatDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');// Функция для форматирования даты в формат "YYYY-MM-DD"

const changeDateRange = (newDateRange: Date[]) => {
  if (newDateRange && Array.isArray(newDateRange) && newDateRange.length === 2) {
    const [startDate, endDate] = newDateRange;
    if (!startDate || !endDate) {
      // Если даты не выбраны (то есть сброшены), сбрасываем фильтр
      store.removeFilterValue('start_date');
      store.removeFilterValue('end_date');
    } else {
      // Иначе, форматируем даты и устанавливаем их в фильтр
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      store.setFilterValue('start_date', startFormatted);
      store.setFilterValue('end_date', endFormatted);
    }
    toggleTriggerFilter();
    closePopover()

  } else {
    // Если даты не выбраны, сбрасываем фильтр
    store.removeFilterValue('start_date');
    store.removeFilterValue('end_date');
    toggleTriggerFilter(); 
    closePopover()
  }
};
</script>
