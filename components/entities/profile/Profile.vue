<template>
  <div class="profile">
    <div class="profile-avatar" v-if="profile">
      <!-- аватарка -->
    </div>
    <div class="profile-info" v-if="profile">
      <el-form ref="form" label-position="top">
        <h2>
          {{ profile.last_name}} {{profile.first_name }} {{ profile.middle_name }} 
        </h2>
        <p>{{ profile.email }}</p>
      </el-form>
      <!-- <el-button type="primary" @click="dialogFormVisible = true">
        Редактировать
      </el-button> -->
    </div>
  </div>
  <!-- <el-dialog
    v-model="dialogFormVisible"
    title="Редактирование профиля"
    close-on-click-modal
    close-on-press-escape
  >
    <el-form>
      <el-form-item>
        <el-input
          v-model="new_last_name"
          label="ФИО"
          placeholder="Введите фамилию"
          style="width: 200px"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="new_first_name"
          label="ФИО"
          placeholder="Введите имя"
          style="width: 200px"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="new_middle_name"
          label="ФИО"
          placeholder="Введите отчество"
          style="width: 200px"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="new_email"
          label="ФИО"
          placeholder="Введите email"
          style="width: 200px"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Отмена</el-button>
        <el-button @click="save()"> Сохранить </el-button>
      </span>
    </template>
  </el-dialog> -->
</template>

<script setup>
import { ref, computed } from "vue";
import { useProfileStore } from "~~/stores/profileStore";

const profileStore = useProfileStore();

const dialogFormVisible = ref(profileStore.dialogFormVisible);
const profile = computed(() => profileStore.firstProfile);

const messageClose = () => {
  ElMessage({
    message: "Профиль успешно изменен",
    type: "success",
  });
};

// const save = () => {
//   profileStore.addRows({
//     id: profileStore.data.id,
//     last_name: new_last_name.value,
//     first_name: new_first_name.value,
//     middle_name: new_middle_name.value,
//     email: new_email.value
//   });
//   profileStore.dialogFormVisible = false;
//   messageClose();
//   new_last_name = "";
//   new_first_name = "";
//   new_middle_name = "";
//   new_email = "";
// };

</script>

<style scoped>
.profile {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}
.profile-avatar {
  text-align: center;
  margin: 20px 0;
  position: relative;
}
.profile-info {
  text-align: start;
}

h2 {
  font-size: 24px;
  margin: 10px 0;
}
</style>
