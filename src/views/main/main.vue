<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="el-aside">
        <!-- <Menu /> -->
      </el-aside>
      <el-container class="page">
        <el-header>
          <!-- <Header /> -->
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view> </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
// import router from "@/router";
// import Menu from "@/components/Menu";
// import Header from "@/components/Header";

const router = useRouter();

// 生成动态菜单
const menuRoutes = computed(() => {
  return (
    router
      .getRoutes()
      .find((r) => r.name === "main")
      ?.children?.filter((r) => !r.meta?.hidden)
      ?.map((r) => ({
        path: r.path,
        title: r.meta?.title || r.name,
        icon: r.meta?.icon
      })) || []
  );
});

console.log("menuRoutes: ", menuRoutes);
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.el-header {
  padding-right: 47px !important;
  width: 100%;
  height: 70px !important;
}

.main-content,
.page {
  height: 100%;
}
.page-content {
  height: calc(100% - 48px);
  .page-info {
    border-radius: 10px;
  }
}

.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  // line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #fff;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
  }
}
.el-main {
  color: #333;
  background-color: #f4f5fa;
}
</style>
