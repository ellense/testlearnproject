<template>
    <el-scrollbar height="40vh">
        <form>
            <div class="kuAddMain">
                <div class="kuAddMainCol">
                    <el-divider content-position="left" style=" color: #337ecc">Контрагент</el-divider>
                    <el-form-item label-width="200" label="ФИО">
                        <el-input v-model="store.kuIdFIOСounteragent" size="small" clearable style="width: 300px"
                            :disabled="isEditButtonDisabled">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Должность">
                        <el-input v-model="store.kuIdPostСounteragent" size="small" clearable style="width: 300px"
                            :disabled="isEditButtonDisabled">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Уполномочивающий документ">
                        <el-input v-model="store.kuIdDocСounteragent" size="small" clearable style="width: 300px"
                            :disabled="isEditButtonDisabled">
                        </el-input>
                    </el-form-item>
                </div>
                <div class="kuAddMainCol">
                    <el-divider content-position="left" style=" color: #337ecc">Юридическое лицо</el-divider>
                    <el-form-item label-width="200" label="ФИО">
                        <el-input v-model="store.kuIdFIOEntity" size="small" clearable style="width: 300px"
                            :disabled="isEditButtonDisabled">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Должность">
                        <el-input v-model="store.kuIdPostEntity" size="small" clearable style="width: 300px"
                            :disabled="isEditButtonDisabled">
                        </el-input>
                    </el-form-item>
                    <el-form-item label-width="200" label="Уполномочивающий документ">
                        <el-input v-model="store.kuIdDocEntity" size="small" clearable style="width: 300px" :disabled="isEditButtonDisabled">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
        </form>

    </el-scrollbar>
</template>

<script setup lang="ts">
import { useKuCIdStore } from "~~/stores/kuCIdStore";
const store = useKuCIdStore();
const isEditButtonDisabled = computed(() => {
    return store.kuIdStatus !== 'Создано';
});
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