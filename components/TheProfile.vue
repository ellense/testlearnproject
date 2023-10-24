
<template>
  <div class="profile">
    <div class="profile-avatar">
      <el-avatar
        :src="user.avatar"
        :size="200"
        fit="cover"
        shape="circle"
      ></el-avatar>
    </div>
    <div class="profile-info">
      <el-form ref="form" label-position="top">
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
      </el-form>
      <el-button type="primary" @click="dialogFormVisible = true">
        Редактировать
      </el-button>
    </div>
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="Редактирование профиля"
    close-on-click-modal
    close-on-press-escape
  >
    <el-form>

      <el-form-item label="ФИО:" :label-width="formLabelWidth">
        <el-input
          v-model="newName"
          label="ФИО"
          placeholder="Введите ФИО"
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
  </el-dialog>
</template>

<script setup>
// import { ref } from 'vue';
// const dialogFormVisible = ref(false);
// const user = ref({
//   name: 'Иванова Анна Владимировна',
//   email: 'john.doe@example.com',
//   avatar: "/img/woman.jpg", 
// });
import { ref } from 'vue';
import { useProfileStore } from "~~/stores/profileStore";

const profileStore = useProfileStore();

const dialogFormVisible = ref(profileStore.dialogFormVisible);
const user = ref(profileStore.user);
const newName = ref(profileStore.newName);

const save = () => {
  if (newName.value) {
    user.name = newName.value;
  }
  dialogFormVisible.value = false;
  newName.value = "";
};
</script>

<style scoped>
.profile {
  display: flex;
  justify-content: start;
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
