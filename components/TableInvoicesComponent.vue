<template>
  <div>
    <div>
      <p>
        <input v-model="newText" type="text" placeholder="Введите поставщика" />
        <button @click="saveProvider()">Сохранить</button>
      </p>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <td>Номер накладной</td>
            <td>Поставщик</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(id, tittle) in providers" :key="id.id">
            <td>{{ id.id }}</td>
            <td>{{ id.title }}</td>
            <td>
              <div><button @click="delItem(id.id)">удалить</button></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p><button @click="addItem()">Добавить рандомный элемент</button></p>

    <h2>История результатов:</h2>
    <ul>
      <li v-for="(item, index) in historyProviders" :key="index">{{ item }}</li>
    </ul>

    <button @click="titleproviders()">Имена поставщиков</button>
    <ul>
      <li v-for="(name, index) in names" :key="index">{{ name }}</li>
    </ul>
    <p>{{ stringProviders }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"; /// удалить
import { storeToRefs } from "pinia";
import { useAddLineStore } from "~~/stores/addLineStore";

const store = useAddLineStore();

const { historyProviders, providers, newText } = storeToRefs(store);

let names = ref<string[]>([]);
let stringProviders = ref<string>("Поставщики: ");

const saveProvider = () => {
  store.addProvider();
  titleproviders();
};

providers.value = [
  { id: 1, title: "Иванов К.О." },
  { id: 2, title: "Продмол" },
  { id: 3, title: "Шершень" },
  { id: 4, title: "ООО Гранд" },
  { id: 5, title: "ООО Пятый океан" },
];

const titleproviders = () => {
  names.value = providers.value.map(
    (provider: { title: string }) => provider.title
  );
  names.value.sort();
  stringProviders.value = names.value.join(", ");
};

const addItem = () => { //добавить рандом элемент
  providers.value.push({
    id: providers.value.length + 1,
    title:
      providers.value[(Math.random() * (providers.value.length - 1)) | 0].title,
  });
};

const delItem = (id: number) => {
  if (providers.value) {
    providers.value = providers.value.filter(
      (item: { id: number }) => item.id !== id
    );
  }
};
</script>

<style></style>
