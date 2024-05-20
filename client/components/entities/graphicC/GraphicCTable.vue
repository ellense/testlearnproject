<template>
  <div class="toolbarAdd"></div>
  <el-scrollbar class="scrollTable" style="border: none">
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 130px)" :border="true" v-loading="loading"
      @selection-change="store.handleSelectionChange2" @cell-dblclick="handleCellDblClick" stripe
      @sort-change="handleSortChange">
      <el-table-column fixed type="selection" width="30" />
      <el-table-column fixed>
        <template #header>
          <div class="column-header" :style="{ color: Ku.length > 0 ? '#409EFF' : 'inherit' }">
            Код КУ
            <el-popover placement="bottom-start" :width="325" trigger="click">
              <template #reference>
                <el-button style="background-color: transparent; border:none; padding: 10px"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-select v-model="Ku" multiple clearable filterable collapse-tags collapse-tags-tooltip
                :max-collapse-tags="2" placeholder="Фильтр по КУ" style="width: 300px" @change="changeKu" size="small">
                <el-option v-for="item in optionsKu" :key="item" :label="item" :value="item" />
              </el-select>
            </el-popover>
          </div>
        </template>
        <el-table-column fixed property="ku_id" width="95" sortable show-overflow-tooltip></el-table-column>
      </el-table-column>
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
        <el-table-column property="entity_id" label="Код" width="65" sortable show-overflow-tooltip />
        <el-table-column property="entity_name" label="Наименование" width="170"  show-overflow-tooltip />
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
                :max-collapse-tags="3" :options="optionsVendor" popper-class="vendorPopper" style="width: 300px"
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
        <el-table-column property="vendor_id" label="Код" width="120" sortable show-overflow-tooltip />
        <el-table-column property="vendor_name" label="Наименование" width="200" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="period" width="105">
        <template #header>
          <div class="column-header" :style="{ color: Period.length > 0 ? '#409EFF' : 'inherit' }">
            Период расчета
            <el-popover placement="bottom" :width="325" trigger="click">
              <template #reference hide-on-click="false">
                <el-button style="background-color: transparent; border:none; padding: 10px"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-select-v2 v-model="Period" multiple clearable filterable collapse-tags collapse-tags-tooltip
                :max-collapse-tags="2" :options="optionsPeriod" style="width: 300px"
                placeholder="Фильтр по периоду расчета" size="small" @change="onPeriodChange">
                <template #default="{ item }" class="selectVendorInKuAdd">
                  <span style="margin-right: 8px">{{ item.label }}</span>
                </template>
              </el-select-v2>
            </el-popover>
          </div>
        </template>
        <template #default="scope3">
          <span>{{ scope3.row.period }}</span>
        </template>
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
        <el-table-column prop="date_start" width="85" sortable show-overflow-tooltip>
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
        <el-table-column property="date_end" sortable width="85" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ formatOkDate(row.date_end) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div class="column-header" :style="{ color: dateRange3 ? '#409EFF' : 'inherit' }" style="display: flex;
  align-items: center;">
            Начисления дата
            <el-popover placement="bottom" :width="400" :visible="popoverVisible3">
              <template #reference>
                <el-button style="background-color: transparent; border:none; padding: 10px"
                  @click="popoverVisible3 = !popoverVisible3"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
              <el-date-picker v-model="dateRange3" type="daterange" format="DD.MM.YYYY" start-placeholder="Начало"
                end-placeholder="Окончание" :clearable="true" size="small" @change="changeDateRange3" />
            </el-popover>
          </div>
        </template>
        <el-table-column property="date_accrual" sortable width="85" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ formatOkDate(row.date_accrual) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div class="column-header" :style="{ color: dateRange4 ? '#409EFF' : 'inherit' }" style="display: flex;
  align-items: center;">
            Дата и время расчета
            <!-- <el-popover placement="bottom" :width="400" :visible="popoverVisible4">
              <template #reference>
                <el-button style="background-color: transparent; border:none; padding: 10px"
                  @click="popoverVisible4 = !popoverVisible4"><el-icon>
                    <Filter />
                  </el-icon></el-button>
              </template>
  <el-date-picker v-model="dateRange4" type="daterange" format="DD.MM.YYYY" start-placeholder="Начало"
    end-placeholder="Окончание" :clearable="true" size="small" @change="changeDateRange4" />
  </el-popover> -->
          </div>
        </template>
        <el-table-column property="date_calc" width="130" sortable show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ formatOkDateTime(row.date_calc) }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column fixed="right" property="sum_calc" label="База расчета" width="100" show-overflow-tooltip />
      <el-table-column fixed="right" property="percent" label="Процент" width="90" show-overflow-tooltip />
      <el-table-column fixed="right" property="sum_bonus" label="Расчитано" width="100" show-overflow-tooltip />
      <el-table-column fixed="right" prop="sum_approved" label="Начислено" width="100" show-overflow-tooltip>
        <template #default="scope">
          {{ scope.row.sum_approved }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Статус" width="120" fixed="right">
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
                :max-collapse-tags="2" :options="optionsStatus" style="width: 300px"
                placeholder="Фильтр по статусу графика" size="small" @change="onStatusChange">
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
  </el-scrollbar>
  <div class="pagination">
    <el-pagination v-if="pagination?.count" v-model:pageSize="pageSize" small :page-sizes="[50, 100, 300, 500]"
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next, total"
      @size-change="handleSizeChange" @current-change="paginationChange" :total="pagination.count" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { Filter } from '@element-plus/icons-vue'
import { useGraphicСStore } from "~~/stores/graphicСStore";
import { storeToRefs } from "pinia";
import dayjs from 'dayjs';
import { useKuAddStore } from "~~/stores/kuAddStore";
import type { IEntityInKu } from "~/utils/types/entityTypes";
import type { IGraphic } from "~/utils/types/graphicVendorTypes";
import type { IVendorIdAndName } from "~/utils/types/vendorTypes";
const store = useGraphicСStore();
const storeKuAdd = useKuAddStore();
const { getGraphic, pagination, countRowTable } = storeToRefs(store);
const loading = ref()
const handleCellDblClick = (row: IGraphic, column: any, cell: any, event: MouseEvent) => {
  if (column.property === 'sum_approved') {
    if (row.status === 'Начислено') {
      store.editApproved = row.sum_approved;
      store.selectedRowEditApproved = row;
      store.dialogFormEditApprovedVisible = true;
      console.log('Вы нажали на ячейку столбца "Начислено"');
    } else {
      ElMessage.error('Невозможно открыть диалоговое окно: статус не "Начислено"');
    }
  }
};

const tableData = ref<IGraphic[]>(getGraphic.value)

const filterTag2 = (value: string, row: IGraphic) => {
  return row.period === value
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Утверждено':
      return '#55940e';
    case 'Запланировано':
      return '#117ba5';
    case 'Рассчитано':
      return '#e79e00';
    case 'Начислено':
      return '#630e94';
    default:
      return '#000';
  }
}

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  store.setCountRowTable(val);
  try {
    await store.getGraphicsFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных 11", error);
  }
};

watch(getGraphic, (value) => {
  tableData.value = value || [];
});

const paginationChange = (page: number) => {
  try {
    store.setFilterValue('page', page);
    store.getGraphicsFromAPIWithFilter(page, store.sortProp, store.sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }

};

const handleSortChange = async ({ page, prop, order  }: { page: number, prop: string, order: string }) => {
  try {
    store.pagination = null
    store.sortProp = prop; // поле, по которому сортируем
    store.sortOrder = order === 'ascending' ? 'asc' : 'desc'; // порядок сортировки
    console.log("(поле, порядок) = (", store.sortProp,",", store.sortOrder, ")");
    await store.getGraphicsFromAPIWithFilter(page, store.sortProp, store.sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

onMounted(async () => {
  try {
    loading.value = true;
    await store.getGraphicsFromAPIWithFilter();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Ошибка при загрузке данных", error);
  }
});

//форматирование дат
const formatOkDateTime = (dateTime: any) => {
  if (dateTime === null) {
    return null;
  }
  return dayjs(dateTime).format('DD.MM.YYYY HH:mm:ss');
};
const formatOkDate = (dateTime: any) => {
  if (dateTime === null) {
    return null;
  }
  return dayjs(dateTime).format('DD.MM.YYYY');
};

//для общей фильтрации
const { filterGraphicValue, legalEntity, KuParams } = storeToRefs(store)
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);
watch(triggerFilter, () => {
  store.getGraphicsFromAPIWithFilter();
});

//фильтр ку
const Ku = ref<string[]>(filterGraphicValue.value.ku_id || []);
const optionsKu = ref<string[]>(KuParams.value);
const changeKu = () => {
  store.pagination = null;
  store.setFilterValue('ku_id', Ku.value);
  toggleTriggerFilter();
};
watch(KuParams, (value) => {
  optionsKu.value = value;
});
//фильтр юр лица
const LegalEntity = ref<string[]>(filterGraphicValue.value.entity_id || []);
const optionsLegalEntity = ref<Array<{ label: string; value: string }>>([]);
const changeLegalEntity = () => {
  store.pagination = null;
  store.setFilterValue('entity_id', LegalEntity.value);
  toggleTriggerFilter();
};
watch(() => storeKuAdd.dataEntity, (dataEntity: IEntityInKu[]) => {
  optionsLegalEntity.value = dataEntity.map((item) => ({ label: item.name, value: item.entity_id, }));
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
//фильтр поставщика
const Vendor = ref<string[]>(filterGraphicValue.value.vendor_id || []);
const optionsVendor = ref<Array<{ label: string; value: string }>>([]);
watch(() => storeKuAdd.dataVendorId, (vendors: IVendorIdAndName[]) => {
  optionsVendor.value = vendors.map(item => ({ label: item.name, value: item.vendor_id }));
});
onMounted(async () => {
  try {
    await storeKuAdd.fetchAllVendorIdForEntity();
  } catch (error) {
    console.error("Ошибка при загрузке данных поставщика", error);
  }
});
const onVendorChange = async () => {
  store.setFilterValue('vendor_id', Vendor.value);
  toggleTriggerFilter();
};
//фильтр по периоду
const Period = ref<string[]>(filterGraphicValue.value.period || []);
const optionsPeriod = ref<Array<{ label: string; value: string }>>([
  { label: 'Месяц', value: 'Месяц' },
  { label: 'Квартал', value: 'Квартал' },
  { label: 'Полгода', value: 'Полгода' },
  { label: 'Год', value: 'Год' },
]);
const onPeriodChange = async () => {
  store.setFilterValue('period', Period.value);
  toggleTriggerFilter();
};
//фильтр по статусу
const Status = ref<string[]>(filterGraphicValue.value.status || []);
const optionsStatus = ref<Array<{ label: string; value: string }>>([
  { label: 'Запланировано', value: 'Запланировано' },
  { label: 'Рассчитано', value: 'Рассчитано' },
  { label: 'Начислено', value: 'Начислено' },
  { label: 'Утверждено', value: 'Утверждено' },
]);
const onStatusChange = async () => {
  store.setFilterValue('status', Status.value);
  toggleTriggerFilter();
};

//для фильтрации по датам
const popoverVisible = ref(false);
const popoverVisible2 = ref(false);
const popoverVisible3 = ref(false);
const popoverVisible4 = ref(false);
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
const closePopover3 = () => {
  popoverVisible3.value = false;
};
const closePopover4 = () => {
  popoverVisible3.value = false;
};
const dateRange = ref()
const dateRange2 = ref()
const dateRange3 = ref()
const dateRange4 = ref()
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
const changeDateRange3 = (newDateRange: Date[]) => {
  if (newDateRange && Array.isArray(newDateRange) && newDateRange.length === 2) {
    const [startDate, endDate] = newDateRange;
    if (!startDate || !endDate) {
      store.removeFilterValue('date_accrual_s');
      store.removeFilterValue('date_accrual_e');
    } else {
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      store.setFilterValue('date_accrual_s', startFormatted);
      store.setFilterValue('date_accrual_e', endFormatted);
    }
    toggleTriggerFilter();
    closePopover3()
  } else {
    store.removeFilterValue('date_accrual_s');
    store.removeFilterValue('date_accrual_e');
    toggleTriggerFilter();
    closePopover3()
  }
};
const changeDateRange4 = (newDateRange: Date[]) => {
  if (newDateRange && Array.isArray(newDateRange) && newDateRange.length === 2) {
    const [startDate, endDate] = newDateRange;
    if (!startDate || !endDate) {
      store.removeFilterValue('date_calc_s');
      store.removeFilterValue('date_calc_e');
    } else {
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      store.setFilterValue('date_calc_s', startFormatted);
      store.setFilterValue('date_calc_e', endFormatted);
    }
    toggleTriggerFilter();
    closePopover3()
  } else {
    store.removeFilterValue('date_calc_s');
    store.removeFilterValue('date_calc_e');
    toggleTriggerFilter();
    closePopover3()
  }
};
</script>
<style scoped></style>
~/utils/types/serviceTypes