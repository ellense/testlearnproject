<template>
  <div class="profile">
    <div class="profile-info" v-if="profile">
      <el-form ref="form" label-position="top">
        <h2>
          {{ profile.last_name}} {{profile.first_name }} {{ profile.middle_name }} 
        </h2>
        <p>{{ profile.email }}</p>
      </el-form>
    
    </div>
  </div>

</template>

<script setup>
import { ref, computed } from "vue";
import { useProfileStore } from "~~/stores/profileStore";

const profileStore = useProfileStore();

const profile = computed(() => profileStore.firstProfile);


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
