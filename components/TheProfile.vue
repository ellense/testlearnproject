
<template>
  <div class="profile">
    <el-card class="profile-card">
      <div class="profile-avatar">
        <el-avatar
          :src="user.avatar"
          :size="200"
          fit="cover"
          shape="circle"
        ></el-avatar>
      </div>
      <div class="profile-info">
        <el-form ref="form"  label-position="top">
          <h2>{{ user.name }}</h2>
          <p>{{ user.email }}</p>
        </el-form>
        <el-button type="primary" >
          Редактировать
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
  const user = reactive({
    name: 'Иванова Анна Владимировна',
    email: 'john.doe@example.com',
    avatar: "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
    //avatar: "C:\Users\elena\testlearnproject\assets\images\woman.jpg",
  });

//   const toggleEditing = () => {
//     isEditing.value = !isEditing.value;
//   };

//   const editAvatar = () => {
//     // Здесь вы можете добавить функциональность для редактирования аватара
//   };

//   const saveChanges = () => {
//     // Здесь вы можете сохранить изменения пользователя
//     isEditing.value = false;
//   };
// import { useProfileStore } from "~~/stores/profileStore";
// const store = useProfileStore();

// store.initializeTableData();
</script>

<style scoped>
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.profile-card {
  width: 400px;
}

.profile-avatar {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.edit-avatar {
  position: absolute;
  bottom: 0;
  right: 0;
}

.profile-info {
  text-align: center;
}

el-form-item {
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin: 10px 0;
}
</style>
