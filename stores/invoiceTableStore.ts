import { defineStore } from "pinia";

interface IInvoice {
  id: number;
  number: number | null;
  summa: number | null;
  date: Date | string;
  nameProvider: string;
}

export const useInvoiceTableStore = defineStore("InvoiceTableStore", {
  state: () => ({
    newId: 0, // Идентификатор новой записи
    newNumber: null, // Новый номер накладной
    newSum: null, // Новая сумма по накладной
    newDate: "", // Новая дата накладной
    ProviderName: "", // Имя поставщика
    multipleSelection: [] as IInvoice[], // Выбранные записи
    search: "", // Поиск
    tableData: [] as IInvoice[], // Данные таблицы накладной
    multipleTableRef: null as Ref | null, // Ссылка на компонент таблицы
  }),

  getters: {
    // поиск данных в таблице
    searchTableData: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.tableData.filter((item) => {
        const dateMatch = item.date
          .toString()
          .toLowerCase()
          .includes(searchValue);
        const nameProviderMatch = item.nameProvider
          .toLowerCase()
          .includes(searchValue);

        return dateMatch || nameProviderMatch;
      });
    },
  },

  actions: {
    // Установка ссылки на компонент таблицы
    setMultipleTableRef(ref: Ref) {
      this.multipleTableRef = ref;
    },

    // Выделение/снятие выделения с записей таблицы
    toggleSelection(rows?: IInvoice[]) {
      if (this.multipleTableRef) {
        if (rows) {
          rows.forEach((row) => {
            this.multipleTableRef.value.toggleRowSelection(row, undefined);
          });
        } else {
          this.multipleTableRef.value.clearSelection();
        }
      }
    },

    // Обработчик изменения выбранных записей
    handleSelectionChange(val: IInvoice[]) {
      this.multipleSelection = val;
    },

    // Удаление выбранных записей из таблицы
    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;
      this.tableData = this.tableData.filter((row: IInvoice) => {
        return !selectedRows.includes(row);
      });
      this.multipleSelection = [];
    },

    // Добавление новых записей в таблицу
    addRows() {
      this.tableData.push({
        id: this.tableData.length + 1,
        number: this.newNumber,
        summa: this.newSum,
        date: this.newDate,
        nameProvider: this.ProviderName,
      });
      this.newNumber = null;
      this.newSum = null;
      this.newDate = "";
      this.ProviderName = "";
    },
  },
});
