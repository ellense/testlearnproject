<template>
    <el-scrollbar height="45vh">
        <form>
            <div class="kuAddMain">
                <div class="kuAddMainCol">
                    <el-divider content-position="left" style=" color: #337ecc">Контрагент</el-divider>
                    <el-form-item label-width="200" label="ФИО">
                        <el-input v-model="store.newOfFIOСounteragent" size="small" clearable placeholder="Введите в род. падеже"
                            style="width: 300px">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Должность">
                        <el-input v-model="store.newOfPostСounteragent" size="small" clearable placeholder="Введите в род. падеже"
                            style="width: 300px">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Уполномочивающий документ">
                        <el-input v-model="store.newOfDocСounteragent" size="small" clearable placeholder="Введите в род. падеже"
                            style="width: 300px">
                        </el-input>
                    </el-form-item>
                </div>
                <div class="kuAddMainCol">
                    <el-divider content-position="left" style=" color: #337ecc">Юридическое лицо</el-divider>
                    <el-form-item label-width="200" label="ФИО">
                        <el-input v-model="store.newOfFIOEntity" size="small" clearable style="width: 300px" placeholder="Введите в род. падеже">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Должность">
                        <el-input v-model="store.newOfPostEntity" size="small" clearable placeholder="Введите в род. падеже"
                            style="width: 300px">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Уполномочивающий документ">
                        <el-input v-model="store.newOfDocEntity" size="small" clearable placeholder="Введите в род. падеже"
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