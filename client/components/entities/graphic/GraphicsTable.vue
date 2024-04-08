<template>
  <div class="toolbarAdd"></div>
  <el-scrollbar class="scrollTable" style="border: none">
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 130px)" :border="true" v-loading="loading"
      @selection-change="useGraphicStore().handleSelectionChange2" @cell-dblclick="handleCellDblClick" stripe
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
                :max-collapse-tags="3" placeholder="Фильтр по КУ" style="width: 300px" @change="changeKu" size="small">
                <el-option v-for="item in optionsKu" :key="item" :label="item" :value="item" />
              </el-select>
            </el-popover>
          </div>
        </template>
        <el-table-column fixed property="ku_id" width="95" sortable show-overflow-tooltip></el-table-column>
      </el-table-column>
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
        <el-table-column property="entity_id" label="Код" width="65" sortable show-overflow-tooltip />
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
        <el-table-column property="date_end"  sortable width="85" show-overflow-tooltip >
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
        <el-table-column property="date_accrual" sortable width="85" show-overflow-tooltip >
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
        <el-table-column property="date_calc" width="130" sortable show-overflow-tooltip >
          <template #default="{ row }">
            <span>{{ formatOkDateTime(row.date_calc) }}</span>
          </template>
          </el-table-column>
      </el-table-column>
      <el-table-column fixed="right" property="sum_calc" label="База расчета" width="100" show-overflow-tooltip />
      <el-table-column fixed="right" property="percent" label="Процент" width="90" show-overflow-tooltip />
      <el-table-column fixed="right" property="sum_bonus" label="Расчитано" width="100" show-overflow-tooltip />
      <el-table-column fixed="right" prop="sum_approved" label="Утверждено" width="100" show-overflow-tooltip>
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
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
      @size-change="handleSizeChange" @current-change="paginationChange" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { Filter } from '@element-plus/icons-vue'
import { useGraphicStore } from "~~/stores/graphicStore";
import { storeToRefs } from "pinia";
import dayjs from 'dayjs';
import type { IGraphic, IVendorId } from "~/utils/types/directoryTypes";
import { useKuAddStore } from "~~/stores/kuAddStore";
const storeKuAdd = useKuAddStore();
const { getGraphic, pagination, countRowTable } = storeToRefs(useGraphicStore());
const loading = ref()
const handleCellDblClick = (row: IGraphic, column: any, cell: any, event: MouseEvent) => {
  if (column.property === 'sum_approved') {
    if (row.status === 'Утверждено') {
      useGraphicStore().editApproved = row.sum_approved;
      useGraphicStore().selectedRowEditApproved = row;
      useGraphicStore().dialogFormEditApprovedVisible = true;
      console.log('Вы нажали на ячейку столбца "Утверждено"');
    } else {
      ElMessage.error('Невозможно открыть диалоговое окно: статус не "Утвержденo"');
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
    default:
      return '#000';
  }
}

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useGraphicStore().setCountRowTable(val);
  try {
    await useGraphicStore().getGraphicsFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных 11", error);
  }
};

watch(getGraphic, (value) => {
  tableData.value = value || [];
});

const paginationChange = (page: number) => {
  useGraphicStore().getGraphicsFromAPIWithFilter(page);
};

const handleSortChange = async ({ prop, order }: { prop: string, order: string }) => {
  try {
    const sortField = prop; // поле, по которому сортируем
    const sortOrder = order === 'ascending' ? 'asc' : 'desc'; // порядок сортировки
    console.log("(поле, порядок) = (", sortField, ",", sortOrder, ")");
    await useGraphicStore().getGraphicsFromAPIWithFilter(undefined, sortField, sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

onMounted(async () => {
  try {
    loading.value = true;
    await useGraphicStore().getGraphicsFromAPIWithFilter();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Ошибка при загрузке данных", error);
  }
});
//форматы дат в таблице
const formatOkDateTime = (dateTime: any) => {
  return dayjs(dateTime).format('DD.MM.YYYY HH:mm:ss'); 
};
const formatOkDate = (dateTime: any) => {
  return dayjs(dateTime).format('DD.MM.YYYY'); 
};

//для общей фильтрации
const { filterGraphicValue, legalEntity, KuParams } = storeToRefs(useGraphicStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);
watch(triggerFilter, () => {
  useGraphicStore().getGraphicsFromAPIWithFilter();
});

//фильтр ку
const Ku = ref<string[]>(filterGraphicValue.value.ku_id || []);
const optionsKu = ref<string[]>(KuParams.value);
const changeKu = () => {
  useGraphicStore().pagination = null;
  useGraphicStore().setFilterValue('ku_id', Ku.value);
  toggleTriggerFilter();
};
watch(KuParams, (value) => {
  optionsKu.value = value;
});
//фильтр юр лица
const LegalEntity = ref<string[]>(filterGraphicValue.value.entity_id || []);
const optionsLegalEntity = ref<string[]>(legalEntity.value);
const changeLegalEntity = () => {
  useGraphicStore().pagination = null;
  useGraphicStore().setFilterValue('entity_id', LegalEntity.value);
  toggleTriggerFilter();
};
watch(legalEntity, (value) => {
  optionsLegalEntity.value = value;
});
//фильтр поставщика
const Vendor = ref<string[]>(filterGraphicValue.value.vendor_id || []);
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
  useGraphicStore().setFilterValue('vendor_id', Vendor.value);
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
  useGraphicStore().setFilterValue('period', Period.value);
  toggleTriggerFilter();
};
//фильтр по статусу
const Status = ref<string[]>(filterGraphicValue.value.status || []);
const optionsStatus = ref<Array<{ label: string; value: string }>>([
  { label: 'Запланировано', value: 'Запланировано' },
  { label: 'Рассчитано', value: 'Рассчитано' },
  { label: 'Утверждено', value: 'Утверждено' },
]);
const onStatusChange = async () => {
  useGraphicStore().setFilterValue('status', Status.value);
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
      useGraphicStore().removeFilterValue('date_start_s');
      useGraphicStore().removeFilterValue('date_start_e');
    } else {
      // Иначе, форматируем даты и устанавливаем их в фильтр
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      useGraphicStore().setFilterValue('date_start_s', startFormatted);
      useGraphicStore().setFilterValue('date_start_e', endFormatted);
    }
    toggleTriggerFilter();
    closePopover()
  } else {
    // Если даты не выбраны, сбрасываем фильтр
    useGraphicStore().removeFilterValue('date_start_s');
    useGraphicStore().removeFilterValue('date_start_e');
    toggleTriggerFilter();
    closePopover()
  }
};

const changeDateRange2 = (newDateRange: Date[]) => {
  if (newDateRange && Array.isArray(newDateRange) && newDateRange.length === 2) {
    const [startDate, endDate] = newDateRange;
    if (!startDate || !endDate) {
      useGraphicStore().removeFilterValue('date_end_s');
      useGraphicStore().removeFilterValue('date_end_e');
    } else {
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      useGraphicStore().setFilterValue('date_end_s', startFormatted);
      useGraphicStore().setFilterValue('date_end_e', endFormatted);
    }
    toggleTriggerFilter();
    closePopover2()
  } else {
    useGraphicStore().removeFilterValue('date_end_s');
    useGraphicStore().removeFilterValue('date_end_e');
    toggleTriggerFilter();
    closePopover2()
  }
};
const changeDateRange3 = (newDateRange: Date[]) => {
  if (newDateRange && Array.isArray(newDateRange) && newDateRange.length === 2) {
    const [startDate, endDate] = newDateRange;
    if (!startDate || !endDate) {
      useGraphicStore().removeFilterValue('date_accrual_s');
      useGraphicStore().removeFilterValue('date_accrual_e');
    } else {
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      useGraphicStore().setFilterValue('date_accrual_s', startFormatted);
      useGraphicStore().setFilterValue('date_accrual_e', endFormatted);
    }
    toggleTriggerFilter();
    closePopover3()
  } else {
    useGraphicStore().removeFilterValue('date_accrual_s');
    useGraphicStore().removeFilterValue('date_accrual_e');
    toggleTriggerFilter();
    closePopover3()
  }
};
const changeDateRange4 = (newDateRange: Date[]) => {
  if (newDateRange && Array.isArray(newDateRange) && newDateRange.length === 2) {
    const [startDate, endDate] = newDateRange;
    if (!startDate || !endDate) {
      useGraphicStore().removeFilterValue('date_calc_s');
      useGraphicStore().removeFilterValue('date_calc_e');
    } else {
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      useGraphicStore().setFilterValue('date_calc_s', startFormatted);
      useGraphicStore().setFilterValue('date_calc_e', endFormatted);
    }
    toggleTriggerFilter();
    closePopover3()
  } else {
    useGraphicStore().removeFilterValue('date_calc_s');
    useGraphicStore().removeFilterValue('date_calc_e');
    toggleTriggerFilter();
    closePopover3()
  }
};
</script>
<style scoped></style>
