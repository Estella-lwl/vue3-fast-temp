<template>
  <div class="nav-header">
    <el-icon class="fold-menu" color="#409EFC" :size="20" @click="handleMenuFold">
      <Fold v-if="isFold"></Fold>
      <Expand v-else></Expand>
    </el-icon>

    <div class="func-content">
      <!-- <span>{{ userName }}</span> -->
      <span class="span-link" @click="handleChangePassword"> 修改密码</span>
      <span class="span-link" @click="logout"> 退出</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import localCache from "@/utils/cache";

const router = useRouter();
const emit = defineEmits(["menuChange"]);
const isFold = ref(false);

const handleMenuFold = () => {
  isFold.value = !isFold.value;
  emit("menuChange", isFold.value);
};

const handleChangePassword = () => {
  //
};

const logout = () => {
  localCache.removeCache("token");
  router.push("/main");
};
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .func-content {
    span {
      margin-left: 35px;
      vertical-align: middle;
      line-height: 70px;
      color: #5d6567;
      cursor: pointer;
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: 500;
    }

    .span-link {
      text-decoration: underline;
      color: #1a4986;
      text-decoration: underline;
      text-underline-offset: 0.3em;
    }
  }
}
</style>
