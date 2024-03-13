<template>
    <el-scrollbar height="calc(100vh - 560px)">
        <form>
            <div class="kuAddMain">
                <div class="kuAddMainCol">
                    <el-divider content-position="left" style=" color: #337ecc">Контрагент</el-divider>
                    <el-form-item label-width="200" label="ФИО">
                        <el-input v-model="store.newOfFIOСounteragent" size="small" placeholder="Введите ФИО контрагента"
                            style="width: 300px">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Должность">
                        <el-input v-model="store.newOfPostСounteragent" size="small" placeholder="Введите должность контрагента"
                            style="width: 300px">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Уполномочивающий документ">
                        <el-input v-model="store.newOfDocСounteragent" size="small" placeholder="Введите название уполномочивающего документа контрагента"
                            style="width: 300px">
                        </el-input>
                    </el-form-item>
                </div>
                <div class="kuAddMainCol">
                    <el-divider content-position="left" style=" color: #337ecc">Юридическое лицо</el-divider>
                    <el-form-item label-width="200" label="ФИО">
                        <el-input v-model="store.newOfFIOEntity" size="small" style="width: 300px" placeholder="Введите ФИО юр.лица">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Должность">
                        <el-input v-model="store.newOfPostEntity" size="small" placeholder="Введите должность юр.лица"
                            style="width: 300px">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Уполномочивающий документ">
                        <el-input v-model="store.newOfDocEntity" size="small" placeholder="Введите название уполномочивающего документа юр. лица"
                            style="width: 300px">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
        </form>

    </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useKuAddStore } from "~~/stores/kuAddStore";
const store = useKuAddStore();
</script>

<style scoped>
.kuAddMain {
  display: flex;
  width: 100%;
  gap: 100px;
}

.kuAddMainCol {
  display: flex;
  flex-direction: column;


}

.el-form-item {
  margin: 2px;
}

.kuAddLabel {
  margin-right: 10px;
  font-size: 13px;
  color: #1f1f1f;
}
</style>